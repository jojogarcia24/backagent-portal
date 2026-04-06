'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type Toast = { type: 'success' | 'error' | 'info'; message: string } | null;

type RetryResponse = {
  success?: boolean;
  cda_id?: string;
  transaction_id?: string;
  status?: string;
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
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [lastResult, setLastResult] = useState<RetryResponse | null>(null);

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

  const canSubmit = useMemo(() => {
    return !!supabaseUrl.trim() && !!adminJwt.trim() && (!!transactionId.trim() || !!cdaId.trim());
  }, [supabaseUrl, adminJwt, transactionId, cdaId]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setToast({ type: 'info', message: 'Retrying send-to-title...' });
    localStorage.setItem('ba_admin_jwt', adminJwt.trim());
    localStorage.setItem('ba_supabase_url', supabaseUrl.trim());
    localStorage.setItem('ba_publishable_key', publishableKey.trim());

    const base = supabaseUrl.trim().replace(/\/+$/, '');
    const payload = cdaId.trim()
      ? { cda_id: cdaId.trim(), notes: notes.trim() || undefined }
      : { transaction_id: transactionId.trim(), notes: notes.trim() || undefined };

    try {
      const res = await fetch(`${base}/functions/v1/resend-cda-to-title`, {
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
          Calls <code>/functions/v1/resend-cda-to-title</code> using an admin JWT and re-sends existing CDA links
          without regenerating documents.
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

      <form className="grid gap-3" onSubmit={onSubmit}>
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

        <textarea
          className="border rounded-lg p-2 text-black min-h-20"
          placeholder="Retry notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 disabled:opacity-50"
          >
            {loading ? 'Retrying…' : 'Retry Send to Title'}
          </button>
          <span className="text-xs opacity-75">
            Provide either Transaction ID or CDA ID.
          </span>
        </div>
      </form>

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
