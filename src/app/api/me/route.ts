import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(process.env.COOKIE_NAME || 'bb_jwt');
  return NextResponse.json({ authed: !!cookie, cookieName: cookie?.name || null }, { status: 200 });
}
