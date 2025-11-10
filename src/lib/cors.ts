import { NextResponse, NextRequest } from 'next/server';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function withCors<T extends NextResponse>(res: T): T {
  for (const [k, v] of Object.entries(CORS)) res.headers.set(k, v);
  return res;
}

export function corsPreflight(_req?: NextRequest) {
  return withCors(new NextResponse(null, { status: 204 }));
}
