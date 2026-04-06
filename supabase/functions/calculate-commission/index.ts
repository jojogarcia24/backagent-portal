import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CdaTriggerResult = {
  attempted: boolean;
  triggered: boolean;
  skipped_reason?: string;
  error?: string;
  response?: unknown;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const body = await req.json();
    const { transaction_id, approved_by } = body;
    const autoGenerateCda = body.auto_generate_cda !== false;
    const sendCdaToTitle = body.send_cda_to_title === true;
    const cdaNotes = typeof body.cda_notes === "string" ? body.cda_notes.trim() : "";
    const fundingRequestIdFromBody =
      typeof body.funding_request_id === "string" && body.funding_request_id.trim()
        ? body.funding_request_id.trim()
        : null;

    // Verify the caller is an admin agent when a user token is provided.
    // Internal service-role calls can omit this and are trusted by function-level auth.
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const { data: userData } = await supabase.auth.getUser(token);
      if (userData.user) {
        const { data: callerAgent } = await supabase
          .from("agents")
          .select("is_admin")
          .eq("auth_user_id", userData.user.id)
          .single();
        if (!callerAgent?.is_admin) {
          return new Response(
            JSON.stringify({ error: "Unauthorized — admin only" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
      }
    }

    if (!transaction_id) {
      return new Response(
        JSON.stringify({ error: "transaction_id required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Get transaction with all needed data
    const { data: tx } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", transaction_id)
      .single();

    if (!tx) {
      return new Response(
        JSON.stringify({ error: "Transaction not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Get agent
    const { data: agent } = await supabase
      .from("agents")
      .select("*, commission_plans(*)")
      .eq("id", tx.agent_id)
      .single();

    if (!agent) {
      return new Response(
        JSON.stringify({ error: "Agent not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const plan = agent.commission_plans;
    const isLease = tx.transaction_type === "lease" || tx.category === "apartment";
    const triggerAgentId = approved_by || tx.agent_id || null;

    // ── LEASE / APARTMENT — flat $100 fee, no cap impact ──────
    if (isLease) {
      const leaseCommission = tx.commission_amount || 0;
      const leaseFee = 100;
      const agentKeeps = Math.max(0, leaseCommission - leaseFee);

      await supabase.from("transactions").update({
        gross_commission: leaseCommission,
        agent_commission: agentKeeps,
        broker_commission: leaseFee,
        cap_contribution: 0, // Lease fees never count toward cap
        agent_at_cap: false,
        commission_calculated_at: new Date().toISOString(),
        status: "approved",
        approved_at: new Date().toISOString(),
      }).eq("id", transaction_id);

      // Log lease fee to a separate ledger entry (not cap)
      await supabase.from("cap_ledger").insert({
        brokerage_id: tx.brokerage_id,
        agent_id: tx.agent_id,
        transaction_id,
        entry_type: "lease_fee",
        fiscal_year: new Date().getFullYear(),
        gross_commission: leaseFee,
        agent_amount: agentKeeps,
        broker_amount: leaseFee,
        cap_contribution: 0,
        cumulative_to_broker: 0,
        at_cap: false,
        notes: `Lease fee — ${tx.category} ${tx.transaction_type}`,
      });

      await supabase.from("audit_log").insert({
        brokerage_id: tx.brokerage_id,
        transaction_id,
        agent_id: approved_by || tx.agent_id,
        event_type: "commission_calculated",
        triggered_by: "broker",
        page: "Admin",
        description: `Lease fee applied: $100 to office. Agent keeps ${formatCurrency(agentKeeps)}. No cap impact.`,
      });

      const cdaResult = await maybeAutoGenerateCda({
        supabase,
        transactionId: transaction_id,
        fundingRequestId: fundingRequestIdFromBody,
        generatedBy: triggerAgentId,
        autoGenerate: autoGenerateCda,
        sendToTitle: sendCdaToTitle,
        notes: cdaNotes,
      });

      if (cdaResult.error) {
        await supabase.from("audit_log").insert({
          brokerage_id: tx.brokerage_id,
          transaction_id,
          agent_id: triggerAgentId,
          event_type: "cda_auto_trigger_failed",
          triggered_by: "broker",
          page: "Admin",
          description: `Auto CDA trigger failed after approval: ${cdaResult.error}`,
          metadata: { cda_result: cdaResult },
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          type: "lease",
          gross_commission: leaseCommission,
          lease_fee: leaseFee,
          agent_commission: agentKeeps,
          broker_commission: leaseFee,
          cap_contribution: 0,
          cap_impact: false,
          cda_auto: cdaResult,
          message: `Lease fee $100 collected. Agent keeps ${formatCurrency(agentKeeps)}.`,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // ── SALE — calculate commission and cap impact ─────────────
    const salePrice = tx.sale_price || tx.list_price || 0;
    const commissionPct = tx.commission_pct || plan?.agent_split_pct || 3;
    const agentSplitPct = plan?.agent_split_pct || 90;
    const brokerSplitPct = 100 - agentSplitPct;
    const capAmount = plan?.cap_amount || agent.cap_amount || 11500;

    // Gross commission
    const grossCommission = tx.commission_amount || (salePrice * (commissionPct / 100));

    // Check anniversary and get current cap ledger
    const anniversaryDate = getAnniversaryDate(agent.associate_since || agent.created_at);
    const { data: capLedger } = await supabase
      .from("cap_ledger")
      .select("*")
      .eq("agent_id", tx.agent_id)
      .eq("brokerage_id", tx.brokerage_id)
      .gte("created_at", anniversaryDate.toISOString())
      .not("entry_type", "eq", "lease_fee");

    const totalPaidThisYear = (capLedger || []).reduce((sum, entry) => sum + (entry.cap_contribution || 0), 0);
    const remainingTowardCap = Math.max(0, capAmount - totalPaidThisYear);
    const alreadyCapped = totalPaidThisYear >= capAmount;

    let agentCommission = 0;
    let brokerCommission = 0;
    let capContribution = 0;
    let agentAtCap = false;

    if (alreadyCapped) {
      // Agent already capped — keeps 100%
      agentCommission = grossCommission;
      brokerCommission = 0;
      capContribution = 0;
      agentAtCap = true;
    } else {
      // Normal split
      brokerCommission = grossCommission * (brokerSplitPct / 100);
      agentCommission = grossCommission * (agentSplitPct / 100);
      capContribution = brokerCommission;

      // Check if this transaction caps the agent
      if (capContribution >= remainingTowardCap) {
        // Agent caps mid-transaction
        const brokerGetsBeforeCap = remainingTowardCap;
        agentCommission = grossCommission - brokerGetsBeforeCap;
        brokerCommission = brokerGetsBeforeCap;
        capContribution = brokerGetsBeforeCap;
        agentAtCap = true;
      }
    }

    // Update transaction
    await supabase.from("transactions").update({
      gross_commission: grossCommission,
      agent_commission: agentCommission,
      broker_commission: brokerCommission,
      cap_contribution: capContribution,
      agent_at_cap: agentAtCap,
      commission_calculated_at: new Date().toISOString(),
      status: "approved",
      approved_at: new Date().toISOString(),
    }).eq("id", transaction_id);

    // Add cap ledger entry
    await supabase.from("cap_ledger").insert({
      brokerage_id: tx.brokerage_id,
      agent_id: tx.agent_id,
      transaction_id,
      entry_type: "sale_commission",
      amount: grossCommission,
      agent_amount: agentCommission,
      broker_amount: brokerCommission,
      cap_contribution: capContribution,
      cumulative_to_broker: totalPaidThisYear + capContribution,
      fiscal_year: new Date().getFullYear(),
      at_cap: agentAtCap,
      notes: `${tx.category} ${tx.transaction_type} — ${tx.property_address || tx.ref_number}`,
      created_at: new Date().toISOString(),
    });

    // Update running total on agent record
    const newTotal = totalPaidThisYear + capContribution;
    await supabase.from("agents").update({
      cap_paid_ytd: newTotal,
      is_capped: agentAtCap || alreadyCapped,
      capped_at: (agentAtCap && !alreadyCapped) ? new Date().toISOString() : agent.capped_at,
    }).eq("id", tx.agent_id);

    // Audit log
    await supabase.from("audit_log").insert({
      brokerage_id: tx.brokerage_id,
      transaction_id,
      agent_id: approved_by || tx.agent_id,
      event_type: "commission_calculated",
      triggered_by: "broker",
      page: "Admin",
      description: `Commission calculated: Gross ${formatCurrency(grossCommission)} → Agent ${formatCurrency(agentCommission)} / Broker ${formatCurrency(brokerCommission)}. Cap: ${formatCurrency(newTotal)} / ${formatCurrency(capAmount)}${agentAtCap ? " — 🎉 AGENT CAPPED!" : ""}`,
    });

    const cdaResult = await maybeAutoGenerateCda({
      supabase,
      transactionId: transaction_id,
      fundingRequestId: fundingRequestIdFromBody,
      generatedBy: triggerAgentId,
      autoGenerate: autoGenerateCda,
      sendToTitle: sendCdaToTitle,
      notes: cdaNotes,
    });

    if (cdaResult.error) {
      await supabase.from("audit_log").insert({
        brokerage_id: tx.brokerage_id,
        transaction_id,
        agent_id: triggerAgentId,
        event_type: "cda_auto_trigger_failed",
        triggered_by: "broker",
        page: "Admin",
        description: `Auto CDA trigger failed after approval: ${cdaResult.error}`,
        metadata: { cda_result: cdaResult },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        type: "sale",
        sale_price: salePrice,
        commission_pct: commissionPct,
        gross_commission: grossCommission,
        agent_split_pct: agentSplitPct,
        broker_split_pct: brokerSplitPct,
        agent_commission: agentCommission,
        broker_commission: brokerCommission,
        cap_contribution: capContribution,
        cap_total_before: totalPaidThisYear,
        cap_total_after: totalPaidThisYear + capContribution,
        broker_portion: brokerCommission,
        agent_portion: agentCommission,
        cap_amount: capAmount,
        agent_at_cap: agentAtCap,
        was_already_capped: alreadyCapped,
        cda_auto: cdaResult,
        message: agentAtCap && !alreadyCapped
          ? `🎉 Agent has hit their cap! Agent keeps ${formatCurrency(agentCommission)}.`
          : alreadyCapped
          ? `Agent was already capped — keeps 100%: ${formatCurrency(agentCommission)}`
          : `Commission split: Agent ${formatCurrency(agentCommission)} / Broker ${formatCurrency(brokerCommission)}. Cap: ${formatCurrency(totalPaidThisYear + capContribution)} / ${formatCurrency(capAmount)}`,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("calculate-commission error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

async function maybeAutoGenerateCda(params: {
  supabase: ReturnType<typeof createClient>;
  transactionId: string;
  fundingRequestId: string | null;
  generatedBy: string | null;
  autoGenerate: boolean;
  sendToTitle: boolean;
  notes: string;
}): Promise<CdaTriggerResult> {
  const { supabase, transactionId, autoGenerate, sendToTitle, notes, generatedBy } = params;
  let { fundingRequestId } = params;

  if (!autoGenerate) {
    return { attempted: false, triggered: false, skipped_reason: "auto_generate_disabled" };
  }

  if (!fundingRequestId) {
    const { data: frRows, error: frErr } = await supabase
      .from("funding_requests")
      .select("id")
      .eq("transaction_id", transactionId)
      .order("created_at", { ascending: false })
      .limit(1);
    if (frErr) {
      return { attempted: true, triggered: false, error: `Funding request lookup failed: ${frErr.message}` };
    }
    fundingRequestId = frRows?.[0]?.id ?? null;
  }

  if (!fundingRequestId) {
    return { attempted: false, triggered: false, skipped_reason: "no_funding_request" };
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!supabaseUrl || !serviceRoleKey) {
    return { attempted: true, triggered: false, error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" };
  }

  const fnUrl = `${supabaseUrl}/functions/v1/generate-cda`;
  try {
    const res = await fetch(fnUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
        "x-cda-source": "calculate-commission",
      },
      body: JSON.stringify({
        transaction_id: transactionId,
        funding_request_id: fundingRequestId,
        send_to_title: sendToTitle,
        notes,
        generated_by: generatedBy,
      }),
    });

    const raw = await res.text();
    let payload: unknown = raw;
    try {
      payload = raw ? JSON.parse(raw) : {};
    } catch {
      // Keep raw text when response isn't JSON.
    }

    if (!res.ok) {
      const errorMessage = typeof payload === "object" && payload && "error" in payload
        ? String((payload as { error?: unknown }).error ?? `HTTP ${res.status}`)
        : `HTTP ${res.status}`;
      return {
        attempted: true,
        triggered: false,
        error: `generate-cda failed: ${errorMessage}`,
        response: payload,
      };
    }

    return { attempted: true, triggered: true, response: payload };
  } catch (error) {
    return {
      attempted: true,
      triggered: false,
      error: error instanceof Error ? error.message : "Unknown invoke error",
    };
  }
}

function formatCurrency(n: unknown) {
  return "$" + Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function getAnniversaryDate(associateSince: string | null | undefined) {
  if (!associateSince) {
    // Default to Jan 1 of current year if no anniversary date
    const now = new Date();
    return new Date(now.getFullYear(), 0, 1);
  }

  const anniversary = new Date(associateSince);
  const now = new Date();
  const thisYear = new Date(now.getFullYear(), anniversary.getMonth(), anniversary.getDate());

  // If this year's anniversary hasn't happened yet, use last year's
  if (thisYear > now) {
    return new Date(now.getFullYear() - 1, anniversary.getMonth(), anniversary.getDate());
  }

  return thisYear;
}
