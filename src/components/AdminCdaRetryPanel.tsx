'use client';

import { useEffect, useMemo, useState } from 'react';

type Toast = { type: 'success' | 'error' | 'info'; message: string } | null;

type RetryResponse = {
  success?: boolean;
  cda_id?: string;
  transaction_id?: string;
  status?: string;
  documents?: {
    cda_url?: string | null;
    funding_confirmation_internal_url?: string | null;
    disbursement_authorization_url?: string | null;
    buyer_contribution_letter_url?: string | null;
    seller_contribution_letter_url?: string | null;
    w9_url?: string | null;
  };
  title_dispatch?: {
    attempted?: boolean;
    sent?: boolean;
    status_code?: number | null;
    error?: string | null;
  };
  error?: string;
};

export default function AdminCdaRetryPanel({
  initialSupabaseUrl,
  initialPublishableKey,
}: {
  initialSupabaseUrl?: string;
  initialPublishableKey?: string;
}) {
  const [supabaseUrl, setSupabaseUrl] = useState(initialSupabaseUrl ?? '');
  const [publishableKey, setPublishableKey] = useState(initialPublishableKey ?? '');
  const [adminJwt, setAdminJwt] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [cdaId, setCdaId] = useState('');
  const [fundingRequestId, setFundingRequestId] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [lastResult, setLastResult] = useState<RetryResponse | null>(null);
  const [lastAction, setLastAction] = useState<'generate' | 'resend' | null>(null);

  useEffect(() => {
    const savedJwt = localStorage.getItem('ba_admin_jwt') || '';
    const savedUrl = localStorage.getItem('ba_supabase_url') || '';
    const savedKey = localStorage.getItem('ba_publishable_key') || '';
    if (savedJwt) setAdminJwt(savedJwt);
    if (!initialSupabaseUrl && savedUrl) setSupabaseUrl(savedUrl);
    if (!initialPublishableKey && savedKey) setPublishableKey(savedKey);
  }, [initialSupabaseUrl, initialPublishableKey]);

  useEffect(() => {
    const timeout = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timeout);
  }, [toast]);

  const canGenerate = useMemo(() => {
    return !!supabaseUrl.trim() && !!adminJwt.trim() && !!transactionId.trim();
  }, [supabaseUrl, adminJwt, transactionId]);

  const canResend = useMemo(() => {
    return !!supabaseUrl.trim() && !!adminJwt.trim() && (!!transactionId.trim() || !!cdaId.trim());
  }, [supabaseUrl, adminJwt, transactionId, cdaId]);

  const previewLinks = useMemo(() => {
    const docs = lastResult?.documents;
    if (!docs) return [];
    const entries = [
      { label: 'CDA Packet', url: docs.cda_url },
      { label: 'Funding Confirmation (Internal)', url: docs.funding_confirmation_internal_url },
      { label: 'Disbursement Authorization', url: docs.disbursement_authorization_url },
      { label: 'Buyer Contribution Letter', url: docs.buyer_contribution_letter_url },
      { label: 'Seller Contribution Letter', url: docs.seller_contribution_letter_url },
      { label: 'W9', url: docs.w9_url },
    ];
    return entries.filter((x) => !!x.url) as { label: string; url: string }[];
  }, [lastResult]);

  async function callFunction(action: 'generate' | 'resend') {
    const base = supabaseUrl.trim().replace(/\/+$/, '');
    const endpoint =
      action === 'generate' ? '/functions/v1/generate-cda' : '/functions/v1/resend-cda-to-title';
    const payload =
      action === 'generate'
        ? {
            transaction_id: transactionId.trim(),
            funding_request_id: fundingRequestId.trim() || undefined,
            send_to_title: false,
            notes: notes.trim() || undefined,
          }
        : cdaId.trim()
        ? { cda_id: cdaId.trim(), notes: notes.trim() || undefined }
        : {
            transaction_id: transactionId.trim(),
            notes: notes.trim() || undefined,
          };

    const res = await fetch(`${base}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminJwt.trim()}`,
        ...(publishableKey.trim() ? { apikey: publishableKey.trim() } : {}),
      },
      body: JSON.stringify(payload),
    });

    const body = (await res.json().catch(() => ({}))) as RetryResponse;
    setLastResult(body);
    setLastAction(action);
    return { res, body };
  }

  async function onGenerate() {
    if (!canGenerate) return;

    setLastAction('generate');
    setLoading(true);
    setToast({ type: 'info', message: 'Generating test CDA and collecting preview links...' });
    localStorage.setItem('ba_admin_jwt', adminJwt.trim());
    localStorage.setItem('ba_supabase_url', supabaseUrl.trim());
    localStorage.setItem('ba_publishable_key', publishableKey.trim());

    try {
      const { res, body } = await callFunction('generate');

      if (!res.ok || !body?.success) {
        setToast({
          type: 'error',
          message: body?.error || `Generate failed (${res.status})`,
        });
        return;
      }

      const linkCount = Object.values(body?.documents || {}).filter(Boolean).length;
      setToast({
        type: 'success',
        message: `Test CDA generated. Found ${linkCount} preview link${linkCount === 1 ? '' : 's'}.`,
      });
    } catch (err: any) {
      setToast({ type: 'error', message: err?.message || 'Unexpected generate error' });
    } finally {
      setLoading(false);
    }
  }

  async function onResend() {
    if (!canResend) return;

    setLastAction('resend');
    setLoading(true);
    setToast({ type: 'info', message: 'Retrying send-to-title...' });
    localStorage.setItem('ba_admin_jwt', adminJwt.trim());
    localStorage.setItem('ba_supabase_url', supabaseUrl.trim());
    localStorage.setItem('ba_publishable_key', publishableKey.trim());

    try {
      const { res, body } = await callFunction('resend');

      if (!res.ok || !body?.success) {
        setToast({
          type: 'error',
          message: body?.error || `Retry failed (${res.status})`,
        });
        return;
      }

      const sent = body?.title_dispatch?.sent === true;
      const statusCode = body?.title_dispatch?.status_code;
      setToast({
        type: sent ? 'success' : 'error',
        message: sent
          ? `Sent to title successfully${statusCode ? ` (HTTP ${statusCode})` : ''}.`
          : body?.title_dispatch?.error || 'Send attempt completed but did not succeed.',
      });
    } catch (err: any) {
      setToast({ type: 'error', message: err?.message || 'Unexpected retry error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-8 space-y-4 border border-white/10 rounded-xl p-4 bg-white/[0.02]">
      <div>
        <h2 className="text-lg font-semibold">Admin Tools: Retry Send to Title</h2>
        <p className="text-sm opacity-80 mt-1">
          Generate preview links with <code>/functions/v1/generate-cda</code> or re-send existing links with{' '}
          <code>/functions/v1/resend-cda-to-title</code>.
        </p>
      </div>

      {toast ? (
        <div
          className={`rounded-md px-3 py-2 text-sm ${
            toast.type === 'success'
              ? 'bg-green-500/20 text-green-200 border border-green-500/30'
              : toast.type === 'error'
              ? 'bg-red-500/20 text-red-200 border border-red-500/30'
              : 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
          }`}
        >
          {toast.message}
        </div>
      ) : null}

      <form className="grid gap-3">
        <input
          className="border rounded-lg p-2 text-black"
          placeholder="Supabase URL (e.g. https://xxxx.supabase.co)"
          value={supabaseUrl}
          onChange={(e) => setSupabaseUrl(e.target.value)}
          required
        />

        <input
          className="border rounded-lg p-2 text-black"
          placeholder="Publishable/anon key (optional but recommended)"
          value={publishableKey}
          onChange={(e) => setPublishableKey(e.target.value)}
        />

        <input
          className="border rounded-lg p-2 text-black"
          placeholder="Admin JWT (required)"
          value={adminJwt}
          onChange={(e) => setAdminJwt(e.target.value)}
          required
        />

        <div className="grid md:grid-cols-2 gap-3">
          <input
            className="border rounded-lg p-2 text-black"
            placeholder="Transaction ID (UUID)"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
          <input
            className="border rounded-lg p-2 text-black"
            placeholder="CDA ID (UUID) - optional, overrides Transaction ID"
            value={cdaId}
            onChange={(e) => setCdaId(e.target.value)}
          />
        </div>

        <input
          className="border rounded-lg p-2 text-black"
          placeholder="Funding Request ID (optional, used by Generate)"
          value={fundingRequestId}
          onChange={(e) => setFundingRequestId(e.target.value)}
        />

        <textarea
          className="border rounded-lg p-2 text-black min-h-20"
          placeholder="Retry notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onGenerate}
            disabled={!canGenerate || loading}
            className="bg-purple-600 text-white rounded-lg px-4 py-2 disabled:opacity-50"
          >
            {loading && lastAction === 'generate' ? 'Generating…' : 'Generate + Preview Test CDA'}
          </button>

          <button
            type="button"
            onClick={onResend}
            disabled={!canResend || loading}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 disabled:opacity-50"
          >
            {loading && lastAction === 'resend' ? 'Retrying…' : 'Retry Send to Title'}
          </button>
          <span className="text-xs opacity-75">
            Generate needs Transaction ID. Retry needs Transaction ID or CDA ID.
          </span>
        </div>
      </form>

      {previewLinks.length ? (
        <div className="border border-white/10 rounded-lg p-3 space-y-2">
          <div className="text-sm font-medium">
            Preview links {lastAction === 'generate' ? '(freshly generated)' : '(from last response)'}
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {previewLinks.map((item) => (
              <li key={`${item.label}:${item.url}`}>
                <a
                  className="text-blue-300 underline break-all"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {lastResult ? (
        <details className="text-xs opacity-90">
          <summary className="cursor-pointer">Last response</summary>
          <pre className="mt-2 whitespace-pre-wrap break-all p-3 rounded bg-black/50 border border-white/10">
            {JSON.stringify(lastResult, null, 2)}
          </pre>
        </details>
      ) : null}
    </section>
  );
}
