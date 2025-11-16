import React from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type SummaryProps = {
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
  fontSize: 34,
  lineHeight: 1.2,
  fontWeight: 800,
  color: "#f9fafb",
  marginBottom: 8,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 17,
  color: "#e5e7eb",
  maxWidth: 640,
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

const breadcrumbItemStyle: React.CSSProperties = {
  opacity: 0.9,
};

const breadcrumbCurrentStyle: React.CSSProperties = {
  opacity: 1,
  fontWeight: 600,
};

const breadcrumbSeparatorStyle: React.CSSProperties = {
  opacity: 0.7,
};

const mainCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 20px 55px rgba(15,23,42,0.45)",
  border: "1px solid rgba(148,163,184,0.2)",
};

const successBannerWrapperStyle: React.CSSProperties = {
  marginBottom: 16,
};

const successBannerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg, rgba(22,163,74,0) 0%, #16a34a 40%, #16a34a 100%)",
  borderRadius: 999,
  padding: "10px 18px",
  color: "#ecfdf5",
  fontSize: 15,
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  gap: 10,
  border: "1px solid rgba(34,197,94,0.8)",
};

const successIconStyle: React.CSSProperties = {
  width: 22,
  height: 22,
  borderRadius: "999px",
  border: "2px solid #bbf7d0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13,
  fontWeight: 700,
  background: "rgba(15,23,42,0.35)",
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

const agentMetaStyle: React.CSSProperties = {
  textAlign: "right",
};

const agentNameStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: "#0f172a",
};

const agentDetailsStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
};

const submitButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 999,
  border: "none",
  background: "#276bff",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
  whiteSpace: "nowrap",
};

const snapshotButtonStyle: React.CSSProperties = {
  padding: "9px 13px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.6)",
  background: "rgba(15,23,42,0.9)",
  color: "#e5e7eb",
  fontSize: 13,
  fontWeight: 500,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
};

const snapshotDotStyle: React.CSSProperties = {
  width: 7,
  height: 7,
  borderRadius: 999,
  background: "#22c55e",
};

const tabBarContainerStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 8,
  marginBottom: 22,
};

const tabsRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  flexWrap: "nowrap",
};

const tabStyleBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 6,
  padding: "8px 10px",
  borderRadius: 999,
  fontSize: 13,
  cursor: "default",
  flex: 1,
  minWidth: 0,
};

const tabLeftStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  minWidth: 0,
};

const tabLabelStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const tabCountPillStyle: React.CSSProperties = {
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};

const tabIconStyle: React.CSSProperties = {
  fontSize: 15,
};

const sectionRowStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: 20,
  alignItems: "flex-start",
  marginBottom: 24,
  flexWrap: "wrap",
};

const leftSectionStyle: React.CSSProperties = {
  flex: 2,
  minWidth: 260,
};

const rightSectionStyle: React.CSSProperties = {
  flex: 1.4,
  minWidth: 240,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: 8,
};

const sectionBodyStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#4b5563",
  lineHeight: 1.5,
};

const metadataListStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 10,
  marginTop: 10,
};

const metaItemLabelStyle: React.CSSProperties = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: 0.6,
  color: "#9ca3af",
  marginBottom: 2,
};

const metaItemValueStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: "#111827",
};

const timelineWrapperStyle: React.CSSProperties = {
  marginTop: 4,
  marginBottom: 18,
};

const timelineRowOuterStyle: React.CSSProperties = {
  position: "relative",
  marginTop: 14,
};

const timelineRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 0,
};

const timelineStepStyleBase: React.CSSProperties = {
  flex: 1,
  textAlign: "center",
  padding: "10px 4px 0",
};

const timelineCircleBase: React.CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 999,
  border: "2px solid #d1d5db",
  background: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  fontWeight: 700,
  margin: "0 auto",
  position: "relative",
  zIndex: 2,
};

const timelineLabelStyle: React.CSSProperties = {
  fontSize: 15,
  marginTop: 8,
  color: "#6b7280",
};

