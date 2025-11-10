#!/usr/bin/env bash
set -euo pipefail

SITE="https://back-boss-ai-office.netlify.app"

echo "== Basic env =="; pwd; node -v; echo

echo "== Netlify link =="; netlify status || true; echo

echo "== Netlify envs ==";
netlify env:list | sed -n '1,200p' | grep -E 'JWT_SECRET|DATABASE_URL|NEXT_PUBLIC_API_BASE|COOKIE_NAME|NEXT_PUBLIC_AUTH_MODE' || true
echo

echo "== .env.local ==";
grep -E '^(DATABASE_URL|JWT_SECRET|NEXT_PUBLIC_)' .env.local || echo "(no matching lines in .env.local)"
echo

echo "== Files exist ==";
for f in \
  api_clean/netlify/functions/auth-callback.ts \
  src/app/login/page.tsx \
  src/app/transact/page.tsx \
  src/components/ProtectedShell.tsx \
  'src/app/(app)/layout.tsx' \
  'src/app/(app)/dashboard/page.tsx' \
  'src/app/(app)/contacts/page.tsx' \
  'src/app/(app)/deals/page.tsx' \
  'src/app/(app)/settings/page.tsx' \
  src/middleware.ts \
  prisma/schema.prisma
do
  [[ -f "$f" ]] && echo "OK  - $f" || echo "MISS- $f"
done
echo

echo "== Auth endpoints (preflight should be 204) ==";
curl -s -i -X OPTIONS "$SITE/.netlify/functions/auth-callback" \
  -H "Origin: $SITE" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" | head -n 1
echo

echo "== Auth POST (200 + Set-Cookie) ==";
curl -s -i -X POST "$SITE/.netlify/functions/auth-callback" \
  -H "Origin: $SITE" \
  -H "Content-Type: application/json" \
  --data '{"email":"health@test.com"}' | head -n 12
echo

echo "== /api/me ==";
curl -s -i "$SITE/api/me" | head -n 8
echo

echo "== Prisma can reach DB (db pull) ==";
npx prisma db pull --print | head -n 3 || echo "(db pull failed)"
echo "✅ Health check completed."
