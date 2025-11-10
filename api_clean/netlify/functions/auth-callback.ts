import { SignJWT } from 'jose';

const COOKIE_NAME = process.env.COOKIE_NAME ?? 'bb_jwt';

function getKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET missing');
  return new TextEncoder().encode(secret);
}

export default async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': process.env.CORS_ORIGIN ?? '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'content-type, authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const { email } = await req.json().catch(() => ({}));
  if (!email) return Response.json({ error: 'email required' }, { status: 400 });

  const jwt = await new SignJWT({ sub: email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getKey());

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN ?? '*',
  });

  headers.append(
    'Set-Cookie',
    `${COOKIE_NAME}=${jwt}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure`
  );

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
