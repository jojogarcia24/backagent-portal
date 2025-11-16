import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const pageStyles: React.CSSProperties = {
  minHeight: "100vh",
  padding: "32px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  backgroundImage: "url('/images/backboss-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const overlayStyles: React.CSSProperties = {
  width: "100%",
  maxWidth: "1120px",
  borderRadius: "24px",
  padding: "32px",
  background:
    "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.92))",
  border: "1px solid rgba(148,163,184,0.55)",
  boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
  backdropFilter: "blur(16px)",
};

const headerRowStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "24px",
};

const titleStyles: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  color: "#ffffff",
  letterSpacing: "0.02em",
};

const subtitleStyles: React.CSSProperties = {
  marginTop: "8px",
  fontSize: "15px",
  color: "rgba(226,232,240,0.78)",
  maxWidth: "640px",
};

const pillStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 14px",
  borderRadius: "999px",
  border: "1px solid rgba(56,189,248,0.4)",
  background:
    "radial-gradient(circle at top left, rgba(56,189,248,0.25), transparent)",
  color: "rgba(226,232,240,0.9)",
  fontSize: "12px",
  fontWeight: 500,
};

const helperTextStyles: React.CSSProperties = {
  fontSize: "12px",
  color: "rgba(148,163,184,0.9)",
};

const gridStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
  marginTop: "16px",
};

const cardStyles: React.CSSProperties = {
  borderRadius: "20px",
  padding: "20px",
  border: "1px solid rgba(148,163,184,0.45)",
  background:
    "radial-gradient(circle at top left, rgba(37,99,235,0.22), rgba(15,23,42,0.97))",
  boxShadow: "0 18px 40px rgba(15,23,42,0.95)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "170px",
};

const cardTitleStyles: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  color: "#f9fafb",
  marginBottom: "6px",
};

const cardBadgeRowStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
};

const chipStyles: React.CSSProperties = {
  fontSize: "11px",
  padding: "3px 9px",
  borderRadius: "999px",
  border: "1px solid rgba(148,163,184,0.7)",
  color: "rgba(226,232,240,0.9)",
};

const cardTextStyles: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(209,213,219,0.9)",
  lineHeight: 1.5,
  marginBottom: "14px",
};

const footerRowStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "8px",
};

const selectButtonStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 18px",
  borderRadius: "999px",
  border: "1px solid rgba(59,130,246,0.9)",
  background:
    "radial-gradient(circle at top left, rgba(59,130,246,0.38), rgba(15,23,42,1))",
  color: "#e5f0ff",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
  boxShadow: "0 0 18px rgba(37,99,235,0.7)",
};

const hintRowStyles: React.CSSProperties = {
  marginTop: "24px",
  paddingTop: "16px",
  borderTop: "1px dashed rgba(75,85,99,0.85)",
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  flexWrap: "wrap",
};

const hintTextStyles: React.CSSProperties = {
  fontSize: "12px",
  color: "rgba(148,163,184,0.9)",
  maxWidth: "520px",
};

const hintAccentStyles: React.CSSProperties = {
  fontSize: "12px",
  color: "rgba(96,165,250,0.96)",
};

