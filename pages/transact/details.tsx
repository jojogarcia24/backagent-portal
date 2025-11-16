import React from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type DetailsProps = {
  userEmail: string | null;
};

type TabDef = {
  label: string;
  count: number;
  icon: string;
  active?: boolean;
  path?: string;
};

const pageWrapperStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "32px 20px 48px",
};

const headerTextWrapperStyle: React.CSSProperties = {
  marginBottom: 10,
};

const titleStyle: React.CSSProperties = {
  fontSize: 40,
  lineHeight: 1.2,
  fontWeight: 800,
  color: "#f9fafb",
  marginBottom: 10,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 18,
  color: "#e5e7eb",
  maxWidth: 680,
};

const breadcrumbRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 12,
  letterSpacing: 1,
  textTransform: "uppercase",
  color: "#e5e7eb",
  marginTop: 14,
  marginBottom: 14,
};

const breadcrumbItemStyle: React.CSSProperties = { opacity: 0.9 };
const breadcrumbCurrentStyle: React.CSSProperties = { opacity: 1, fontWeight: 600 };
const breadcrumbSeparatorStyle: React.CSSProperties = { opacity: 0.7 };

const mainCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 20px 55px rgba(15,23,42,0.45)",
  border: "1px solid rgba(148,163,184,0.2)",
};

const cardHeaderRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 20,
};

const leftHeaderBlockStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const partyPillStyleBase: React.CSSProperties = {
  padding: "5px 12px",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 0.5,
};

const fileTitleStyle: React.CSSProperties = {
  fontSize: 21,
  fontWeight: 700,
  color: "#0f172a",
};

const fileSubTitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
};

const rightHeaderBlockStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const agentMetaStyle: React.CSSProperties = { textAlign: "right" };
const agentNameStyle: React.CSSProperties = { fontSize: 16, fontWeight: 600, color: "#0f172a" };
const agentDetailsStyle: React.CSSProperties = { fontSize: 13, color: "#6b7280" };

const submitButtonStyle: React.CSSProperties = {
  padding: "11px 24px",
  borderRadius: 999,
  border: "none",
  background: "#276bff",
  color: "#ffffff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
  whiteSpace: "nowrap",
};

const snapshotButtonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.6)",
  background: "rgba(15,23,42,0.9)",
  color: "#e5e7eb",
  fontSize: 14,
  fontWeight: 500,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
};

const snapshotDotStyle: React.CSSProperties = {
  width: 7,
  height: 7,
  borderRadius: 999,
  background: "#22c55e",
};

const phaseDotsContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 6,
  marginBottom: 18,
};

const phaseDotStyleBase: React.CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: 999,
  backgroundColor: "#e5e7eb",
};

const phaseDotActiveStyle: React.CSSProperties = {
  backgroundColor: "#276bff",
};

const phaseDotCompleteStyle: React.CSSProperties = {
  backgroundColor: "#22c55e",
};

const tabBarContainerStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 16,
  marginBottom: 26,
};

const tabsRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "nowrap",
};

const tabStyleBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  padding: "12px 18px",
  borderRadius: 999,
  fontSize: 14,
  cursor: "pointer",
  flex: 1,
  minWidth: 0,
  transition: "all 0.16s ease-out",
};

const tabLeftStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  minWidth: 0,
};

const tabLabelStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontWeight: 600,
};

const tabCountPillStyle: React.CSSProperties = {
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 700,
};

const tabIconStyle: React.CSSProperties = {
  fontSize: 17,
};

const sectionIntroWrapperStyle: React.CSSProperties = {
  marginBottom: 18,
};

const sectionIntroTitleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: 4,
};

const sectionIntroBodyStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#4b5563",
};

const detailsColumnsWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const detailsCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 22,
  padding: 18,
  border: "1px solid rgba(209,213,219,0.9)",
  boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
};

const detailsCardHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
};

const detailsCardTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: "#0f172a",
};

const detailsCardSubStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
  marginBottom: 8,
};

const setPropertyButtonStyle: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 999,
  border: "none",
  background: "#111827",
  color: "#f9fafb",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const qaRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 14,
  padding: "4px 0",
  gap: 16,
};

