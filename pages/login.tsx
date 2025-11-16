import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("test@example.com"); // dev default
  const [password, setPassword] = useState("secret123");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      // we don't rely on callbackUrl for redirect, we handle it manually
    });

    setIsLoading(false);

    if (!result) {
      setError("Something went wrong. No response from server.");
      return;
    }

    if (result.error) {
      setError("Invalid email or password.");
      return;
    }

    // ✅ Force redirect on the SAME origin (Codespace), just to /dashboard
    router.push("/dashboard");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020617",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 24,
          borderRadius: 16,
          background: "#020617",
          border: "1px solid #1f2937",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
          Welcome back 👋
        </h1>
        <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 20 }}>
          Log in to access your Back Boss dashboard.
        </p>

        {error && (
          <div
            style={{
              marginBottom: 12,
              borderRadius: 8,
              padding: "8px 10px",
              background: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.4)",
              fontSize: 13,
              color: "#fecaca",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 500,
                marginBottom: 4,
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required
              autoComplete="email"
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #374151",
                background: "#020617",
                color: "white",
                padding: "8px 10px",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 500,
                marginBottom: 4,
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #374151",
                background: "#020617",
                color: "white",
                padding: "8px 10px",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              borderRadius: 999,
              padding: "9px 12px",
              border: "none",
              fontSize: 14,
              fontWeight: 500,
              background: isLoading ? "#38bdf8aa" : "#38bdf8",
              color: "#0b1120",
              cursor: isLoading ? "default" : "pointer",
            }}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
