const COOKIE_NAME = process.env.COOKIE_NAME ?? 'bb_jwt';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN ?? '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, authorization',
    'Access-Control-Max-Age': '86400',
  } as Record<string, string>;
}

export default async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders() });
  }

  // ✅ ESM-safe: load jose dynamically inside the handler
  const { SignJWT } = await import('jose');

  const { email } = await req.json().catch(() => ({}));
  if (!email) {
    return new Response(JSON.stringify({ error: 'email required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return new Response(JSON.stringify({ error: 'JWT_SECRET missing' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });
  }

  const key = new TextEncoder().encode(secret);
  const jwt = await new SignJWT({ sub: email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...corsHeaders(),
  });
  headers.append(
    'Set-Cookie',
    `${COOKIE_NAME}=${jwt}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure`
  );

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
