import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type DashboardProps = {
  userEmail: string | null;
};

const mockData = {
  capProgress: {
    cap: 12000,
    used: 9300,
    mtd: 3200,
  },
  complianceAlerts: [
    {
      id: "TX-1245",
      address: "1234 Elm St, Frisco, TX 75034",
      type: "Listing",
      missingCount: 3,
      stage: "Active",
    },
    {
      id: "TX-2879",
      address: "5678 Lakeview Dr, Little Elm, TX 75068",
      type: "Buyer",
      missingCount: 1,
      stage: "Pending",
    },
  ],
  quickResources: [
    {
      name: "Listing Launch Checklist",
      category: "Listing",
    },
    {
      name: "Buyer Onboarding Packet",
      category: "Buyer",
    },
    {
      name: "TREC IABS + Consumer Notice",
      category: "Compliance",
    },
  ],
  todaysFocus: [
    "Follow up on missing docs for 1234 Elm St.",
    "Confirm closing date details for 5678 Lakeview Dr.",
    "Review cap progress and plan next 2 deals.",
  ],
};

const capPercent = Math.round(
  (mockData.capProgress.used / mockData.capProgress.cap) * 100
);

export default function Dashboard({ userEmail }: DashboardProps) {
  const name =
    userEmail?.split("@")[0]?.replace(/\./g, " ") || "test";

  return (
    <AppShell userEmail={userEmail}>
      {/* Top hero text over the photo */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 24, // bigger breadcrumb
            color: "#e5e7eb",
            marginBottom: 6,
          }}
        >
          Start / Back Boss dashboard
        </div>
        <div
          style={{
            fontSize: 20, // bigger WELCOME BACK
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#e5e7eb",
            marginBottom: 6,
          }}
        >
          Welcome back
        </div>
        <h1
          style={{
            fontSize: 42, // bigger main title
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          {name}, here&apos;s your Back Boss snapshot
        </h1>
      </div>

      {/* Top row: posts, calendar, COMPLIANCE ALERTS (moved up) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2.2fr 1.6fr 1.4fr",
          gap: 24,
          marginBottom: 24,
        }}
      >
        {/* Local posts */}
        <section
          style={{
            background: "rgba(248,250,252,0.96)",
            borderRadius: 26,
            padding: 20,
            boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
          }}
        >
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                margin: 0,
                color: "#0f172a",
              }}
            >
              Local posts
            </h2>
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: 13,
                color: "#6b7280",
                cursor: "pointer",
              }}
            >
              Actions ▾
            </button>
          </header>

          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <input
              placeholder="Find a post."
              style={{
                flex: 1,
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                padding: "8px 12px",
                fontSize: 14,
              }}
            />
            <select
              style={{
                width: 140,
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                padding: "8px 12px",
                fontSize: 14,
              }}
            >
              <option>The Blend</option>
            </select>
          </div>

          {[
            "Welcome Dianne Lashley to the family!",
            "CE Course – Creative Financing – Now Released",
            "CE Course – The Mortgage Process A to Z – Now Released",
          ].map((title, idx) => (
            <article
              key={title}
              style={{
                display: "flex",
                gap: 12,
                padding: 10,
                marginTop: 10,
                borderRadius: 18,
                background: "#f9fafb",
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 60,
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg,#6366f1,#ec4899,#f97316)",
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#1d4ed8",
                    marginBottom: 4,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#4b5563",
                    lineHeight: 1.4,
                  }}
                >
                  Mon, Nov {10 - idx}, 2025 · Hi Team – The CE course is now
                  active in Elite Living Connect. Email admin if you want
                  access.
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#9ca3af",
                    marginTop: 4,
                  }}
                >
                  Jasmin Castillo · {idx + 1} view
                  {idx > 0 ? "s" : ""}
                </div>
              </div>
            </article>
          ))}

          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button
              style={{
                borderRadius: 999,
                border: "1px solid #d1d5db",
                padding: "6px 16px",
                fontSize: 14,
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Show more
            </button>
          </div>
        </section>

        {/* Calendar */}
        <section
          style={{
            background: "rgba(248,250,252,0.96)",
            borderRadius: 26,
            padding: 20,
            boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
            fontSize: 14,
          }}
        >
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              Friday, November 14
            </div>
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: 13,
                color: "#2563eb",
                cursor: "pointer",
              }}
            >
              Calendar →
            </button>
          </header>

          {/* simple calendar grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 4,
              fontSize: 11,
              color: "#6b7280",
              marginBottom: 10,
            }}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div
                key={d}
                style={{ textAlign: "center", paddingBottom: 2 }}
              >
                {d}
              </div>
            ))}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 14;
              return (
                <div
                  key={day}
                  style={{
                    textAlign: "center",
                    padding: "6px 0",
                    borderRadius: 8,
                    background: isToday ? "#2563eb" : "transparent",
                    color: isToday ? "#f9fafb" : "#111827",
                    fontSize: 12,
                    fontWeight: isToday ? 600 : 400,
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#2563eb",
              marginTop: 4,
              lineHeight: 1.4,
            }}
          >
            <div>
              <strong>
                Lunch and Learn CE Credit – Galleria Tower 3 Floor
              </strong>
              <br />
              Thu, 11/20/2025 8:00 AM · 5 days
            </div>
            <div style={{ marginTop: 8 }}>
              <strong>CE Class + Lunch and Learn</strong>
              <br />
              Thu, 11/20/2025 1:00 PM · 6 days
            </div>
            <div style={{ marginTop: 8 }}>
              <strong>Sip + Share</strong>
              <br />
              Tue, 11/25/2025 1:00 PM · 1 wk
            </div>
          </div>
        </section>

        {/* Compliance alerts – moved up here */}
        <section
          style={{
            background: "rgba(248,250,252,0.96)",
            borderRadius: 26,
            padding: 20,
            boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 0,
              marginBottom: 6,
              color: "#0f172a",
            }}
          >
            Compliance alerts
          </h2>
          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginBottom: 10,
            }}
          >
            Deals missing required docs from your checklist.
          </div>
          {mockData.complianceAlerts.map((a) => (
            <div
              key={a.id}
              style={{
                borderRadius: 18,
                background: "#f9fafb",
                border: "1px solid #fee2e2",
                padding: "10px 12px",
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {a.address}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                  }}
                >
                  {a.type} · Stage: {a.stage}
                </div>
              </div>
              <div
                style={{
                  alignSelf: "center",
                  fontSize: 12,
                  borderRadius: 999,
                  padding: "4px 10px",
                  background: "#fee2e2",
                  color: "#b91c1c",
                  whiteSpace: "nowrap",
                }}
              >
                {a.missingCount} missing
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Middle row: production, Ask Nova, signed in (unchanged) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.7fr 2.1fr 1.2fr",
          gap: 24,
          marginBottom: 24,
        }}
      >
        {/* Production overview */}
        <section
          style={{
            background: "rgba(248,250,252,0.96)",
            borderRadius: 26,
            padding: 20,
            boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 0,
              marginBottom: 12,
              color: "#0f172a",
            }}
          >
            Production overview
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
              marginBottom: 12,
            }}
          >
            {[
              ["Closings (30d)", "3"],
              ["Pending deals", "2"],
              ["YTD GCI", "$48,500"],
              ["Cap used (YTD)", "$9,300"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  borderRadius: 20,
                  background: "#ffffff",
                  padding: "10px 12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginBottom: 4,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ask Nova card */}
        <section
          style={{
            background:
              "radial-gradient(circle at top left,#1f2937,#020617)",
            borderRadius: 26,
            padding: 20,
            boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
            color: "#e5e7eb",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <img
              src="https://secure.elitelivingconnect.com/file/99d90d48c89a9816deebf6f27b7c39f3/a78ceb63-699f-420d-bfd7-d2e1997e1f58/New+Elite+Living+Realty+Logo+White.png"
              alt="Elite Living"
              style={{ height: 20, width: "auto" }}
            />
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              🤖 Ask Back Boss AI, your Elite Living Realty Assistant
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <input
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.6)",
                background: "rgba(15,23,42,0.9)",
                color: "#e5e7eb",
                padding: "10px 14px",
                fontSize: 15,
              }}
            />
            <button
              style={{
                borderRadius: 999,
                padding: "10px 22px",
                border: "none",
                background:
                  "linear-gradient(135deg,#6366f1,#ec4899,#f97316)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Submit
            </button>
            <button
              style={{
                width: 42,
                height: 42,
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.7)",
                background: "rgba(15,23,42,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 18,
              }}
              title="Voice"
            >
              🎤
            </button>
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            Nova will use your Back Boss data to answer questions and
            create tasks.
          </div>
        </section>

        {/* Signed in card */}
        <section
          style={{
            background: "rgba(248,250,252,0.96)",
            borderRadius: 26,
            padding: 20,
            boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
            fontSize: 14,
          }}
        >
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                margin: 0,
                color: "#0f172a",
              }}
            >
              Signed in
            </h2>
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: 13,
                color: "#2563eb",
                cursor: "pointer",
              }}
            >
              View all sign-ins →
            </button>
          </header>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "999px",
                overflow: "hidden",
                border: "1px solid #e5e7eb",
              }}
            >
              <img
                src="https://secure.elitelivingconnect.com/file/d0494920325e5252450cfaf321aebfe0/4938db92-1629-4b6e-8779-83035f3d90dc/theone.png"
                alt="Agent"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#111827",
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                }}
              >
                Elite Living Realty
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom row: ASSOCIATE ACCESS (moved down) + quick resources + focus */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 2fr",
          gap: 24,
        }}
      >
        {/* Associate access activity – now bottom-left */}
        <section
          style={{
            background: "rgba(248,250,252,0.96)",
            borderRadius: 26,
            padding: 20,
            boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
            fontSize: 14,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              margin: 0,
              marginBottom: 16,
              color: "#0f172a",
            }}
          >
            Associate access activity
          </h2>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              background:
                "conic-gradient(#22c55e 0 90deg,#f97316 90deg 210deg,#e5e7eb 210deg 360deg)",
              margin: "0 auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                background: "#f9fafb",
              }}
            />
          </div>
          <div style={{ fontSize: 13, color: "#111827" }}>
            <div>1 Signed in</div>
            <div>19 Last 7 Days</div>
            <div>63 Total</div>
          </div>
        </section>

        {/* Quick resources + Today’s focus (same as before) */}
        <div style={{ display: "grid", gap: 16 }}>
          {/* Quick resources */}
          <section
            style={{
              background: "rgba(248,250,252,0.96)",
              borderRadius: 26,
              padding: 20,
              boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  margin: 0,
                  color: "#0f172a",
                }}
              >
                Quick resources
              </h2>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 13,
                  color: "#2563eb",
                  cursor: "pointer",
                }}
              >
                View all →
              </button>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 10,
              }}
            >
              Most-used Back Boss files at your fingertips.
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {mockData.quickResources.map((r) => (
                <div
                  key={r.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 16,
                    background: "#f9fafb",
                    padding: "8px 10px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#111827",
                      }}
                    >
                      {r.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                      }}
                    >
                      {r.category}
                    </div>
                  </div>
                  <button
                    style={{
                      borderRadius: 999,
                      border: "1px solid #d1d5db",
                      padding: "4px 12px",
                      background: "#ffffff",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Today’s focus */}
          <section
            style={{
              background: "rgba(248,250,252,0.96)",
              borderRadius: 26,
              padding: 20,
              boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                margin: 0,
                marginBottom: 6,
                color: "#0f172a",
              }}
            >
              Today&apos;s focus
            </h2>
            <div
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 8,
              }}
            >
              This section will soon pull live tasks and reminders from
              Back Boss AI.
            </div>
            <ul
              style={{
                paddingLeft: 18,
                margin: 0,
                display: "grid",
                gap: 4,
                fontSize: 13,
                color: "#111827",
              }}
            >
              {mockData.todaysFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  ctx
) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

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
