import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type TransactionProfilesProps = {
  userEmail: string | null;
};

const pageTitleStyle: React.CSSProperties = {
  fontSize: 36,
  fontWeight: 800,
  letterSpacing: -0.6,
  color: "#f9fafb",
  marginBottom: 8,
};

const pageSubTitleStyle: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.5,
  color: "rgba(226,232,240,0.9)",
  maxWidth: 780,
};

const mainCardStyle: React.CSSProperties = {
  marginTop: 26,
  background: "rgba(248,250,252,0.97)",
  borderRadius: 28,
  padding: 26,
  boxShadow: "0 24px 70px rgba(15,23,42,0.78)",
  border: "1px solid rgba(148,163,184,0.4)",
};

const cardHeaderRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  marginBottom: 20,
};

const profileTitleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 800,
  color: "#020617",
};

const profileSubStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.5,
  color: "#6b7280",
  marginTop: 6,
};

const badgeRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 10,
};

const baseBadgeStyle: React.CSSProperties = {
  fontSize: 11,
  padding: "5px 12px",
  borderRadius: 999,
  textTransform: "uppercase",
  letterSpacing: 0.12,
  fontWeight: 600,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

const complianceBadgeStyle: React.CSSProperties = {
  ...baseBadgeStyle,
  background: "rgba(22,163,74,0.09)",
  color: "#166534",
  border: "1px solid rgba(22,163,74,0.45)",
};

const residentialBadgeStyle: React.CSSProperties = {
  ...baseBadgeStyle,
  background: "rgba(59,130,246,0.09)",
  color: "#1d4ed8",
  border: "1px solid rgba(59,130,246,0.5)",
};

const officesBadgeStyle: React.CSSProperties = {
  ...baseBadgeStyle,
  background: "rgba(168,85,247,0.09)",
  color: "#7e22ce",
  border: "1px solid rgba(168,85,247,0.45)",
};

const colorDotStyle: React.CSSProperties = {
  width: 7,
  height: 7,
  borderRadius: "999px",
};

const statusPillStyle: React.CSSProperties = {
  fontSize: 13,
  padding: "7px 14px",
  borderRadius: 999,
  background: "rgba(22,163,74,0.09)",
  color: "#166534",
  border: "1px solid rgba(22,163,74,0.4)",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

const statusDotStyle: React.CSSProperties = {
  ...colorDotStyle,
  background: "#22c55e",
  boxShadow: "0 0 0 3px rgba(34,197,94,0.32)",
};

const contentRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 2.1fr) minmax(0, 1.1fr)",
  gap: 22,
  marginTop: 16,
};

const leftBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const rightBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: "#4b5563",
  textTransform: "uppercase",
  letterSpacing: 0.7,
};

const valueStyle: React.CSSProperties = {
  fontSize: 15.5,
  lineHeight: 1.55,
  color: "#111827",
  marginTop: 4,
};

const linkRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "11px 14px",
  borderRadius: 16,
  border: "1px solid rgba(148,163,184,0.6)",
  background: "rgba(255,255,255,0.98)",
  cursor: "pointer",
  transition: "box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease",
};

const linkMainTextStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

const linkTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: "#111827",
};

const linkSubTextStyle: React.CSSProperties = {
  fontSize: 12.5,
  color: "#6b7280",
};

const chevronStyle: React.CSSProperties = {
  fontSize: 18,
  color: "#9ca3af",
};

const footerNoteStyle: React.CSSProperties = {
  marginTop: 20,
  paddingTop: 12,
  borderTop: "1px dashed rgba(148,163,184,0.7)",
  fontSize: 13.5,
  color: "#4b5563",
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
};

const subtleMetaStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#9ca3af",
};

export const getServerSideProps: GetServerSideProps<
  TransactionProfilesProps
> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      userEmail: session?.user?.email ?? null,
    },
  };
};