const qaQuestionStyle: React.CSSProperties = { flex: 3, color: "#111827" };

const qaAnswerWrapperStyle: React.CSSProperties = {
  flex: 1.3,
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  alignItems: "center",
  whiteSpace: "nowrap",
};

const qaAnswerTextStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#9ca3af",
};

const qaEditLinkStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#2563eb",
  cursor: "pointer",
};
const DetailsPage: React.FC<DetailsProps> = ({ userEmail }) => {
  const router = useRouter();
  const { sale, lease, phase, party, moveConcierge, clientName, category } =
    router.query;

  const saleStr = typeof sale === "string" ? sale.toLowerCase() : "";
  const leaseStr = typeof lease === "string" ? lease.toLowerCase() : "";

  const isLease =
    leaseStr === "true" ||
    leaseStr === "lease" ||
    saleStr === "false" ||
    saleStr === "lease";

  const isSale = !isLease;

  const categoryLabel =
    typeof category === "string" && category.trim().length > 0
      ? category
      : "Residential";

  const rawPhase =
    typeof phase === "string" && phase.length > 0
      ? phase.toLowerCase()
      : "start";

  const phaseOptions = [
    { key: "start", label: "Start" },
    { key: "showing", label: "Showing" },
    { key: "contract", label: "Contract" },
    { key: "pre-closing", label: "Pre-Closing" },
    { key: "post-closing", label: "Post-Closing" },
  ];

  let normalizedPhase = "start";
  if (rawPhase.includes("show")) normalizedPhase = "showing";
  else if (rawPhase.includes("contract")) normalizedPhase = "contract";
  else if (
    rawPhase.includes("pre") &&
    (rawPhase.includes("move") || rawPhase.includes("clos"))
  ) {
    normalizedPhase = "pre-closing";
  } else if (
    rawPhase.includes("post") &&
    (rawPhase.includes("move") || rawPhase.includes("clos"))
  ) {
    normalizedPhase = "post-closing";
  }

  const phaseIndex = phaseOptions.findIndex(
    (p) => p.key === normalizedPhase
  );
  const activePhaseIndex = phaseIndex === -1 ? 0 : phaseIndex;

  const phaseLabel =
    phaseOptions.find((p) => p.key === normalizedPhase)?.label || "Start";

  const normalizedParty =
    typeof party === "string" ? party.toLowerCase() : "buyer";

  const partyLabel =
    normalizedParty === "seller"
      ? "Seller"
      : normalizedParty === "buyer"
      ? "Buyer"
      : normalizedParty === "landlord"
      ? "Landlord"
      : normalizedParty === "tenant"
      ? "Tenant"
      : "Client";

  const partyBadgeText = partyLabel.toUpperCase();
  const saleLabel = isSale ? "Sale" : "Lease";

  const moveConciergeText =
    typeof moveConcierge === "string" &&
    moveConcierge.toLowerCase() === "yes"
      ? "Yes"
      : "No";

  const displayClientName =
    typeof clientName === "string" && clientName.trim().length > 0
      ? clientName
      : "Test For Nova";

  const partyPillStyle: React.CSSProperties = {
    ...partyPillStyleBase,
    background:
      normalizedParty === "seller"
        ? "rgba(251,113,133,0.22)"
        : normalizedParty === "landlord"
        ? "rgba(129,140,248,0.18)"
        : "rgba(59,130,246,0.22)",
    color:
      normalizedParty === "seller"
        ? "#b91c1c"
        : normalizedParty === "landlord"
        ? "#4338ca"
        : "#1d4ed8",
    border:
      normalizedParty === "seller"
        ? "1px solid rgba(248,113,113,0.85)"
        : normalizedParty === "landlord"
        ? "1px solid rgba(129,140,248,0.9)"
        : "1px solid rgba(59,130,246,0.85)",
  };

  const tabs: TabDef[] = [
    { label: "Summary", count: 1, icon: "📝", path: "/transact/summary" },
    { label: "People", count: 2, icon: "👥", path: "/transact/people" },
    {
      label: "Details",
      count: 17,
      icon: "📋",
      active: true,
      path: "/transact/details",
    },
    { label: "Documents", count: 3, icon: "📁", path: "/transact/documents" },
    { label: "Checklist", count: 5, icon: "✅", path: "/transact/checklist" },
    { label: "Expenses", count: 0, icon: "💵", path: "/transact/expenses" },
    { label: "History", count: 1, icon: "🕒", path: "/transact/history" },
  ];

  const handleTabClick = (tab: TabDef) => {
    if (!tab.path) return;
    router.push({
      pathname: tab.path,
      query: router.query,
    });
  };

  return (
    <AppShell userEmail={userEmail}>
      <div style={pageWrapperStyle}>
        <div style={headerTextWrapperStyle}>
          <h1 style={titleStyle}>Transaction details</h1>
          <p style={subtitleStyle}>
            Required questions and key milestones for this{" "}
            {saleLabel.toLowerCase()} file. As you move through contract,
            pre-closing, and post-closing, Back Boss will surface more items
            here automatically.
          </p>
        </div>

        <div style={breadcrumbRowStyle}>
          <span style={breadcrumbItemStyle}>TRANSACT</span>
          <span style={breadcrumbSeparatorStyle}>/</span>
          <span style={breadcrumbItemStyle}>SEARCH</span>
          <span style={breadcrumbSeparatorStyle}>/</span>
          <span style={breadcrumbCurrentStyle}>DETAILS</span>
        </div>

        <div style={phaseDotsContainerStyle}>
          {phaseOptions.map((p, index) => {
            const isActive = index === activePhaseIndex;
            const isComplete = index < activePhaseIndex;
            let dotStyle: React.CSSProperties = { ...phaseDotStyleBase };
            if (isComplete) dotStyle = { ...dotStyle, ...phaseDotCompleteStyle };
            else if (isActive) dotStyle = { ...dotStyle, ...phaseDotActiveStyle };
            return <span key={p.key} style={dotStyle} />;
          })}
        </div>

        <div style={mainCardStyle}>
          <div style={cardHeaderRowStyle}>
            <div style={leftHeaderBlockStyle}>
              <span style={partyPillStyle}>{partyBadgeText}</span>
              <div>
                <div style={fileTitleStyle}>{displayClientName}</div>
                <div style={fileSubTitleStyle}>
                  {saleLabel} • {categoryLabel} • Representing {partyLabel}
                </div>
              </div>
            </div>

            <div style={rightHeaderBlockStyle}>
              <button
                type="button"
                style={snapshotButtonStyle}
                onClick={() =>
                  router.push({
                    pathname: "/transact/snapshot",
                    query: router.query,
                  })
                }
              >
                <span style={tabIconStyle}>📸</span>
                <span>Snapshot</span>
                <span style={snapshotDotStyle} />
              </button>

              <div style={agentMetaStyle}>
                <div style={agentNameStyle}>Elite Living Agent</div>
                <div style={agentDetailsStyle}>
                  Elite Living Realty • DFW Metro
                  <br />
                  {userEmail || "agent@elitelivingrealty.com"}
                </div>
              </div>

              <button type="button" style={submitButtonStyle}>
                Submit
              </button>
            </div>
          </div>

          <div style={tabBarContainerStyle}>
            <div style={tabsRowStyle}>
              {tabs.map((tab) => {
                const active = !!tab.active;
                const style: React.CSSProperties = {
                  ...tabStyleBase,
                  backgroundColor: active ? "#0f172a" : "#ffffff",
                  color: active ? "#f9fafb" : "#4b5563",
                  border: active
                    ? "1px solid rgba(15,23,42,0.9)"
                    : "1px solid rgba(209,213,219,0.9)",
                  boxShadow: active
                    ? "0 16px 40px rgba(15,23,42,0.35)"
                    : "0 6px 18px rgba(15,23,42,0.08)",
                };
                const pillStyle: React.CSSProperties = {
                  ...tabCountPillStyle,
                  backgroundColor: "#f97316",
                  color: "#ffffff",
                };
                return (
                  <div
                    key={tab.label}
                    style={style}
                    onClick={() => handleTabClick(tab)}
                  >
                    <div style={tabLeftStyle}>
                      <span style={tabIconStyle}>{tab.icon}</span>
                      <span style={tabLabelStyle}>{tab.label}</span>
                    </div>
                    <span style={pillStyle}>{tab.count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={sectionIntroWrapperStyle}>
            <div style={sectionIntroTitleStyle}>
              Required items for this phase
            </div>
            <div style={sectionIntroBodyStyle}>
              Phase: {phaseLabel} • Side: {partyLabel} • Type: {saleLabel} •
              Category: {categoryLabel}. As you move into contract,
              pre-closing, and post-closing, Back Boss will automatically
              surface more questions here.
            </div>
          </div>
          <div style={detailsColumnsWrapperStyle}>

            <div style={detailsCardStyle}>
              <div style={detailsCardHeaderStyle}>
                <div>
                  <div style={detailsCardTitleStyle}>Listing basics</div>
                  <div style={detailsCardSubStyle}>
                    Identify the property and core listing details.
                  </div>
                </div>
                <button type="button" style={setPropertyButtonStyle}>
                  Set property
                </button>
              </div>

              <div>
                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Please identify the property for this transaction.
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    When did your listing agreement take effect?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    When does your listing agreement expire?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Is this a company lead?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    What type of property is this?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    What is the ownership status of the property?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={detailsCardStyle}>
              <div style={detailsCardHeaderStyle}>
                <div>
                  <div style={detailsCardTitleStyle}>Contacts</div>
                  <div style={detailsCardSubStyle}>
                    How this file connects to company, agent, and brokerage
                    relationships.
                  </div>
                </div>
              </div>

              <div>
                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Is this a company lead?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Is your client a corporate account?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Is your client a licensed real estate agent?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Is the Buyer&apos;s Agent also a member of your brokerage?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={detailsCardStyle}>
              <div style={detailsCardHeaderStyle}>
                <div>
                  <div style={detailsCardTitleStyle}>Property</div>
                  <div style={detailsCardSubStyle}>
                    Characteristics that drive disclosures and insurance
                    requirements.
                  </div>
                </div>
              </div>

              <div>
                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    What type of property is this?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    What is the ownership status of the property?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Is the property subject to an Owners&apos; Association?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Is the property in a Water District (MUD)?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Is the property in a Flood Hazard Area?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={detailsCardStyle}>
              <div style={detailsCardHeaderStyle}>
                <div>
                  <div style={detailsCardTitleStyle}>Financials</div>
                  <div style={detailsCardSubStyle}>
                    These items power cap tracking and commission breakdowns.
                  </div>
                </div>
              </div>

              <div>
                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Will another party get a referral fee from you for this
                    transaction?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    What is the contracted sale price?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    What type of financing is the buyer using?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    What amount has the Seller agreed to pay toward Buyer&apos;s
                    expenses?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={detailsCardStyle}>
              <div style={detailsCardHeaderStyle}>
                <div>
                  <div style={detailsCardTitleStyle}>Dates</div>
                  <div style={detailsCardSubStyle}>
                    Listing dates, contract dates, and move-in milestones.
                  </div>
                </div>
              </div>

              <div>
                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    When did your listing agreement take effect?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    By what date does your client generally expect to be
                    finished?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>

                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    When does your listing agreement expire?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>Not set</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={detailsCardStyle}>
              <div style={detailsCardHeaderStyle}>
                <div>
                  <div style={detailsCardTitleStyle}>Move concierge</div>
                  <div style={detailsCardSubStyle}>
                    Quick snapshot of whether this file is enrolled in Nova
                    concierge.
                  </div>
                </div>
              </div>

              <div>
                <div style={qaRowStyle}>
                  <div style={qaQuestionStyle}>
                    Move concierge enrolled for this file?
                  </div>
                  <div style={qaAnswerWrapperStyle}>
                    <span style={qaAnswerTextStyle}>{moveConciergeText}</span>
                    <span style={qaEditLinkStyle}>edit</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps<DetailsProps> = async (
  context
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      userEmail: session?.user?.email ?? null,
    },
  };
};

export default DetailsPage;
