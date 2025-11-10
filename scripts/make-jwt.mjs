import { SignJWT } from 'jose';

const secret = process.env.JWT_SECRET;
if (!secret) { console.error('JWT_SECRET missing'); process.exit(1); }

const key = new TextEncoder().encode(secret);
const payload = { sub: 'dev-user-1', role: 'admin' };

const token = await new SignJWT(payload)
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setExpirationTime('1h')
  .sign(key);

console.log(token);
