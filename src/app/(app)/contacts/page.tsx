'use client';

import { useEffect, useMemo, useState } from 'react';

type Contact = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
};
type ListResponse = {
  data: Contact[];
  meta: { page: number; pageSize: number; total: number; pages: number };
};

async function listContacts(params: { q?: string; page?: number; pageSize?: number }) {
  const u = new URL('/api/contacts', window.location.origin);
  if (params.q) u.searchParams.set('q', params.q);
  if (params.page) u.searchParams.set('page', String(params.page));
  if (params.pageSize) u.searchParams.set('pageSize', String(params.pageSize));
  const r = await fetch(u.toString(), { cache: 'no-store' });
  if (!r.ok) throw new Error(`List failed: ${r.status}`);
  return (await r.json()) as ListResponse;
}
async function createContact(token: string | null, data: Partial<Contact> & { name: string }) {
  const r = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(data),
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(body?.error || `Create failed: ${r.status}`);
  return body as Contact;
}
async function patchContact(token: string, id: string, data: Partial<Contact>) {
  const r = await fetch(`/api/contacts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(body?.error || `Patch failed: ${r.status}`);
  return body as Contact;
}
async function deleteContact(token: string, id: string) {
  const r = await fetch(`/api/contacts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok && r.status !== 204) {
    const body = await r.json().catch(() => ({}));
    throw new Error(body?.error || `Delete failed: ${r.status}`);
  }
}

export default function ContactsPage() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [rows, setRows] = useState<Contact[]>([]);
  const [meta, setMeta] = useState<ListResponse['meta'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // dev-only token input for POST/PATCH/DELETE
  const [token, setToken] = useState<string>('');
  const tokenSet = token.trim().length > 10;

  // load/save token persistently
  useEffect(() => {
    const saved = localStorage.getItem('ba_token') || '';
    if (saved) setToken(saved);
  }, []);
  function updateToken(val: string) {
    const t = val.trim();
    setToken(t);
    localStorage.setItem('ba_token', t);
  }

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<Contact>>({});

  const canPrev = useMemo(() => !!meta && page > 1, [meta, page]);
  const canNext = useMemo(() => !!meta && page < (meta?.pages || 1), [meta, page]);

  async function refresh() {
    setLoading(true);
    setErr(null);
    try {
      const res = await listContacts({ q, page, pageSize });
      setRows(res.data);
      setMeta(res.meta);
    } catch (e: any) {
      setErr(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [q, page, pageSize]);

  async function onCreate(form: FormData) {
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const notes = String(form.get('notes') || '').trim();
    setCreating(true); setErr(null);
    try {
      await createContact(tokenSet ? token : null, { name, email: email || undefined, phone: phone || undefined, notes: notes || undefined });
      (document.getElementById('create-form') as HTMLFormElement)?.reset();
      await refresh();
    } catch (e: any) { setErr(e?.message || 'Create failed'); }
    finally { setCreating(false); }
  }

  async function onSaveEdit() {
    if (!editingId || !tokenSet) { setErr('Need a Bearer token to save'); return; }
    try {
      await patchContact(token, editingId, editDraft);
      setEditingId(null); setEditDraft({});
      await refresh();
    } catch (e: any) { setErr(e?.message || 'Save failed'); }
  }
  async function onDelete(id: string) {
    if (!tokenSet) { setErr('Need a Bearer token to delete'); return; }
    try { await deleteContact(token, id); await refresh(); }
    catch (e: any) { setErr(e?.message || 'Delete failed'); }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-white">
      <h1 className="text-2xl font-semibold">Contacts</h1>

      {/* Search + token */}
      <div className="grid md:grid-cols-2 gap-3">
        <input className="border rounded-lg p-2 text-black" placeholder="Search name, email, phone, notes…" value={q}
          onChange={(e) => { setPage(1); setQ(e.target.value); }} />
        <div className="flex items-center gap-2">
          <input className="border rounded-lg p-2 text-black flex-1" placeholder="Bearer token (dev, for POST/PATCH/DELETE)"
            value={token} onChange={(e) => updateToken(e.target.value)} />
          <span className={`text-xs ${tokenSet ? 'text-green-400' : 'text-red-400'}`}>{tokenSet ? 'token set' : 'no token'}</span>
        </div>
      </div>

      {/* Create form */}
      <form id="create-form" className="grid md:grid-cols-5 gap-3 items-start border rounded-xl p-4"
        onSubmit={(e) => { e.preventDefault(); onCreate(new FormData(e.currentTarget)); }}>
        <input name="name" className="border rounded-lg p-2 text-black" placeholder="Name *" required />
        <input name="email" className="border rounded-lg p-2 text-black" placeholder="Email" />
        <input name="phone" className="border rounded-lg p-2 text-black" placeholder="Phone" />
        <input name="notes" className="border rounded-lg p-2 text-black" placeholder="Notes" />
        <button type="submit" disabled={creating} className="bg-blue-600 text-white rounded-lg p-2 disabled:opacity-50">
          {creating ? 'Creating…' : 'Create'}
        </button>
      </form>

      {err ? <div className="text-red-400 text-sm">{err}</div> : null}

      {/* Table */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-white/10">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Notes</th>
              <th className="text-left p-3">Created</th>
              <th className="text-left p-3 w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const isEditing = editingId === c.id;
              return (
                <tr key={c.id} className="border-t border-white/10">
                  <td className="p-3">
                    {isEditing
                      ? <input className="border rounded p-1 text-black w-full" defaultValue={c.name}
                          onChange={(e) => setEditDraft((d) => ({ ...d, name: e.target.value }))} />
                      : c.name}
                  </td>
                  <td className="p-3">
                    {isEditing
                      ? <input className="border rounded p-1 text-black w-full" defaultValue={c.email || ''}
                          onChange={(e) => setEditDraft((d) => ({ ...d, email: e.target.value || undefined }))} />
                      : (c.email || '—')}
                  </td>
                  <td className="p-3">
                    {isEditing
                      ? <input className="border rounded p-1 text-black w-full" defaultValue={c.phone || ''}
                          onChange={(e) => setEditDraft((d) => ({ ...d, phone: e.target.value || undefined }))} />
                      : (c.phone || '—')}
                  </td>
                  <td className="p-3">
                    {isEditing
                      ? <input className="border rounded p-1 text-black w-full" defaultValue={c.notes || ''}
                          onChange={(e) => setEditDraft((d) => ({ ...d, notes: e.target.value || undefined }))} />
                      : (c.notes || '—')}
                  </td>
                  <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                  <td className="p-3 space-x-2">
                    {isEditing ? (
                      <>
                        <button onClick={onSaveEdit} className="border rounded px-2 py-1 hover:bg-white/10">Save</button>
                        <button onClick={() => { setEditingId(null); setEditDraft({}); }} className="border rounded px-2 py-1 hover:bg-white/10">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditingId(c.id); setEditDraft({}); }} className="border rounded px-2 py-1 hover:bg-white/10">Edit</button>
                        <button onClick={() => onDelete(c.id)} className="border rounded px-2 py-1 hover:bg-white/10">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
            {!loading && rows.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center text-gray-400">No contacts yet.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-3">
        <button disabled={!canPrev} onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="border rounded-lg px-3 py-2 disabled:opacity-50">Prev</button>
        <div className="text-sm">Page {meta?.page ?? page} / {meta?.pages ?? 1} • {meta?.total ?? 0} total</div>
        <button disabled={!canNext} onClick={() => setPage((p) => (meta ? Math.min(meta.pages, p + 1) : p + 1))}
          className="border rounded-lg px-3 py-2 disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
