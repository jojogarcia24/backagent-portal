import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type TasksProps = {
  userEmail: string | null;
};

export default function ConnectTasks({ userEmail }: TasksProps) {
  return (
    <AppShell userEmail={userEmail}>
      <div
        style={{
          padding: 24,
          color: "#f9fafb",
        }}
      >
        {/* Hero */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: 6,
            }}
          >
            Connect / Tasks
          </div>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#f9fafb",
              margin: 0,
            }}
          >
            Tasks
          </h1>
          <p
            style={{
              marginTop: 8,
              fontSize: 14,
              color: "#d1d5db",
              maxWidth: 560,
            }}
          >
            View and filter department, personal, and sent tasks routed through
            Elite Living Realty and Back Boss AI.
          </p>
        </div>

        {/* Main card */}
        <div
          style={{
            background: "rgba(248,250,252,0.98)",
            borderRadius: 26,
            padding: 20,
            boxShadow: "0 18px 48px rgba(15,23,42,0.45)",
            color: "#0f172a",
          }}
        >
          {/* Top row – title + Actions / Send a Task */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Tasks
            </h2>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <button
                style={{
                  borderRadius: 999,
                  border: "1px solid #d1d5db",
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 500,
                  background: "#ffffff",
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                Actions ▾
              </button>
              <button
                style={{
                  borderRadius: 4,
                  border: "none",
                  padding: "8px 18px",
                  fontSize: 12,
                  fontWeight: 600,
                  background: "#111827",
                  color: "#f9fafb",
                  cursor: "pointer",
                }}
              >
                Send a Task
              </button>
            </div>
          </div>

          {/* Tab bar – Department / Sent Dept / Personal / Sent Tasks */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 16,
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: 4,
            }}
          >
            {["Department", "Sent Dept", "Personal", "Sent Tasks"].map(
              (label, index) => {
                const selected = index === 0; // Department active for now
                return (
                  <button
                    key={label}
                    type="button"
                    style={{
                      border: "none",
                      borderBottom: selected
                        ? "3px solid #0ea5e9"
                        : "3px solid transparent",
                      background: "transparent",
                      padding: "8px 14px 10px",
                      fontSize: 13,
                      fontWeight: selected ? 600 : 500,
                      color: selected ? "#0f172a" : "#6b7280",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                );
              }
            )}
          </div>

          {/* Filters row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0, auto)) 1fr",
              gap: 8,
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            {["Status", "Show Active ▾", "Sort By ▾", "Date Created ▾"].map(
              (label) => (
                <button
                  key={label}
                  style={{
                    borderRadius: 4,
                    border: "1px solid #e5e7eb",
                    padding: "6px 10px",
                    fontSize: 12,
                    background: "#f9fafb",
                    color: "#374151",
                    cursor: "pointer",
                    textAlign: "left",
                    minWidth: 90,
                  }}
                >
                  {label}
                </button>
              )
            )}

            <div
              style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
              }}
            >
              <input
                defaultValue="2/14/2025"
                style={{
                  borderRadius: 4,
                  border: "1px solid #e5e7eb",
                  padding: "6px 10px",
                  fontSize: 12,
                  width: 100,
                }}
              />
              <input
                defaultValue="2/13/2026"
                style={{
                  borderRadius: 4,
                  border: "1px solid #e5e7eb",
                  padding: "6px 10px",
                  fontSize: 12,
                  width: 100,
                }}
              />
              <button
                style={{
                  borderRadius: 4,
                  border: "none",
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  background: "#111827",
                  color: "#f9fafb",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "#e5e7eb",
              marginBottom: 12,
            }}
          />

          {/* No tasks message */}
          <div
            style={{
              fontSize: 13,
              color: "#4b5563",
              marginBottom: 32,
            }}
          >
            <strong>No tasks</strong>
          </div>

          <div
            style={{
              height: 1,
              background: "#e5e7eb",
              marginBottom: 12,
            }}
          />

          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginBottom: 40,
            }}
          >
            <strong>No tasks found.</strong> Change search criteria above or
            check back tomorrow.
          </p>

          {/* Bottom row with Task Summary aligned left */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 260,
                borderRadius: 20,
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                padding: 16,
                fontSize: 13,
                color: "#111827",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: 12,
                  marginBottom: 12,
                }}
              >
                Task Summary
              </div>

              <div style={{ fontSize: 13, marginBottom: 12 }}>
                <span style={{ fontWeight: 700 }}>0</span> active
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#4b5563",
                  lineHeight: 1.5,
                  marginBottom: 14,
                }}
              >
                <div>0 new</div>
                <div>0 overdue</div>
                <div>0 follow-up</div>
                <div>0 updated</div>
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Upcoming
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#4b5563",
                  lineHeight: 1.5,
                }}
              >
                <div>0 due today</div>
                <div>0 due this week</div>
                <div>0 due next 30</div>
                <div>0 w/o due date</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export const getServerSideProps: GetServerSideProps<TasksProps> = async (
  context
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

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
