import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type, authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function GET() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}

export async function POST() {
  return NextResponse.json({ token: 'dev-token' }, { status: 200 });
}