export default function TransactionProfilesPage({
  userEmail,
}: TransactionProfilesProps) {
  return (
    <AppShell userEmail={userEmail} activeTab="Start">
      <div>
        <h1 style={pageTitleStyle}>Transaction Profiles</h1>
        <p style={pageSubTitleStyle}>
          Define which document rules apply by office, state, and deal type.
          Back Boss uses these profiles to power the reactive compliance system
          agents see inside Transact.
        </p>

        <div style={mainCardStyle}>
          <div style={cardHeaderRowStyle}>
            <div>
              <div style={profileTitleStyle}>TX • Elite Living Realty</div>
              <div style={profileSubStyle}>
                Office-level profile for Elite Living Realty in Texas. Rules in
                this profile roll down to all attached locations and agents.
              </div>

              <div style={badgeRowStyle}>
                <span style={complianceBadgeStyle}>
                  <span style={{ ...colorDotStyle, background: "#22c55e" }} />
                  Compliance
                </span>
                <span style={residentialBadgeStyle}>
                  <span style={{ ...colorDotStyle, background: "#60a5fa" }} />
                  Residential &amp; Lease
                </span>
                <span style={officesBadgeStyle}>
                  <span style={{ ...colorDotStyle, background: "#a855f7" }} />
                  Applies to: 4 Offices
                </span>
              </div>
            </div>

            <div>
              <div style={statusPillStyle}>
                <span style={statusDotStyle} />
                <span>Profile active • Production</span>
              </div>
            </div>
          </div>

          <div style={contentRowStyle}>
            {/* Left column */}
            <div style={leftBlockStyle}>
              <div>
                <div style={labelStyle}>Coverage</div>
                <div style={valueStyle}>
                  This profile covers all Elite Living Realty offices in Texas,
                  including DFW, Frisco, North Texas, and Virtual Office
                  locations.
                </div>
              </div>

              <div>
                <div style={labelStyle}>Deal Types</div>
                <div style={valueStyle}>
                  Residential Sale • Residential Lease • New Construction •
                  Farm &amp; Ranch (TxR) • Lot / Land.
                </div>
              </div>

              <a
                href="/control-panel/transaction-profiles/documents"
                style={{
                  ...linkRowStyle,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 18px 40px rgba(15,23,42,0.25)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-1px)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "#60a5fa";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "none";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(148,163,184,0.6)";
                }}
              >
                <div style={linkMainTextStyle}>
                  <span style={linkTitleStyle}>Documents</span>
                  <span style={linkSubTextStyle}>
                    789 rules as of Aug 20, 2025 • Includes core contracts,
                    addenda, disclosures, and brokerage docs.
                  </span>
                </div>
                <span style={chevronStyle}>›</span>
              </a>

              <button
                type="button"
                style={{
                  ...linkRowStyle,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 18px 40px rgba(15,23,42,0.25)";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(-1px)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#a855f7";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(148,163,184,0.6)";
                }}
              >
                <div style={linkMainTextStyle}>
                  <span style={linkTitleStyle}>Exception Rules</span>
                  <span style={linkSubTextStyle}>
                    Handles special cases like Table Funding, cash-only, and
                    investor non-MLS scenarios.
                  </span>
                </div>
                <span style={chevronStyle}>›</span>
              </button>
            </div>

            {/* Right column */}
            <div style={rightBlockStyle}>
              <div>
                <div style={labelStyle}>Who sees this</div>
                <div style={valueStyle}>
                  Broker/Owner, office managers, compliance staff, and system
                  admins. Agents only see the simplified checklist version
                  inside their transactions.
                </div>
              </div>

              <div>
                <div style={labelStyle}>Safety rails</div>
                <div style={valueStyle}>
                  Back Boss warns on missing critical docs (like contract,
                  disclosures, funding docs) and can auto-block CDA approval
                  until requirements are met.
                </div>
              </div>

              <div>
                <div style={labelStyle}>Last change</div>
                <div style={valueStyle}>
                  Updated by <strong>System Admin</strong> on{" "}
                  <strong>Aug 20, 2025 • 3:42 PM</strong>.
                </div>
              </div>
            </div>
          </div>

          <div style={footerNoteStyle}>
            <span>
              Settings at Elite Living Realty: <strong>Table Funding</strong> is
              currently <strong>On</strong>. Concierge and ARV workflows are
              enabled for Growth &amp; Elite tiers only.
            </span>
            <span style={subtleMetaStyle}>
              This is a preview-only mock. We&apos;ll wire this to real
              compliance rules once Airtable + Smart Compliance GPT are live.
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
