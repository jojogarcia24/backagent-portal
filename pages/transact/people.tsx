import React, { useState } from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type PeoplePageProps = {
  userEmail: string | null;
};

type TabDef = {
  label: string;
  count: number;
  icon: string;
  active?: boolean;
  path?: string;
};

type PersonRoleKey =
  | "seller"
  | "buyer"
  | "sellersAgent"
  | "buyersAgent"
  | "sellersCoordinator"
  | "vendor"
  | "titleAgent";

type PersonSlot = {
  name: string;
  subtitle?: string;
  company?: string;
  email: string;
  phone: string;
};

type PeopleModel = {
  [K in PersonRoleKey]: PersonSlot[];
};

const MAX_SLOTS_PER_ROLE = 4;

// ---------- Phone formatting helper ----------

const formatPhoneInput = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  const len = digits.length;

  if (len === 0) return "";
  if (len <= 3) return `(${digits}`;
  if (len <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} - ${digits.slice(6)}`;
};

// ---------- Shared styles from summary shell ----------

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
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.5,
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

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
  gap: 18,
  marginTop: 16,
};

const roleSectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const roleLabelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#4b5563",
};

const slotListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const slotCardStyle: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  padding: 14,
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  minHeight: 80,
};

const placeholderCardStyle: React.CSSProperties = {
  ...slotCardStyle,
  alignItems: "center",
  justifyContent: "flex-start",
};

const placeholderTextStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
};

const avatarBaseStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  fontWeight: 700,
  flexShrink: 0,
};

const avatarFilledStyle: React.CSSProperties = {
  ...avatarBaseStyle,
  background: "#dbeafe",
  color: "#1d4ed8",
  border: "1px solid #60a5fa",
};

const avatarPlaceholderStyle: React.CSSProperties = {
  ...avatarBaseStyle,
  background: "#e5e7eb",
  color: "#6b7280",
  border: "1px solid #d1d5db",
};

const personNameStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: "#111827",
};

const personSubtitleStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#4b5563",
  marginTop: 2,
};

const personMetaStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
  marginTop: 4,
};

const addLinkStyle: React.CSSProperties = {
  marginTop: 4,
  fontSize: 12,
  fontWeight: 500,
  color: "#2563eb",
  cursor: "pointer",
};

const addAnotherLinkStyle: React.CSSProperties = {
  marginTop: 4,
  fontSize: 11,
  fontWeight: 500,
  color: "#2563eb",
  cursor: "pointer",
};

const tagRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  marginTop: 6,
};

const smallTagStyle: React.CSSProperties = {
  borderRadius: 999,
  padding: "2px 8px",
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.4,
  background: "rgba(59,130,246,0.06)",
  color: "#1d4ed8",
};

const stageDotsRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const stageDotBaseStyle: React.CSSProperties = {
  width: 14,
  height: 14,
  borderRadius: 4,
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  cursor: "pointer",
};

// ---------- Modal styles ----------

const modalBackdropStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 40,
};

const modalCardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 420,
  background: "#f9fafb",
  borderRadius: 24,
  boxShadow: "0 25px 70px rgba(15,23,42,0.55)",
  border: "1px solid rgba(148,163,184,0.6)",
  padding: 20,
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: 6,
};

const modalSubStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#4b5563",
  marginBottom: 12,
};

const modalFormRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  marginBottom: 10,
};

const modalInputStyle: React.CSSProperties = {
  flex: 1,
  borderRadius: 10,
  border: "1px solid #d1d5db",
  padding: "8px 10px",
  fontSize: 13,
};

const modalErrorStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#b91c1c",
  marginBottom: 8,
};

const modalButtonRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginTop: 6,
};

const modalSecondaryButtonStyle: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 999,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};

const modalPrimaryButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 999,
  border: "none",
  background: "#0f172a",
  color: "#f9fafb",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

// ---------- Component ----------

const PeoplePage: React.FC<PeoplePageProps> = ({ userEmail }) => {
  const router = useRouter();
  const { sale, lease, phase, party, clientName, category } = router.query;

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

  const saleLabel = isSale ? "Sale" : "Lease";

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

  const initialPeople: PeopleModel = {
    seller: [
      {
        name: "Test For Nova",
        subtitle: "Primary Seller",
        company: "Nova. Elite",
        email: "seller@example.com",
        phone: "(555) 123 - 9876",
      },
    ],
    buyer: [],
    sellersAgent: [
      {
        name: "JoJo Garcia",
        subtitle: "Seller's Agent",
        company: "Elite Living Realty · DFW",
        email: "jojo@elitelivingrealty.com",
        phone: "(555) 555 - 1212",
      },
    ],
    buyersAgent: [],
    sellersCoordinator: [],
    vendor: [],
    titleAgent: [],
  };

  const [people, setPeople] = useState<PeopleModel>(initialPeople);
  const [modalRole, setModalRole] = useState<PersonRoleKey | null>(null);
  const [modalRoleLabel, setModalRoleLabel] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const totalFilled = Object.values(people).reduce(
    (sum, slots) => sum + slots.length,
    0
  );

  const tabs: TabDef[] = [
    { label: "Summary", count: 1, icon: "SUM", path: "/transact/summary" },
    {
      label: "People",
      count: totalFilled,
      icon: "PEO",
      active: true,
      path: "/transact/people",
    },
    { label: "Details", count: 4, icon: "DET", path: "/transact/details" },
    { label: "Documents", count: 3, icon: "DOC", path: "/transact/documents" },
    { label: "Checklist", count: 5, icon: "CHK", path: "/transact/checklist" },
    { label: "Expenses", count: 0, icon: "EXP", path: "/transact/expenses" },
    { label: "History", count: 1, icon: "HIS", path: "/transact/history" },
  ];

  const handleTabClick = (tab: TabDef) => {
    if (!tab.path) return;
    router.push({
      pathname: tab.path,
      query: router.query,
    });
  };

  const handleStageClick = (phaseKey: string) => {
    const newQuery = { ...router.query, phase: phaseKey };
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  const openAddModal = (roleKey: PersonRoleKey, label: string) => {
    setModalRole(roleKey);
    setModalRoleLabel(label);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setError(null);
  };

  const closeModal = () => {
    setModalRole(null);
    setError(null);
  };

  const handleModalSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setError("First name, last name, email, and phone are required.");
      return;
    }
    if (!modalRole) return;
    setPeople((prev) => {
      const existing = prev[modalRole] || [];
      if (existing.length >= MAX_SLOTS_PER_ROLE) {
        return prev;
      }
      const newSlot: PersonSlot = {
        name: `${firstName.trim()} ${lastName.trim()}`,
        subtitle: modalRoleLabel,
        company: "",
        email: email.trim(),
        phone: phone.trim(),
      };
      return {
        ...prev,
        [modalRole]: [...existing, newSlot],
      };
    });
    closeModal();
  };

  const renderRole = (label: string, roleKey: PersonRoleKey, addText: string) => {
    const slots = people[roleKey];
    const hasAny = slots.length > 0;
    const canAddMore = slots.length < MAX_SLOTS_PER_ROLE;

    return (
      <div style={roleSectionStyle}>
        <div style={roleLabelStyle}>{label}</div>

        <div style={slotListStyle}>
          {hasAny &&
            slots.map((slot, index) => {
              const initials = slot.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div key={label + index} style={slotCardStyle}>
                  <div style={avatarFilledStyle}>{initials}</div>
                  <div>
                    <div style={personNameStyle}>{slot.name}</div>
                    {slot.subtitle && (
                      <div style={personSubtitleStyle}>{slot.subtitle}</div>
                    )}
                    {slot.company && (
                      <div style={personMetaStyle}>{slot.company}</div>
                    )}
                    {(slot.email || slot.phone) && (
                      <div style={personMetaStyle}>
                        {slot.email && <span>{slot.email}</span>}
                        {slot.email && slot.phone && <span> · </span>}
                        {slot.phone && <span>{slot.phone}</span>}
                      </div>
                    )}
                    <div style={tagRowStyle}>
                      <span style={smallTagStyle}>Linked to transaction</span>
                      <span style={smallTagStyle}>People tab</span>
                    </div>
                  </div>
                </div>
              );
            })}

          {!hasAny && (
            <div style={placeholderCardStyle}>
              <div style={avatarPlaceholderStyle}>?</div>
              <div style={placeholderTextStyle}>Not selected.</div>
            </div>
          )}
        </div>

        {!hasAny && canAddMore && (
          <div
            style={addLinkStyle}
            onClick={() => openAddModal(roleKey, label)}
          >
            + Add {addText}
          </div>
        )}

        {hasAny && canAddMore && (
          <div
            style={addAnotherLinkStyle}
            onClick={() => openAddModal(roleKey, label)}
          >
            + Add another {addText} (up to {MAX_SLOTS_PER_ROLE})
          </div>
        )}
      </div>
    );
  };

  return (
    <AppShell userEmail={userEmail}>
      <div style={pageWrapperStyle}>
        <div style={headerTextWrapperStyle}>
          <h1 style={titleStyle}>Transaction people</h1>
          <p style={subtitleStyle}>
            Confirm everyone on this file so your paperwork, messages, and
            compliance all stay in sync.
          </p>
        </div>

        <div style={breadcrumbRowStyle}>
          <span style={breadcrumbItemStyle}>TRANSACT</span>
          <span style={breadcrumbSeparatorStyle}>/</span>
          <span style={breadcrumbItemStyle}>SEARCH</span>
          <span style={breadcrumbSeparatorStyle}>/</span>
          <span style={breadcrumbCurrentStyle}>PEOPLE</span>
        </div>

        <div style={mainCardStyle}>
          <div style={cardHeaderRowStyle}>
            <div style={leftHeaderBlockStyle}>
              <span style={partyPillStyle}>{partyBadgeText}</span>
              <div>
                <div style={fileTitleStyle}>{displayClientName}</div>
                <div style={fileSubTitleStyle}>
                  {saleLabel} · {categoryLabel} · Representing {partyLabel}
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
                <span style={tabIconStyle}>SS</span>
                <span>Snapshot</span>
                <span style={snapshotDotStyle} />
              </button>
              <div style={agentMetaStyle}>
                <div style={agentNameStyle}>Elite Living Agent</div>
                <div style={agentDetailsStyle}>
                  Elite Living Realty · DFW Metro
                  <br />
                  {userEmail || "agent@elitelivingrealty.com"}
                </div>
              </div>
              <div style={stageDotsRowStyle}>
                {phaseOptions.map((step, index) => {
                  const isComplete = index < activePhaseIndex;
                  const isCurrent = index === activePhaseIndex;
                  const style: React.CSSProperties = {
                    ...stageDotBaseStyle,
                    backgroundColor: isCurrent
                      ? "#276bff"
                      : isComplete
                      ? "#22c55e"
                      : "#f9fafb",
                    borderColor: isCurrent
                      ? "#1d4ed8"
                      : isComplete
                      ? "#22c55e"
                      : "#d1d5db",
                  };
                  return (
                    <div
                      key={step.key}
                      style={style}
                      onClick={() => handleStageClick(step.key)}
                    />
                  );
                })}
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

                const hasItems = tab.count > 0;
                const pillBg = hasItems
                  ? active
                    ? "#f97316"
                    : "#ffedd5"
                  : active
                  ? "#111827"
                  : "#e5e7eb";
                const pillColor = hasItems
                  ? active
                    ? "#111827"
                    : "#9a3412"
                  : active
                  ? "#e5e7eb"
                  : "#4b5563";

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
                  backgroundColor: pillBg,
                  color: pillColor,
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

          <div>
            <div style={sectionTitleStyle}>Contacts on this transaction</div>
            <div style={sectionBodyStyle}>
              This is the Back Boss view of the BackAgent People tab. Once the
              data layer is wired, these tiles will be driven by your live
              contact records. Each role supports up to {MAX_SLOTS_PER_ROLE}{" "}
              parties, and only shows real contacts after you add them.
            </div>

            <div style={gridStyle}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {renderRole("Seller", "seller", "Seller")}
                {renderRole("Seller's Agent", "sellersAgent", "Seller's Agent")}
                {renderRole(
                  "Seller's Coordinator",
                  "sellersCoordinator",
                  "Coordinator"
                )}
                {renderRole("Title Agent", "titleAgent", "Title Agent")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {renderRole("Buyer", "buyer", "Buyer")}
                {renderRole("Buyer's Agent", "buyersAgent", "Buyer's Agent")}
                {renderRole("Vendor", "vendor", "Vendor")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalRole && (
        <div style={modalBackdropStyle}>
          <div style={modalCardStyle}>
            <div style={modalTitleStyle}>Add {modalRoleLabel}</div>
            <div style={modalSubStyle}>
              Enter the contact details for this person. All fields are required
              so we can keep communication and documents clean.
            </div>
            {error && <div style={modalErrorStyle}>{error}</div>}
            <form onSubmit={handleModalSubmit}>
              <div style={modalFormRowStyle}>
                <input
                  style={modalInputStyle}
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  style={modalInputStyle}
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div style={modalFormRowStyle}>
                <input
                  style={modalInputStyle}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div style={modalFormRowStyle}>
                <input
                  style={modalInputStyle}
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) =>
                    setPhone(formatPhoneInput(e.target.value))
                  }
                />
              </div>
              <div style={modalButtonRowStyle}>
                <button
                  type="button"
                  style={modalSecondaryButtonStyle}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" style={modalPrimaryButtonStyle}>
                  Save contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps<PeoplePageProps> = async (
  context
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      userEmail: session?.user?.email ?? null,
    },
  };
};

export default PeoplePage;
