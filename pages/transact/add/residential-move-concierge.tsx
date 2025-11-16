import React from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type MoveConciergeProps = {
  userEmail: string | null;
};

const pageWrapperStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "32px 20px 48px",
};

const breadcrumbStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: "#e5e7eb",
  marginBottom: 6,
};

const titleStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 800,
  color: "#f9fafb",
  marginBottom: 6,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 16,
  color: "#e5e7eb",
  maxWidth: 640,
};

const mainLayoutStyle: React.CSSProperties = {
  marginTop: 22,
  display: "flex",
  gap: 20,
  alignItems: "stretch",
};

const mainCardStyle: React.CSSProperties = {
  flex: 3,
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 20px 55px rgba(15,23,42,0.45)",
  border: "1px solid rgba(148,163,184,0.2)",
};

const rightCardStyle: React.CSSProperties = {
  flex: 1.2,
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 22,
  boxShadow: "0 18px 45px rgba(15,23,42,0.4)",
  border: "1px solid rgba(148,163,184,0.25)",
  minWidth: 260,
  alignSelf: "stretch",
};

const greenRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: 14,
  color: "#166534",
};

const greenCheckIconStyle: React.CSSProperties = {
  width: 18,
  height: 18,
  borderRadius: "999px",
  border: "2px solid #22c55e",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 11,
  fontWeight: 700,
};

const greenTextStrongStyle: React.CSSProperties = {
  fontWeight: 600,
};

const changeLinkStyle: React.CSSProperties = {
  marginLeft: 6,
  fontSize: 14,
  color: "#2563eb",
  cursor: "pointer",
};

const greenStackStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  marginBottom: 18,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: 12,
};

const optionStackStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const optionCardStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 18px",
  borderRadius: 18,
  background: "#ffffff",
  border: "1px solid rgba(209,213,219,0.9)",
  boxShadow: "0 10px 32px rgba(15,23,42,0.08)",
};

const optionTextBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const optionTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: "#111827",
};

const optionDescriptionStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
};

const selectButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 999,
  border: "none",
  background: "#276bff",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 14px 30px rgba(37,99,235,0.35)",
  whiteSpace: "nowrap",
};

const rightLogoBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 10px",
  borderRadius: 999,
  background: "rgba(37,99,235,0.06)",
  border: "1px solid rgba(37,99,235,0.25)",
  marginBottom: 10,
};

const rightLogoCircleStyle: React.CSSProperties = {
  width: 22,
  height: 22,
  borderRadius: "999px",
  background: "#22c55e",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  color: "#ffffff",
};

const rightLabelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#1d4ed8",
  letterSpacing: 0.8,
  textTransform: "uppercase",
};

const rightBodyStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#4b5563",
  marginTop: 4,
  lineHeight: 1.5,
};

