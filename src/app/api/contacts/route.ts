import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { ContactCreate } from '@/lib/validation';
import { withCors, corsPreflight } from '@/lib/cors';
import type { Prisma } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function OPTIONS(req: NextRequest) {
  return corsPreflight(req);
}

// GET /api/contacts?page=1&pageSize=20&q=smith
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get('page') || 1));
  const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get('pageSize') || 20)));
  const q = (url.searchParams.get('q') || '').trim();

  // Explicitly type to satisfy Prisma's ContactWhereInput
  const where: Prisma.ContactWhereInput =
    q.length > 0
      ? {
          OR: [
            { name:  { contains: q, mode: 'insensitive' as const } },
            { email: { contains: q, mode: 'insensitive' as const } },
            { phone: { contains: q, mode: 'insensitive' as const } },
            { notes: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {};

  const [total, contacts] = await Promise.all([
    prisma.contact.count({ where }),
    prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return withCors(
    NextResponse.json(
      { data: contacts, meta: { page, pageSize, total, pages: Math.ceil(total / pageSize) } },
      { status: 200 }
    )
  );
}

// POST /api/contacts (auth required)
export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  if (!user) return withCors(NextResponse.json({ error: 'unauthorized' }, { status: 401 }));

  try {
    const payload = await req.json();
    const parsed = ContactCreate.safeParse(payload);
    if (!parsed.success) {
      return withCors(NextResponse.json({ error: 'validation_failed', issues: parsed.error.flatten() }, { status: 400 }));
    }

    const contact = await prisma.contact.create({ data: parsed.data });
    return withCors(NextResponse.json(contact, { status: 201 }));
  } catch (err: any) {
    if (err?.code === 'P2002' && Array.isArray(err?.meta?.target) && err.meta.target.includes('email')) {
      return withCors(NextResponse.json({ error: 'email_exists' }, { status: 409 }));
    }
    console.error('POST /api/contacts error:', err);
    return withCors(NextResponse.json({ error: 'server_error' }, { status: 500 }));
  }
}
