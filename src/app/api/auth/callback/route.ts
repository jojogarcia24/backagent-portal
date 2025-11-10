import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
const COOKIE_NAME = process.env.COOKIE_NAME ?? 'bb_jwt';
function key(){const s=process.env.JWT_SECRET; if(!s) throw new Error('JWT_SECRET missing'); return new TextEncoder().encode(s);}
export async function POST(req: NextRequest){
  const { email } = await req.json().catch(()=>({}));
  if(!email) return NextResponse.json({error:'email required'},{status:400});
  const jwt = await new SignJWT({ sub: email }).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(key());
  const res = NextResponse.json({ ok:true });
  res.cookies.set(COOKIE_NAME, jwt, { httpOnly:true, secure:true, sameSite:'lax', path:'/', maxAge:60*60*24*7 });
  return res;
}
