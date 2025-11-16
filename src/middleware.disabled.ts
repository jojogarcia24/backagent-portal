import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
const MODE = process.env.NEXT_PUBLIC_AUTH_MODE ?? 'token';
const COOKIE = process.env.COOKIE_NAME ?? 'bb_jwt';
export async function middleware(req: NextRequest){
  if(MODE !== 'cookie') return NextResponse.next();
  const t = req.cookies.get(COOKIE)?.value;
  if(!t) return NextResponse.redirect(new URL('/login', req.url));
  try { await jwtVerify(t, new TextEncoder().encode(process.env.JWT_SECRET)); return NextResponse.next(); }
  catch { const r=NextResponse.redirect(new URL('/login', req.url)); r.cookies.delete(COOKIE); return r; }
}
export const config = { matcher: ['/transact/:path*'] };
