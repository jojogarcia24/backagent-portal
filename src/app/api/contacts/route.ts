import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/contacts  -> list contacts (newest first)
export async function GET() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return NextResponse.json({ contacts }, { status: 200 });
}

// POST /api/contacts  -> create a contact
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, notes } = body || {};
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }
    const contact = await prisma.contact.create({
      data: { name, email, phone, notes },
    });
    return NextResponse.json({ contact }, { status: 201 });
  } catch (e) {
    console.error('POST /api/contacts error', e);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
