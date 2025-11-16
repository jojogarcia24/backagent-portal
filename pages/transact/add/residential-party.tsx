import React from "react";
import type { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type PartyProps = {
  userEmail: string | null;
  sale: boolean;
  lease: boolean;
  phaseLabel: string;
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

const partyCardStyle: React.CSSProperties = {
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

function ResidentialParty({ userEmail, sale, lease, phaseLabel }: PartyProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";
  const isSale = sale && !lease;
  const baseQuery = isSale ? "sale=true" : "lease=true";
  const encodedPhase = encodeURIComponent(phaseLabel);

  const saleParties = [
    {
      key: "seller",
      label: "Seller",
      description: "The current title holder of a property.",
    },
    // we removed Seller & Buyer per brokerage rules
    {
      key: "buyer",
      label: "Buyer",
      description: "The purchaser of a property.",
    },
  ];

  const leaseParties = [
    {
      key: "landlord",
      label: "Landlord",
      description: "The property owner or landlord.",
    },
    {
      key: "tenant",
      label: "Tenant",
      description: "The person or party leasing the property.",
    },
  ];

  const parties = isSale ? saleParties : leaseParties;
  const typeLabel = isSale ? "Sale" : "Lease";

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
          You&apos;re almost ready to create this file. First, confirm which party
          you represent so Back Boss can set up people, docs, and checklists
          correctly.
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
          {/* LEFT – party list */}
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
              <div style={{ marginBottom: 4 }}>
                <span style={{ color: "#22c55e", marginRight: 8 }}>✓</span>
                You selected the <strong>&apos;{typeLabel}&apos;</strong> type.{" "}
                <a
                  href="/transact/add/residential-type"
                  style={{ color: "#2563eb", textDecoration: "none" }}
                >
                  Change
                </a>
              </div>
              <div>
                <span style={{ color: "#22c55e", marginRight: 8 }}>✓</span>
                You selected the <strong>&apos;{phaseLabel}&apos;</strong> phase.{" "}
                <a
                  href={`/transact/add/residential-start-phase?${baseQuery}`}
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
              Which party do you represent?
            </h2>

            {parties.map((party) => (
              <div key={party.key} style={partyCardStyle}>
                <div>
                  <div style={titleStyle}>{party.label}</div>
                  <div style={subtitleStyle}>{party.description}</div>
                </div>
                <a
                  href={`/transact/add/residential-confirm?${baseQuery}&phase=${encodedPhase}&party=${encodeURIComponent(
                    party.key
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
              On the next screen you&apos;ll confirm your primary client and then
              jump into a Back Boss Summary view with timeline, tabs, and
              commission snapshot.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export default ResidentialParty;

export const getServerSideProps: GetServerSideProps<PartyProps> = async (
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

  // Phase comes in as a query string (e.g. "Showing", "Pre-Closing")
  let phaseLabel = "";
  if (typeof query.phase === "string" && query.phase.trim().length > 0) {
    phaseLabel = query.phase;
  } else {
    phaseLabel = "Contract";
  }

  return {
    props: {
      userEmail: session.user?.email ?? null,
      sale,
      lease,
      phaseLabel,
    },
  };
};
