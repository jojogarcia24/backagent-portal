import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type SearchProps = {
  userEmail: string | null;
};

const pageCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 20,
  boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#0f172a",
  margin: 0,
};

const sectionSubStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
};

const pillLabelStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  padding: "4px 10px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: "uppercase",
};

const snapshotButtonStyle: React.CSSProperties = {
  borderRadius: 14,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  padding: "6px 12px 8px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  textAlign: "center",
  whiteSpace: "nowrap",
  boxShadow: "0 8px 18px rgba(15,23,42,0.2)",
  minWidth: 92,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  rowGap: 4,
};

const snapshotWrapperStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  right: 12,
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function TransactionSearch({ userEmail }: SearchProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  return (
    <AppShell userEmail={userEmail} activeTab="Transact">
      {/* Hero */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 14,
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 4,
          }}
        >
          Transact / Search
        </div>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Transaction Search
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#d1d5db",
            marginTop: 6,
            maxWidth: 780,
          }}
        >
          Browse all of your Elite Living transactions. Use filters to narrow
          down by status, phase, or review state. Later, Nova will remember
          your favorite views and surface deals that need attention first,{" "}
          {name}.
        </p>
      </div>

      {/* Main layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(680px, 2.8fr) minmax(260px, 1fr)",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT – Results list */}
        <section style={pageCardStyle}>
          {/* Search input row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <input
              placeholder="Street address, contact name, or reference number."
              style={{
                flex: 1,
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                padding: "10px 18px",
                fontSize: 14,
              }}
            />
            <button
              type="button"
              style={{
                borderRadius: 999,
                border: "none",
                padding: "10px 20px",
                background: "#111827",
                color: "#f9fafb",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Search
            </button>
            <a
              href="/transact/add"
              style={{
                borderRadius: 999,
                border: "1px solid #d1d5db",
                padding: "10px 16px",
                background: "#ffffff",
                fontSize: 20,
                cursor: "pointer",
                textDecoration: "none",
                color: "#111827",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              +
            </a>
          </div>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              color: "#6b7280",
              marginBottom: 10,
            }}
          >
            <span>198 matches · Showing 1–12</span>
            <span>Page 1 of 17 ▾</span>
          </div>

          {/* Result rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                address: "122 Sandy Oaks St, San Antonio, TX",
                contact: "Brendon Cornell",
                statusLabel: "Authorized CDA",
                statusColor: "#16a34a",
                closing: "Fri, Nov 14, 2025",
              },
              {
                address: "5220 Dillon Circle, Haltom City, TX",
                contact: "Irma Magaña",
                statusLabel: "Active",
                statusColor: "#f97316",
                closing: "Mon, Nov 17, 2025",
              },
              {
                address: "2722 Andrea Lane, Dallas, TX",
                contact: "Hilario Navarro Martinez",
                statusLabel: "Authorized CDA",
                statusColor: "#16a34a",
                closing: "Thu, Nov 13, 2025",
              },
            ].map((deal, idx) => (
              <div
                key={deal.address}
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns:
                    "130px minmax(240px, 1.4fr) minmax(230px, 1.2fr)",
                  gap: 18,
                  alignItems: "center",
                  borderRadius: 22,
                  padding: "14px 32px 14px 14px",
                  background:
                    idx === 0
                      ? "linear-gradient(90deg,#e0ecff,#f9fafb)"
                      : "#f9fafb",
                }}
              >
                {/* Badge card */}
                <div
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg,#0f172a,#111827 40%,#1f2937)",
                    color: "#e5e7eb",
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: 72,
                  }}
                >
                  <div
                    style={{
                      ...pillLabelStyle,
                      background: "#22c55e",
                      color: "#022c22",
                      alignSelf: "flex-start",
                      borderRadius: 999,
                      padding: "2px 8px",
                      fontSize: 11,
                    }}
                  >
                    BUYER
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#9ca3af",
                      marginTop: 6,
                    }}
                  >
                    A2-25-0{260 + idx}
                  </div>
                </div>

                {/* Center info */}
                <div>
                  <a
                    href="#"
                    style={{
                      display: "inline-block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1d4ed8",
                      textDecoration: "none",
                      marginBottom: 4,
                    }}
                  >
                    {deal.address}
                  </a>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#4b5563",
                      marginBottom: 2,
                    }}
                  >
                    {deal.contact}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    Closing: {deal.closing}
                  </div>
                </div>

                {/* Status / dots */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 4,
                    fontSize: 12,
                    color: "#4b5563",
                  }}
                >
                  <div>Updated: 11/14/25 · 1:53 PM</div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      color: deal.statusColor,
                    }}
                  >
                    {deal.statusLabel}
                  </div>
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "999px",
                          background:
                            i < 3 ? deal.statusColor : "rgba(209,213,219,0.9)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Snapshot floating square button */}
                <div style={snapshotWrapperStyle}>
                  <a
                    href="/transact/snapshot"
                    style={{ textDecoration: "none" }}  // ABSOLUTE PATH
                  >
                    <button type="button" style={snapshotButtonStyle}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#1d4ed8",
                        }}
                      >
                        Snapshot
                      </span>
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 4,
                          border: "1px solid #c7d2fe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          color: "#1d4ed8",
                          background: "#eef2ff",
                        }}
                      >
                        ▦
                      </div>
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT – Views + Filters */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Search views */}
          <section style={pageCardStyle}>
            <h2 style={sectionTitleStyle}>Search Views</h2>
            <p style={{ ...sectionSubStyle, marginTop: 8 }}>
              Save and reuse your favorite filters. In a later phase, you&apos;ll
              be able to pin views like &quot;Active Listings&quot; or &quot;Closings
              this Month&quot; here.
            </p>
            <div
              style={{
                marginTop: 16,
                fontSize: 13,
                color: "#9ca3af",
                padding: 10,
                borderRadius: 16,
                background: "#f3f4f6",
                textAlign: "center",
              }}
            >
              No saved search views yet.
            </div>
          </section>

          {/* Filters */}
          <section style={pageCardStyle}>
            <h2 style={sectionTitleStyle}>Search Filters</h2>
            <p style={{ ...sectionSubStyle, marginTop: 8 }}>
              Tune which deals you see.
            </p>

            <button
              type="button"
              style={{
                width: "100%",
                marginTop: 14,
                marginBottom: 14,
                borderRadius: 999,
                border: "none",
                padding: "10px 16px",
                background: "#111827",
                color: "#f9fafb",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Update search results
            </button>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 13,
                color: "#374151",
              }}
            >
              {[
                "View",
                "Status",
                "Category",
                "Party",
                "Phase",
                "Review State",
              ].map((label) => (
                <div key={label}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                      marginBottom: 2,
                    }}
                  >
                    {label.toUpperCase()}
                  </div>
                  <div
                    style={{
                      borderRadius: 999,
                      border: "1px solid #e5e7eb",
                      padding: "8px 12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#ffffff",
                    }}
                  >
                    <span>Any {label.toLowerCase()}</span>
                    <span
                      style={{
                        fontSize: 16,
                        color: "#9ca3af",
                      }}
                    >
                      ▾
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

export default TransactionSearch;

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userEmail: session.user?.email ?? null,
    },
  };
};