const MoveConciergePage: React.FC<MoveConciergeProps> = ({ userEmail }) => {
  const router = useRouter();
  const { sale, lease, phase, party, category, agentName } = router.query;

  const isLease =
    typeof lease === "string"
      ? lease.toLowerCase() === "true"
      : sale === "false";
  const isSale = !isLease;

  const typeLabel = isLease ? "Lease" : "Sale";

  const categoryLabel =
    typeof category === "string" && category.trim().length > 0
      ? category.trim()
      : "Residential";

  const normalizedParty =
    typeof party === "string" ? party.toLowerCase() : "buyer";

  const partyLabel =
    normalizedParty === "buyer"
      ? "Buyer"
      : normalizedParty === "tenant"
      ? "Tenant"
      : "Client";

  const currentPhase =
    typeof phase === "string" && phase.length > 0 ? phase : null;

  const setSaleLeaseParams = (params: URLSearchParams) => {
    if (isLease) {
      params.set("lease", "true");
      params.set("sale", "false");
    } else {
      params.set("sale", "true");
      params.set("lease", "false");
    }
  };

  const appendCategory = (params: URLSearchParams) => {
    if (typeof category === "string" && category.trim().length > 0) {
      params.set("category", category.trim());
    }
  };

  const handleChangeType = () => {
    const params = new URLSearchParams();
    setSaleLeaseParams(params);
    appendCategory(params);
    router.push(`/transact/add/residential-type?${params.toString()}`);
  };

  const handleChangePhase = () => {
    const params = new URLSearchParams();
    setSaleLeaseParams(params);
    appendCategory(params);
    router.push(`/transact/add/residential-phase?${params.toString()}`);
  };

  const handleChangeParty = () => {
    const params = new URLSearchParams();
    setSaleLeaseParams(params);
    appendCategory(params);
    if (currentPhase) params.set("phase", currentPhase);
    router.push(`/transact/add/residential-party?${params.toString()}`);
  };

  const goNext = (moveConcierge: "yes" | "no") => {
    const params = new URLSearchParams();
    setSaleLeaseParams(params);

    // Keep party + move concierge choice
    params.set("party", normalizedParty);
    params.set("moveConcierge", moveConcierge);

    // Preserve phase if we have one
    if (currentPhase) params.set("phase", currentPhase);

    // Preserve category (Residential / Apartment / Commercial / Referral Only)
    appendCategory(params);

    router.push(`/transact/add/residential-confirm?${params.toString()}`);
  };

  const questionTitle = "Would you like Move Concierge to assist your client?";

  const displayAgentName =
    typeof agentName === "string" && agentName.trim().length > 0
      ? agentName
      : userEmail || "Elite Living Agent";

  return (
    <AppShell userEmail={userEmail} activeTab="Transact">
      <div style={pageWrapperStyle}>
        <div style={breadcrumbStyle}>TRANSACT / ADD TRANSACTION</div>
        <h1 style={titleStyle}>Add Transaction</h1>
        <p style={subtitleStyle}>
          You are representing the {partyLabel.toLowerCase()} on a{" "}
          {typeLabel.toLowerCase()} file. Back Boss can invite Move Concierge to
          support your client during their move, or keep everything in-house.
        </p>

        <div style={mainLayoutStyle}>
          <div style={mainCardStyle}>
            <div style={greenStackStyle}>
              <div style={greenRowStyle}>
                <div style={greenCheckIconStyle}>✓</div>
                <div>
                  <span>You selected the </span>
                  <span style={greenTextStrongStyle}>
                    &apos;{categoryLabel}&apos; category.
                  </span>
                  <span
                    style={changeLinkStyle}
                    onClick={() => router.push("/transact/add")}
                  >
                    Change
                  </span>
                </div>
              </div>
              <div style={greenRowStyle}>
                <div style={greenCheckIconStyle}>✓</div>
                <div>
                  <span>You selected the </span>
                  <span style={greenTextStrongStyle}>
                    &apos;{typeLabel}&apos; type.
                  </span>
                  <span style={changeLinkStyle} onClick={handleChangeType}>
                    Change
                  </span>
                </div>
              </div>
              {currentPhase && (
                <div style={greenRowStyle}>
                  <div style={greenCheckIconStyle}>✓</div>
                  <div>
                    <span>You selected the </span>
                    <span style={greenTextStrongStyle}>
                      &apos;{currentPhase}&apos; phase.
                    </span>
                    <span style={changeLinkStyle} onClick={handleChangePhase}>
                      Change
                    </span>
                  </div>
                </div>
              )}
              <div style={greenRowStyle}>
                <div style={greenCheckIconStyle}>✓</div>
                <div>
                  <span>You represent the </span>
                  <span style={greenTextStrongStyle}>
                    &apos;{partyLabel}&apos;.
                  </span>
                  <span style={changeLinkStyle} onClick={handleChangeParty}>
                    Change
                  </span>
                </div>
              </div>
            </div>

            <div style={sectionTitleStyle}>{questionTitle}</div>
            <div style={optionStackStyle}>
              <div style={optionCardStyle}>
                <div style={optionTextBlockStyle}>
                  <div style={optionTitleStyle}>
                    Yes, please assist my client.
                  </div>
                  <div style={optionDescriptionStyle}>
                    Move Concierge will reach out with move planning, utility
                    transfers, and service coordination at no extra cost to your
                    client.
                  </div>
                </div>
                <button
                  type="button"
                  style={selectButtonStyle}
                  onClick={() => goNext("yes")}
                >
                  Select
                </button>
              </div>

              <div style={optionCardStyle}>
                <div style={optionTextBlockStyle}>
                  <div style={optionTitleStyle}>
                    No, please do not contact client.
                  </div>
                  <div style={optionDescriptionStyle}>
                    You&apos;ll manage communication directly and keep Move
                    Concierge off this file for now.
                  </div>
                </div>
                <button
                  type="button"
                  style={selectButtonStyle}
                  onClick={() => goNext("no")}
                >
                  Select
                </button>
              </div>
            </div>
          </div>

          <div style={rightCardStyle}>
            <div style={rightLogoBadgeStyle}>
              <div style={rightLogoCircleStyle}>M</div>
              <div>
                <div style={rightLabelStyle}>Move Concierge</div>
              </div>
            </div>
            <div style={rightBodyStyle}>
              Your brokerage is subscribed to Move Concierge to assist your
              clients during their move. When enabled, they&apos;ll help with
              utilities, movers, home services, and more — while you stay in the
              loop.
            </div>
            <div style={{ ...rightBodyStyle, marginTop: 12 }}>
              You can always update this choice later from the People or Details
              tab if your client changes their mind.
            </div>

            <div style={{ marginTop: 18, fontSize: 12, color: "#9ca3af" }}>
              File owner: {displayAgentName}
              <br />
              Connected via Back Boss AI
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps<
  MoveConciergeProps
> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      userEmail: session?.user?.email ?? null,
    },
  };
};

export default MoveConciergePage;
