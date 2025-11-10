import { serialize } from 'cookie';

// Dynamic import keeps Netlify bundle happy
const getJose = async () => await import('jose');

function getSiteOrigin(req: Request) {
  // Your deployed site origin (same as the address you load in the browser)
  return 'https://back-boss-ai-office.netlify.app';
}

function corsHeaders(origin: string, allowCreds = true) {
  const h: Record<string, string> = {
    'Vary': 'Origin',
    'Access-Control-Allow-Origin': origin, // must be exact, not *
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (allowCreds) h['Access-Control-Allow-Credentials'] = 'true';
  return h;
}

async function makeJwt(email: string) {
  const { SignJWT } = await getJose();
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  return await new SignJWT({ sub: email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);
}

export default async (req: Request) => {
  const origin = req.headers.get('origin') || '';
  const siteOrigin = getSiteOrigin(req);

  // OPTIONS preflight (without this, browsers will show 404 → your error)
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(origin || siteOrigin),
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Parse body (email or token—adjust as needed)
  let email = 'user';
  try {
    const body = await req.json();
    email = body?.email || body?.user?.email || 'user';
  } catch {}

  // Create JWT (if you already had logic, this replaces it with a standard HS256)
  const jwt = await makeJwt(email);

  // Same-site vs cross-site
  const isSameOrigin = (() => {
    try {
      return new URL(origin).host === new URL(siteOrigin).host;
    } catch { return true; }
  })();

  const setCookie = serialize(process.env.COOKIE_NAME || 'bb_jwt', jwt, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: isSameOrigin ? 'lax' : 'none',
    // Do NOT set "domain" unless you absolutely need to; default is correct host.
  });

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Set-Cookie': setCookie,
  };

  // If cross-site, attach precise CORS so browser can accept cookie
  if (!isSameOrigin) Object.assign(headers, corsHeaders(origin || siteOrigin));

  // Important: return 200 (no redirects) so cookie sticks
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers,
  });
};
