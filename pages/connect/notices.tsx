import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type NoticesProps = {
  userEmail: string | null;
};

type Notice = {
  id: number;
  category: string;
  title: string;
  address: string;
  assigned: string;
  viewed: string;
};

const receivedNotices: Notice[] = [
  {
    id: 1,
    category: "Transaction",
    title: "Transaction Funding Approved - Richard Kent",
    address: "2623 Saint Michelle Lane, McKinney, TX 75070",
    assigned: "Sun, 11/09/25 2:14 AM",
    viewed: "Sun, 11/09/25 2:14 AM",
  },
  {
    id: 2,
    category: "Transaction",
    title: "Transaction Funding Authorized - 1427 Davis Mountain LOOP",
    address: "Cedar Park, TX 78613",
    assigned: "Sun, 11/09/25 2:10 AM",
    viewed: "Sun, 11/09/25 2:10 AM",
  },
  {
    id: 3,
    category: "Transaction",
    title: "Transaction Funding Approved - 303 Stoneldge",
    address: "Irving, TX 75063",
    assigned: "Sun, 11/09/25 2:04 AM",
    viewed: "Sun, 11/09/25 2:04 AM",
  },
];

const sentNotices: Notice[] = [
  {
    id: 101,
    category: "Reminder",
    title: "Compliance reminder – CDA required",
    address: "Multiple transactions",
    assigned: "Thu, 10/31/25 9:15 AM",
    viewed: "—",
  },
];

const pillBase: React.CSSProperties = {
  flex: 1,
  borderRadius: 999,
  padding: "7px 14px",
  fontSize: 13,
  fontWeight: 600,
  border: "1px solid transparent",
  cursor: "pointer",
  textAlign: "center",
};

const tabRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  marginBottom: 14,
  background: "#e5e7eb",
  padding: 4,
  borderRadius: 999,
};

export default function ConnectNotices({ userEmail }: NoticesProps) {
  const [activeTab, setActiveTab] = React.useState<"received" | "sent">(
    "received"
  );

  const list = activeTab === "received" ? receivedNotices : sentNotices;

  return (
    <AppShell userEmail={userEmail}>
      <div
        style={{
          padding: 24,
          color: "#f9fafb",
        }}
      >
        {/* Breadcrumb + Hero */}
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
            Connect / Notices
          </div>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#f9fafb",
              margin: 0,
            }}
          >
            Office Notices
          </h1>
          <p
            style={{
              marginTop: 8,
              fontSize: 14,
              color: "#d1d5db",
              maxWidth: 560,
            }}
          >
            Personalized office notices sent to your account — funding updates,
            compliance alerts, and important transaction messages.
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
          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Notices for you
              </h2>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  color: "#6b7280",
                }}
              >
                Filter and review notices sent to your Elite Living Realty
                account.
              </p>
            </div>
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
          </div>

          {/* Search row */}
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 12,
                color: "#6b7280",
                marginBottom: 4,
              }}
            >
              Search notices
            </div>
            <input
              placeholder="Category, title, address"
              style={{
                width: "100%",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                padding: "8px 14px",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>

          {/* Tabs */}
          <div style={tabRowStyle}>
            <button
              type="button"
              onClick={() => setActiveTab("received")}
              style={{
                ...pillBase,
                background:
                  activeTab === "received" ? "#ffffff" : "transparent",
                color: activeTab === "received" ? "#0f172a" : "#4b5563",
                borderColor:
                  activeTab === "received" ? "#e5e7eb" : "transparent",
                boxShadow:
                  activeTab === "received"
                    ? "0 8px 20px rgba(15,23,42,0.15)"
                    : "none",
              }}
            >
              Received
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sent")}
              style={{
                ...pillBase,
                background: activeTab === "sent" ? "#ffffff" : "transparent",
                color: activeTab === "sent" ? "#0f172a" : "#4b5563",
                borderColor:
                  activeTab === "sent" ? "#e5e7eb" : "transparent",
                boxShadow:
                  activeTab === "sent"
                    ? "0 8px 20px rgba(15,23,42,0.15)"
                    : "none",
              }}
            >
              Sent
            </button>
          </div>

          {/* List header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1.3fr)",
              gap: 16,
              padding: "8px 12px",
              borderRadius: 14,
              background: "#f3f4f6",
              fontSize: 11,
              color: "#6b7280",
              textTransform: "uppercase",
              letterSpacing: 0.06 * 16,
              marginBottom: 8,
            }}
          >
            <div>Notice</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <span>Assigned</span>
              <span>Viewed</span>
            </div>
          </div>

          {/* Notices list */}
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              background: "#ffffff",
            }}
          >
            {list.length === 0 && (
              <div
                style={{
                  padding: 18,
                  fontSize: 13,
                  color: "#6b7280",
                }}
              >
                No notices in this view yet.
              </div>
            )}

            {list.map((notice, idx) => (
              <div
                key={notice.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "6px minmax(0, 2.2fr) minmax(0, 1.3fr)",
                  gap: 0,
                  background: idx % 2 === 0 ? "#f9fafb" : "#ffffff",
                  borderTop: idx === 0 ? "none" : "1px solid #e5e7eb",
                }}
              >
                {/* Left accent bar */}
                <div
                  style={{
                    background:
                      notice.category === "Transaction"
                        ? "#2563eb"
                        : "#14b8a6",
                  }}
                />

                {/* Main content */}
                <div
                  style={{
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#2563eb",
                      marginBottom: 2,
                    }}
                  >
                    {notice.category}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {notice.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    {notice.address}
                  </div>
                </div>

                {/* Meta */}
                <div
                  style={{
                    padding: "12px 14px",
                    fontSize: 11,
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    whiteSpace: "nowrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 2,
                      }}
                    >
                      <span role="img" aria-label="calendar">
                        📅
                      </span>
                      <span>Assigned: {notice.assigned}</span>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span role="img" aria-label="eye">
                        👁️
                      </span>
                      <span>
                        Viewed:{" "}
                        {notice.viewed && notice.viewed !== "—"
                          ? notice.viewed
                          : "Not yet viewed"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export const getServerSideProps: GetServerSideProps<NoticesProps> = async (
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
