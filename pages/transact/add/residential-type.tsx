import React, { useEffect } from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type TypeProps = {
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

const optionRowStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  marginTop: 12,
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
  padding: "10px 22px",
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

const ResidentialTypePage: React.FC<TypeProps> = ({ userEmail }) => {
  const router = useRouter();
  const { category } = router.query;

  const categoryLabel =
    typeof category === "string" && category.trim().length > 0
      ? category.trim()
      : "Residential";

  const isApartment =
    categoryLabel.toLowerCase() === "apartment" ||
    categoryLabel.toLowerCase() === "apartments";

  // If category is Apartment, automatically treat as Lease and skip this step
  useEffect(() => {
    if (!router.isReady) return;
    if (!isApartment) return;

    const params = new URLSearchParams();
    params.set("category", categoryLabel);
    params.set("lease", "true");
    params.set("sale", "false");

    router.replace(`/transact/add/residential-phase?${params.toString()}`);
  }, [router, router.isReady, isApartment, categoryLabel]);

  const goWithType = (type: "sale" | "lease") => {
    const params = new URLSearchParams();
    params.set("category", categoryLabel);
    if (type === "sale") {
      params.set("sale", "true");
      params.set("lease", "false");
    } else {
      params.set("lease", "true");
      params.set("sale", "false");
    }

    router.push(`/transact/add/residential-phase?${params.toString()}`);
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
          Choose whether this file is a sale or lease so we can tune phases,
          checklists, and compliance rules for the right path.
        </p>
      </div>

      <div style={pageCardStyle}>
        {/* Category checkmark */}
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
          {isApartment && (
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: "#6b7280",
              }}
            >
              Apartments are treated as{" "}
              <strong>lease files by default</strong>. Back Boss will auto-apply
              lease phases and wording.
            </div>
          )}
        </div>

        {/* If Apartment, the redirect happens in useEffect – this UI is basically never seen */}
        {!isApartment && (
          <>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 10px 0",
              }}
            >
              Is this a sale or lease?
            </h2>

            <div style={optionRowStyle}>
              <div style={optionCardStyle}>
                <div style={optionTextBlockStyle}>
                  <div style={optionTitleStyle}>Sale</div>
                  <div style={optionDescriptionStyle}>
                    Standard purchase transaction for a residential, apartment,
                    commercial, or referral-based deal.
                  </div>
                </div>
                <button
                  type="button"
                  style={selectButtonStyle}
                  onClick={() => goWithType("sale")}
                >
                  Select
                </button>
              </div>

              <div style={optionCardStyle}>
                <div style={optionTextBlockStyle}>
                  <div style={optionTitleStyle}>Lease</div>
                  <div style={optionDescriptionStyle}>
                    Lease or rental transaction where your client is the
                    landlord or tenant.
                  </div>
                </div>
                <button
                  type="button"
                  style={selectButtonStyle}
                  onClick={() => goWithType("lease")}
                >
                  Select
                </button>
              </div>
            </div>
          </>
        )}

        {isApartment && (
          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4,
            }}
          >
            Redirecting you to the next step for apartment leases…
          </div>
        )}
      </div>
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps<TypeProps> = async (
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

export default ResidentialTypePage;