const timelineConnectorBase: React.CSSProperties = {
  position: "absolute",
  top: 18,
  left: "5%",
  right: "5%",
  height: 3,
  background: "#e5e7eb",
  zIndex: 1,
};

const bottomCardsRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginTop: 4,
};

const bottomCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 20,
  padding: 16,
  border: "1px solid rgba(209,213,219,0.8)",
  boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
};

const bottomCardTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: 6,
};

const bottomCardBodyStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#4b5563",
  lineHeight: 1.5,
};

const bulletListStyle: React.CSSProperties = {
  paddingLeft: 18,
  margin: "6px 0 0",
};

const bulletItemStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#4b5563",
  marginBottom: 4,
};

const progressBarShellStyle: React.CSSProperties = {
  width: "100%",
  height: 10,
  borderRadius: 999,
  background: "#e5e7eb",
  overflow: "hidden",
  marginTop: 8,
};

const progressBarFillStyleBase: React.CSSProperties = {
  height: "100%",
  borderRadius: 999,
  background: "#276bff",
};

const smallMetaRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 12,
  color: "#6b7280",
  marginTop: 6,
};

const cancelBarWrapperStyle: React.CSSProperties = {
  marginTop: 18,
  display: "flex",
  justifyContent: "center",
};

const cancelButtonStyle: React.CSSProperties = {
  padding: "9px 16px",
  borderRadius: 999,
  border: "1px solid rgba(239,68,68,0.85)",
  background: "rgba(254,242,242,0.96)",
  color: "#b91c1c",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const SummaryPage: React.FC<SummaryProps> = ({ userEmail }) => {
  const router = useRouter();
  const { sale, lease, phase, party, moveConcierge, clientName, category } =
    router.query;

  // --- sale / lease normalization ---
  const saleStr = typeof sale === "string" ? sale.toLowerCase() : "";
  const leaseStr = typeof lease === "string" ? lease.toLowerCase() : "";

  const isLease =
    leaseStr === "true" ||
    leaseStr === "lease" ||
    saleStr === "false" ||
    saleStr === "lease";

  const isSale = !isLease;

  // --- category normalization ---
  const categoryLabel =
    typeof category === "string" && category.trim().length > 0
      ? category
      : "Residential";

  // --- phase normalization ---
  const rawPhase =
    typeof phase === "string" && phase.length > 0
      ? phase.toLowerCase()
      : "start";

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

  const phaseOptions = [
    { key: "start", label: "Start" },
    { key: "showing", label: "Showing" },
    { key: "contract", label: "Contract" },
    { key: "pre-closing", label: "Pre-Closing" },
    { key: "post-closing", label: "Post-Closing" },
  ];

  const phaseIndex = phaseOptions.findIndex(
    (p) => p.key === normalizedPhase
  );
  const activePhaseIndex = phaseIndex === -1 ? 0 : phaseIndex;

  const phaseLabel =
    phaseOptions.find((p) => p.key === normalizedPhase)?.label || "Start";

  const saleLabel = isSale ? "Sale" : "Lease";

  const moveConciergeText =
    typeof moveConcierge === "string"
      ? moveConcierge.toLowerCase() === "yes"
        ? "Yes"
        : "No"
      : "No";

  const displayClientName =
    typeof clientName === "string" && clientName.trim().length > 0
      ? clientName
      : "Test For Nova";

  const commissionCap = 12000;
  const commissionUsed = 4800;
  const commissionPercent = Math.min(
    100,
    Math.round((commissionUsed / commissionCap) * 100)
  );

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
    {
      label: "Summary",
      count: 1,
      active: true,
      icon: "📝",
      path: "/transact/summary",
    },
    { label: "People", count: 2, icon: "👥", path: "/transact/people" },
    { label: "Details", count: 4, icon: "📋", path: "/transact/details" },
    { label: "Documents", count: 3, icon: "📄", path: "/transact/documents" },
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
          <h1 style={titleStyle}>Transaction summary</h1>
          <p style={subtitleStyle}>
            Your new {saleLabel.toLowerCase()} transaction is live inside Back
            Boss. Review the summary, confirm people &amp; details, then work
            through your checklist to stay fully compliant.
          </p>
        </div>

        <div style={breadcrumbRowStyle}>
          <span style={breadcrumbItemStyle}>TRANSACT</span>
          <span style={breadcrumbSeparatorStyle}>/</span>
          <span style={breadcrumbItemStyle}>SEARCH</span>
          <span style={breadcrumbSeparatorStyle}>/</span>
          <span style={breadcrumbCurrentStyle}>SUMMARY</span>
        </div>

        <div style={successBannerWrapperStyle}>
          <div style={successBannerStyle}>
            <div style={successIconStyle}>✓</div>
            <span>
              New transaction created! Please review each highlighted tab for
              required items to move forward.
            </span>
          </div>
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
                onClick={() => {
                  router.push("/transact/snapshot");
                }}
              >
                <span role="img" aria-label="snapshot" style={tabIconStyle}>
                  📸
                </span>
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
                const hasPath = !!tab.path;
                const style: React.CSSProperties = {
                  ...tabStyleBase,
                  backgroundColor: active ? "#0f172a" : "transparent",
                  color: active ? "#f9fafb" : "#4b5563",
                  border: active
                    ? "1px solid rgba(15,23,42,0.9)"
                    : "1px solid rgba(209,213,219,0.9)",
                  cursor: hasPath ? "pointer" : "default",
                };
                const pillStyle: React.CSSProperties = {
                  ...tabCountPillStyle,
                  backgroundColor: active ? "#111827" : "#e5e7eb",
                  color: active ? "#e5e7eb" : "#4b5563",
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

          <div style={sectionRowStyle}>
            <div style={leftSectionStyle}>
              <div style={sectionTitleStyle}>Deal overview</div>
              <div style={sectionBodyStyle}>
                This {saleLabel.toLowerCase()} file is currently in the{" "}
                <strong>{phaseLabel}</strong> phase, with you representing the{" "}
                <strong>{partyLabel.toLowerCase()}</strong>. Use the tabs above
                to confirm the people involved, verify key details, upload
                documents, and complete your compliance checklist.
              </div>

              <div style={metadataListStyle}>
                <div>
                  <div style={metaItemLabelStyle}>Phase</div>
                  <div style={metaItemValueStyle}>{phaseLabel}</div>
                </div>
                <div>
                  <div style={metaItemLabelStyle}>Side</div>
                  <div style={metaItemValueStyle}>{partyLabel}</div>
                </div>
                <div>
                  <div style={metaItemLabelStyle}>Type</div>
                  <div style={metaItemValueStyle}>{saleLabel}</div>
                </div>
                <div>
                  <div style={metaItemLabelStyle}>Category</div>
                  <div style={metaItemValueStyle}>{categoryLabel}</div>
                </div>
                <div>
                  <div style={metaItemLabelStyle}>Move Concierge</div>
                  <div style={metaItemValueStyle}>{moveConciergeText}</div>
                </div>
              </div>
            </div>

            <div style={rightSectionStyle}>
              <div style={sectionTitleStyle}>At-a-glance details</div>
              <div style={sectionBodyStyle}>
                Use this snapshot when you&apos;re on the phone, in the field,
                or checking status at a glance. For full editing, jump into the
                Details and People tabs.
              </div>

              <div style={{ ...metadataListStyle, marginTop: 14 }}>
                <div>
                  <div style={metaItemLabelStyle}>Primary Contact</div>
                  <div style={metaItemValueStyle}>{displayClientName}</div>
                </div>
                <div>
                  <div style={metaItemLabelStyle}>File Owner</div>
                  <div style={metaItemValueStyle}>Elite Living Agent</div>
                </div>
                <div>
                  <div style={metaItemLabelStyle}>Office</div>
                  <div style={metaItemValueStyle}>Elite Living Realty</div>
                </div>
                <div>
                  <div style={metaItemLabelStyle}>Metro</div>
                  <div style={metaItemValueStyle}>DFW</div>
                </div>
              </div>
            </div>
          </div>

          <div style={timelineWrapperStyle}>
            <div style={sectionTitleStyle}>Timeline</div>
            <div style={{ ...sectionBodyStyle, fontSize: 13 }}>
              Back Boss tracks each stage so you know exactly what&apos;s next.
              Your current step is highlighted below.
            </div>

            <div style={timelineRowOuterStyle}>
              <div style={timelineConnectorBase} />
              <div style={timelineRowStyle}>
                {phaseOptions.map((step, index) => {
                  const isComplete = index < activePhaseIndex;
                  const isCurrent = index === activePhaseIndex;

                  const circleStyle: React.CSSProperties = {
                    ...timelineCircleBase,
                    borderColor: isCurrent
                      ? "#276bff"
                      : isComplete
                      ? "#22c55e"
                      : "#d1d5db",
                    backgroundColor: isCurrent
                      ? "#eff6ff"
                      : isComplete
                      ? "#dcfce7"
                      : "#ffffff",
                    color: isCurrent
                      ? "#1d4ed8"
                      : isComplete
                      ? "#16a34a"
                      : "#6b7280",
                  };

                  const labelStyle: React.CSSProperties = {
                    ...timelineLabelStyle,
                    color: isCurrent
                      ? "#111827"
                      : isComplete
                      ? "#16a34a"
                      : "#6b7280",
                    fontWeight: isCurrent ? 600 : 500,
                  };

                  return (
                    <div key={step.key} style={timelineStepStyleBase}>
                      <div style={circleStyle}>
                        {isComplete ? "✓" : index + 1}
                      </div>
                      <div style={labelStyle}>{step.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={bottomCardsRowStyle}>
            <div style={bottomCardStyle}>
              <div style={bottomCardTitleStyle}>Next steps</div>
              <div style={bottomCardBodyStyle}>
                Based on your current phase, here&apos;s what should happen
                next:
              </div>
              <ul style={bulletListStyle}>
                <li style={bulletItemStyle}>
                  Double-check your People tab for all parties and contact info.
                </li>
                <li style={bulletItemStyle}>
                  Upload any missing documents so compliance isn&apos;t chasing
                  you later.
                </li>
                <li style={bulletItemStyle}>
                  Work through your checklist line by line until everything is
                  green.
                </li>
              </ul>
            </div>

            <div style={bottomCardStyle}>
              <div style={bottomCardTitleStyle}>Commission &amp; cap</div>
              <div style={bottomCardBodyStyle}>
                Back Boss tracks your progress to the office cap in real time so
                you always know how close you are to 100% checks.
              </div>
              <div style={smallMetaRowStyle}>
                <span>Cap used</span>
                <span>
                  ${commissionUsed.toLocaleString()} / $
                  {commissionCap.toLocaleString()}
                </span>
              </div>
              <div style={progressBarShellStyle}>
                <div
                  style={{
                    ...progressBarFillStyleBase,
                    width: `${commissionPercent}%`,
                  }}
                />
              </div>
              <div style={smallMetaRowStyle}>
                <span>Progress</span>
                <span>{commissionPercent}% toward cap</span>
              </div>
            </div>

            <div style={bottomCardStyle}>
              <div style={bottomCardTitleStyle}>Integrations</div>
              <div style={bottomCardBodyStyle}>
                This file will soon sync with your favorite tools so nothing
                falls through the cracks.
              </div>
              <ul style={bulletListStyle}>
                <li style={bulletItemStyle}>
                  ClickSend text alerts – coming soon
                </li>
                <li style={bulletItemStyle}>
                  Airtable compliance matrix – coming soon
                </li>
                <li style={bulletItemStyle}>
                  Nova AI task insights – coming soon
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div style={cancelBarWrapperStyle}>
          <button type="button" style={cancelButtonStyle}>
            Cancel transaction
          </button>
        </div>
      </div>
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps<SummaryProps> = async (
  context
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      userEmail: session?.user?.email ?? null,
    },
  };
};

export default SummaryPage;
