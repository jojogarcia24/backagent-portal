import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type CalendarProps = {
  userEmail: string | null;
};

const cardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 20,
  boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
};

const fieldLabelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 6,
};

const subtleTextStyle: React.CSSProperties = {
  fontSize: 11,
  color: "#9ca3af",
};

const pillButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "none",
  background: "#111827",
  color: "#f9fafb",
  padding: "10px 20px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const pillSecondaryButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};

function ConnectCalendar({ userEmail }: CalendarProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
          Connect / Calendar
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Events Calendar
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#d1d5db",
            marginTop: 6,
          }}
        >
          Find training, masterminds, and office events curated for you, {name}.
        </p>
      </div>

      {/* Search + filters bar */}
      <div
        style={{
          ...cardStyle,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ flex: 1 }}>
            <input
              placeholder="Find an event."
              style={{
                width: "100%",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                padding: "10px 16px",
                fontSize: 13,
              }}
            />
          </div>
          <button type="button" style={pillButtonStyle}>
            Search
          </button>
          <select
            style={{
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              padding: "9px 12px",
              fontSize: 13,
              background: "#ffffff",
              minWidth: 140,
            }}
            defaultValue="all"
          >
            <option value="all">All Events</option>
            <option value="training">Training & CE</option>
            <option value="office">Office Events</option>
            <option value="mastermind">Masterminds</option>
          </select>
          <button
            type="button"
            style={{
              ...pillSecondaryButtonStyle,
              border: "none",
              background: "transparent",
              padding: 0,
              color: "#2563eb",
            }}
          >
            Actions ▾
          </button>
        </div>
      </div>

      {/* Calendar card */}
      <div style={cardStyle}>
        {/* Month header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button type="button" style={pillSecondaryButtonStyle}>
              &laquo; October
            </button>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              November 2025
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 13, color: "#4b5563" }}>
              <strong>11</strong> Events
            </div>
            <button type="button" style={pillSecondaryButtonStyle}>
              Show Filters
            </button>
            <button type="button" style={pillSecondaryButtonStyle}>
              December &raquo;
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div
          style={{
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Day header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              background: "#111827",
              color: "#f9fafb",
              fontSize: 12,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {days.map((day) => (
              <div
                key={day}
                style={{
                  padding: "8px 6px",
                  borderRight: "1px solid rgba(55,65,81,0.9)",
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              background: "#f9fafb",
              fontSize: 11,
            }}
          >
            {Array.from({ length: 35 }).map((_, index) => {
              const isHeaderSpacer = index < 5; // first row has blanks until Friday
              const dayNumber = index - 4; // so index 5 -> 1
              const isCurrentMonth = dayNumber > 0 && dayNumber <= 30;

              const isToday = isCurrentMonth && dayNumber === 14;

              return (
                <div
                  key={index}
                  style={{
                    minHeight: 120,
                    borderRight: "1px solid #e5e7eb",
                    borderTop: "1px solid #e5e7eb",
                    padding: 6,
                    background: isToday ? "#eef2ff" : "#ffffff",
                    position: "relative",
                  }}
                >
                  {isCurrentMonth && !isHeaderSpacer && (
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: 4,
                      }}
                    >
                      {dayNumber}
                    </div>
                  )}

                  {/* Example events on a few days to match vibe */}
                  {isCurrentMonth && dayNumber === 4 && (
                    <div
                      style={{
                        borderLeft: "3px solid #22c55e",
                        paddingLeft: 6,
                        fontSize: 11,
                        color: "#065f46",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      Kendra Cooke Retreat
                    </div>
                  )}
                  {isCurrentMonth && dayNumber === 6 && (
                    <div
                      style={{
                        borderLeft: "3px solid #22c55e",
                        paddingLeft: 6,
                        fontSize: 11,
                        color: "#065f46",
                      }}
                    >
                      Austin – Office Event
                    </div>
                  )}
                  {isCurrentMonth && dayNumber === 20 && (
                    <div
                      style={{
                        borderLeft: "3px solid #22c55e",
                        paddingLeft: 6,
                        fontSize: 11,
                        color: "#065f46",
                      }}
                    >
                      Lunch and Learn CE + Class
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend / footer */}
        <div
          style={{
            marginTop: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div style={subtleTextStyle}>
            This calendar will sync with Elite Living events, CE classes, and
            Nova-powered reminders in a future release.
          </div>
          <button type="button" style={pillSecondaryButtonStyle}>
            Add New Event
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export default ConnectCalendar;

export const getServerSideProps: GetServerSideProps<CalendarProps> = async (
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
