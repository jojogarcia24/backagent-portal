import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function requireAuth(req: Request) {
  const hdr = req.headers.get('authorization') || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : undefined;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { sub?: string; role?: string };
  } catch {
    return null;
  }
}
