import React from "react";
import { useRouter } from "next/router";
import AppShell from "@/components/layout/AppShell";

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.96)",
  borderRadius: 24,
  padding: "18px 22px",
  marginBottom: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 18px 45px rgba(15,23,42,0.12)",
};

const left: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const title: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#050816",
};

const subtitle: React.CSSProperties = {
  fontSize: 14,
  color: "rgba(15,23,42,0.7)",
};

const buttonBase: React.CSSProperties = {
  minWidth: 120,
  padding: "9px 20px",
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
  transition: "all 0.18s ease-out",
};

const primaryButton: React.CSSProperties = {
  ...buttonBase,
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#fff",
  boxShadow: "0 14px 35px rgba(37,99,235,0.45)",
};

const secondaryButton: React.CSSProperties = {
  ...buttonBase,
  background: "#f3f4f6",
  color: "#111827",
};

const ResidentialLeasePartyPage: React.FC = () => {
  const router = useRouter();
  const { phase = "contract" } = router.query;

  const goNext = (party: string) => {
    router.push(
      `/transact/add/residential-lease-confirm?phase=${encodeURIComponent(
        String(phase)
      )}&party=${encodeURIComponent(party)}`
    );
  };

  return (
    <AppShell>
      <div
        style={{
          padding: "32px 32px 40px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "rgba(249,250,251,0.9)", marginBottom: 8 }}>
          TRANSACT / ADD TRANSACTION
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#f9fafb",
            marginBottom: 8,
          }}
        >
          Add Transaction
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "rgba(229,231,235,0.9)",
            maxWidth: 650,
            marginBottom: 28,
          }}
        >
          <span style={{ color: "#4ade80" }}>●</span> You selected the
          &apos;Residential&apos; category.{" "}
          <span style={{ color: "#93c5fd", cursor: "pointer" }}>Change</span>
          <br />
          <span style={{ color: "#4ade80" }}>●</span> You selected the
          &apos;Lease&apos; type.{" "}
          <span style={{ color: "#93c5fd", cursor: "pointer" }}>Change</span>
          <br />
          <span style={{ color: "#4ade80" }}>●</span> You selected the
          &apos;Contract&apos; phase.{" "}
          <span style={{ color: "#93c5fd", cursor: "pointer" }}>Change</span>
        </p>

        <div
          style={{
            background: "rgba(15,23,42,0.9)",
            borderRadius: 32,
            padding: 24,
            boxShadow: "0 30px 80px rgba(15,23,42,0.65)",
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 8,
              color: "#f9fafb",
            }}
          >
            Which party do you represent?
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(209,213,219,0.92)",
              marginBottom: 24,
            }}
          >
            Tell Back Boss which side you&apos;re on so we can apply the right
            docs, splits, and timelines.
          </p>

          <div style={card}>
            <div style={left}>
              <span style={title}>Landlord</span>
              <span style={subtitle}>
                The property owner or management company.
              </span>
            </div>
            <button style={primaryButton} onClick={() => goNext("landlord")}>
              Select
            </button>
          </div>

          <div style={card}>
            <div style={left}>
              <span style={title}>Landlord &amp; Tenant</span>
              <span style={subtitle}>Both sides of the transaction.</span>
            </div>
            <button style={secondaryButton} onClick={() => goNext("landlord-tenant")}>
              Select
            </button>
          </div>

          <div style={card}>
            <div style={left}>
              <span style={title}>Tenant</span>
              <span style={subtitle}>The lease or rent payer.</span>
            </div>
            <button style={secondaryButton} onClick={() => goNext("tenant")}>
              Select
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default ResidentialLeasePartyPage;
