// src/lib/api.ts
export async function createContact(data: {
  name: string; email?: string; phone?: string; notes?: string;
}) {
  const res = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Create failed: ${res.status}`);
  return res.json();
}

export async function listContacts() {
  const res = await fetch('/api/contacts');
  if (!res.ok) throw new Error(`List failed: ${res.status}`);
  return res.json();
}
