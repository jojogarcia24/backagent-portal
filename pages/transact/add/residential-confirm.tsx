import React, { useState } from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type ConfirmProps = {
  userEmail: string | null;
  party: "seller" | "buyer" | null;
  phase:
    | "start"
    | "showing"
    | "contract"
    | "pre-closing"
    | "post-closing"
    | null;
  saleOrLease: "sale" | "lease" | null;
};

const pageCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 20px 55px rgba(15,23,42,0.45)",
};

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  padding: "4px 11px",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.2,
  textTransform: "uppercase",
};

const MOCK_CONTACTS = [
  {
    id: "1",
    name: "Test For Nova",
    company: "Nova Elite",
    email: "testfornova@example.com",
    phone: "(214) 555-0193",
  },
  {
    id: "2",
    name: "Sample Client",
    company: "Acme Holdings",
    email: "sample.client@example.com",
    phone: "(469) 555-0111",
  },
];

function ResidentialConfirm({
  userEmail,
  party,
  phase,
  saleOrLease,
}: ConfirmProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  const partyLabel = party === "buyer" ? "Buyer" : "Seller";
  const saleLeaseLabel =
    saleOrLease === "lease"
      ? "Lease"
      : saleOrLease === "sale"
      ? "Sale"
      : "Sale / Lease";

  const phaseLabelMap: Record<string, string> = {
    "start": "Start",
    "showing": "Showing",
    "contract": "Contract",
    "pre-closing": "Pre-Closing",
    "post-closing": "Post-Closing",
  };
  const phaseKey =
    phase && phaseLabelMap[phase] ? phase : ("contract" as const);
  const phaseLabel = phaseLabelMap[phaseKey];

  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    MOCK_CONTACTS[0]?.id ?? null
  );
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [noCompany, setNoCompany] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreateTransaction = () => {
    // If a contact is selected, we're good.
    if (selectedContactId) {
      window.location.href = `/transact/summary?sale=${saleOrLease ?? "sale"}&phase=${phaseKey}&party=${party ?? "seller"}`;
      return;
    }

    // Otherwise, require all key fields in the quick-add form.
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      alert(
        "Add at least one client with first name, last name, email, and phone before creating the transaction."
      );
      return;
    }

    if (!noCompany && !company.trim()) {
      alert(
        "Either provide a company name or check 'No company name available.'"
      );
      return;
    }

    // For now we don't persist the contact; this just simulates that one exists.
    window.location.href = `/transact/summary?sale=${saleOrLease ?? "sale"}&phase=${phaseKey}&party=${party ?? "seller"}`;
  };

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
            fontWeight: 800,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Add Transaction
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#e5e7eb",
            marginTop: 6,
            maxWidth: 720,
          }}
        >
          Confirm your setup and create the new transaction. In later phases
          we&apos;ll connect this to your compliance engine so checklists, docs,
          and commission rules prefill automatically.
        </p>
      </div>

      {/* Main card */}
      <div style={pageCardStyle}>
        {/* Checkmark row */}
        <div
          style={{
            marginBottom: 16,
            fontSize: 13,
            color: "#111827",
          }}
        >
          <div style={{ marginBottom: 4 }}>
            <span style={{ color: "#22c55e", marginRight: 6 }}>✓</span>
            You selected the <strong>&apos;Residential&apos;</strong> category.{" "}
            <a href="/transact/add" style={{ color: "#2563eb" }}>
              Change
            </a>
          </div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ color: "#22c55e", marginRight: 6 }}>✓</span>
            You selected the <strong>&apos;{saleLeaseLabel}&apos;</strong>{" "}
            type.{" "}
            <a
              href="/transact/add/residential-type"
              style={{ color: "#2563eb" }}
            >
              Change
            </a>
          </div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ color: "#22c55e", marginRight: 6 }}>✓</span>
            You selected the <strong>&apos;{phaseLabel}&apos;</strong> phase.{" "}
            <a
              href="/transact/add/residential-phase"
              style={{ color: "#2563eb" }}
            >
              Change
            </a>
          </div>
          <div>
            <span style={{ color: "#22c55e", marginRight: 6 }}>✓</span>
            You represent the <strong>&apos;{partyLabel}&apos;</strong>.{" "}
            <a
              href="/transact/add/residential-party"
              style={{ color: "#2563eb" }}
            >
              Change
            </a>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 1.2fr) minmax(320px, 1.1fr)",
            gap: 24,
            alignItems: "flex-start",
          }}
        >
          {/* LEFT – Who is the client */}
          <section>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 10px 0",
              }}
            >
              Who is the {partyLabel}?
            </h2>

            {/* Selected contact card */}
            <div
              style={{
                borderRadius: 20,
                border: "1px dashed #d1d5db",
                background: "#ffffff",
                padding: 14,
                minHeight: 110,
                display: "flex",
                alignItems: "center",
                justifyContent: selectedContactId ? "flex-start" : "center",
              }}
            >
              {selectedContactId ? (
                (() => {
                  const contact = MOCK_CONTACTS.find(
                    (c) => c.id === selectedContactId
                  );
                  if (!contact) return <span>Not selected.</span>;
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background:
                            "linear-gradient(135deg,#e5e7eb,#f3f4f6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 22,
                        }}
                      >
                        👤
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {contact.name}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "#6b7280",
                          }}
                        >
                          {contact.company}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#6b7280",
                            marginTop: 2,
                          }}
                        >
                          {contact.email} · {contact.phone}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedContactId(null)}
                        style={{
                          border: "none",
                          background: "transparent",
                          fontSize: 18,
                          cursor: "pointer",
                          color: "#9ca3af",
                        }}
                        aria-label="Clear contact"
                      >
                        ×
                      </button>
                    </div>
                  );
                })()
              ) : (
                <span
                  style={{
                    fontSize: 14,
                    color: "#9ca3af",
                  }}
                >
                  Not selected.
                </span>
              )}
            </div>

            {/* Contact list selector */}
            <div
              style={{
                marginTop: 10,
                fontSize: 13,
                color: "#4b5563",
              }}
            >
              <div
                style={{
                  marginBottom: 6,
                  color: "#6b7280",
                }}
              >
                Select an existing contact:
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {MOCK_CONTACTS.map((contact) => {
                  const isActive = contact.id === selectedContactId;
                  return (
                    <button
                      key={contact.id}
                      type="button"
                      onClick={() => setSelectedContactId(contact.id)}
                      style={{
                        borderRadius: 999,
                        border: isActive
                          ? "2px solid #2563eb"
                          : "1px solid #e5e7eb",
                        padding: "7px 12px",
                        background: isActive ? "#eff6ff" : "#ffffff",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 13,
                        color: "#111827",
                      }}
                    >
                      <span>{contact.name}</span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                        }}
                      >
                        {contact.email}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowQuickAdd((prev) => !prev)}
              style={{
                marginTop: 10,
                padding: 0,
                border: "none",
                background: "transparent",
                fontSize: 13,
                color: "#2563eb",
                cursor: "pointer",
              }}
            >
              + Add new contact
            </button>
          </section>

          {/* RIGHT – Confirm & Save */}
          <section>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 8px 0",
              }}
            >
              Confirm &amp; Save
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginTop: 0,
                marginBottom: 14,
              }}
            >
              First, add at least one primary client so Back Boss can sync
              people, documents, and compliance tasks. Then create the
              transaction to jump into the Summary view.
            </p>

            {/* Quick add form – appears under the card, not beside it */}
            {showQuickAdd && (
              <div
                style={{
                  marginTop: 8,
                  marginBottom: 16,
                  borderRadius: 20,
                  background: "#ffffff",
                  boxShadow: "0 10px 30px rgba(15,23,42,0.20)",
                  padding: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Quick add {partyLabel.toLowerCase()}</span>
                  <span
                    style={{
                      ...pillStyle,
                      padding: "3px 9px",
                      background: "#eff6ff",
                      color: "#2563eb",
                      letterSpacing: 0.8,
                    }}
                  >
                    Preview only
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <input
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={inputStyle}
                    disabled={noCompany}
                  />
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: "#6b7280",
                      marginTop: 6,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={noCompany}
                      onChange={(e) => setNoCompany(e.target.checked)}
                    />
                    No company name available.
                  </label>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <input
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "In a later phase this will create a shared contact record for your office."
                    )
                  }
                  style={{
                    marginTop: 4,
                    width: "100%",
                    borderRadius: 999,
                    border: "none",
                    padding: "9px 16px",
                    background: "#111827",
                    color: "#f9fafb",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Add New Contact (Preview)
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleCreateTransaction}
              style={{
                marginTop: showQuickAdd ? 0 : 10,
                width: "100%",
                borderRadius: 999,
                border: "none",
                padding: "12px 18px",
                background:
                  "linear-gradient(135deg,#2563eb,#1d4ed8,#3b82f6)",
                color: "#f9fafb",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 16px 40px rgba(37,99,235,0.55)",
              }}
            >
              Create New Transaction
            </button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  border: "1px solid #e5e7eb",
  padding: "8px 14px",
  fontSize: 13,
  outline: "none",
};

export default ResidentialConfirm;

export const getServerSideProps: GetServerSideProps<ConfirmProps> = async (
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

  const { party, phase, sale } = context.query;

  const partyValue = typeof party === "string" ? party.toLowerCase() : null;
  const phaseValue = typeof phase === "string" ? phase.toLowerCase() : null;
  const saleValue = typeof sale === "string" ? sale.toLowerCase() : null;

  return {
    props: {
      userEmail: session.user?.email ?? null,
      party:
        partyValue === "buyer" || partyValue === "seller"
          ? (partyValue as ConfirmProps["party"])
          : "seller",
      phase:
        phaseValue === "start" ||
        phaseValue === "showing" ||
        phaseValue === "contract" ||
        phaseValue === "pre-closing" ||
        phaseValue === "post-closing"
          ? (phaseValue as ConfirmProps["phase"])
          : "contract",
      saleOrLease:
        saleValue === "sale" || saleValue === "lease"
          ? (saleValue as ConfirmProps["saleOrLease"])
          : "sale",
    },
  };
};
