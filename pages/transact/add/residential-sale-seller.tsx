import React, { useState } from "react";
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

const twoColumnGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1.2fr)",
  gap: 24,
  alignItems: "flex-start",
};

const sellerBoxStyle: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  padding: 18,
  minHeight: 150,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  color: "#6b7280",
  textAlign: "center",
};

const sellerBoxSelectedStyle: React.CSSProperties = {
  ...sellerBoxStyle,
  justifyContent: "flex-start",
  alignItems: "flex-start",
  textAlign: "left",
};

const selectClientLinkStyle: React.CSSProperties = {
  marginTop: 10,
  fontSize: 14,
  color: "#2563eb",
  cursor: "pointer",
  textDecoration: "none",
};

const confirmCardStyle: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  padding: 18,
  boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
};

const primaryButtonStyle: React.CSSProperties = {
  marginTop: 14,
  padding: "11px 22px",
  borderRadius: 999,
  border: "none",
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#f9fafb",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 12px 30px rgba(37,99,235,0.55)",
};

const primaryButtonDisabledStyle: React.CSSProperties = {
  ...primaryButtonStyle,
  background: "linear-gradient(135deg,#9ca3af,#6b7280)",
  boxShadow: "none",
  cursor: "not-allowed",
};

const contactFormCardStyle: React.CSSProperties = {
  marginTop: 18,
  borderRadius: 18,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  padding: 18,
  boxShadow: "0 10px 26px rgba(15,23,42,0.12)",
};

const formGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2,minmax(0,1fr))",
  gap: 12,
};

const formLabelStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#4b5563",
  marginBottom: 4,
};

const formInputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  padding: "8px 14px",
  fontSize: 14,
};

const formSelectStyle: React.CSSProperties = {
  ...formInputStyle,
  borderRadius: 999,
};

const smallButtonRowStyle: React.CSSProperties = {
  marginTop: 14,
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
};

const secondaryButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 999,
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  color: "#374151",
};

const smallPrimaryButtonStyle: React.CSSProperties = {
  padding: "8px 18px",
  borderRadius: 999,
  border: "none",
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#f9fafb",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 10px 24px rgba(37,99,235,0.45)",
};

function ResidentialSaleSellerPage({ userEmail }: PageProps) {
  const nameFromEmail =
    userEmail?.split("@")[0]?.replace(/\./g, " ") || "JoJo Garcia";

  const prettyName =
    nameFromEmail
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "JoJo Garcia";

  const [showContactForm, setShowContactForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("Real Estate Brokerage");

  const hasSeller = !!(firstName && lastName);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) return;
    setShowContactForm(false);
  };

  const fullSellerName =
    hasSeller ? `${firstName.trim()} ${lastName.trim()}` : "";

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
            <span>You represent the &apos;Seller&apos;.</span>
            <a
              href="/transact/add/residential-sale-party"
              style={stepChangeLinkStyle}
            >
              Change
            </a>
          </div>
        </div>

        <div style={twoColumnGridStyle}>
          {/* LEFT – Seller selection + contact form */}
          <div>
            <h2 style={sectionTitleStyle}>Who is the Seller?</h2>
            <div style={hasSeller ? sellerBoxSelectedStyle : sellerBoxStyle}>
              {hasSeller ? (
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#111827",
                      marginBottom: 4,
                    }}
                  >
                    {fullSellerName}
                  </div>
                  {company && (
                    <div
                      style={{
                        fontSize: 13,
                        color: "#4b5563",
                        marginBottom: 2,
                      }}
                    >
                      {company}
                    </div>
                  )}
                  {(email || phone) && (
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      {email && <div>{email}</div>}
                      {phone && <div>{phone}</div>}
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 11,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                    }}
                  >
                    {industry}
                  </div>
                </div>
              ) : (
                "Not selected."
              )}
            </div>
            <a
              href="#"
              style={selectClientLinkStyle}
              onClick={(e) => {
                e.preventDefault();
                setShowContactForm(true);
              }}
            >
              + Select Client
            </a>

            {showContactForm && (
              <form style={contactFormCardStyle} onSubmit={handleSaveContact}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#0f172a",
                    marginBottom: 10,
                  }}
                >
                  Add New Contact
                </div>
                <div style={formGridStyle}>
                  <div>
                    <div style={formLabelStyle}>First Name</div>
                    <input
                      style={formInputStyle}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <div style={formLabelStyle}>Last Name</div>
                    <input
                      style={formInputStyle}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <div style={formLabelStyle}>Company</div>
                    <input
                      style={formInputStyle}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div>
                    <div style={formLabelStyle}>Email Address</div>
                    <input
                      style={formInputStyle}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <div style={formLabelStyle}>Phone Number</div>
                    <input
                      style={formInputStyle}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <div style={formLabelStyle}>Industry</div>
                    <select
                      style={formSelectStyle}
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    >
                      <option>Real Estate Brokerage</option>
                      <option>Real Estate Investor</option>
                      <option>Mortgage &amp; Loan</option>
                      <option>Title &amp; Escrow</option>
                      <option>Home Inspection</option>
                      <option>Property Management</option>
                      <option>Insurance</option>
                    </select>
                  </div>
                </div>
                <div style={smallButtonRowStyle}>
                  <button
                    type="button"
                    style={secondaryButtonStyle}
                    onClick={() => setShowContactForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" style={smallPrimaryButtonStyle}>
                    Save &amp; Use Seller
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT – Confirm & Save */}
          <div style={confirmCardStyle}>
            <h2 style={sectionTitleStyle}>Confirm &amp; Save</h2>
            <p
              style={{
                fontSize: 14,
                color: "#4b5563",
                marginTop: 6,
                lineHeight: 1.5,
              }}
            >
              If everything looks good, you&apos;re ready to create the new
              transaction. In a later phase, this will sync to your transaction
              software and auto-build the full file.
            </p>

            <a
              href={hasSeller ? "/transact/summary" : "#"}
              onClick={(e) => {
                if (!hasSeller) {
                  e.preventDefault();
                }
              }}
              style={{ textDecoration: "none" }}
            >
              <button
                type="button"
                style={hasSeller ? primaryButtonStyle : primaryButtonDisabledStyle}
              >
                Create New Transaction
              </button>
            </a>

            <p
              style={{
                fontSize: 12,
                color: "#9ca3af",
                marginTop: 10,
              }}
            >
              Demo note: for now, this jumps into a sample Back Boss transaction
              summary so you can preview the workspace.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default ResidentialSaleSellerPage;

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
