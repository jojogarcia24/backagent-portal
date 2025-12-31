import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type DocumentsBuyerAllAllProps = {
  userEmail: string | null;
};

type RuleSetting = "Required" | "Recommended";

type RuleRow = {
  title: string;
  setting: RuleSetting;
  where: string;
  except: string;
  phaseLabel: string;
  sortCode: string;
};

type PhaseSection = {
  key: string;
  label: string;
  countLabel: string;
  rules: RuleRow[];
};

const pageTitleStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 800,
  letterSpacing: -0.5,
  color: "#f9fafb",
  marginBottom: 6,
};

const pageSubTitleStyle: React.CSSProperties = {
  fontSize: 15,
  color: "rgba(226,232,240,0.9)",
  maxWidth: 820,
};

const mainCardStyle: React.CSSProperties = {
  marginTop: 24,
  background: "rgba(248,250,252,0.97)",
  borderRadius: 28,
  padding: 22,
  boxShadow: "0 24px 70px rgba(15,23,42,0.78)",
  border: "1px solid rgba(148,163,184,0.4)",
  display: "flex",
  gap: 18,
};

const sidebarStyle: React.CSSProperties = {
  width: 240,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const searchInputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.7)",
  padding: "7px 10px",
  fontSize: 13,
  outline: "none",
  background: "#ffffff",
};

const sidebarSectionTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  color: "#6b7280",
  letterSpacing: 0.7,
  marginTop: 6,
  marginBottom: 4,
};

const pillListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const sidebarPillStyle: React.CSSProperties = {
  borderRadius: 999,
  padding: "6px 10px",
  fontSize: 13,
  border: "1px solid rgba(209,213,219,0.9)",
  background: "#ffffff",
  color: "#374151",
  cursor: "default",
  textAlign: "left",
};

const sidebarPillActiveStyle: React.CSSProperties = {
  ...sidebarPillStyle,
  background: "#020617",
  borderColor: "#020617",
  color: "#f9fafb",
  fontWeight: 600,
};

const addDocButtonStyle: React.CSSProperties = {
  marginTop: 10,
  borderRadius: 999,
  background:
    "linear-gradient(135deg, #020617, #0f172a 40%, #1d4ed8 100%)",
  color: "#f9fafb",
  border: "none",
  padding: "8px 14px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 16px 40px rgba(15,23,42,0.75)",
};

const mainAreaStyle: React.CSSProperties = {
  flex: 1,
  borderRadius: 20,
  background: "#f9fafb",
  border: "1px solid rgba(209,213,219,0.9)",
  padding: 18,
  maxHeight: "70vh",
  overflowY: "auto",
};

const helpHeaderStyle: React.CSSProperties = {
  marginBottom: 18,
};

const helpTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#111827",
};

const helpSubStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#4b5563",
};

const contactLinkStyle: React.CSSProperties = {
  color: "#1d4ed8",
  textDecoration: "none",
};

const stageHeaderStyle: React.CSSProperties = {
  marginTop: 18,
  marginBottom: 4,
  borderRadius: 999,
  background: "#020617",
  color: "#f9fafb",
  padding: "6px 12px",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 0.5,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const stageStatStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "#bfdbfe",
};

const docRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 3.2fr) minmax(0, 2fr) 90px 80px",
  alignItems: "flex-start",
  padding: "10px 8px",
  borderBottom: "1px solid rgba(229,231,235,0.95)",
  fontSize: 13,
  background: "#ffffff",
};

const docNameStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "#ea580c",
  cursor: "default",
};

const docMetaStyle: React.CSSProperties = {
  marginTop: 4,
  fontSize: 11,
  color: "#4b5563",
};

const requiredBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  fontSize: 11,
  color: "#92400e",
  background: "rgba(251,191,36,0.16)",
  borderRadius: 999,
  padding: "2px 8px",
  marginRight: 6,
  border: "1px solid rgba(245,158,11,0.7)",
};

