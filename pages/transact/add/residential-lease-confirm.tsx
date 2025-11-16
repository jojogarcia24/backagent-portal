import React from "react";
import { useRouter } from "next/router";
import AppShell from "@/components/layout/AppShell";

const buttonPrimary: React.CSSProperties = {
  padding: "11px 26px",
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 700,
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#fff",
  boxShadow: "0 18px 45px rgba(37,99,235,0.55)",
};

const ResidentialLeaseConfirmPage: React.FC = () => {
  const router = useRouter();
  const { phase = "contract", party = "landlord" } = router.query;

  const handleCreate = () => {
    router.push(
      `/transact/summary?kind=residential&deal=lease&phase=${encodeURIComponent(
        String(phase)
      )}&party=${encodeURIComponent(String(party))}`
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
          <br />
          <span style={{ color: "#4ade80" }}>●</span> You represent the
          &apos;Landlord&apos;.{" "}
          <span style={{ color: "#93c5fd", cursor: "pointer" }}>Change</span>
        </p>

        <div
          style={{
            background: "rgba(15,23,42,0.9)",
            borderRadius: 32,
            padding: 24,
            boxShadow: "0 30px 80px rgba(15,23,42,0.65)",
            display: "grid",
            gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)",
            gap: 24,
          }}
        >
          <div
            style={{
              background: "rgba(15,23,42,0.92)",
              borderRadius: 24,
              padding: 20,
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                marginBottom: 12,
                color: "#f9fafb",
              }}
            >
              Who is the Landlord?
            </h2>
            <div
              style={{
                height: 150,
                borderRadius: 20,
                border: "1px dashed rgba(148,163,184,0.65)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(148,163,184,0.9)",
                fontSize: 14,
                background:
                  "radial-gradient(circle at top, rgba(148,163,184,0.15), transparent)",
              }}
            >
              Not selected.
            </div>
            <button
              style={{
                marginTop: 12,
                background: "transparent",
                border: "none",
                color: "#60a5fa",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              + Select Client
            </button>
          </div>

          <div
            style={{
              background: "rgba(15,23,42,0.92)",
              borderRadius: 24,
              padding: 20,
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                marginBottom: 8,
                color: "#f9fafb",
              }}
            >
              Confirm &amp; Save
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(209,213,219,0.92)",
                marginBottom: 16,
              }}
            >
              If everything looks good, you&apos;re ready to create the new
              lease file. In a later phase, this will sync to your transaction
              software and auto-build the full workspace.
            </p>
            <button style={buttonPrimary} onClick={handleCreate}>
              Create New Transaction
            </button>
            <p
              style={{
                fontSize: 12,
                color: "rgba(148,163,184,0.96)",
                marginTop: 10,
              }}
            >
              Demo note: for now, this jumps into a sample Back Boss snapshot so
              you can preview the transaction workspace.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default ResidentialLeaseConfirmPage;
