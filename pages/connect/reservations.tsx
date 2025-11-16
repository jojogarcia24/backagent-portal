import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type ReservationsProps = {
  userEmail: string | null;
};

const cardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
};

const headerRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
};

const headerTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: "#0f172a",
  margin: 0,
};

const headerSubStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
};

const subtleTextStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
};

const linkStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#2563eb",
  fontWeight: 600,
  cursor: "pointer",
};

const ghostButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "none",
  background: "transparent",
  color: "#2563eb",
  padding: "4px 10px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};

function ConnectReservations({ userEmail }: ReservationsProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  return (
    <AppShell userEmail={userEmail} activeTab="Connect">
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
          Connect / Reservations
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Reservations
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#d1d5db",
            marginTop: 6,
            maxWidth: 620,
          }}
        >
          Reserve shared office resources like phone time, rooms, and specialty
          spaces. Future versions will sync directly with Nova-powered booking.
        </p>
      </div>

      {/* Main card */}
      <div style={cardStyle}>
        {/* Title row */}
        <div style={headerRowStyle}>
          <h2 style={headerTitleStyle}>Available Calendars - 1</h2>
          <button type="button" style={ghostButtonStyle}>
            Actions ▾
          </button>
        </div>

        {/* Calendar tile */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "flex-start",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 220,
              minHeight: 260,
              borderRadius: 18,
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              padding: 16,
              boxShadow: "0 10px 22px rgba(15,23,42,0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#1d4ed8",
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    background: "#111827",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "#f9fafb",
                  }}
                >
                  ☎
                </span>
                Office Phone Time
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  marginBottom: 10,
                }}
              >
                Dallas
              </div>

              {/* Image placeholder */}
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  background:
                    "radial-gradient(circle at 0 0, #38bdf8, #0f172a 55%, #22c55e 100%)",
                  height: 140,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <div
                  style={{
                    width: "86%",
                    borderRadius: 10,
                    background: "rgba(15,23,42,0.85)",
                    border: "1px solid rgba(148,163,184,0.6)",
                    padding: 8,
                    color: "#e5e7eb",
                    fontSize: 11,
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>Elite Desk Phone</div>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>
                    Reserve dedicated phone time to call leads, clients, and
                    partners distraction-free.
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                color: "#4b5563",
              }}
            >
              Phone Time
            </div>
          </div>

          {/* Description / future state */}
          <div style={{ maxWidth: 480 }}>
            <p
              style={{
                fontSize: 14,
                color: "#111827",
                marginTop: 4,
                marginBottom: 10,
                fontWeight: 500,
              }}
            >
              Looking for local calendars?
            </p>
            <p style={subtleTextStyle}>
              You can show only calendars for your office. In the future, this
              page will list rooms, equipment, and Nova-powered office shifts
              you can reserve with one click.
            </p>
            <p style={{ ...subtleTextStyle, marginTop: 10 }}>
              For now, treat this as a visual preview of what&apos;s coming. We&apos;ll
              connect it to live Google or Outlook resource calendars when the
              brokerage is ready.
            </p>
            <div style={{ marginTop: 12 }}>
              <span style={linkStyle}>Show All Calendars</span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: 10,
            marginTop: 4,
            fontSize: 11,
            color: "#9ca3af",
          }}
        >
          Reservation automations (confirmations, reminders, and check-in links)
          will be handled by Nova in a later phase.
        </div>
      </div>
    </AppShell>
  );
}

export default ConnectReservations;

export const getServerSideProps: GetServerSideProps<ReservationsProps> = async (
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