const requiredIconStyle: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: 3,
  border: "2px solid #f97316",
};

const whereLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  color: "#6b7280",
};

const stageTextStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#111827",
};

const codeTextStyle: React.CSSProperties = {
  fontSize: 11,
  color: "#6b7280",
  textAlign: "right",
};

const phaseFooterDivider: React.CSSProperties = {
  borderTop: "1px solid rgba(229,231,235,0.9)",
  marginTop: 6,
  marginBottom: 4,
};

const phaseFooterText: React.CSSProperties = {
  fontSize: 11,
  color: "#6b7280",
};

// ===== DATASET: Residential Sale / Buyer / All Statuses / Displayed: All =====

const startRules: RuleRow[] = [
  {
    title: "General Information and Notice to Buyer",
    setting: "Required",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "Start",
    sortCode: "20",
  },
  {
    title: "General Information and Notice to Seller",
    setting: "Required",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "Start",
    sortCode: "20",
  },
  {
    title: "Information about Brokerage Services",
    setting: "Required",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "Start",
    sortCode: "20",
  },
  {
    title: "Wire Fraud Warning",
    setting: "Required",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "Start",
    sortCode: "20",
  },
  {
    title: "Buyer Walkthrough and Acceptance Form",
    setting: "Required",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "Start",
    sortCode: "40",
  },
  {
    title: "Initial Contact Form",
    setting: "Recommended",
    where: "USDA",
    except: "No Exceptions",
    phaseLabel: "Start",
    sortCode: "45",
  },
  {
    title: "Pre-Qualification Worksheet",
    setting: "Recommended",
    where: "USDA",
    except: "No Exceptions",
    phaseLabel: "Start",
    sortCode: "45",
  },
  {
    title: "Uniform Residential Loan Application",
    setting: "Recommended",
    where: "USDA",
    except: "No Exceptions",
    phaseLabel: "Start",
    sortCode: "45",
  },
  {
    title: "USDA Authorization to Release Information",
    setting: "Recommended",
    where: "USDA",
    except: "No Exceptions",
    phaseLabel: "Start",
    sortCode: "45",
  },
  {
    title: "Buyer’s Representation Agreement",
    setting: "Required",
    where: "TMRE",
    except: "No Exceptions",
    phaseLabel: "Start",
    sortCode: "40",
  },
  // Header shows 20; remaining items can be appended later if needed.
];

const showingRules: RuleRow[] = [
  {
    title: "Buyer Walkthrough and Acceptance Form",
    setting: "Required",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "PreContract",
    sortCode: "40",
  },
  {
    title: "One-Time Showing Agreement",
    setting: "Recommended",
    where: "NOCO",
    except: "No Exceptions",
    phaseLabel: "PreContract",
    sortCode: "50",
  },
  {
    title: "Open House / Showing Feedback Form",
    setting: "Recommended",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "PreContract",
    sortCode: "55",
  },
];

