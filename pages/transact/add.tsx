import React from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type AddProps = {
  userEmail: string | null;
};

const pageCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 18px 46px rgba(15,23,42,0.4)",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: "#0f172a",
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#4b5563",
  marginTop: 6,
};

const optionCardStyleBase: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 18px",
  borderRadius: 18,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  marginTop: 12,
  boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
};

const optionTextBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const optionTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#020617",
};

const optionDescriptionStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
};

const selectButtonStyle: React.CSSProperties = {
  minWidth: 96,
  padding: "9px 20px",
  borderRadius: 999,
  border: "none",
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#f9fafb",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 0.3,
  cursor: "pointer",
  boxShadow: "0 10px 24px rgba(37,99,235,0.45)",
};

const sideCardStyle: React.CSSProperties = {
  borderRadius: 20,
  padding: 18,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  boxShadow: "0 10px 26px rgba(15,23,42,0.12)",
};

function AddTransactionPage({ userEmail }: AddProps) {
  const router = useRouter();

  const nameFromEmail =
    userEmail?.split("@")[0]?.replace(/\./g, " ") || "JoJo Garcia";

  const prettyName =
    nameFromEmail
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "JoJo Garcia";

  const options = [
    {
      key: "residential",
      label: "Residential",
      description: "As defined by your brokerage and REALTOR® association.",
    },
    {
      key: "apartment",
      label: "Apartment",
      description:
        "Managed building. Used for standard property-management controlled leasing.",
    },
    {
      key: "commercial",
      label: "Commercial",
      description: "As defined by your brokerage and REALTOR® association.",
    },
    {
      key: "referral",
      label: "Referral Only",
      description:
        "You referred a buyer, seller, landlord or tenant to another agent, for a fee.",
    },
  ];

  const goToCategory = (categoryLabel: string) => {
    const params = new URLSearchParams();
    params.set("category", categoryLabel);
    router.push(`/transact/add/residential-type?${params.toString()}`);
  };

  const handleSelect = (key: string) => {
    if (key === "residential") {
      goToCategory("Residential");
    } else if (key === "apartment") {
      goToCategory("Apartment");
    } else if (key === "commercial") {
      goToCategory("Commercial");
    } else if (key === "referral") {
      // 🔁 NEW: Referral Only uses same flow as a normal transaction
      goToCategory("Referral Only");
    }
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
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Add Transaction
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#d1d5db",
            marginTop: 6,
            maxWidth: 780,
          }}
        >
          Choose what kind of deal you&apos;re creating. Later we&apos;ll
          connect this flow directly to your transaction software and prefill as
          much as possible.
        </p>
      </div>

      {/* Main card */}
      <div style={pageCardStyle}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.5fr) minmax(260px, 1fr)",
            gap: 24,
            alignItems: "flex-start",
          }}
        >
          {/* LEFT – Category list */}
          <div>
            <h2 style={sectionTitleStyle}>
              What category of transaction are you creating?
            </h2>
            <p style={subtitleStyle}>
              Pick the closest match. Back Boss will apply the right
              checklists, docs, and commission rules for you.
            </p>

            {options.map((opt, index) => {
              const optionCardStyle: React.CSSProperties = {
                ...optionCardStyleBase,
                marginTop: index === 0 ? 18 : 12,
              };

              return (
                <div key={opt.key} style={optionCardStyle}>
                  <div style={optionTextBlockStyle}>
                    <div style={optionTitleStyle}>{opt.label}</div>
                    <div style={optionDescriptionStyle}>
                      {opt.description}
                    </div>
                  </div>

                  <button
                    type="button"
                    style={selectButtonStyle}
                    onClick={() => handleSelect(opt.key)}
                  >
                    Select
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT – Create for agent */}
          <aside style={sideCardStyle}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#6b7280",
                marginBottom: 4,
              }}
            >
              Create transaction for:
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 6,
              }}
            >
              {prettyName}
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: 13,
                color: "#2563eb",
                textDecoration: "none",
              }}
            >
              change
            </a>

            <div
              style={{
                marginTop: 16,
                paddingTop: 12,
                borderTop: "1px solid #e5e7eb",
                fontSize: 12,
                color: "#6b7280",
              }}
            >
              In a later phase, you&apos;ll be able to change the agent, team,
              or office for this file and Back Boss will auto-adjust splits and
              permissions.
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

export default AddTransactionPage;

export const getServerSideProps: GetServerSideProps<AddProps> = async (
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

  return {
    props: {
      userEmail: session.user?.email ?? null,
    },
  };
};
