import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { ContactUpdate } from '@/lib/validation';
import { withCors, corsPreflight } from '@/lib/cors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function OPTIONS(req: NextRequest) {
  return corsPreflight(req);
}

// GET /api/contacts/:id
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) return withCors(NextResponse.json({ error: 'not_found' }, { status: 404 }));
  return withCors(NextResponse.json(contact, { status: 200 }));
}

// PATCH /api/contacts/:id
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth(req);
  if (!user) return withCors(NextResponse.json({ error: 'unauthorized' }, { status: 401 }));

  const { id } = await params;
  const payload = await req.json();
  const parsed = ContactUpdate.safeParse(payload);
  if (!parsed.success) {
    return withCors(NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 }));
  }

  try {
    const updated = await prisma.contact.update({ where: { id }, data: parsed.data });
    return withCors(NextResponse.json(updated, { status: 200 }));
  } catch {
    return withCors(NextResponse.json({ error: 'not_found' }, { status: 404 }));
  }
}

// DELETE /api/contacts/:id
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth(req);
  if (!user) return withCors(NextResponse.json({ error: 'unauthorized' }, { status: 401 }));

  const { id } = await params;
  try {
    await prisma.contact.delete({ where: { id } });
    return withCors(NextResponse.json({ ok: true }, { status: 204 }));
  } catch {
    return withCors(NextResponse.json({ error: 'not_found' }, { status: 404 }));
  }
}
