const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export function setJwt(t: string) {
  if (typeof window !== "undefined") localStorage.setItem("jwt", t);
}
export function getJwt() {
  return typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
}

export async function api(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("Content-Type", "application/json");
  const tok = getJwt();
  if (tok) headers.set("Authorization", `Bearer ${tok}`);
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}
