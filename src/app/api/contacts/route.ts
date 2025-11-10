import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return NextResponse.json(contacts, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, notes } = await req.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'name_required' }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: { name, email, phone, notes },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (err) {
    console.error('POST /api/contacts error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
