import { NextResponse } from 'next/server';
const COOKIE_NAME = process.env.COOKIE_NAME ?? 'bb_jwt';
export async function POST(){ const r=NextResponse.json({ok:true}); r.cookies.set(COOKIE_NAME,'',{httpOnly:true,path:'/',maxAge:0}); return r; }
