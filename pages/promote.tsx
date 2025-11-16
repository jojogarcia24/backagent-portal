import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type PromoteProps = {
  userEmail: string | null;
};

const cardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
};

const sectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 14,
};

const headerTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  margin: 0,
  color: "#0f172a",
};

const headerSubStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
};

const subtleTextStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
};

const pillButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "none",
  background: "#111827",
  color: "#f9fafb",
  padding: "8px 18px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const ghostButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
  padding: "8px 16px",
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
};

const tileStyle: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  padding: 16,
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(15,23,42,0.10)",
};

function Promote({ userEmail }: PromoteProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  const productCategories = [
    "Brochures",
    "Business Cards",
    "Flyers",
    "Labels",
    "Logo & Branding",
    "Merchandise",
    "Postcards",
    "Signs & Banners",
  ];

  const sampleMerch = [
    {
      name: "Elite Living Realty Merch Pack",
      description: "Hats, polos, jackets & more.",
      tag: "Custom Merchandise",
    },
    {
      name: "Open House Essentials Kit",
      description: "Directional signs, riders, and flags.",
      tag: "Listing Support",
    },
  ];

  return (
    <AppShell userEmail={userEmail} activeTab="Promote">
      {/* Hero – no rotating promo card, just clean intro */}
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
          Promote
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Back Boss Marketing Center
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#d1d5db",
            marginTop: 6,
            maxWidth: 720,
          }}
        >
          Create on-brand marketing pieces in a few clicks. Browse approved
          print, merch, and digital assets for Elite Living Realty. Everything
          here is built to help you stay top-of-mind and attract your next
          client, {name}.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.1fr",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: Catalog & products */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Catalog */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Catalog</h2>
                <p style={headerSubStyle}>
                  Approved marketing products and services.
                </p>
              </div>
              <button type="button" style={ghostButtonStyle}>
                View full catalog ▸
              </button>
            </header>

            <div style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: 10,
                }}
              >
                Products
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: 14,
                }}
              >
                {productCategories.map((label) => (
                  <div key={label} style={tileStyle}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 12,
                        margin: "0 auto 8px",
                        background:
                          "radial-gradient(circle at 0 0, #22c55e, #111827)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#f9fafb",
                        fontSize: 18,
                      }}
                    >
                      ◼
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: 2,
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>
                      Browse templates &amp; pricing
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick note */}
            <p style={subtleTextStyle}>
              In a later phase, each tile will open a full gallery powered by
              your print vendor or internal design team.
            </p>
          </section>

          {/* Product & service catalog – focus on merch */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Product &amp; Service Catalog</h2>
                <p style={headerSubStyle}>
                  Explore Elite Living merch and marketing bundles.
                </p>
              </div>
              <button type="button" style={ghostButtonStyle}>
                Search gallery ▸
              </button>
            </header>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1.2fr",
                gap: 24,
              }}
            >
              {/* Merch tiles */}
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: "#111827",
                      color: "#f9fafb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    👕
                  </span>
                  Merchandise
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 14,
                  }}
                >
                  {sampleMerch.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        borderRadius: 18,
                        border: "1px solid #e5e7eb",
                        background: "#ffffff",
                        padding: 12,
                        boxShadow: "0 8px 20px rgba(15,23,42,0.08)",
                        fontSize: 12,
                      }}
                    >
                      <div
                        style={{
                          borderRadius: 10,
                          background:
                            "linear-gradient(135deg, #111827, #1d4ed8)",
                          height: 90,
                          marginBottom: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#e5e7eb",
                          fontSize: 11,
                          textAlign: "center",
                          padding: "0 10px",
                        }}
                      >
                        Elite Living mockup preview
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#111827",
                          marginBottom: 2,
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>
                        {item.description}
                      </div>
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 10,
                          color: "#1d4ed8",
                          fontWeight: 600,
                        }}
                      >
                        {item.tag}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search + filters */}
              <div>
                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#111827",
                      marginBottom: 6,
                    }}
                  >
                    Search options
                  </div>
                  <div style={{ ...subtleTextStyle, marginBottom: 4 }}>
                    Browse by category:
                  </div>
                  <select
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      padding: "8px 10px",
                      fontSize: 13,
                      marginBottom: 10,
                    }}
                    defaultValue="Merchandise"
                  >
                    <option>Merchandise</option>
                    <option>Print Marketing</option>
                    <option>Digital Assets</option>
                    <option>Listing Kits</option>
                  </select>

                  <div style={{ ...subtleTextStyle, marginBottom: 4 }}>
                    Search by keyword:
                  </div>
                  <input
                    placeholder="Search for product"
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      padding: "8px 10px",
                      fontSize: 13,
                      marginBottom: 8,
                    }}
                  />
                  <button type="button" style={pillButtonStyle}>
                    Search gallery
                  </button>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#111827",
                      marginBottom: 4,
                    }}
                  >
                    Search filters
                  </div>
                  <div
                    style={{
                      borderRadius: 10,
                      background: "#f3f4f6",
                      padding: 10,
                      fontSize: 11,
                      color: "#6b7280",
                    }}
                  >
                    No filters assigned. Filters for price, vendor, and
                    campaign-type will be available in a later phase.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT: Admin + governance side panel */}
        <aside style={cardStyle}>
          <header style={sectionHeaderStyle}>
            <div>
              <h2 style={headerTitleStyle}>Admin Controls</h2>
              <p style={headerSubStyle}>
                Manage products, vendors, and access.
              </p>
            </div>
          </header>

          <p style={{ ...subtleTextStyle, marginBottom: 16 }}>
            Everyone can see the catalog. Only admins will be allowed to add,
            edit, or retire products once permissions are wired to Back Boss
            roles.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <button type="button" style={pillButtonStyle}>
              + Add product or service
            </button>
            <button type="button" style={ghostButtonStyle}>
              Edit catalog categories
            </button>
            <button type="button" style={ghostButtonStyle}>
              Manage vendors &amp; links
            </button>
            <button type="button" style={ghostButtonStyle}>
              Update brand assets
            </button>
          </div>

          <div
            style={{
              borderRadius: 16,
              background: "#f3f4f6",
              padding: 12,
              fontSize: 11,
              color: "#4b5563",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: 4,
                fontSize: 12,
              }}
            >
              Role-based access
            </div>
            <p style={{ margin: 0 }}>
              Admin tools here are placeholders. In the Back Boss 2.0 admin
              console you&apos;ll be able to restrict who can edit catalog items
              vs. who can only order from them.
            </p>
          </div>

          <div style={subtleTextStyle}>
            Need to add a new category (like Video Reels, Canva templates, or
            Social Media Bundles)? Use{" "}
            <span style={{ color: "#1d4ed8", fontWeight: 600 }}>
              Add product or service
            </span>{" "}
            above and Nova will eventually guide admins through the setup.
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

export default Promote;

export const getServerSideProps: GetServerSideProps<PromoteProps> = async (
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
