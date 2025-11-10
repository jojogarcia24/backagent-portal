import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { ContactUpdate } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/contacts/:id
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const contact = await prisma.contact.findUnique({ where: { id: params.id } });
  if (!contact) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json(contact, { status: 200 });
}

// PATCH /api/contacts/:id
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const payload = await req.json();
  const parsed = ContactUpdate.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const updated = await prisma.contact.update({ where: { id: params.id }, data: parsed.data });
    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
}

// DELETE /api/contacts/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  try {
    await prisma.contact.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true }, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
}
