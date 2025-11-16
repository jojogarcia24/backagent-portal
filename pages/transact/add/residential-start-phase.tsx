import React from "react";
import type { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type StartPhaseProps = {
  userEmail: string | null;
  sale: boolean;
  lease: boolean;
};

const pageCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.97)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 24px 60px rgba(15,23,42,0.5)",
};

const rightInfoCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 24,
  padding: 18,
  boxShadow: "0 18px 40px rgba(15,23,42,0.25)",
  border: "1px solid rgba(209,213,219,0.9)",
};

const phaseCardStyle: React.CSSProperties = {
  borderRadius: 999,
  background: "#f9fafb",
  padding: "16px 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 12,
  boxShadow: "0 14px 30px rgba(15,23,42,0.2)",
};

const titleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: 4,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#4b5563",
};

const selectButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "none",
  padding: "10px 26px",
  background: "#2563eb",
  color: "#f9fafb",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 18px 40px rgba(37,99,235,0.7)",
};

function ResidentialStartPhase({ userEmail, sale, lease }: StartPhaseProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";
  const isSale = sale && !lease;

  const salePhases = [
    {
      label: "Start",
      description:
        "You are in the early stages of representing your client. (Recommended)",
    },
    {
      label: "Showing",
      description:
        "Client is actively searching for, or marketing, a property.",
    },
    {
      label: "Contract",
      description:
        "Your client's contract is written. You may still be negotiating final terms and due diligence.",
    },
    {
      label: "Pre-Closing",
      description:
        "All documents have been signed and executed. You are ready to submit for funding.",
    },
    {
      label: "Post-Closing",
      description:
        "The transaction has already closed. You need to submit your paperwork and request a commission check.",
    },
  ];

  const leasePhases = [
    {
      label: "Start",
      description:
        "You are in the early stages of representing your client. (Recommended)",
    },
    {
      label: "Showing",
      description:
        "Client is actively searching for, or marketing, a property for lease.",
    },
    {
      label: "Contract",
      description:
        "Your client's lease agreement is written. You may still be finalizing details.",
    },
    {
      label: "Pre-Move-In",
      description:
        "All documents are signed. You're preparing for keys, deposits, and move-in details.",
    },
    {
      label: "Post-Move-In",
      description:
        "The tenant has moved in. You're wrapping up any final items and commission paperwork.",
    },
  ];

  const phases = isSale ? salePhases : leasePhases;
  const typeLabel = isSale ? "Sale" : "Lease";

  const baseQuery = isSale ? "sale=true" : "lease=true";

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
          Transact / Add Transaction
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
            textShadow: "0 6px 18px rgba(0,0,0,0.6)",
          }}
        >
          Add Transaction
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#e5e7eb",
            marginTop: 6,
            maxWidth: 780,
            textShadow: "0 4px 14px rgba(0,0,0,0.6)",
          }}
        >
          You selected the <strong>Residential</strong> category and{" "}
          <strong>{typeLabel}</strong> type. Now choose where you&apos;d like
          to start the transaction so Back Boss can drop you into the right
          phase, {name}.
        </p>
      </div>

      {/* Main layout */}
      <section style={pageCardStyle}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(520px, 2fr) minmax(260px, 1.1fr)",
            gap: 24,
          }}
        >
          {/* LEFT – phase list */}
          <div>
            {/* Checkmarks summary */}
            <div
              style={{
                fontSize: 14,
                color: "#111827",
                marginBottom: 18,
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <span style={{ color: "#22c55e", marginRight: 8 }}>✓</span>
                You selected the <strong>&apos;Residential&apos;</strong>{" "}
                category.{" "}
                <a
                  href="/transact/add"
                  style={{ color: "#2563eb", textDecoration: "none" }}
                >
                  Change
                </a>
              </div>
              <div>
                <span style={{ color: "#22c55e", marginRight: 8 }}>✓</span>
                You selected the <strong>&apos;{typeLabel}&apos;</strong> type.{" "}
                <a
                  href="/transact/add/residential-type"
                  style={{ color: "#2563eb", textDecoration: "none" }}
                >
                  Change
                </a>
              </div>
            </div>

            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 14,
              }}
            >
              Where would you like to start the transaction?
            </h2>

            {phases.map((phase) => (
              <div key={phase.label} style={phaseCardStyle}>
                <div>
                  <div style={titleStyle}>{phase.label}</div>
                  <div style={subtitleStyle}>{phase.description}</div>
                </div>
                <a
                  href={`/transact/add/residential-party?${baseQuery}&phase=${encodeURIComponent(
                    phase.label
                  )}`}
                  style={{
                    ...selectButtonStyle,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 96,
                  }}
                >
                  Select
                </a>
              </div>
            ))}
          </div>

          {/* RIGHT – Create transaction for */}
          <div style={rightInfoCardStyle}>
            <div
              style={{
                fontSize: 12,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: 1.6,
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
              {name}
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
              Once you pick a phase, Back Boss will walk you through who you
              represent, quick client selection, and a summary screen with
              timeline, docs, checklist, expenses, and history.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export default ResidentialStartPhase;

export const getServerSideProps: GetServerSideProps<StartPhaseProps> = async (
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

  const query: ParsedUrlQuery = context.query;
  const sale = String(query.sale) === "true";
  const lease = String(query.lease) === "true";

  return {
    props: {
      userEmail: session.user?.email ?? null,
      sale,
      lease,
    },
  };
};
