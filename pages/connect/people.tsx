import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type PeopleProps = {
  userEmail: string | null;
};

const cardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 20,
  boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
};

const sectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
};

const headerTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  margin: 0,
  color: "#0f172a",
};

const headerSubStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
};

const fieldLabelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 6,
};

const subtleTextStyle: React.CSSProperties = {
  fontSize: 11,
  color: "#9ca3af",
};

const textInputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  padding: "8px 10px",
  fontSize: 13,
  background: "#ffffff",
};

const pillButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "none",
  background: "#111827",
  color: "#f9fafb",
  padding: "9px 18px",
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

const segmentedButtonStyle: React.CSSProperties = {
  borderRadius: 10,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  padding: "10px 14px",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  textAlign: "center",
};

function People({ userEmail }: PeopleProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

  const sampleContacts = [
    {
      name: "Back Office – Compliance",
      type: "Department",
      phone: "(214) 555-0123",
      email: "compliance@elitelivingrealty.com",
    },
    {
      name: "Carlos Rivera",
      type: "Lender Partner",
      phone: "(214) 555-0199",
      email: "carlos@elitelivinglending.com",
    },
    {
      name: "Growth+ Coaching Desk",
      type: "Internal",
      phone: "(214) 555-0145",
      email: "growthplus@elitelivingrealty.com",
    },
  ];

  return (
    <AppShell userEmail={userEmail} activeTab="Connect">
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
          Connect / People
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          People &amp; Partners
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#d1d5db",
            marginTop: 6,
            maxWidth: 640,
          }}
        >
          Search associates, partners, and departments. Add new contacts and
          launch messages or tasks without leaving your Back Boss Connect hub,
          {` ${name}.`}
        </p>
      </div>

      {/* Top actions row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <div style={{ flex: 1 }}>
          <input
            placeholder="Enter a person's name, phone number, or company."
            style={{
              width: "100%",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              padding: "10px 16px",
              fontSize: 13,
              background: "#ffffff",
            }}
          />
        </div>
        <button type="button" style={pillButtonStyle}>
          Search
        </button>
        <button type="button" style={ghostButtonStyle}>
          Actions ▾
        </button>
      </div>

      {/* Main grid: directory / add contact / send message */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.35fr 1.65fr 1.4fr",
          gap: 24,
        }}
      >
        {/* LEFT – Directory */}
        <section style={cardStyle}>
          <header style={sectionHeaderStyle}>
            <div>
              <h2 style={headerTitleStyle}>Directory</h2>
              <p style={headerSubStyle}>
                Quick access to your most-used contacts.
              </p>
            </div>
            <button type="button" style={ghostButtonStyle}>
              View all ▸
            </button>
          </header>

          <div
            style={{
              borderRadius: 18,
              background: "#f3f4f6",
              padding: 10,
              fontSize: 12,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <span style={{ fontWeight: 600 }}>Pinned Contacts</span>
              <span style={{ ...subtleTextStyle, fontSize: 10 }}>
                Static sample – syncs later with CRM
              </span>
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {sampleContacts.map((c) => (
                <li
                  key={c.email}
                  style={{
                    padding: "6px 0",
                    borderTop: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 2,
                    }}
                  >
                    {c.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>
                    {c.type}
                  </div>
                  <div style={{ fontSize: 11, color: "#4b5563", marginTop: 2 }}>
                    {c.phone} · {c.email}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={subtleTextStyle}>
            In a later phase this list will be powered by live data from your
            CRM and brokerage directory.
          </div>
        </section>

        {/* MIDDLE – Add a contact */}
        <section style={cardStyle}>
          <header style={sectionHeaderStyle}>
            <div>
              <h2 style={headerTitleStyle}>Add a Contact</h2>
              <p style={headerSubStyle}>
                Create shared contacts once so everyone can re-use them.
              </p>
            </div>
          </header>

          {/* Type chooser – styled like the three big buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              marginBottom: 16,
            }}
          >
            {["Private Contact", "Community Contact", "Associate"].map(
              (label, idx) => (
                <button
                  key={label}
                  type="button"
                  style={{
                    ...segmentedButtonStyle,
                    background: idx === 2 ? "#111827" : "#ffffff",
                    color: idx === 2 ? "#f9fafb" : "#111827",
                    borderColor: idx === 2 ? "#111827" : "#d1d5db",
                  }}
                >
                  {label}
                </button>
              )
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1.4fr",
              gap: 18,
              alignItems: "flex-start",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 13,
                  color: "#111827",
                  marginTop: 0,
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                Shared contacts save everyone time.
              </p>
              <p
                style={{
                  ...subtleTextStyle,
                  fontSize: 12,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Creating duplicate contacts slows the whole office down. Use
                shared contacts for lenders, inspectors, title companies, and
                other partners you want everyone to find.
              </p>
            </div>

            <div>
              <div style={fieldLabelStyle}>First Name</div>
              <input style={textInputStyle} />

              <div style={{ ...fieldLabelStyle, marginTop: 10 }}>
                Last Name
              </div>
              <input style={textInputStyle} />

              <div style={{ ...fieldLabelStyle, marginTop: 10 }}>
                Company
              </div>
              <input style={textInputStyle} />

              <div style={{ ...fieldLabelStyle, marginTop: 10 }}>
                Email Address
              </div>
              <input style={textInputStyle} />

              <div style={{ ...fieldLabelStyle, marginTop: 10 }}>
                Phone Number
              </div>
              <input style={textInputStyle} />

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 8,
                  fontSize: 12,
                  color: "#4b5563",
                }}
              >
                <input type="checkbox" />
                <span>No email address available.</span>
              </label>

              <div style={{ marginTop: 14 }}>
                <button type="button" style={pillButtonStyle}>
                  Add New Contact
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT – Send a message / task / notice */}
        <section style={cardStyle}>
          <header style={sectionHeaderStyle}>
            <div>
              <h2 style={headerTitleStyle}>Send a Message</h2>
              <p style={headerSubStyle}>
                Launch emails, posts, events, tasks, or notices.
              </p>
            </div>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 10,
              marginBottom: 10,
            }}
          >
            {[
              "Send Bulk Email",
              "Add an Event",
              "Add a Post",
              "Send a Task",
              "Send a Notice",
            ].map((label) => (
              <button
                key={label}
                type="button"
                style={{
                  ...segmentedButtonStyle,
                  textAlign: "left",
                  justifyContent: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 999,
                    background: "#111827",
                    color: "#f9fafb",
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ●
                </span>
                {label}
              </button>
            ))}
          </div>

          <div style={subtleTextStyle}>
            In Back Boss 2.0 these shortcuts will route into Nova-powered flows
            for email campaigns, calendar events, social posts, task routing,
            and office notices.
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export default People;

export const getServerSideProps: GetServerSideProps<PeopleProps> = async (
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
