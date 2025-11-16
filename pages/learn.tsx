import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type LearnProps = {
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
  fontSize: 24,
  fontWeight: 600,
  margin: 0,
  color: "#0f172a",
};

const headerSubStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#6b7280",
};

const subtleTextStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#6b7280",
};

const pillButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "none",
  background: "#111827",
  color: "#f9fafb",
  padding: "8px 18px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};

function Learn({ userEmail }: LearnProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <AppShell userEmail={userEmail} activeTab="Learn">
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
          Learn
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Learning Resources & Training
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#d1d5db",
            marginTop: 6,
            maxWidth: 720,
          }}
        >
          Tap into trainings, resources, and REALTOR® news that keep you sharp,
          compliant, and ahead of the market, {name}.
        </p>
      </div>

      {/* Top row: three columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1.1fr 1.2fr",
          gap: 24,
          marginBottom: 24,
        }}
      >
        {/* Learning intro & message */}
        <section style={{ ...cardStyle, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <header style={sectionHeaderStyle}>
            <div>
              <h2 style={headerTitleStyle}>Learning Resources &amp; Training</h2>
            </div>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1.4fr",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                background:
                  "radial-gradient(circle at 0 0, #22c55e, #111827 60%, #1d4ed8)",
                height: 140,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backdropFilter: "blur(2px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#e5e7eb",
                  fontSize: 15,
                  padding: 12,
                  textAlign: "center",
                }}
              >
                Elite Living training snapshots and live events will appear
                here in Back Boss 2.0.
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: 14,
                  color: "#111827",
                  marginTop: 0,
                  lineHeight: 1.6,
                  marginBottom: 10,
                }}
              >
                Online, in-person, over the internet, and in-class are just a
                few ways training is delivered. Explore resources in this
                section or reach out directly to the training team if you don&apos;t
                see what you need.
              </p>
              <p style={subtleTextStyle}>
                Have a question about upcoming classes, CE credit, or training
                support?
              </p>
              <a href="mailto:info@elitelivingrealty.com">
                <button type="button" style={pillButtonStyle}>
                  Send a message to Training
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Training resources links */}
        <section style={{ ...cardStyle, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <header style={sectionHeaderStyle}>
            <div>
              <h2 style={headerTitleStyle}>Training Resources</h2>
              <p style={headerSubStyle}>Jump straight to key destinations.</p>
            </div>
          </header>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: 15,
            }}
          >
            <li style={{ marginBottom: 8 }}>
              <a
                href="/connect/calendar"
                style={{
                  color: "#2563eb",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Training Calendar
              </a>
              <div style={subtleTextStyle}>
                View upcoming classes, masterminds, and events.
              </div>
            </li>

            <li style={{ marginBottom: 8 }}>
              <a
                href="/connect/documents"
                style={{
                  color: "#2563eb",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Learning Resources
              </a>
              <div style={subtleTextStyle}>
                Opens the Learning Resources section inside your shared
                documents.
              </div>
            </li>

            <li style={{ marginBottom: 8 }}>
              <a
                href="/learn/video/youtube"
                style={{
                  color: "#2563eb",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                REALTOR® News
              </a>
              <div style={subtleTextStyle}>
                Watch the latest videos curated from the National Association of
                REALTORS® channel.
              </div>
            </li>

            <li>
              <a
                href="https://secure.elitelivingconnect.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#2563eb",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Elite Living Connect
              </a>
              <div style={subtleTextStyle}>
                Jump into the Elite Living Connect portal for additional
                training, tools, and guides.
              </div>
            </li>
          </ul>
        </section>

        {/* Training events mini calendar */}
        <section style={cardStyle}>
          <header style={sectionHeaderStyle}>
            <div>
              <h2 style={headerTitleStyle}>Training Events</h2>
              <p style={headerSubStyle}>What&apos;s coming up.</p>
            </div>
          </header>

          {/* Mini calendar */}
          <div
            style={{
              borderRadius: 18,
              border: "1px solid #e5e7eb",
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                background: "#f3f4f6",
                padding: "6px 10px",
                fontSize: 12,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              November 2025
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {days.map((d) => (
                <div
                  key={d}
                  style={{
                    padding: "14px 0",
                fontWeight: 600,
                    color: "#6b7280",
                    background: "#f9fafb",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {d}
                </div>
              ))}
              {Array.from({ length: 28 }).map((_, idx) => {
                const day = idx + 1;
                const isToday = day === 20;
                return (
                  <div
                    key={day}
                    style={{
                      padding: "16px 0",
                      borderBottom: "1px solid #e5e7eb",
                      borderRight:
                        (idx + 1) % 7 === 0 ? "none" : "1px solid #e5e7eb",
                      background: isToday ? "#eef2ff" : "#ffffff",
                      color: "#111827",
                      fontWeight: isToday ? 700 : 400,
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              borderRadius: 14,
              background: "#f9fafb",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#111827",
                marginBottom: 4,
              }}
            >
              Next Training Class
            </div>
            <div
              style={{
                ...subtleTextStyle,
                fontSize: 15,
                background: "#e5e7eb",
                borderRadius: 10,
                padding: "10px 12px",
                display: "block",
              }}
            >
              No upcoming event.
            </div>
          </div>

          <div
            style={{
              borderRadius: 14,
              background: "#f9fafb",
              padding: 10,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#111827",
                marginBottom: 4,
              }}
            >
              Upcoming Classes
            </div>
            <div
              style={{
                ...subtleTextStyle,
                fontSize: 15,
                background: "#e5e7eb",
                borderRadius: 10,
                padding: "10px 12px",
                display: "block",
              }}
            >
              No upcoming events.
            </div>
          </div>
        </section>
      </div>

      {/* Training staff row */}
      <section style={{ ...cardStyle, maxWidth: 520, margin: "0 auto" }}>
        <header style={sectionHeaderStyle}>
          <div>
            <h2 style={headerTitleStyle}>Training Staff</h2>
          </div>
        </header>
        <div
          style={{
            borderRadius: 16,
            background: "#f3f4f6",
            padding: 12,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background:
                "linear-gradient(135deg, #111827, #1d4ed8, #22c55e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f9fafb",
              fontSize: 20,
            }}
          >
            🎓
          </div>
          <div>
            <div
              style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}
            >
              Training Staff
            </div>
            <div style={{ fontSize: 15, color: "#6b7280" }}>
              JoJo Garcia – Local Staff
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export default Learn;

export const getServerSideProps: GetServerSideProps<LearnProps> = async (
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
