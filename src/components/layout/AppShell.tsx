import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

type CoreTab = "Start" | "Connect" | "Transact" | "Promote" | "Learn";

type AppShellProps = {
  children: ReactNode;
  userEmail: string | null;
  activeTab?: CoreTab;
};

type QuickLink = {
  label: string;
  url: string;
};

const QUICK_LINKS: QuickLink[] = [
  {
    label: "Showing Time",
    url: "https://showingtime.com/solutions/showings-and-offers/showingtime/login",
  },
  {
    label: "National Assoc of REALTORS®",
    url: "https://realtors.auth0.com/login?state=hKFo2SBIREVSSUNCRGJiS256X2xFRmt4T1pROVQ1ZThrQ3BneaFupWxvZ2luo3RpZNkgSUQ4ZlF1U05JVzEySnVLdEV2VFNhWWRJcWxnUmdZcUSjY2lk2SBXazZkN1gwdEswVTNIdjNLOEczM2hNTHFQMlFZbk9uaQ&client=Wk6d7X0tK0U3Hv3K8G33hMLqP2QYnOni&protocol=oauth2&scope=openid%20profile%20email&response_type=code&redirect_uri=https%3A%2F%2Fwww.nar.realtor%2Fapi%2Fauth%2Fcallback&nonce=Xn8uKrWyFriJPaMWhElAA_Gcxnb7JjFxn-5KtT2tXUY&code_challenge_method=S256&code_challenge=cw1bBg8UnKzhAPhA-3IZozH9-G64xF5tWtCGguvtZC8#!/",
  },
  {
    label: "SupraWEB",
    url: "https://prdadfs.suprakim.com/adfs/ls/?wa=wsignin1.0&wtrealm=https://supraweb.suprakim.com/kimweb/Login.mvc/&WHR=http://prdadfs.suprakim.com/adfs/services/trust",
  },
  {
    label: "Elite Living Connect",
    url: "https://secure.elitelivingconnect.com/i/customsite",
  },
  {
    label: "Dotloop Signin",
    url: "https://login.zillow-workspace.com/u/login/identifier?state=hKFo2SByRzhnMm1IOUhHd1FXUFNwRTY3dXc5cVRTZnNfTGE4TaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIERBUEhjSlRtS0o0VkZrc0VqRVFrdVBMcmUwLXhwTDRso2NpZNkgQzBva1VPcEVzMG43cUVmNHlFa21yVDdkRVpQbmV6Vnc",
  },
  {
    label: "EBlast Service",
    url: "https://secure.elitelivingconnect.com/i/eblast",
  },
  {
    label: "Office Phone Duty Request",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSf4yGf9W-rUzBfHYLWvUsmZvB0qRYiMkp0ARHZCAicfc-XbwQ/viewform",
  },
  {
    label: "Sign Check Out",
    url: "https://signinstall.elitelivingrealty.com/",
  },
  {
    label: "Swag Store",
    url: "https://www.elitelivingrealtyagents.com/",
  },
];

