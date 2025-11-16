import { ReactNode } from "react";
import Link from "next/link";

type TabLabel = "Start" | "Connect" | "Transact" | "Promote" | "Learn";

type AppShellProps = {
  children: ReactNode;
  userEmail?: string | null;
  activeTab?: TabLabel;
};

export default function AppShell({ children, userEmail, activeTab }: AppShellProps) {
  const name = userEmail?.split("@")[0] ?? "Agent";
  const currentTab: TabLabel = activeTab ?? "Start";

  const tabs: { label: TabLabel; href: string }[] = [
    { label: "Start", label: "Start", href: "/dashboard" },
    { label: "Connect", href: "/connect" },
    { label: "Transact", href: "/transact" },
    { label: "Promote", href: "/promote" },
    { label: "Learn", href: "/learn" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#e5e7eb",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 24px",
          borderBottom: "1px solid #1f2937",
          background: "#000000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                height: 32,
                width: 32,
                borderRadius: 4,
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#000000",
              }}
            >
              EL
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#d1d5db",
              }}
            >
              Elite Living
            </span>
          </div>

          {/* Top nav */}
          <nav
            style={{
              display: "flex",
              gap: 24,
              fontSize: 12,
              fontWeight: 500,
              color: "#9ca3af",
            }}
          >
            {tabs.map((tab) => {
              const isActive = tab.label === currentTab;
              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  style={{
                    position: "relative",
                    padding: 0,
                    paddingBottom: 4,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: isActive ? "#ffffff" : "#9ca3af",
                    textDecoration: "none",
                  }}
                >
                  {tab.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 2,
                        borderRadius: 999,
                        background: "#ffffff",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              textAlign: "right",
              fontSize: 11,
              lineHeight: 1.2,
              display: "block",
            }}
          >
            <div style={{ fontWeight: 500, color: "#f9fafb" }}>{name}</div>
            <div style={{ fontSize: 10, color: "#9ca3af" }}>
              Elite Living Realty
            </div>
          </div>
          <div
            style={{
              height: 32,
              width: 32,
              borderRadius: "999px",
              background: "#111827",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {name.charAt(0)}
          </div>
          <Link
            href="/api/auth/signout"
            style={{
              borderRadius: 999,
              border: "1px solid #374151",
              padding: "4px 12px",
              fontSize: 11,
              color: "#e5e7eb",
              textDecoration: "none",
            }}
          >
            Log out
          </Link>
        </div>
      </header>

      {/* Main shell */}
      <main
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 11,
            color: "#9ca3af",
          }}
        >
          <div>
            <span style={{ fontWeight: 500, color: "#e5e7eb" }}>
              {currentTab}
            </span>
            <span style={{ margin: "0 4px", color: "#4b5563" }}>/</span>
            <span>Back Boss portal</span>
          </div>
          {userEmail && (
            <span
              style={{
                borderRadius: 999,
                border: "1px solid #1f2937",
                background: "#020617",
                padding: "4px 10px",
              }}
            >
              Signed in as{" "}
              <span style={{ color: "#e5e7eb", fontWeight: 500 }}>
                {userEmail}
              </span>
            </span>
          )}
        </div>

        <section
          style={{
            borderRadius: 20,
            border: "1px solid #1f2937",
            background: "#020617",
            padding: 20,
            boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
          }}
        >
          {children}
        </section>
      </main>
    </div>
  );
}