const contractRules: RuleRow[] = [
  {
    title: "Compensation Agreement Between Brokers",
    setting: "Required",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "20",
  },
  {
    title: "Disclosure of Relationship with Residential Service Company",
    setting: "Required",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "20",
  },
  {
    title: "Information about Brokerage Services for Co-op Client",
    setting: "Required",
    where: "BOTH, NOCO",
    except: "BLDP, HUDF, REOF",
    phaseLabel: "Contract",
    sortCode: "50",
  },
  {
    title: "ADDENDUM REGARDING BROKERS’ FEES",
    setting: "Required",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "60",
  },
  {
    title: "Residential Contract",
    setting: "Required",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "60",
  },
  {
    title: "Addendum for Property Subj. to Mand. Membership in Owners' Assoc.",
    setting: "Required",
    where: "HOAP",
    except: "BLDP",
    phaseLabel: "Contract",
    sortCode: "61",
  },
  {
    title:
      "Addendum for Seller's Disclosure of Information on Lead-Based Paint (Signed by all parties)",
    setting: "Required",
    where: "BE78",
    except: "BLDR, BLDP, HUDF, REOF",
    phaseLabel: "Contract",
    sortCode: "61",
  },
  {
    title: "Information about Special Flood Hazard Areas",
    setting: "Required",
    where: "FLDP",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "61",
  },
  {
    title: "Intermediary Notice",
    setting: "Required",
    where: "INHO",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "61",
  },
  {
    title: "Notice to Purchaser of Real Property in a Water District",
    setting: "Recommended",
    where: "MUDP",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "61",
  },
  {
    title: "Seller Financing Addendum",
    setting: "Required",
    where: "SOFI",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "61",
  },
  {
    title: "Seller's Disclosure Notice (Signed by all parties)",
    setting: "Required",
    where: "Show Always",
    except: "BLDP, HUDF, LAND, REOF",
    phaseLabel: "Contract",
    sortCode: "61",
  },
  {
    title: "Short Sale Addendum",
    setting: "Required",
    where: "SHRT",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "61",
  },
  {
    title: "Third Party Financing Addendum",
    setting: "Required",
    where: "CONM, FHAM, USDA, VETM",
    except: "BLDP, HUDF, REOF",
    phaseLabel: "Contract",
    sortCode: "61",
  },
  {
    title: "Amendment to Extend Closing Date",
    setting: "Required",
    where: "HAMD",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "63",
  },
  {
    title: "Site Survey",
    setting: "Recommended",
    where: "SVNO",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "70",
  },
  {
    title: "T-47 Residential Real Property Affidavit",
    setting: "Recommended",
    where: "SVSE",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "70",
  },
  {
    title: "HOA Resale Certificate",
    setting: "Recommended",
    where: "HOAP",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "72",
  },
  {
    title: "Temporary Residential Lease (Buyer)",
    setting: "Recommended",
    where: "TEMP",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "75",
  },
  {
    title: "Other Brokerage / Local Office Addendum",
    setting: "Recommended",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "Contract",
    sortCode: "79",
  },
  // Header shows 71 total; remaining items can be appended here later as needed.
];

const termContractRules: RuleRow[] = [
  {
    title: "Notice of Buyer's Termination of Contract",
    setting: "Required",
    where: "TMCO",
    except: "No Exceptions",
    phaseLabel: "TermContract",
    sortCode: "68",
  },
  {
    title: "Release of Earnest Money",
    setting: "Required",
    where: "TMCO",
    except: "No Exceptions",
    phaseLabel: "TermContract",
    sortCode: "68",
  },
];

const preClosingRules: RuleRow[] = [
  {
    title: "Closing Walkthrough – Final Punch List",
    setting: "Recommended",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "PreClosing",
    sortCode: "75",
  },
  {
    title: "Utility Transfer Checklist",
    setting: "Recommended",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "PreClosing",
    sortCode: "76",
  },
  {
    title: "HOA Dues Verification",
    setting: "Recommended",
    where: "HOAP",
    except: "No Exceptions",
    phaseLabel: "PreClosing",
    sortCode: "77",
  },
  {
    title: "Final Loan Approval Notice",
    setting: "Recommended",
    where: "FHAM, CONM, USDA, VETM",
    except: "No Exceptions",
    phaseLabel: "PreClosing",
    sortCode: "78",
  },
  {
    title: "Title Commitment Review Notes",
    setting: "Recommended",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "PreClosing",
    sortCode: "79",
  },
];

const postClosingRules: RuleRow[] = [
  {
    title: "Closing Disclosure / HUD-1 Settlement",
    setting: "Required",
    where: "Show Always",
    except: "TMCO, TMRE",
    phaseLabel: "PostClosing",
    sortCode: "80",
  },
  {
    title: "Recorded Deed / Final Title Policy",
    setting: "Recommended",
    where: "Show Always",
    except: "No Exceptions",
    phaseLabel: "PostClosing",
    sortCode: "82",
  },
];