const ResidentialRepresentationPage: NextPage = () => {
  const router = useRouter();

  const rawType =
    typeof router.query.type === "string" ? router.query.type.toLowerCase() : undefined;

  const typeParam = rawType === "lease" ? "lease" : "sale";
  const isLease = typeParam === "lease";

  const phaseParam =
    typeof router.query.phase === "string" && router.query.phase.trim() !== ""
      ? router.query.phase
      : "contract";

  const transactionLabel = isLease ? "Residential Lease" : "Residential Sale";

  const saleOptions = [
    {
      key: "seller",
      label: "Seller Only",
      badge: "Listing Side",
      description:
        "You represent the seller only. Back Boss will focus on listing-side milestones, offer review, and co-op agent coordination.",
    },
    {
      key: "seller_buyer",
      label: "Seller & Buyer (Dual)",
      badge: "Dual Representation",
      description:
        "You represent both the seller and the buyer. Extra compliance checks and disclosures will be highlighted automatically.",
    },
    {
      key: "buyer",
      label: "Buyer Only",
      badge: "Buyer Side",
      description:
        "You represent the buyer only. Timelines, offer strategy, and co-op listing agent details will be front and center.",
    },
  ];

  const leaseOptions = [
    {
      key: "landlord",
      label: "Landlord Only",
      badge: "Listing Side",
      description:
        "You represent the landlord only. We’ll focus on marketing, screening, lease terms, and move-in requirements.",
    },
    {
      key: "landlord_tenant",
      label: "Landlord & Tenant (Dual)",
      badge: "Dual Representation",
      description:
        "You represent both landlord and tenant. Back Boss will surface any extra disclosures or approvals needed.",
    },
    {
      key: "tenant",
      label: "Tenant Only",
      badge: "Tenant Side",
      description:
        "You represent the tenant only. Application deadlines, deposits, and move-in prep will be tracked for you.",
    },
  ];

  const options = isLease ? leaseOptions : saleOptions;

  const buildConfirmHref = (representationKey: string): string => {
    const params = new URLSearchParams();
    params.set("type", typeParam);
    params.set("representation", representationKey);
    params.set("phase", phaseParam);

    if (typeof router.query.from === "string") {
      params.set("from", router.query.from);
    }
    if (typeof router.query.ref === "string") {
      params.set("ref", router.query.ref);
    }

    return `/transact/add/residential-confirm?${params.toString()}`;
  };

  const prettyPhase =
    phaseParam === "contract"
      ? "Contract"
      : phaseParam.charAt(0).toUpperCase() + phaseParam.slice(1);

  return (
    <AppShell>
      <div style={pageStyles}>
        <div style={overlayStyles}>
          <div style={headerRowStyles}>
            <div>
              <div style={pillStyles}>
                <span style={{ marginRight: 8 }}>✨</span>
                <span>Step 3 &middot; Representation</span>
              </div>
              <h1 style={titleStyles}>
                {transactionLabel} &mdash; Who are you representing?
              </h1>
              <p style={subtitleStyles}>
                Choose how you are involved in this file. Back Boss will tailor
                the timeline, compliance checks, and document list based on your
                representation so you&apos;re never guessing what comes next.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={helperTextStyles}>
                Track:{" "}
                <span style={{ color: "#a5b4fc", fontWeight: 600 }}>
                  {isLease ? "Lease" : "Sale"}
                </span>
              </div>
              <div style={helperTextStyles}>
                Phase:{" "}
                <span style={{ color: "#93c5fd", fontWeight: 600 }}>
                  {prettyPhase}
                </span>
              </div>
            </div>
          </div>

          <div style={gridStyles}>
            {options.map((option) => (
              <div key={option.key} style={cardStyles}>
                <div>
                  <div style={cardBadgeRowStyles}>
                    <span style={chipStyles}>{option.badge}</span>
                    <span style={chipStyles}>{transactionLabel}</span>
                  </div>
                  <div style={cardTitleStyles}>{option.label}</div>
                  <p style={cardTextStyles}>{option.description}</p>
                </div>
                <div style={footerRowStyles}>
                  <div style={helperTextStyles}>
                    Back Boss will auto-configure roles, docs, and checklist for
                    this representation.
                  </div>
                  <Link href={buildConfirmHref(option.key)} legacyBehavior>
                    <a style={selectButtonStyles}>
                      Select
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: "14px",
                          transform: "translateY(0.5px)",
                        }}
                      >
                        ↗
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={hintRowStyles}>
            <p style={hintTextStyles}>
              <span style={hintAccentStyles}>Quick guide:</span> If you&apos;re
              listing the property, choose <strong>Seller / Landlord</strong>. If
              you&apos;re only bringing the buyer or tenant, select{" "}
              <strong>Buyer / Tenant</strong>. For dual representation, choose the
              combined option and Back Boss will surface extra guardrails.
            </p>
            <p style={hintTextStyles}>
              You can always adjust representation later from the{" "}
              <strong>People</strong> tab on the transaction summary if the deal
              structure changes mid-transaction.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default ResidentialRepresentationPage;