export default function AppShell({
  children,
  userEmail,
  activeTab = "Start",
}: AppShellProps) {
  const displayName =
    userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [nowText, setNowText] = useState("");

  useEffect(() => {
    const updateNow = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
      setNowText(formatted);
    };

    updateNow();
    const id = setInterval(updateNow, 60000);
    return () => clearInterval(id);
  }, []);

  const mainNavItems: {
    label: string;
    href: string;
    external?: boolean;
  }[] = [
    { label: "Start", href: "/dashboard" },
    { label: "Connect", href: "/connect" },
    { label: "Transact", href: "/transact" },
    { label: "Promote", href: "/promote" },
    {
      label: "Back Boss CRM",
      href: "https://login.backbossai.com/",
      external: true,
    },
    {
      label: "Lending",
      href: "https://www.elitelivingrealty.com/lending",
      external: true,
    },
    { label: "Learn", href: "/learn" },
  ];

  const coreTabs: CoreTab[] = [
    "Start",
    "Connect",
    "Transact",
    "Promote",
    "Learn",
  ];

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
          background: "#000000",
          color: "#f9fafb",
          padding: "10px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 0 rgba(15,23,42,0.9)",
          position: "relative",
          zIndex: 30,
        }}
      >
        {/* Left: logo + quick menu hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={() => {
              setIsQuickMenuOpen((prev) => !prev);
              setIsProfileMenuOpen(false);
            }}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
            aria-label="Open quick menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 22,
                  height: 2,
                  borderRadius: 999,
                  background: "#f9fafb",
                }}
              />
            ))}
          </button>

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
            fontSize: 22,
          }}
        >
          {mainNavItems.map((item) => {
            const isCore = coreTabs.includes(item.label as CoreTab);
            const isActive = isCore && item.label === activeTab;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                style={{
                  cursor: "pointer",
                  fontWeight: isActive ? 700 : 400,
                  borderBottom: isActive
                    ? "2px solid #ffffff"
                    : "2px solid transparent",
                  paddingBottom: 4,
                  textDecoration: "none",
                  color: "#f9fafb",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: user info + profile dropdown trigger */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 20,
            marginLeft: 40,
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
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
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

            {/* Profile menu trigger – circular menu icon */}
            <button
              type="button"
              onClick={() => {
                setIsProfileMenuOpen((prev) => !prev);
                setIsQuickMenuOpen(false);
              }}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label="Open profile menu"
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "999px",
                  background:
                    "radial-gradient(circle at 30% 0%, #38bdf8, #1d4ed8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 1px rgba(148,163,184,0.7)",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    lineHeight: 1,
                    color: "#f9fafb",
                  }}
                >
                  ⋮
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Quick Menu dropdown (left) */}
      {isQuickMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 72,
            left: 24,
            width: 280,
            borderRadius: 20,
            background: "rgba(15,23,42,0.98)",
            boxShadow: "0 18px 50px rgba(15,23,42,0.9)",
            padding: 16,
            color: "#e5e7eb",
            zIndex: 40,
          }}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1.4,
              color: "#9ca3af",
              marginBottom: 6,
            }}
          >
            Quick menu
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#e5e7eb",
              marginBottom: 10,
            }}
          >
            Today:{" "}
            <span style={{ color: "#bfdbfe", fontWeight: 500 }}>
              {nowText}
            </span>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(148,163,184,0.6)",
              paddingTop: 10,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <a
              href="/connect/documents"
              style={{
                borderRadius: 999,
                padding: "8px 12px",
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(148,163,184,0.7)",
                fontSize: 13,
                color: "#e5e7eb",
                textDecoration: "none",
              }}
            >
              📂 Shared Docs
            </a>
            <a
              href="/connect/tasks"
              style={{
                borderRadius: 999,
                padding: "8px 12px",
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(148,163,184,0.7)",
                fontSize: 13,
                color: "#e5e7eb",
                textDecoration: "none",
              }}
            >
              ✅ Tasks
            </a>
            <button
              type="button"
              onClick={() => {
                setIsQuickLinksOpen(true);
                setIsQuickMenuOpen(false);
              }}
              style={{
                borderRadius: 999,
                padding: "8px 12px",
                background: "#f9fafb",
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                color: "#111827",
                cursor: "pointer",
                marginTop: 4,
              }}
            >
              🔗 Quick Links
            </button>
          </div>
        </div>
      )}

      {/* Profile dropdown (right) */}
      {isProfileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 72,
            right: 32,
            width: 280,
            borderRadius: 20,
            background: "#000000",
            boxShadow: "0 18px 50px rgba(0,0,0,0.95)",
            padding: 14,
            color: "#f9fafb",
            zIndex: 45,
          }}
        >
          {/* Header */}
          <div
            style={{
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: "1px solid rgba(55,65,81,0.7)",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#f97316",
                marginBottom: 6,
              }}
            >
              View Profile
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#9ca3af",
              }}
            >
              {userEmail ?? "Signed in"}
            </div>
          </div>

          {/* Top links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginBottom: 10,
            }}
          >
            {["Account", "Settings", "Reports"].map((label) => (
              <button
                key={label}
                type="button"
                style={{
                  textAlign: "left",
                  borderRadius: 6,
                  padding: "6px 2px",
                  border: "none",
                  background: "transparent",
                  fontSize: 13,
                  color: "#93c5fd",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(55,65,81,0.7)",
              margin: "4px 0 8px",
            }}
          />

          {/* Bottom links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <a
              href="/control-panel"
              onClick={() => setIsProfileMenuOpen(false)}
              style={{
                textDecoration: "none",
                borderRadius: 6,
                padding: "6px 2px",
                fontSize: 13,
                color: "#bfdbfe",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <span>Control Panel</span>
              <span style={{ fontSize: 12 }}>🛡</span>
            </a>

            <button
              type="button"
              style={{
                textAlign: "left",
                borderRadius: 6,
                padding: "6px 2px",
                border: "none",
                background: "transparent",
                fontSize: 13,
                color: "#bfdbfe",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <span>Integrations</span>
              <span style={{ fontSize: 12 }}>🛡</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsProfileMenuOpen(false);
                signOut();
              }}
              style={{
                textAlign: "left",
                borderRadius: 6,
                padding: "6px 2px",
                border: "none",
                background: "transparent",
                fontSize: 13,
                color: "#fca5a5",
                cursor: "pointer",
                marginTop: 4,
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Quick Links modal */}
      {isQuickLinksOpen && (
        <div
          onClick={() => setIsQuickLinksOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15,23,42,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(960px, 96%)",
              maxHeight: "80vh",
              overflowY: "auto",
              background: "#000000",
              borderRadius: 26,
              padding: 24,
              boxShadow: "0 24px 70px rgba(0,0,0,0.95)",
              color: "#f9fafb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#f9fafb",
                  }}
                >
                  Quick Links
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#e5e7eb",
                    marginTop: 2,
                  }}
                >
                  Jump straight to your most-used tools.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickLinksOpen(false)}
                style={{
                  borderRadius: 999,
                  border: "1px solid #4b5563",
                  background: "transparent",
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  fontSize: 18,
                  lineHeight: 1,
                  color: "#e5e7eb",
                }}
                aria-label="Close quick links"
              >
                ×
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 8,
              }}
            >
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: "1 1 260px",
                    padding: "14px 18px",
                    borderRadius: 16,
                    border: "1px solid #334155",
                    background: "#020617",
                    textDecoration: "none",
                    fontSize: 14,
                    color: "#f9fafb",
                    boxShadow: "0 10px 24px rgba(15,23,42,0.7)",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

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