const submitRules: RuleRow[] = [
  {
    title: "Funding Request",
    setting: "Required",
    where: "Show Always",
    except: "TMNF",
    phaseLabel: "Submit",
    sortCode: "90",
  },
];

const confirmationRules: RuleRow[] = [
  {
    title: "Funding Confirmation",
    setting: "Required",
    where: "Show Always",
    except: "TMNF",
    phaseLabel: "Confirmation",
    sortCode: "91",
  },
  {
    title: "Disbursement Authorization",
    setting: "Required",
    where: "HCDA",
    except: "TMNF",
    phaseLabel: "Confirmation",
    sortCode: "92",
  },
  {
    title: "Contribution Letter for Buyer",
    setting: "Required",
    where: "HCLB",
    except: "TMNF",
    phaseLabel: "Confirmation",
    sortCode: "93",
  },
  {
    title: "Contribution Letter for Seller",
    setting: "Required",
    where: "HCLS",
    except: "TMNF",
    phaseLabel: "Confirmation",
    sortCode: "93",
  },
];

const phaseSections: PhaseSection[] = [
  {
    key: "start",
    label: "Start",
    countLabel: "20",
    rules: startRules,
  },
  {
    key: "showing",
    label: "Showing",
    countLabel: "3",
    rules: showingRules,
  },
  {
    key: "contract",
    label: "Contract",
    countLabel: "71",
    rules: contractRules,
  },
  {
    key: "term-contract",
    label: "Termination (Contract)",
    countLabel: "2",
    rules: termContractRules,
  },
  {
    key: "pre-closing",
    label: "Pre-Closing",
    countLabel: "5",
    rules: preClosingRules,
  },
  {
    key: "post-closing",
    label: "Post-Closing",
    countLabel: "2",
    rules: postClosingRules,
  },
  {
    key: "submit",
    label: "Submit",
    countLabel: "1",
    rules: submitRules,
  },
  {
    key: "confirmation",
    label: "Confirmation",
    countLabel: "4",
    rules: confirmationRules,
  },
];

function renderSettingBadge(setting: RuleSetting): JSX.Element {
  if (setting === "Required") {
    return (
      <span style={requiredBadgeStyle}>
        <span style={requiredIconStyle} />
        <span>Required</span>
      </span>
    );
  }
  return (
    <span
      style={{
        ...requiredBadgeStyle,
        background: "rgba(191,219,254,0.25)",
        borderColor: "#3b82f6",
        color: "#1d4ed8",
      }}
    >
      <span
        style={{
          ...requiredIconStyle,
          borderColor: "#3b82f6",
        }}
      />
      <span>Recommended</span>
    </span>
  );
}

