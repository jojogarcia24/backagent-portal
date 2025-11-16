import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type PageProps = {
  userEmail: string | null;
};

const pageCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 18px 46px rgba(15,23,42,0.4)",
};

const stepRowStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  marginBottom: 16,
};

const stepLineStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#16a34a",
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const stepChangeLinkStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#2563eb",
  marginLeft: 4,
  textDecoration: "none",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: "#0f172a",
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#4b5563",
  marginTop: 6,
};

const optionCardStyleBase: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 18px",
  borderRadius: 18,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  marginTop: 12,
  boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
};

const optionTextBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const optionTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#020617",
};

const optionDescriptionStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
};

const selectButtonStyle: React.CSSProperties = {
  minWidth: 96,
  padding: "9px 20px",
  borderRadius: 999,
  border: "none",
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#f9fafb",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 0.3,
  cursor: "pointer",
  boxShadow: "0 10px 24px rgba(37,99,235,0.45)",
};

const sideCardStyle: React.CSSProperties = {
  borderRadius: 20,
  padding: 18,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  boxShadow: "0 10px 26px rgba(15,23,42,0.12)",
};

function ResidentialSalePartyPage({ userEmail }: PageProps) {
  const nameFromEmail =
    userEmail?.split("@")[0]?.replace(/\./g, " ") || "JoJo Garcia";

  const prettyName =
    nameFromEmail
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "JoJo Garcia";

  const parties = [
    {
      key: "seller",
      label: "Seller",
      description: "The current title holder of a property.",
      href: "/transact/add/residential-sale-seller",
    },
    {
      key: "both",
      label: "Seller & Buyer",
      description: "Both sides of the transaction.",
      href: "#",
    },
    {
      key: "buyer",
      label: "Buyer",
      description: "The purchaser of a property.",
      href: "#",
    },
  ];

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
            fontSize: 34,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Add Transaction
        </h1>
      </div>

      {/* Main card */}
      <div style={pageCardStyle}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.5fr) minmax(260px, 1fr)",
            gap: 24,
            alignItems: "flex-start",
          }}
        >
          {/* LEFT – Steps + options */}
          <div>
            <div style={stepRowStyle}>
              <div style={stepLineStyle}>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                <span>You selected the &apos;Residential&apos; category.</span>
                <a href="/transact/add" style={stepChangeLinkStyle}>
                  Change
                </a>
              </div>
              <div style={stepLineStyle}>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                <span>You selected the &apos;Sale&apos; type.</span>
                <a href="/transact/add/residential-type" style={stepChangeLinkStyle}>
                  Change
                </a>
              </div>
              <div style={stepLineStyle}>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                <span>You selected the &apos;Contract&apos; phase.</span>
                <a
                  href="/transact/add/residential-sale-phase"
                  style={stepChangeLinkStyle}
                >
                  Change
                </a>
              </div>
            </div>

            <h2 style={sectionTitleStyle}>Which party do you represent?</h2>
            <p style={subtitleStyle}>
              Back Boss will auto-tailor docs and checklists based on your side
              of the deal.
            </p>

            {parties.map((party, index) => {
              const cardStyle: React.CSSProperties = {
                ...optionCardStyleBase,
                marginTop: index === 0 ? 18 : 12,
              };

              return (
                <div key={party.key} style={cardStyle}>
                  <div style={optionTextBlockStyle}>
                    <div style={optionTitleStyle}>{party.label}</div>
                    <div style={optionDescriptionStyle}>
                      {party.description}
                    </div>
                  </div>
                  <a
                    href={party.href}
                    style={{ textDecoration: "none" }}
                    onClick={(e) => {
                      if (party.href === "#") e.preventDefault();
                    }}
                  >
                    <button type="button" style={selectButtonStyle}>
                      Select
                    </button>
                  </a>
                </div>
              );
            })}
          </div>

          {/* RIGHT – Create for agent */}
          <aside style={sideCardStyle}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#6b7280",
                marginBottom: 4,
              }}
            >
              Create transaction for:
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 6,
              }}
            >
              {prettyName}
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: 13,
                color: "#2563eb",
                textDecoration: "none",
              }}
            >
              change
            </a>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

export default ResidentialSalePartyPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
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
