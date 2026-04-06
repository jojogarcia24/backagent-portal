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

function currency(n: unknown): string {
  const val = Number(n ?? 0);
  if (!Number.isFinite(val)) return "$0.00";
  return val.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function esc(v: unknown): string {
  const s = String(v ?? "");
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeRows(value: JsonValue | null): Record<string, JsonValue>[] {
  if (!Array.isArray(value)) return [];
  return value.filter((row) => !!row && typeof row === "object") as Record<string, JsonValue>[];
}

function rowsAsHtmlTable(rows: Record<string, JsonValue>[], fallbackLabel: string): string {
  if (!rows.length) return `<p>No ${fallbackLabel} recorded.</p>`;

  const first = rows[0];
  const keys = Object.keys(first);
  const columns = keys.length ? keys : ["label", "amount"];
  const header = columns.map((k) => `<th>${esc(k)}</th>`).join("");
  const body = rows
    .map((row) => {
      const cells = columns.map((k) => {
        const val = row[k];
        if (typeof val === "number") return `<td>${currency(val)}</td>`;
        return `<td>${esc(val)}</td>`;
      });
      return `<tr>${cells.join("")}</tr>`;
    })
    .join("");
  return `<table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`;
}

function htmlDoc(title: string, subtitle: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; margin: 28px; color: #111827; }
    h1 { margin: 0 0 8px; }
    h2 { margin-top: 28px; margin-bottom: 8px; }
    .sub { color: #6b7280; margin-bottom: 20px; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 6px; background: #fee2e2; color: #991b1b; font-size: 12px; font-weight: 700; }
    .muted { color: #6b7280; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; font-size: 13px; }
    th { background: #f9fafb; }
    .box { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
  </style>
</head>
<body>
  <h1>${esc(title)}</h1>
  <div class="sub">${esc(subtitle)}</div>
  ${body}
</body>
</html>`;
}

async function uploadHtml(
  supabase: ReturnType<typeof createClient>,
  bucket: string,
  path: string,
  html: string,
): Promise<string> {
  const bytes = new TextEncoder().encode(html);
  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, bytes, {
    upsert: true,
    contentType: "text/html; charset=utf-8",
  });
  if (uploadError) throw uploadError;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
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

  const nowIso = new Date().toISOString();
  let transactionIdForErrorUpdate: string | null = null;

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
    const transaction_id = String(body.transaction_id || "").trim();
    const funding_request_id = String(body.funding_request_id || "").trim();
    const send_to_title = body.send_to_title === true;
    const notes = String(body.notes || "").trim();

    if (!transaction_id) {
      return new Response(
        JSON.stringify({ error: "transaction_id required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    transactionIdForErrorUpdate = transaction_id;

    const { data: tx, error: txErr } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", transaction_id)
      .single();
    if (txErr || !tx) {
      return new Response(
        JSON.stringify({ error: "Transaction not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let frQuery = supabase.from("funding_requests").select("*").eq("transaction_id", transaction_id);
    if (funding_request_id) frQuery = frQuery.eq("id", funding_request_id);

    const { data: frRows, error: frErr } = await frQuery.order("created_at", { ascending: false }).limit(1);
    if (frErr) throw frErr;
    const fr = frRows?.[0];
    if (!fr) {
      return new Response(
        JSON.stringify({ error: "Funding request not found for this transaction" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { data: brokerage } = await supabase
      .from("brokerages")
      .select("id, name, email, phone")
      .eq("id", tx.brokerage_id)
      .single();
    const { data: agent } = await supabase
      .from("agents")
      .select("id, first_name, last_name, email")
      .eq("id", tx.agent_id)
      .single();

    const basePath = `cda/${tx.id}/${Date.now()}`;
    const bucket = "transaction-docs";
    const settlementRows = normalizeRows(fr.settlement_charges as JsonValue | null);
    const payoutRows = normalizeRows(fr.payouts as JsonValue | null);
    const warnings: string[] = [];

    const commonInfo = `
      <div class="box">
        <div><strong>Ref #:</strong> ${esc(tx.ref_number)}</div>
        <div><strong>Property:</strong> ${esc(tx.property_address || "Not set")}</div>
        <div><strong>Brokerage:</strong> ${esc(brokerage?.name || tx.brokerage_id)}</div>
        <div><strong>Agent:</strong> ${esc(`${agent?.first_name || ""} ${agent?.last_name || ""}`.trim() || tx.agent_id)}</div>
        <div><strong>Generated by:</strong> ${esc(`${adminAgent.first_name || ""} ${adminAgent.last_name || ""}`.trim() || adminAgent.email || adminAgent.id)}</div>
        <div><strong>Generated at:</strong> ${esc(nowIso)}</div>
      </div>
    `;

    const fundingConfirmationHtml = htmlDoc(
      "Funding Confirmation",
      "INTERNAL ONLY — Not for external distribution",
      `
      <div class="badge">INTERNAL ONLY</div>
      ${commonInfo}
      <h2>Funding Request Summary</h2>
      <div class="box">
        <div><strong>Funding method:</strong> ${esc(fr.funding_method || tx.funding_method || "standard")}</div>
        <div><strong>Title company:</strong> ${esc(fr.title_company_name || "Not provided")}</div>
        <div><strong>Title contact:</strong> ${esc(fr.title_contact_name || "Not provided")}</div>
        <div><strong>Total charges:</strong> ${currency(fr.total_charges)}</div>
        <div><strong>Total payouts:</strong> ${currency(fr.total_payouts)}</div>
        <div><strong>Net to agent:</strong> ${currency(fr.net_to_agent)}</div>
      </div>
      <h2>Settlement Charges</h2>
      ${rowsAsHtmlTable(settlementRows, "settlement charges")}
      <h2>Payouts</h2>
      ${rowsAsHtmlTable(payoutRows, "payouts")}
      ${notes ? `<h2>Broker Notes</h2><p>${esc(notes)}</p>` : ""}
      `,
    );

    const disbursementAuthorizationHtml = htmlDoc(
      "Disbursement Authorization",
      "Prepared for title/funding disbursement",
      `
      ${commonInfo}
      <h2>Authorization</h2>
      <p>
        This document authorizes disbursement for the transaction above in accordance with the
        approved funding request and brokerage policy.
      </p>
      <div class="box">
        <div><strong>Broker split:</strong> ${currency(tx.broker_commission)}</div>
        <div><strong>Agent net:</strong> ${currency(tx.agent_commission ?? fr.net_to_agent)}</div>
        <div><strong>Funding method:</strong> ${esc(fr.funding_method || tx.funding_method || "standard")}</div>
      </div>
      <h2>Payout Detail</h2>
      ${rowsAsHtmlTable(payoutRows, "payouts")}
      `,
    );

    const packetHtml = htmlDoc(
      "CDA Packet",
      "Funding packet index",
      `
      ${commonInfo}
      <h2>Packet Contents</h2>
      <ul>
        <li>Funding Confirmation (Internal)</li>
        <li>Disbursement Authorization</li>
        <li>Optional attachments based on funding request election</li>
      </ul>
      <p class="muted">This packet record is generated by the generate-cda edge function.</p>
      `,
    );

    const cdaUrl = await uploadHtml(supabase, bucket, `${basePath}/cda-packet.html`, packetHtml);
    const fundingConfirmationUrl = await uploadHtml(
      supabase,
      bucket,
      `${basePath}/funding-confirmation-internal.html`,
      fundingConfirmationHtml,
    );
    const disbursementAuthorizationUrl = await uploadHtml(
      supabase,
      bucket,
      `${basePath}/disbursement-authorization.html`,
      disbursementAuthorizationHtml,
    );

    let buyerContributionLetterUrl: string | null = fr.buyer_contribution_letter_url ?? null;
    let sellerContributionLetterUrl: string | null = fr.seller_contribution_letter_url ?? null;
    let w9Url: string | null = fr.w9_url ?? tx.w9_url ?? null;

    if (fr.include_buyer_contribution_letter && !buyerContributionLetterUrl) {
      const html = htmlDoc(
        "Buyer Contribution Letter",
        "Generated attachment",
        `${commonInfo}<p>Buyer contribution letter placeholder for transaction ${esc(tx.ref_number)}.</p>`,
      );
      buyerContributionLetterUrl = await uploadHtml(
        supabase,
        bucket,
        `${basePath}/buyer-contribution-letter.html`,
        html,
      );
    }

    if (fr.include_seller_contribution_letter && !sellerContributionLetterUrl) {
      const html = htmlDoc(
        "Seller Contribution Letter",
        "Generated attachment",
        `${commonInfo}<p>Seller contribution letter placeholder for transaction ${esc(tx.ref_number)}.</p>`,
      );
      sellerContributionLetterUrl = await uploadHtml(
        supabase,
        bucket,
        `${basePath}/seller-contribution-letter.html`,
        html,
      );
    }

    if (fr.include_w9 && !w9Url) {
      warnings.push("W9 elected but no W9 file URL was provided.");
    }

    const cdaStatus = warnings.length ? "generated_with_warnings" : "generated";
    const sentAt = send_to_title ? nowIso : null;

    const { data: cdaRecord, error: cdaErr } = await supabase
      .from("cdas")
      .insert({
        brokerage_id: tx.brokerage_id,
        agent_id: tx.agent_id,
        transaction_id: tx.id,
        file_url: cdaUrl,
        cda_url: cdaUrl,
        funding_confirmation_internal_url: fundingConfirmationUrl,
        disbursement_authorization_url: disbursementAuthorizationUrl,
        buyer_contribution_letter_url: buyerContributionLetterUrl,
        seller_contribution_letter_url: sellerContributionLetterUrl,
        w9_url: w9Url,
        source_funding_request_id: fr.id,
        generated_at: nowIso,
        sent_to_title: send_to_title,
        sent_at: sentAt,
        status: cdaStatus,
        generated_by: adminAgent.id,
        metadata: {
          warnings,
          notes,
          generated_from_function: "generate-cda",
        },
      })
      .select("id")
      .single();
    if (cdaErr || !cdaRecord) throw cdaErr ?? new Error("Failed to create cda record");

    const { error: txUpdateErr } = await supabase
      .from("transactions")
      .update({
        cda_status: send_to_title ? "sent_to_title" : cdaStatus,
        cda_generated_at: nowIso,
        cda_generated_by: adminAgent.id,
        cda_error: null,
        cda_sent_to_title_at: sentAt,
        cda_url: cdaUrl,
        funding_confirmation_url: fundingConfirmationUrl,
        disbursement_authorization_url: disbursementAuthorizationUrl,
        buyer_contribution_letter_url: buyerContributionLetterUrl,
        seller_contribution_letter_url: sellerContributionLetterUrl,
        w9_url: w9Url,
        funding_request_id: fr.id,
        funding_method: fr.funding_method ?? tx.funding_method,
      })
      .eq("id", tx.id);
    if (txUpdateErr) throw txUpdateErr;

    const { error: frUpdateErr } = await supabase
      .from("funding_requests")
      .update({
        cda_generated_at: nowIso,
        cda_id: cdaRecord.id,
        cda_error: null,
        funding_confirmation_internal_url: fundingConfirmationUrl,
        disbursement_authorization_url: disbursementAuthorizationUrl,
        buyer_contribution_letter_url: buyerContributionLetterUrl,
        seller_contribution_letter_url: sellerContributionLetterUrl,
        w9_url: w9Url,
        updated_at: nowIso,
      })
      .eq("id", fr.id);
    if (frUpdateErr) throw frUpdateErr;

    await supabase.from("audit_log").insert({
      brokerage_id: tx.brokerage_id,
      transaction_id: tx.id,
      agent_id: adminAgent.id,
      event_type: "cda_generated",
      triggered_by: "broker",
      page: "Admin",
      description: `CDA packet generated${send_to_title ? " and marked sent to title" : ""}.`,
      metadata: {
        cda_id: cdaRecord.id,
        funding_request_id: fr.id,
        send_to_title,
        warnings,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        cda_id: cdaRecord.id,
        transaction_id: tx.id,
        funding_request_id: fr.id,
        status: send_to_title ? "sent_to_title" : cdaStatus,
        documents: {
          cda_url: cdaUrl,
          funding_confirmation_internal_url: fundingConfirmationUrl,
          disbursement_authorization_url: disbursementAuthorizationUrl,
          buyer_contribution_letter_url: buyerContributionLetterUrl,
          seller_contribution_letter_url: sellerContributionLetterUrl,
          w9_url: w9Url,
        },
        warnings,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("generate-cda error:", error);

    if (transactionIdForErrorUpdate) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      );
      await supabase
        .from("transactions")
        .update({
          cda_status: "error",
          cda_error: error instanceof Error ? error.message : "Unknown CDA generation error",
        })
        .eq("id", transactionIdForErrorUpdate);
    }

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
