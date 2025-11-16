import React from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type PhaseProps = {
  userEmail: string | null;
};

const pageCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 20px 55px rgba(15,23,42,0.45)",
};

const greenRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
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

const phaseCardStyle: React.CSSProperties = {
  padding: "14px 18px",
  borderRadius: 18,
  background: "#ffffff",
  border: "1px solid rgba(209,213,219,0.9)",
  boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
  marginTop: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const selectButtonStyle: React.CSSProperties = {
  padding: "8px 18px",
  borderRadius: 999,
  border: "none",
  background: "#276bff",
  color: "#ffffff",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 12px 26px rgba(37,99,235,0.35)",
};

const ResidentialPhasePage: React.FC<PhaseProps> = ({ userEmail }) => {
  const router = useRouter();
  const { category, sale, lease } = router.query;

  const categoryLabel =
    typeof category === "string" && category.trim().length > 0
      ? category
      : "Residential";

  const isLease =
    typeof lease === "string"
      ? lease.toLowerCase() === "true"
      : sale === "false";

  const typeLabel = isLease ? "Lease" : "Sale";

  const goNext = (phaseKey: string) => {
    const params = new URLSearchParams();
    if (isLease) {
      params.set("lease", "true");
      params.set("sale", "false");
    } else {
      params.set("sale", "true");
      params.set("lease", "false");
    }
    params.set("phase", phaseKey);
    params.set("category", categoryLabel);
    router.push(`/transact/add/residential-party?${params.toString()}`);
  };

  const handleChangeType = () => {
    const params = new URLSearchParams();
    if (isLease) {
      params.set("lease", "true");
      params.set("sale", "false");
    } else {
      params.set("sale", "true");
      params.set("lease", "false");
    }
    params.set("category", categoryLabel);
    router.push(`/transact/add/residential-type?${params.toString()}`);
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
            fontWeight: 800,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Add Transaction
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#e5e7eb",
            marginTop: 6,
            maxWidth: 720,
          }}
        >
          Next, tell Back Boss where you are in the {typeLabel.toLowerCase()} so
          we can highlight the right next steps.
        </p>
      </div>

      <div style={pageCardStyle}>
        <div style={{ marginBottom: 16 }}>
          <div style={greenRowStyle}>
            <div style={greenCheckIconStyle}>✓</div>
            <div>
              You selected the{" "}
              <strong>&apos;{categoryLabel}&apos;</strong> category.{" "}
              <a href="/transact/add" style={{ color: "#2563eb" }}>
                Change
              </a>
            </div>
          </div>
          <div style={greenRowStyle}>
            <div style={greenCheckIconStyle}>✓</div>
            <div>
              You selected the <strong>&apos;{typeLabel}&apos;</strong> type.{" "}
              <span
                style={{ color: "#2563eb", cursor: "pointer", marginLeft: 4 }}
                onClick={handleChangeType}
              >
                Change
              </span>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 10px 0",
          }}
        >
          Where would you like to start the transaction?
        </h2>

        <div style={{ marginTop: 10 }}>
          {[
            {
              key: "start",
              label: "Start",
              description:
                "You are in the early stages of representing your client. (Recommended)",
            },
            {
              key: "showing",
              label: "Showing",
              description:
                "Client is actively searching for, or marketing, a property.",
            },
            {
              key: "contract",
              label: "Contract",
              description:
                "The contract is written; you may still be negotiating details.",
            },
            {
              key: "pre-closing",
              label: isLease ? "Pre-Move-In" : "Pre-Closing",
              description: isLease
                ? "All documents are signed. You are ready to submit for funding / move-in."
                : "All documents have been signed. You are ready to submit for funding.",
            },
            {
              key: "post-closing",
              label: isLease ? "Post-Move-In" : "Post-Closing",
              description: isLease
                ? "Tenant has moved in. You need to submit your paperwork and request commission."
                : "Transaction has closed. Submit paperwork and request commission.",
            },
          ].map((phase) => (
            <div key={phase.key} style={phaseCardStyle}>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {phase.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#6b7280",
                    marginTop: 4,
                  }}
                >
                  {phase.description}
                </div>
              </div>
              <button
                type="button"
                style={selectButtonStyle}
                onClick={() => goNext(phase.key)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps<PhaseProps> = async (
  context
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

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

export default ResidentialPhasePage;
