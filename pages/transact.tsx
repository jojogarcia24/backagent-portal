import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type TransactProps = {
  userEmail: string | null;
};

const cardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 20,
  boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
};

const sectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
};

const headerTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#0f172a",
  margin: 0,
};

const headerSubStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#6b7280",
};

const subtleTextStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
};

const ghostButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const searchInputStyle: React.CSSProperties = {
  flex: 1,
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  padding: "10px 16px",
  fontSize: 14,
  background: "#ffffff",
};

function Transact({ userEmail }: TransactProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  return (
    <AppShell userEmail={userEmail} activeTab="Transact">
      {/* Hero */}
      <div
        style={{
          marginBottom: 24,
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 4,
          }}
        >
          Transact
        </div>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Transaction Command Center
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#d1d5db",
            marginTop: 6,
            maxWidth: 780,
          }}
        >
          Search, track, and manage every Elite Living transaction in one place.
          Quickly jump into active deals, review filed transactions, and keep
          tasks and documents moving across the finish line, {name}.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* TOP ROW – Transactions full width */}
        <section
          style={{
            ...cardStyle,
            width: "100%",
          }}
        >
          <header style={sectionHeaderStyle}>
            <div>
              <h2 style={headerTitleStyle}>Transactions</h2>
              <p style={headerSubStyle}>
                Search by address, client, MLS, or company.
              </p>
            </div>
            <a href="/transact/add" style={ghostButtonStyle}>
              Add transaction
            </a>
          </header>

          {/* Search row */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 18,
            }}
          >
            <input
              placeholder="Street address, client’s name, phone number, or company."
              style={searchInputStyle}
            />
            <a
              href="/transact/search"
              style={{
                borderRadius: 999,
                border: "none",
                padding: "10px 18px",
                background: "#111827",
                color: "#f9fafb",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Search
            </a>
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

          {/* Managed / stats row + Snapshot button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                fontSize: 15,
                fontWeight: 600,
                color: "#1d4ed8",
              }}
            >
              <a
                href="/transact/search"
                style={{
                  color: "#1d4ed8",
                  textDecoration: "none",
                }}
              >
                Managed Transactions
              </a>
              <span
                style={{
                  fontSize: 13,
                  color: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                ✅ Nova review enabled
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <a href="/transact/search" style={ghostButtonStyle}>
                Snapshot
              </a>
              <div style={{ ...subtleTextStyle, fontSize: 13 }}>
                Snapshot reflects closed + filed deals for the last 24 months.
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1.4fr",
              gap: 32,
            }}
          >
            {/* Active */}
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1d4ed8",
                  marginBottom: 8,
                }}
              >
                <a
                  href="/transact/search"
                  style={{
                    color: "#1d4ed8",
                    textDecoration: "none",
                  }}
                >
                  1 Active Transaction
                </a>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: 15,
                  color: "#111827",
                }}
              >
                <li>1 Residential Sale</li>
                <li>1 Unsubmitted</li>
              </ul>
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 16,
                  background: "#f3f4f6",
                  fontSize: 13,
                  color: "#4b5563",
                }}
              >
                Future Nova feature: click an active transaction to open a
                detailed deal workspace with compliance, tasks, and chat in one
                view.
              </div>
            </div>

            {/* Filed */}
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1d4ed8",
                  marginBottom: 8,
                }}
              >
                <a
                  href="/transact/search"
                  style={{
                    color: "#1d4ed8",
                    textDecoration: "none",
                  }}
                >
                  199 Filed Transactions
                </a>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.2fr",
                  gap: 6,
                  fontSize: 15,
                  color: "#111827",
                }}
              >
                <span>7 Apartment Lease</span>
                <span>2 Commercial Lease</span>
                <span>38 Residential Lease</span>
                <span>1 Commercial Sale</span>
                <span>2 Referred Sale</span>
                <span>149 Residential Sale</span>
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 15,
                }}
              >
                <a
                  href="/transact/search"
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  144 Table Funding
                </a>
                <a
                  href="/transact/search"
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                  }}
                >
                  55 Standard Funding
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECOND ROW – three cards side by side, equal height */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {/* Tasks */}
          <section
            style={{
              ...cardStyle,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Tasks</h2>
                <p style={headerSubStyle}>Deal-related action items.</p>
              </div>
              <a href="/connect/tasks" style={ghostButtonStyle}>
                View all ▸
              </a>
            </header>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                fontSize: 15,
                marginBottom: 10,
              }}
            >
              {[
                {
                  label: "ACTIVE",
                  rows: ["0 active", "0 new", "0 overdue"],
                },
                {
                  label: "UPCOMING",
                  rows: [
                    "0 due today",
                    "0 due this week",
                    "0 due next 30 days",
                  ],
                },
                {
                  label: "HISTORY",
                  rows: [
                    "10 recently received",
                    "12 recently responded",
                    "12 recently completed",
                  ],
                },
              ].map((group) => (
                <div
                  key={group.label}
                  style={{
                    borderRadius: 18,
                    background: "#f3f4f6",
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: 1,
                      color: "#6b7280",
                      marginBottom: 4,
                    }}
                  >
                    {group.label}
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      color: "#111827",
                    }}
                  >
                    {group.rows.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p style={{ ...subtleTextStyle, marginTop: "auto" }}>
              Later, this widget will sync with Nova&apos;s task engine so you
              can auto-create tasks from emails, texts, or compliance rules.
            </p>
          </section>

          {/* Property listings search */}
          <section
            style={{
              ...cardStyle,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Property Listings</h2>
                <p style={headerSubStyle}>
                  Quick MLS lookup for attaching a listing to a deal.
                </p>
              </div>
            </header>

            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <input
                placeholder="MLS number or street address."
                style={searchInputStyle}
              />
              <button
                type="button"
                style={{
                  borderRadius: 999,
                  border: "none",
                  padding: "10px 18px",
                  background: "#111827",
                  color: "#f9fafb",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </div>

            <p style={{ ...subtleTextStyle, marginTop: "auto" }}>
              In Back Boss 2.0 this search will be wired to your IDX/MLS
              connection so you can pull listing details directly into a
              transaction record without retyping.
            </p>
          </section>

          {/* Important Deadlines */}
          <section
            style={{
              ...cardStyle,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Important Deadlines</h2>
                <p style={headerSubStyle}>
                  Key dates in the next 14 days for your transactions.
                </p>
              </div>
            </header>

            <div
              style={{
                borderRadius: 18,
                background: "#f9fafb",
                padding: 10,
                marginBottom: 10,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.4fr",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#111827",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: 6,
                  marginBottom: 6,
                }}
              >
                <span>Date</span>
                <span>Deadline</span>
              </div>

              <div
                style={{
                  fontSize: 14,
                  color: "#9ca3af",
                  paddingTop: 4,
                }}
              >
                No upcoming critical deadlines in the next 14 days.
              </div>
            </div>

            <p style={{ ...subtleTextStyle, fontSize: 13 }}>
              Later, Nova will pull option periods, financing approval dates,
              inspections, and closing dates from your live transaction data and
              surface the ones that need your attention first.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

export default Transact;

export const getServerSideProps: GetServerSideProps<TransactProps> = async (
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
