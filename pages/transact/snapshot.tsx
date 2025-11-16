import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type SnapshotProps = {
  userEmail: string | null;
};

const outerCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.98)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 22px 50px rgba(15,23,42,0.42)",
};

const headerRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  marginBottom: 18,
};

const titleBlockStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const badgePillStyle: React.CSSProperties = {
  borderRadius: 999,
  padding: "3px 10px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: "uppercase",
  background: "#e5f3ff",
  color: "#1e3a8a",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

const actionBarStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const actionButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
};

const primaryActionButtonStyle: React.CSSProperties = {
  ...actionButtonStyle,
  background: "#111827",
  color: "#f9fafb",
  border: "none",
};

const gridLayoutStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1.1fr)",
  gap: 32,
  marginTop: 12,
};

const sectionStyle: React.CSSProperties = {
  marginBottom: 18,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: "#111827",
  marginBottom: 8,
};

const definitionListStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(120px, 0.9fr) minmax(0, 1.6fr)",
  columnGap: 16,
  rowGap: 4,
  fontSize: 13,
};

const dtStyle: React.CSSProperties = {
  fontWeight: 500,
  color: "#6b7280",
};

const ddStyle: React.CSSProperties = {
  color: "#111827",
};

function SnapshotPage({ userEmail }: SnapshotProps) {
  const propertyAddress = "1427 Davis Mountain LOOP, Cedar Park, TX 78613";

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
          Transact / Snapshot
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Transaction Snapshot
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#d1d5db",
            marginTop: 6,
            maxWidth: 760,
          }}
        >
          A clean, at-a-glance view of one deal. Later we&apos;ll pull this
          directly from your transaction system so every field stays in sync
          automatically.
        </p>
      </div>

      {/* Main detail card */}
      <div style={outerCardStyle}>
        {/* Top row: title + actions */}
        <div style={headerRowStyle}>
          <div style={titleBlockStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 76,
                  height: 60,
                  borderRadius: 14,
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg,#0f172a,#1e293b,#111827)",
                }}
              />
              <div>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    margin: 0,
                    color: "#111827",
                  }}
                >
                  {propertyAddress}
                </h2>
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginTop: 4,
                  }}
                >
                  Last updated by JoJo Garcia · Sun, Nov 9, 2025 @ 2:10 AM
                </div>
                <a
                  href="#"
                  style={{
                    fontSize: 12,
                    color: "#2563eb",
                    textDecoration: "none",
                    marginTop: 4,
                    display: "inline-block",
                  }}
                >
                  DFWEL-KC6CF6ABCG@SendToBackBoss.com
                </a>
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <span style={badgePillStyle}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "#22c55e",
                  }}
                />
                Authorized CDA · Filed
              </span>
            </div>
          </div>

          <div style={actionBarStyle}>
            <button
              type="button"
              style={primaryActionButtonStyle}
              onClick={() => window.print()}
            >
              Print Snapshot
            </button>
            <a href="/transact/search" style={{ textDecoration: "none" }}>
              <button type="button" style={actionButtonStyle}>
                Close
              </button>
            </a>
          </div>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e5e7eb",
            margin: "4px 0 20px",
          }}
        />

        {/* Two-column detail layout */}
        <div style={gridLayoutStyle}>
          {/* LEFT COLUMN */}
          <div>
            {/* Summary */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Summary</h3>
              <div style={definitionListStyle}>
                <div style={dtStyle}>Ref #</div>
                <div style={ddStyle}>A2-25-0126</div>

                <div style={dtStyle}>Associate</div>
                <div style={ddStyle}>Joseph Garcia</div>

                <div style={dtStyle}>Branch / Office</div>
                <div style={ddStyle}>Dallas</div>

                <div style={dtStyle}>Type</div>
                <div style={ddStyle}>Residential Sale</div>

                <div style={dtStyle}>Side</div>
                <div style={ddStyle}>Buyer</div>

                <div style={dtStyle}>Status</div>
                <div style={ddStyle}>Filed · Table Funding</div>

                <div style={dtStyle}>Created</div>
                <div style={ddStyle}>5/28/2025 · 6 months ago</div>

                <div style={dtStyle}>Submitted</div>
                <div style={ddStyle}>11/9/2025 · 5 days ago</div>

                <div style={dtStyle}>Closed</div>
                <div style={ddStyle}>8/21/2025 · 3 months ago</div>

                <div style={dtStyle}>Time Spent</div>
                <div style={ddStyle}>116 days</div>
              </div>
            </section>

            {/* Property */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Property</h3>
              <div style={definitionListStyle}>
                <div style={dtStyle}>Address</div>
                <div style={ddStyle}>
                  1427 Davis Mountain Loop
                  <br />
                  Cedar Park, TX 78613
                </div>

                <div style={dtStyle}>MLS Source</div>
                <div style={ddStyle}>ABOR</div>

                <div style={dtStyle}>MLS Number</div>
                <div style={ddStyle}>1635086</div>

                <div style={dtStyle}>Listed By</div>
                <div style={ddStyle}>Anyiesa Johnson · Opendoor Brokerage, LLC</div>

                <div style={dtStyle}>List Price</div>
                <div style={ddStyle}>$330,000</div>

                <div style={dtStyle}>Category</div>
                <div style={ddStyle}>Residential</div>
              </div>
            </section>

            {/* Contacts (left side) */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Contacts</h3>
              <div style={definitionListStyle}>
                <div style={dtStyle}>Buyer</div>
                <div style={ddStyle}>
                  Cynthia Meyer
                  <br />
                  909.371.8269 · cowancynthia99@rocketmail.com
                </div>

                <div style={dtStyle}>Buyer</div>
                <div style={ddStyle}>
                  Ben Meyer
                  <br />
                  512.215.1795 · Benmeyers5@juno.com
                </div>

                <div style={dtStyle}>Buyer&apos;s Agent</div>
                <div style={ddStyle}>
                  JoJo Garcia · Elite Living Realty
                  <br />
                  214.725.3348 · jojo@elitelivingrealty.com
                </div>

                <div style={dtStyle}>Buyer&apos;s Agent (Co)</div>
                <div style={ddStyle}>
                  Christina Pena · Elite Living Realty
                  <br />
                  469.456.4183 · christina@dfweliteliving.com
                </div>

                <div style={dtStyle}>Seller</div>
                <div style={ddStyle}>OpenDoor</div>

                <div style={dtStyle}>Seller&apos;s Agent</div>
                <div style={ddStyle}>OpenDoor · kheggar@opendoor.com</div>
              </div>
            </section>

            {/* Financial info */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Dates &amp; Info – Financials</h3>
              <div style={definitionListStyle}>
                <div style={dtStyle}>Sale Price</div>
                <div style={ddStyle}>$335,000</div>

                <div style={dtStyle}>Loan Type</div>
                <div style={ddStyle}>Conventional Third-Party</div>

                <div style={dtStyle}>Pay Referral</div>
                <div style={ddStyle}>No</div>
              </div>
            </section>

            {/* Remarks */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Agent Remarks</h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#4b5563",
                  margin: 0,
                }}
              >
                No remarks yet. Later we&apos;ll surface Nova&apos;s notes and key
                risk flags for this file here.
              </p>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* Special Attributes */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Special Attributes</h3>
              <div style={definitionListStyle}>
                <div style={dtStyle}>Owners&apos; Association</div>
                <div style={ddStyle}>Yes</div>

                <div style={dtStyle}>Conv. Mortgage</div>
                <div style={ddStyle}>Yes</div>
              </div>
            </section>

            {/* Non-financial dates/info */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Dates &amp; Info – Non-Financial</h3>
              <div style={definitionListStyle}>
                <div style={dtStyle}>Property Type</div>
                <div style={ddStyle}>1–4 Family</div>

                <div style={dtStyle}>Ownership</div>
                <div style={ddStyle}>Conventional / Resale</div>

                <div style={dtStyle}>Built Before 1978</div>
                <div style={ddStyle}>No</div>

                <div style={dtStyle}>Water District</div>
                <div style={ddStyle}>No</div>

                <div style={dtStyle}>Flood Area</div>
                <div style={ddStyle}>No</div>

                <div style={dtStyle}>Company Lead</div>
                <div style={ddStyle}>No</div>

                <div style={dtStyle}>In-House</div>
                <div style={ddStyle}>No</div>
              </div>
            </section>

            {/* Dates */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Key Dates</h3>
              <div style={definitionListStyle}>
                <div style={dtStyle}>Start Date</div>
                <div style={ddStyle}>4/27/2025</div>

                <div style={dtStyle}>Contract Date</div>
                <div style={ddStyle}>5/28/2025</div>

                <div style={dtStyle}>Option Period</div>
                <div style={ddStyle}>5 days · Ends 6/2/2025 5:00 PM</div>

                <div style={dtStyle}>Financing Days</div>
                <div style={ddStyle}>15 days · Deadline 6/12/2025 5:00 PM</div>

                <div style={dtStyle}>Survey</div>
                <div style={ddStyle}>Seller Providing Existing · 10 days</div>

                <div style={dtStyle}>Survey Deadline</div>
                <div style={ddStyle}>6/7/2025 5:00 PM</div>

                <div style={dtStyle}>Contracted Closing</div>
                <div style={ddStyle}>7/18/2025</div>

                <div style={dtStyle}>Scheduled Closing</div>
                <div style={ddStyle}>8/21/2025 12:00 AM</div>
              </div>
            </section>

            {/* Funding / Price */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Funding</h3>
              <div style={definitionListStyle}>
                <div style={dtStyle}>Sale Price</div>
                <div style={ddStyle}>$335,000</div>
              </div>
            </section>

            {/* Income */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Income</h3>
              <div style={definitionListStyle}>
                <div style={dtStyle}>Sale Commission (2.5%)</div>
                <div style={ddStyle}>$8,375.00</div>

                <div style={dtStyle}>Total Income</div>
                <div style={ddStyle}>$8,375.00</div>
              </div>
            </section>

            {/* Splits */}
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Splits</h3>
              <div style={definitionListStyle}>
                <div style={dtStyle}>Joseph Garcia</div>
                <div style={ddStyle}>$8,375.00</div>

                <div style={dtStyle}>Total</div>
                <div style={ddStyle}>$8,375.00</div>
              </div>
            </section>

            {/* Footer note */}
            <section style={{ marginTop: 24 }}>
              <p
                style={{
                  fontSize: 11,
                  color: "#9ca3af",
                  margin: 0,
                }}
              >
                © 2025 Back Boss AI · Snapshot generated automatically for
                Elite Living Realty.
              </p>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default SnapshotPage;

export const getServerSideProps: GetServerSideProps<SnapshotProps> = async (
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
