import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

type AdminAgent = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  is_admin: boolean;
};

type TitleDispatchResult = {
  attempted: boolean;
  sent: boolean;
  webhook_url: string | null;
  status_code: number | null;
  error: string | null;
  response: JsonValue | string | null;
};

function labelForAgent(agent: AdminAgent): string {
  return `${agent.first_name || ""} ${agent.last_name || ""}`.trim() || agent.email || agent.id;
}

async function getAdminAgent(
  req: Request,
  supabase: ReturnType<typeof createClient>,
): Promise<AdminAgent | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.replace("Bearer ", "");
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData.user?.id) return null;

  const { data: agent, error: agentErr } = await supabase
    .from("agents")
    .select("id, first_name, last_name, email, is_admin")
    .eq("auth_user_id", userData.user.id)
    .single();

  if (agentErr || !agent?.is_admin) return null;
  return agent as AdminAgent;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    const adminAgent = await getAdminAgent(req, supabase);
    if (!adminAgent) {
      return new Response(
        JSON.stringify({ error: "Unauthorized — admin only" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => ({}));
    const cdaId = String(body.cda_id || "").trim();
    const transactionId = String(body.transaction_id || "").trim();
    const notes = String(body.notes || "").trim();
    if (!cdaId && !transactionId) {
      return new Response(
        JSON.stringify({ error: "Provide cda_id or transaction_id" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let cdaQuery = supabase
      .from("cdas")
      .select("*")
      .order("generated_at", { ascending: false })
      .limit(1);
    if (cdaId) {
      cdaQuery = cdaQuery.eq("id", cdaId);
    } else {
      cdaQuery = cdaQuery.eq("transaction_id", transactionId);
    }

    const { data: cdaRows, error: cdaErr } = await cdaQuery;
    if (cdaErr) throw cdaErr;
    const cda = cdaRows?.[0];
    if (!cda) {
      return new Response(
        JSON.stringify({ error: "CDA record not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const txId = cda.transaction_id as string;
    const { data: tx, error: txErr } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", txId)
      .single();
    if (txErr || !tx) {
      return new Response(
        JSON.stringify({ error: "Transaction not found for CDA" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { data: frRows, error: frErr } = await supabase
      .from("funding_requests")
      .select("*")
      .eq("transaction_id", txId)
      .order("created_at", { ascending: false })
      .limit(1);
    if (frErr) throw frErr;
    const fr = frRows?.[0];

    const { data: settings } = await supabase
      .from("brokerage_settings")
      .select("ghl_webhook_url")
      .eq("brokerage_id", tx.brokerage_id)
      .single();
    const webhookUrl = String(settings?.ghl_webhook_url || "").trim();

    const dispatch: TitleDispatchResult = {
      attempted: true,
      sent: false,
      webhook_url: webhookUrl || null,
      status_code: null,
      error: null,
      response: null,
    };

    const docs = {
      cda_url: (cda.cda_url as string | null) || (cda.file_url as string | null),
      funding_confirmation_internal_url: (cda.funding_confirmation_internal_url as string | null) ||
        (fr?.funding_confirmation_internal_url as string | null) ||
        (tx.funding_confirmation_url as string | null),
      disbursement_authorization_url: (cda.disbursement_authorization_url as string | null) ||
        (fr?.disbursement_authorization_url as string | null) ||
        (tx.disbursement_authorization_url as string | null),
      buyer_contribution_letter_url: (cda.buyer_contribution_letter_url as string | null) ||
        (fr?.buyer_contribution_letter_url as string | null) ||
        (tx.buyer_contribution_letter_url as string | null),
      seller_contribution_letter_url: (cda.seller_contribution_letter_url as string | null) ||
        (fr?.seller_contribution_letter_url as string | null) ||
        (tx.seller_contribution_letter_url as string | null),
      w9_url: (cda.w9_url as string | null) ||
        (fr?.w9_url as string | null) ||
        (tx.w9_url as string | null),
    };

    const attachments = [
      ...(docs.cda_url ? [{ type: "cda_packet", url: docs.cda_url }] : []),
      ...(docs.funding_confirmation_internal_url
        ? [{ type: "funding_confirmation_internal", url: docs.funding_confirmation_internal_url }]
        : []),
      ...(docs.disbursement_authorization_url
        ? [{ type: "disbursement_authorization", url: docs.disbursement_authorization_url }]
        : []),
      ...(docs.buyer_contribution_letter_url
        ? [{ type: "buyer_contribution_letter", url: docs.buyer_contribution_letter_url }]
        : []),
      ...(docs.seller_contribution_letter_url
        ? [{ type: "seller_contribution_letter", url: docs.seller_contribution_letter_url }]
        : []),
      ...(docs.w9_url ? [{ type: "w9", url: docs.w9_url }] : []),
    ];

    if (!webhookUrl) {
      dispatch.error = "Missing brokerage_settings.ghl_webhook_url";
    } else if (!attachments.length) {
      dispatch.error = "No document URLs available to send";
    } else {
      const payload: Record<string, JsonValue> = {
        event_type: "cda_generated",
        action: "resend_to_title",
        timestamp: new Date().toISOString(),
        transaction_id: tx.id,
        funding_request_id: fr?.id || cda.source_funding_request_id || null,
        cda_id: cda.id,
        ref_number: tx.ref_number,
        property_address: tx.property_address,
        generated_by_id: adminAgent.id,
        generated_by_label: labelForAgent(adminAgent),
        title_company_name: fr?.title_company_name || null,
        title_contact_name: fr?.title_contact_name || null,
        title_email: fr?.title_email || null,
        title_phone: fr?.title_phone || null,
        title_fax: fr?.title_fax || null,
        title_gf_number: fr?.title_gf_number || null,
        funding_method: fr?.funding_method ?? tx.funding_method ?? "standard",
        total_charges: Number(fr?.total_charges ?? 0),
        total_payouts: Number(fr?.total_payouts ?? 0),
        net_to_agent: Number(fr?.net_to_agent ?? 0),
        notes,
        documents: docs as unknown as JsonValue,
        attachments,
      };

      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        dispatch.status_code = webhookRes.status;
        const raw = await webhookRes.text();
        if (raw) {
          try {
            dispatch.response = JSON.parse(raw) as JsonValue;
          } catch {
            dispatch.response = raw;
          }
        }
        if (webhookRes.ok) {
          dispatch.sent = true;
        } else {
          dispatch.error = `Webhook returned ${webhookRes.status}`;
        }
      } catch (err) {
        dispatch.error = err instanceof Error ? err.message : "Unknown webhook error";
      }
    }

    const sentAt = dispatch.sent ? new Date().toISOString() : null;
    const cdaStatus = dispatch.sent ? "sent_to_title" : "send_to_title_failed";

    const cdaMetadata = (cda.metadata && typeof cda.metadata === "object") ? cda.metadata as Record<string, JsonValue> : {};
    const resendEntry: Record<string, JsonValue> = {
      attempted_at: new Date().toISOString(),
      sent: dispatch.sent,
      error: dispatch.error,
      status_code: dispatch.status_code,
    };
    const history = Array.isArray(cdaMetadata.title_resend_history)
      ? [...cdaMetadata.title_resend_history as JsonValue[], resendEntry]
      : [resendEntry];

    await supabase
      .from("cdas")
      .update({
        sent_to_title: dispatch.sent,
        sent_at: sentAt,
        status: cdaStatus,
        error_message: dispatch.error,
        metadata: {
          ...cdaMetadata,
          last_title_dispatch: dispatch,
          title_resend_history: history,
        },
      })
      .eq("id", cda.id);

    await supabase
      .from("transactions")
      .update({
        cda_status: cdaStatus,
        cda_sent_to_title_at: sentAt,
        cda_error: dispatch.error,
      })
      .eq("id", tx.id);

    if (fr?.id) {
      await supabase
        .from("funding_requests")
        .update({ cda_error: dispatch.error, updated_at: new Date().toISOString() })
        .eq("id", fr.id);
    }

    await supabase.from("audit_log").insert({
      brokerage_id: tx.brokerage_id,
      transaction_id: tx.id,
      agent_id: adminAgent.id,
      event_type: dispatch.sent ? "cda_sent_to_title" : "cda_send_to_title_failed",
      triggered_by: "broker",
      page: "Admin",
      description: dispatch.sent
        ? "CDA resend to title succeeded."
        : `CDA resend to title failed: ${dispatch.error || "Unknown dispatch failure"}`,
      metadata: {
        cda_id: cda.id,
        funding_request_id: fr?.id || cda.source_funding_request_id || null,
        title_dispatch: dispatch,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        cda_id: cda.id,
        transaction_id: tx.id,
        status: cdaStatus,
        title_dispatch: dispatch,
        documents: docs,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("resend-cda-to-title error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
