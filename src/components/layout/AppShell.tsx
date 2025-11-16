import type { ReactNode } from "react";
import { signOut } from "next-auth/react";

type AppShellProps = {
  children: ReactNode;
  userEmail: string | null;
};

export default function AppShell({ children, userEmail }: AppShellProps) {
  const displayName =
    userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.8)), url('https://secure.elitelivingconnect.com/file/ae6c16d28c5e382a434bd3989cd1eaf2/c0f1c6da-cf06-4b09-aa84-dd724a7b8081/Modern-Luxury-Home-Design-John-Lively-Associates-01-1-Kindesign.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      {/* Top nav */}
      <header
        style={{
          background: "#020617",
          color: "#f9fafb",
          padding: "10px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 0 rgba(15,23,42,0.9)",
        }}
      >
        {/* Left: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="https://secure.elitelivingconnect.com/file/99d90d48c89a9816deebf6f27b7c39f3/a78ceb63-699f-420d-bfd7-d2e1997e1f58/New+Elite+Living+Realty+Logo+White.png"
            alt="Elite Living Realty"
            style={{
              height: 52,
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Center nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            fontSize: 22, // 1.5x bump
          }}
        >
          {["Start", "Connect", "Transact", "Promote", "Learn"].map((item) => (
            <span
              key={item}
              style={{
                cursor: "pointer",
                fontWeight: item === "Start" ? 600 : 400,
                borderBottom:
                  item === "Start"
                    ? "2px solid #ffffff"
                    : "2px solid transparent",
                paddingBottom: 4,
              }}
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Right: user info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20, // header text bigger
          }}
        >
          <div style={{ textAlign: "right", lineHeight: 1.3 }}>
            <div style={{ fontWeight: 500 }}>{displayName}</div>
            <div style={{ fontSize: 16, color: "#9ca3af" }}>
              Elite Living Realty
            </div>
          </div>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "999px",
              overflow: "hidden",
              border: "2px solid #e5e7eb",
              flexShrink: 0,
            }}
          >
            <img
              src="https://secure.elitelivingconnect.com/file/d0494920325e5252450cfaf321aebfe0/4938db92-1629-4b6e-8779-83035f3d90dc/theone.png"
              alt="Agent avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => signOut()}
            style={{
              borderRadius: 999,
              border: "1px solid #4b5563",
              background: "transparent",
              color: "#e5e7eb",
              fontSize: 16,
              padding: "4px 16px",
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main style={{ padding: "24px 32px 40px" }}>
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            background: "transparent",
            borderRadius: 28,
            padding: "24px 28px 32px",
            boxShadow: "none",
            fontSize: 18,
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