function DocumentsBuyerAllAllPage({ userEmail }: DocumentsBuyerAllAllProps) {
  const phases = phaseSections;
  const totalRules = phases.reduce((sum, p) => sum + p.rules.length, 0);

  return (
    <AppShell userEmail={userEmail} activeTab="Start">
      <div>
        <h1 style={pageTitleStyle}>Document Requirements</h1>
        <p style={pageSubTitleStyle}>
          TX / Elite Living Realty – Buyer-side document rules that power the
          Transact checklist. This profile is for{" "}
          <strong>Residential Sale · Buyer · All Statuses · All docs displayed</strong>.
        </p>

        <div style={mainCardStyle}>
          {/* Sidebar */}
          <aside style={sidebarStyle}>
            <input placeholder="Title search" style={searchInputStyle} />
            <input
              placeholder="Condition search"
              style={searchInputStyle}
            />

            <div>
              <div style={sidebarSectionTitleStyle}>Deal Type</div>
              <div style={pillListStyle}>
                <button type="button" style={sidebarPillActiveStyle}>
                  Residential Sale
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Residential Lease
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Commercial Sale
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Commercial Lease
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Apartment Lease
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Referred / Referral Only
                </button>
              </div>
            </div>

            <div>
              <div style={sidebarSectionTitleStyle}>Party</div>
              <div style={pillListStyle}>
                <button type="button" style={sidebarPillStyle}>
                  Seller
                </button>
                <button type="button" style={sidebarPillActiveStyle}>
                  Buyer
                </button>
              </div>
            </div>

            <div>
              <div style={sidebarSectionTitleStyle}>Status</div>
              <div style={pillListStyle}>
                <button type="button" style={sidebarPillStyle}>
                  Active
                </button>
                <button type="button" style={sidebarPillActiveStyle}>
                  All
                </button>
              </div>
            </div>

            <div>
              <div style={sidebarSectionTitleStyle}>Displayed</div>
              <div style={pillListStyle}>
                <button type="button" style={sidebarPillStyle}>
                  Required
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Optional
                </button>
                <button type="button" style={sidebarPillActiveStyle}>
                  All
                </button>
              </div>
            </div>

            <button type="button" style={addDocButtonStyle}>
              + Add Document
            </button>
          </aside>

          {/* Main area */}
          <section style={mainAreaStyle}>
            <div style={helpHeaderStyle}>
              <div style={helpTitleStyle}>
                Have a question about the document requirements?
              </div>
              <div style={helpSubStyle}>
                The following document requirements are active for this
                profile. For assistance with this interface please{" "}
                <a
                  href="mailto:admin@dfweliteliving.com"
                  style={contactLinkStyle}
                >
                  contact us
                </a>
                .
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                <strong style={{ color: "#111827" }}>{totalRules}</strong> rules
                across <strong>{phases.length}</strong> phases for Buyer-side
                Residential Sale (All statuses, all docs displayed).
              </div>
              <div
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 999,
                  background: "rgba(22,163,74,0.1)",
                  color: "#15803d",
                  border: "1px solid rgba(22,163,74,0.4)",
                }}
              >
                ✅ Profile: Buyer · All · All displayed
              </div>
            </div>

            {phases.map((phase) => (
              <div key={phase.key}>
                <div style={stageHeaderStyle}>
                  <span>{phase.label}</span>
                  <span style={stageStatStyle}>
                    {phase.rules.length} doc
                    {phase.rules.length === 1 ? "" : "s"}
                  </span>
                </div>

                {phase.rules.map((rule, index) => (
                  <div
                    key={`${phase.key}-${index}-${rule.title}`}
                    style={{
                      ...docRowStyle,
                      borderBottom:
                        index === phase.rules.length - 1
                          ? "1px solid rgba(229,231,235,0.0)"
                          : "1px solid rgba(229,231,235,0.95)",
                    }}
                  >
                    <div>
                      <div style={docNameStyle}>{rule.title}</div>
                      <div style={docMetaStyle}>
                        {renderSettingBadge(rule.setting)}
                      </div>
                    </div>
                    <div>
                      <div>
                        <span style={whereLabelStyle}>Where: </span>
                        <span style={docMetaStyle}>{rule.where}</span>
                      </div>
                      <div style={{ marginTop: 2 }}>
                        <span style={whereLabelStyle}>Except: </span>
                        <span style={docMetaStyle}>{rule.except}</span>
                      </div>
                    </div>
                    <div style={stageTextStyle}>{rule.phaseLabel}</div>
                    <div style={codeTextStyle}>
                      <div>{rule.sortCode}</div>
                    </div>
                  </div>
                ))}

                <div style={{ padding: "2px 4px 8px 4px" }}>
                  <div style={phaseFooterDivider} />
                  <div style={phaseFooterText}>
                    {phase.rules.length === 0
                      ? "No documents required in this phase for this profile."
                      : `${phase.rules.length} document${
                          phase.rules.length === 1 ? "" : "s"
                        } in ${phase.label}.`}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </AppShell>
  );
}

export const getServerSideProps: GetServerSideProps<DocumentsBuyerAllAllProps> = async (
  context
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      userEmail: session?.user?.email ?? null,
    },
  };
};

export default DocumentsBuyerAllAllPage;
