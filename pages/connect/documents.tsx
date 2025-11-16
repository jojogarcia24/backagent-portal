import React from "react";
import AppShell from "@/components/layout/AppShell";

const ConnectDocumentsPage: React.FC = () => {
  const folders = [
    { name: "Apartment Locating", count: 3 },
    { name: "Back Agent Training", count: 2 },
    { name: "Broker Policy & Procedures Manual", count: 4 },
    { name: "Commercial Real Estate", count: 4 },
    { name: "Deal Tracker + Goal Setting Sheet", count: 2 },
    { name: "DotLoop", count: 1 },
    { name: "Hoss Pratt Training Information", count: 145 },
    { name: "Investor Folder", count: 2 },
    { name: "Learning Resources", count: 58 },
    { name: "Marketing / Social Media", count: 100 },
    { name: "My Utilities Concierge Service", count: 1 },
    { name: "Partner & Vendor List", count: 3 },
    { name: "Privacy Policy", count: 1 },
    { name: "Quick Resources", count: 11 },
    { name: "Realtor Showing Safety Tips", count: 1 },
    { name: "Residential Real Estate", count: 59 },
    { name: "Revenue Share", count: 0 },
  ];

  const totalItems = folders.reduce((sum, f) => sum + f.count, 0);

  return (
    <AppShell activeTab="Connect">
      <main
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "32px 16px 48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header over background image */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#ffffff",
              }}
            >
              Connect / Shared Docs
            </p>
            <h1
              style={{
                marginTop: 8,
                fontSize: 32,
                fontWeight: 600,
                color: "#ffffff",
              }}
            >
              Shared Docs
            </h1>
            <p
              style={{
                marginTop: 8,
                maxWidth: 600,
                fontSize: 14,
                lineHeight: 1.5,
                color: "#ffffff",
              }}
            >
              Central hub for every resource, policy, template, and training doc
              your agents need to plug into Elite Living Realty.
            </p>
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: 12,
              color: "#ffffff",
              alignSelf: "flex-end",
            }}
          >
            <div style={{ fontWeight: 600 }}>Back Boss AI · Connect</div>
            <div>Document library overview</div>
          </div>
        </div>

        {/* White panel */}
        <section
          style={{
            borderRadius: 20,
            background: "rgba(255,255,255,0.97)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
            border: "1px solid rgba(15,23,42,0.25)",
            overflow: "hidden",
          }}
        >
          {/* Top controls */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                Show:
              </span>
              <div
                style={{
                  display: "inline-flex",
                  background: "#000000",
                  borderRadius: 999,
                  padding: 2,
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                <button
                  type="button"
                  style={{
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "#ffffff",
                    color: "#000000",
                    cursor: "pointer",
                  }}
                >
                  This Level
                </button>
                <button
                  type="button"
                  style={{
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "transparent",
                    color: "#f9fafb",
                    cursor: "pointer",
                  }}
                >
                  This Level &amp; Below
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flex: "1 1 260px",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
                <input
                  type="text"
                  placeholder="Search documents by section name, title, blurb, etc"
                  style={{
                    width: "100%",
                    borderRadius: 999,
                    border: "1px solid #d1d5db",
                    padding: "8px 32px 8px 12px",
                    fontSize: 12,
                    color: "#111827",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 11,
                    color: "#9ca3af",
                  }}
                >
                  ⌕
                </span>
              </div>
            </div>
          </div>

          {/* Documents header row */}
          <div
            style={{
              padding: "14px 24px",
              borderBottom: "1px solid #e5e7eb",
              background: "#000000",
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#f9fafb",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#111827",
                fontSize: 22,
              }}
            >
              📁
            </span>
            <span>Documents</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: "#e5e7eb",
                marginLeft: 4,
              }}
            >
              ({totalItems})
            </span>
          </div>

          {/* Folder rows */}
          <div style={{ background: "#f3f4f6" }}>
            {folders.map((folder, index) => (
              <div
                key={folder.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 28px",
                  borderBottom:
                    index === folders.length - 1
                      ? "none"
                      : "1px solid #e5e7eb",
                  background: "rgba(255,255,255,0.98)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "#ffffff",
                      border: "1px solid #e5e7eb",
                      fontSize: 32,
                      marginRight: 24,
                      color: "#000000",
                    }}
                  >
                    📂
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: 4,
                      }}
                    >
                      {folder.name}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "#6b7280",
                      }}
                    >
                      {folder.count} item{folder.count === 1 ? "" : "s"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#000000",
                    cursor: "pointer",
                  }}
                >
                  View Section »
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
};

export default ConnectDocumentsPage;
