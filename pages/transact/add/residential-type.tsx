import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type TypeProps = {
  userEmail: string | null;
};

const pageCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
  display: "grid",
  gridTemplateColumns: "minmax(0, 2.4fr) minmax(260px, 1fr)",
  gap: 24,
  alignItems: "flex-start",
};

const rightPanelStyle: React.CSSProperties = {
  borderRadius: 22,
  border: "1px solid rgba(148,163,184,0.5)",
  background: "#ffffff",
  padding: 18,
  fontSize: 13,
  color: "#4b5563",
};

const pillCheckStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  color: "#16a34a",
  marginBottom: 8,
};

const optionCardStyle: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  padding: 16,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const selectButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "none",
  padding: "10px 22px",
  background: "#276bff",
  color: "#f9fafb",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(39,107,255,0.45)",
};

function ResidentialType({ userEmail }: TypeProps) {
  const agentName =
    userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  return (
    <AppShell userEmail={userEmail} activeTab="Transact">
      {/* Hero */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 13,
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 4,
          }}
        >
          Transact / Add Transaction
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Add Transaction
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#e5e7eb",
            marginTop: 6,
            maxWidth: 760,
          }}
        >
          You selected the <strong>Residential</strong> category. Next, tell Back Boss
          whether this is a sale or a lease so we can apply the right
          checklists, documents, and commission rules for you.
        </p>
      </div>

      <section style={pageCardStyle}>
        {/* LEFT */}
        <div>
          <div style={pillCheckStyle}>
            <span style={{ fontSize: 18 }}>✔</span>
            <span>
              You selected the <strong>&apos;Residential&apos;</strong> category.&nbsp;
              <a
                href="/transact/add"
                style={{ color: "#2563eb", textDecoration: "none" }}
              >
                Change
              </a>
            </span>
          </div>

          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#111827",
              marginTop: 12,
              marginBottom: 18,
            }}
          >
            What type of transaction is it?
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Sale */}
            <div style={optionCardStyle}>
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: 4,
                  }}
                >
                  Sale or Sale Listing
                </div>
                <div
                  style={{ fontSize: 13, color: "#6b7280", maxWidth: 520 }}
                >
                  The property owner will change upon completion.
                </div>
              </div>
              <a href="/transact/add/residential-start-phase?sale=true">
                <button type="button" style={selectButtonStyle}>
                  Select
                </button>
              </a>
            </div>

            {/* Lease */}
            <div style={optionCardStyle}>
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: 4,
                  }}
                >
                  Lease or Lease Listing
                </div>
                <div
                  style={{ fontSize: 13, color: "#6b7280", maxWidth: 520 }}
                >
                  Tenant is changing, but title remains the same.
                </div>
              </div>
              <a href="/transact/add/residential-start-phase?lease=true">
                <button type="button" style={selectButtonStyle}>
                  Select
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT – Create transaction for */}
        <aside style={rightPanelStyle}>
          <div
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "#9ca3af",
              marginBottom: 4,
            }}
          >
            Create transaction for:
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#111827",
              marginBottom: 4,
            }}
          >
            {agentName}
          </div>
          <a
            href="#"
            style={{
              fontSize: 13,
              color: "#2563eb",
              textDecoration: "none",
            }}
          >
            change
          </a>
          <p
            style={{
              fontSize: 12,
              color: "#6b7280",
              marginTop: 10,
              lineHeight: 1.5,
            }}
          >
            Later you&apos;ll be able to change the agent, team, or office
            on this file and Back Boss will auto-adjust splits and
            permissions.
          </p>
        </aside>
      </section>
    </AppShell>
  );
}

export default ResidentialType;

export const getServerSideProps: GetServerSideProps<TypeProps> = async (
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
