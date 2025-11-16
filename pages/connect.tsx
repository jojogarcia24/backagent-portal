import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type ConnectProps = {
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

const linkButtonStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  fontSize: 12,
  fontWeight: 600,
  color: "#2563eb",
  cursor: "pointer",
};

export default function Connect({ userEmail }: ConnectProps) {
  const name =
    userEmail?.split("@")[0]?.replace(/\./g, " ") || "test";

  return (
    <AppShell userEmail={userEmail}>
      {/* Hero – same vibe as dashboard */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 24,
            color: "#e5e7eb",
            marginBottom: 6,
          }}
        >
          Start / Back Boss connect
        </div>
        <div
          style={{
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#e5e7eb",
            marginBottom: 6,
          }}
        >
          Stay connected
        </div>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          {name}, here&apos;s your Back Boss Connect hub
        </h1>
      </div>

      {/* Quick action strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <button
          style={{
            borderRadius: 999,
            border: "1px solid rgba(148,163,184,0.9)",
            padding: "6px 12px",
            fontSize: 12,
            background: "rgba(15,23,42,0.96)",
            color: "#e5e7eb",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>💬</span>
          <span>New group chat</span>
        </button>
        <button
          style={{
            borderRadius: 999,
            border: "1px solid rgba(148,163,184,0.9)",
            padding: "6px 12px",
            fontSize: 12,
            background: "rgba(15,23,42,0.9)",
            color: "#e5e7eb",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>📅</span>
          <span>Book office time</span>
        </button>
        <button
          style={{
            borderRadius: 999,
            border: "1px solid rgba(148,163,184,0.9)",
            padding: "6px 12px",
            fontSize: 12,
            background: "rgba(15,23,42,0.9)",
            color: "#e5e7eb",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>🧾</span>
          <span>Submit help ticket</span>
        </button>
        <button
          style={{
            borderRadius: 999,
            border: "1px solid rgba(148,163,184,0.9)",
            padding: "6px 12px",
            fontSize: 12,
            background: "rgba(15,23,42,0.9)",
            color: "#e5e7eb",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>📣</span>
          <span>Post announcement</span>
        </button>
      </div>

      {/* Main grid – 2 columns like classic Connect, but BackAgent 2.0 styling */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.25fr 1.75fr",
          gap: 24,
          marginBottom: 24,
        }}
      >
        {/* LEFT COLUMN */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Office info */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Elite Living Realty</h2>
                <p style={headerSubStyle}>
                  Main office details &amp; contact info
                </p>
              </div>
              <button style={linkButtonStyle}>Set office photo</button>
            </header>

            <div
              style={{
                borderRadius: 22,
                background: "#f9fafb",
                padding: 16,
                fontSize: 13,
                color: "#374151",
              }}
            >
              <p style={{ margin: 0, fontWeight: 600 }}>
                Elite Living Realty
              </p>
              <p style={{ margin: "4px 0" }}>13155 Noel Rd #900</p>
              <p style={{ margin: "0 0 8px" }}>Dallas, TX 75240</p>
              <p style={{ margin: 0, color: "#4b5563" }}>
                Main:{" "}
                <span style={{ fontWeight: 600 }}>214.725.3348</span>
              </p>
            </div>
          </section>

          {/* Shared docs */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Shared docs</h2>
                <p style={headerSubStyle}>
                  View shared documents and links.
                </p>
              </div>
              <button style={linkButtonStyle}>View all &raquo;</button>
            </header>

            {/* Featured doc banner */}
            <div
              style={{
                borderRadius: 20,
                background:
                  "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(79,70,229,0.16))",
                padding: 12,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#1d4ed8",
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    marginBottom: 4,
                  }}
                >
                  ⭐ Featured resource
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  Marketing Toolkit v3.0
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginTop: 2,
                  }}
                >
                  Updated 2 days ago · Listing launches, open house flyers, and social templates.
                </div>
              </div>
              <button
                style={{
                  borderRadius: 999,
                  border: "none",
                  padding: "8px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  background: "#111827",
                  color: "#f9fafb",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Open toolkit
              </button>
            </div>

            {/* Other docs */}
            <div
              style={{
                borderRadius: 18,
                background: "#f3f4f6",
                padding: 10,
                fontSize: 13,
                color: "#111827",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginBottom: 10,
              }}
            >
              {[
                {
                  name: "Office Resources Drive",
                  description: "Policies, templates, & marketing assets",
                },
                {
                  name: "New Agent Onboarding Kit",
                  description: "Start-up docs, checklists & scripts",
                },
              ].map((doc) => (
                <div
                  key={doc.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 8,
                    borderRadius: 14,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {doc.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        marginTop: 2,
                      }}
                    >
                      {doc.description}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      color: "#2563eb",
                      fontWeight: 600,
                    }}
                  >
                    Open
                  </span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  borderRadius: 999,
                  border: "1px dashed #d1d5db",
                  padding: "8px 14px",
                  fontSize: 12,
                  color: "#6b7280",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                + Add shared doc or link
              </button>
            </div>
          </section>

          {/* Today’s connection focus */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Today&apos;s connection focus</h2>
                <p style={headerSubStyle}>
                  Three quick ways to plug in and stay visible.
                </p>
              </div>
            </header>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: 13,
                color: "#374151",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    marginTop: 5,
                    background:
                      "linear-gradient(135deg,#22c55e,#16a34a)",
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>
                    Welcome a new agent in your main chat channel.
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    Drop a quick voice note or GIF to say hi and connect.
                  </div>
                </div>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    marginTop: 5,
                    background:
                      "linear-gradient(135deg,#3b82f6,#6366f1)",
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>
                    RSVP to at least one upcoming event.
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    Training, CE, or social — pick one thing that moves you
                    forward.
                  </div>
                </div>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    marginTop: 5,
                    background:
                      "linear-gradient(135deg,#f97316,#ea580c)",
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>
                    Check in with a lender or partner.
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    Send a quick market update or ask who you can help this
                    week.
                  </div>
                </div>
              </li>
            </ul>
          </section>

          {/* Reservations */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Reservations</h2>
                <p style={headerSubStyle}>
                  Book office resources, rooms, and time blocks.
                </p>
              </div>
              <button style={linkButtonStyle}>View all &raquo;</button>
            </header>

            <div
              style={{
                borderRadius: 18,
                background: "#f3f4f6",
                padding: 10,
                fontSize: 13,
                color: "#111827",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginBottom: 10,
              }}
            >
              {[
                {
                  name: "Office Phone Time",
                  location: "Dallas",
                  availability: "32 shifts this week",
                  tone: "#16a34a",
                },
                {
                  name: "Conference Room A",
                  location: "Dallas",
                  availability: "Booked today",
                  tone: "#ea580c",
                },
                {
                  name: "Studio / Media Room",
                  location: "Dallas",
                  availability: "Open this afternoon",
                  tone: "#2563eb",
                },
              ].map((slot) => (
                <div
                  key={slot.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 8,
                    borderRadius: 14,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {slot.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        marginTop: 2,
                      }}
                    >
                      {slot.location}
                    </div>
                  </div>
                  <span
                    style={{
                      borderRadius: 999,
                      background: "#0f172a",
                      color: "#f9fafb",
                      fontSize: 11,
                      padding: "4px 10px",
                      fontWeight: 600,
                      border: `1px solid ${slot.tone}`,
                    }}
                  >
                    {slot.availability}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  borderRadius: 999,
                  border: "1px dashed #d1d5db",
                  padding: "8px 14px",
                  fontSize: 12,
                  color: "#6b7280",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                + Request a reservation
              </button>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* People */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>People</h2>
                <p style={headerSubStyle}>
                  Enter a person&apos;s name, phone number, or company.
                </p>
              </div>
              <button style={linkButtonStyle}>Actions ▾</button>
            </header>

            {/* Search row */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <input
                placeholder="Search people and partners"
                style={{
                  flex: 1,
                  borderRadius: 999,
                  border: "1px solid #e5e7eb",
                  padding: "8px 12px",
                  fontSize: 13,
                }}
              />
              <button
                style={{
                  borderRadius: 999,
                  border: "none",
                  padding: "8px 12px",
                  fontSize: 13,
                  background: "#111827",
                  color: "#f9fafb",
                  cursor: "pointer",
                }}
              >
                🔍
              </button>
              <button
                style={{
                  borderRadius: 999,
                  border: "1px solid #d1d5db",
                  padding: "8px 12px",
                  fontSize: 13,
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>

            <p
              style={{
                fontSize: 11,
                color: "#6b7280",
                margin: "0 0 10px",
              }}
            >
              Directory search and smart routing will be powered by Back Boss AI
              in a later phase.
            </p>

            {/* Recently contacted */}
            <div
              style={{
                borderRadius: 18,
                background: "#f3f4f6",
                padding: 10,
                fontSize: 12,
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
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Recently contacted
                </span>
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: 11,
                    color: "#2563eb",
                    cursor: "pointer",
                  }}
                >
                  View directory
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {[
                  {
                    initials: "JC",
                    name: "Jasmin Castillo",
                    role: "Office admin",
                    status: "Online",
                  },
                  {
                    initials: "CL",
                    name: "Carlos Lopez",
                    role: "Preferred lender",
                    status: "In a meeting",
                  },
                  {
                    initials: "DL",
                    name: "Dianne Lashley",
                    role: "Growth+ agent",
                    status: "Offline",
                  },
                ].map((person) => (
                  <div
                    key={person.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 999,
                          background:
                            "linear-gradient(135deg,#111827,#1d4ed8)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#f9fafb",
                        }}
                      >
                        {person.initials}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {person.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#6b7280",
                          }}
                        >
                          {person.role} ·{" "}
                          <span
                            style={{
                              color:
                                person.status === "Online"
                                  ? "#16a34a"
                                  : person.status === "In a meeting"
                                  ? "#ea580c"
                                  : "#6b7280",
                            }}
                          >
                            {person.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 13,
                      }}
                    >
                      <button
                        style={{
                          borderRadius: 999,
                          border: "none",
                          padding: "4px 6px",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                        title="Email"
                      >
                        ✉️
                      </button>
                      <button
                        style={{
                          borderRadius: 999,
                          border: "none",
                          padding: "4px 6px",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                        title="Chat"
                      >
                        💬
                      </button>
                      <button
                        style={{
                          borderRadius: 999,
                          border: "none",
                          padding: "4px 6px",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                        title="Call"
                      >
                        📞
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Calendar + Tasks */}
          <section style={cardStyle}>
            {/* Calendar header */}
            <div style={{ ...sectionHeaderStyle, marginBottom: 16 }}>
              <div>
                <h2 style={headerTitleStyle}>Friday, November 14</h2>
                <p style={headerSubStyle}>Your upcoming events</p>
              </div>
              <button style={linkButtonStyle}>Calendar &raquo;</button>
            </div>

            {/* Calendar grid + events */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1.5fr",
                gap: 16,
                marginBottom: 18,
              }}
            >
              {/* Mini calendar */}
              <div
                style={{
                  borderRadius: 18,
                  background: "#f3f4f6",
                  padding: 10,
                  fontSize: 11,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4,
                    color: "#6b7280",
                  }}
                >
                  <span>November 2025</span>
                  <div>
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        padding: "2px 6px",
                        cursor: "pointer",
                      }}
                    >
                      &lt;
                    </button>
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        padding: "2px 6px",
                        cursor: "pointer",
                      }}
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                {/* Day headings */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    fontSize: 10,
                    color: "#9ca3af",
                    marginBottom: 2,
                  }}
                >
                  {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                    <div key={d} style={{ padding: "2px 0" }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Dates */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    fontSize: 11,
                    gap: 2,
                  }}
                >
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === 14;
                    return (
                      <div
                        key={day}
                        style={{
                          height: 24,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 999,
                          background: isToday ? "#2563eb" : "transparent",
                          color: isToday ? "#f9fafb" : "#374151",
                          fontWeight: isToday ? 600 : 400,
                        }}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Events list */}
              <div style={{ fontSize: 12 }}>
                <a
                  href="#"
                  style={{
                    display: "block",
                    borderRadius: 18,
                    background: "#f3f4f6",
                    padding: 10,
                    marginBottom: 8,
                    textDecoration: "none",
                    color: "#111827",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#1d4ed8",
                    }}
                  >
                    Lunch and Learn CE Credit – Galleria Tower 3 Floor
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#6b7280",
                      marginTop: 2,
                    }}
                  >
                    Thu, 11/20/2025 · 8:00 AM · 5 days
                  </div>
                </a>

                <a
                  href="#"
                  style={{
                    display: "block",
                    borderRadius: 18,
                    background: "#f3f4f6",
                    padding: 10,
                    marginBottom: 8,
                    textDecoration: "none",
                    color: "#111827",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#1d4ed8",
                    }}
                  >
                    CE Class + Lunch and Learn
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#6b7280",
                      marginTop: 2,
                    }}
                  >
                    Thu, 11/20/2025 · 1:00 PM · 6 days
                  </div>
                </a>

                <a
                  href="#"
                  style={{
                    display: "block",
                    borderRadius: 18,
                    background: "#f3f4f6",
                    padding: 10,
                    textDecoration: "none",
                    color: "#111827",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#1d4ed8",
                    }}
                  >
                    Sip &amp; Share
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#6b7280",
                      marginTop: 2,
                    }}
                  >
                    Tue, 11/25/2025 · 1:00 PM · 1 wk
                  </div>
                </a>
              </div>
            </div>

            {/* Tasks snapshot inside same card (like BackAgent but modern) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                fontSize: 12,
              }}
            >
              {[
                {
                  label: "RECEIVED",
                  stats: ["0 active", "0 new", "0 overdue"],
                },
                {
                  label: "SENT",
                  stats: [
                    "0 outstanding",
                    "0 unread by recipient",
                    "0 overdue",
                  ],
                },
                {
                  label: "UPCOMING",
                  stats: ["0 due today", "0 due this week", "0 due next 30"],
                },
              ].map((group) => (
                <div
                  key={group.label}
                  style={{
                    borderRadius: 18,
                    background: "#f3f4f6",
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "#6b7280",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {group.label}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      marginTop: 4,
                      color: "#111827",
                    }}
                  >
                    0
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "6px 0 0",
                      fontSize: 11,
                      color: "#6b7280",
                    }}
                  >
                    {group.stats.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Groups */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Groups</h2>
                <p style={headerSubStyle}>
                  View groups and members.
                </p>
              </div>
              <button style={linkButtonStyle}>View all &raquo;</button>
            </header>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: 13,
              }}
            >
              {[
                {
                  name: "Elite Living – Dallas",
                  description: "Market center announcements & events",
                  members: 84,
                  lead: "Jasmin C.",
                  badges: ["Open to all", "Announcements"],
                },
                {
                  name: "Growth+ Mastermind",
                  description: "Weekly production-focused accountability",
                  members: 32,
                  lead: "JoJo G.",
                  badges: ["Invite only", "Production"],
                },
              ].map((group) => (
                <div
                  key={group.name}
                  style={{
                    borderRadius: 16,
                    background: "#f3f4f6",
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#111827",
                        }}
                      >
                        {group.name}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                          marginTop: 2,
                        }}
                      >
                        {group.description}
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        fontSize: 11,
                        color: "#6b7280",
                      }}
                    >
                      <div>{group.members} members</div>
                      <div>Lead: {group.lead}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      fontSize: 11,
                    }}
                  >
                    {group.badges.map((badge) => (
                      <span
                        key={badge}
                        style={{
                          borderRadius: 999,
                          padding: "3px 8px",
                          background: "rgba(15,23,42,0.04)",
                          border: "1px solid rgba(148,163,184,0.8)",
                          color: "#374151",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notices */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Notices</h2>
                <p style={headerSubStyle}>Office-wide notices.</p>
              </div>
              <button style={linkButtonStyle}>View all &raquo;</button>
            </header>

            {/* Critical notices */}
            <div
              style={{
                borderRadius: 18,
                background: "#fef3c7",
                padding: 10,
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: "#b45309",
                  }}
                >
                  🔔 New CE course now available
                </div>
                <span
                  style={{
                    borderRadius: 999,
                    padding: "2px 8px",
                    fontSize: 11,
                    fontWeight: 600,
                    background: "#f59e0b",
                    color: "#111827",
                  }}
                >
                  Critical
                </span>
              </div>
              <div style={{ color: "#92400e" }}>
                Creative Financing – now live in Elite Living Connect. Email
                admin if you need access.
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  color: "#92400e",
                }}
              >
                Type: CE / Training
              </div>
            </div>

            {/* FYI notices */}
            <div
              style={{
                borderRadius: 18,
                background: "#f3f4f6",
                padding: 10,
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  📅 Updated office hours
                </div>
                <span
                  style={{
                    borderRadius: 999,
                    padding: "2px 8px",
                    fontSize: 11,
                    fontWeight: 600,
                    background: "#e5e7eb",
                    color: "#374151",
                  }}
                >
                  FYI
                </span>
              </div>
              <div style={{ color: "#4b5563" }}>
                Front desk support now available 9am–5pm Monday–Friday.
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  color: "#6b7280",
                }}
              >
                Type: Operations
              </div>
            </div>
          </section>

          {/* Back Boss AI helper */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Need help connecting?</h2>
                <p style={headerSubStyle}>
                  Let Back Boss AI point you to the right person, group, or
                  resource.
                </p>
              </div>
            </header>

            <p
              style={{
                fontSize: 12,
                color: "#4b5563",
                marginBottom: 10,
              }}
            >
              Try asking:{" "}
              <span style={{ fontStyle: "italic" }}>
                &quot;Who do I talk to about listing photos?&quot;
              </span>{" "}
              or{" "}
              <span style={{ fontStyle: "italic" }}>
                &quot;Where is the latest contract template?&quot;
              </span>
              .
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                }}
              >
                Back Boss AI chat will be embedded here in a future phase.
              </div>
              <button
                style={{
                  borderRadius: 999,
                  border: "none",
                  padding: "8px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  background: "#111827",
                  color: "#f9fafb",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Ask Back Boss AI
              </button>
            </div>
          </section>

          {/* Connect stats */}
          <section style={cardStyle}>
            <header style={sectionHeaderStyle}>
              <div>
                <h2 style={headerTitleStyle}>Connect stats</h2>
                <p style={headerSubStyle}>
                  Quick snapshot of how plugged in you are.
                </p>
              </div>
            </header>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                gap: 12,
                fontSize: 12,
              }}
            >
              {[
                {
                  label: "Unread notices",
                  value: 2,
                  tone: "#ef4444",
                },
                {
                  label: "Groups you&apos;re in",
                  value: 5,
                  tone: "#2563eb",
                },
                {
                  label: "Events this week",
                  value: 3,
                  tone: "#22c55e",
                },
                {
                  label: "Reserved office time",
                  value: 0,
                  tone: "#6b7280",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    borderRadius: 16,
                    background: "#f3f4f6",
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "#6b7280",
                      marginBottom: 4,
                    }}
                    dangerouslySetInnerHTML={{ __html: stat.label }}
                  />
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: stat.tone,
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

export const getServerSideProps: GetServerSideProps<ConnectProps> = async (
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
