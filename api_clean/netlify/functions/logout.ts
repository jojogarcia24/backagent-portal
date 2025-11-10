const COOKIE_NAME = process.env.COOKIE_NAME ?? 'bb_jwt';

export default async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const headers = new Headers({ 'Content-Type': 'application/json' });
  headers.append('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`);

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
