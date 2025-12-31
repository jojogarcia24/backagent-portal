import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type ControlPanelProps = {
  userEmail: string | null;
};

const pageWrapperStyle: React.CSSProperties = {
  padding: 32,
  maxWidth: 1200,
  margin: "0 auto",
};

const pageTitleStyle: React.CSSProperties = {
  fontSize: 30,
  fontWeight: 800,
  color: "#f9fafb",
  marginBottom: 6,
};

const pageSubtitleStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#e5e7eb",
  marginBottom: 22,
};

const mainCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.98)",
  borderRadius: 26,
  padding: 28,
  boxShadow: "0 20px 50px rgba(15,23,42,0.45)",
  border: "1px solid rgba(15,23,42,0.06)",
};

const cardHeaderRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  marginBottom: 26,
};

const orgTitleStyle: React.CSS.Properties = {
  fontSize: 22,
  fontWeight: 700,
  color: "#0f172a",
  margin: 0,
};

const orgSubtitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#6b7280",
  marginTop: 6,
};

const envTagRowStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 8,
};

const envPillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px 12px",
  borderRadius: 999,
  background: "#0f172a",
  color: "#e5e7eb",
  fontSize: 12,
  fontWeight: 600,
  border: "1px solid rgba(148,163,184,0.6)",
};

const envDotStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "999px",
  background: "#22c55e",
  marginRight: 6,
};

const envMetaStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
  maxWidth: 280,
  textAlign: "right",
};

const sectionGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
};

const sectionCardStyle: React.CSSProperties = {
  background: "#f9fafb",
  borderRadius: 20,
  padding: 18,
  border: "1px solid rgba(148,163,184,0.35)",
  boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
};

const sectionHeaderRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 12,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: "#0f172a",
  margin: 0,
};

const sectionTagStyle: React.CSSProperties = {
  fontSize: 12,
  padding: "3px 10px",
  borderRadius: 999,
  background: "#2563eb",
  color: "#e5f0ff",
  fontWeight: 600,
  boxShadow: "0 0 0 1px rgba(15,23,42,0.06)",
};

const sectionHintStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
  marginBottom: 12,
};

const linkRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "9px 12px",
  borderRadius: 12,
  border: "1px solid rgba(209,213,219,0.9)",
  background: "#ffffff",
  marginBottom: 8,
  cursor: "pointer",
};

const linkLeftStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const linkLabelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "#0f172a",
};

const linkSubLabelStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
};

const linkArrowStyle: React.CSSProperties = {
  fontSize: 18,
  color: "#4b5563",
};

const footerNoteStyle: React.CSSProperties = {
  marginTop: 20,
  fontSize: 12,
  color: "#6b7280",
};

const ControlPanelPage: React.FC<ControlPanelProps> = ({ userEmail }) => {
  return (
    <AppShell activeTab="Start" userEmail={userEmail}>
      <div style={pageWrapperStyle}>
        <h1 style={pageTitleStyle}>Control Panel – Office Level</h1>
        <p style={pageSubtitleStyle}>
          Tune how Back Boss AI behaves for Elite Living Realty at the office + org
          level – calendars, docs, marketing, training, site theme, and transaction
          rules.
        </p>

        <div style={mainCardStyle}>
          <div style={cardHeaderRowStyle}>
            <div>
              <h2 style={orgTitleStyle}>Elite Living Realty • TX</h2>
              <p style={orgSubtitleStyle}>
                Office-level configuration snapshot for Back Boss AI. Changes here roll
                down to office dashboards, agents, and automations.
              </p>
            </div>
            <div style={envTagRowStyle}>
              <div style={envPillStyle}>
                <span style={envDotStyle} /> Office Profile • Production
              </div>
              <div style={envMetaStyle}>
                Recommended for broker/owner and operations role only. Most agents will
                never see this screen.
              </div>
            </div>
          </div>

          <div style={sectionGridStyle}>
            {/* Office */}
            <div style={sectionCardStyle}>
              <div style={sectionHeaderRowStyle}>
                <h3 style={sectionTitleStyle}>Office</h3>
                <span style={sectionTagStyle}>Operations</span>
              </div>
              <p style={sectionHintStyle}>
                Core office controls for events, internal resources, and announcements.
              </p>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Calendar Event Registration</span>
                  <span style={linkSubLabelStyle}>
                    Push trainings, socials, and meetings into the office event hub.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Shared Docs</span>
                  <span style={linkSubLabelStyle}>
                    Upload and organize office-level resources agents can search.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Office Posts</span>
                  <span style={linkSubLabelStyle}>
                    Configure internal newsfeed posts that surface on agent dashboards.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>
            </div>

            {/* Marketing */}
            <div style={sectionCardStyle}>
              <div style={sectionHeaderRowStyle}>
                <h3 style={sectionTitleStyle}>Marketing</h3>
                <span style={sectionTagStyle}>Brand &amp; Growth</span>
              </div>
              <p style={sectionHintStyle}>
                Control what Back Boss promotes to agents and where your brand shows up.
              </p>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Banners &amp; Rotators</span>
                  <span style={linkSubLabelStyle}>
                    Manage hero banners, spotlights, and promo rails on dashboards.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Partner Vendors</span>
                  <span style={linkSubLabelStyle}>
                    Feature preferred lenders, title, inspectors, and home services.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>
            </div>

            {/* Training */}
            <div style={sectionCardStyle}>
              <div style={sectionHeaderRowStyle}>
                <h3 style={sectionTitleStyle}>Training</h3>
                <span style={sectionTagStyle}>Learning</span>
              </div>
              <p style={sectionHintStyle}>
                Decide what education lives inside Back Boss and how agents consume it.
              </p>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Courses &amp; Playbooks</span>
                  <span style={linkSubLabelStyle}>
                    Attach core training tracks to New Agent, Growth, and Elite tiers.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>System Insights</span>
                  <span style={linkSubLabelStyle}>
                    Curate “how Back Boss works” docs for agents and staff.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>
            </div>

            {/* Site */}
            <div style={sectionCardStyle}>
              <div style={sectionHeaderRowStyle}>
                <h3 style={sectionTitleStyle}>Site</h3>
                <span style={sectionTagStyle}>Look &amp; Feel</span>
              </div>
              <p style={sectionHintStyle}>
                Align the Back Boss portal visuals with Elite Living’s brand standards.
              </p>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Accent Photo &amp; Hero</span>
                  <span style={linkSubLabelStyle}>
                    Choose the main background imagery for the office experience.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Colors &amp; Theme</span>
                  <span style={linkSubLabelStyle}>
                    Set primary, secondary, and accent colors Back Boss will honor.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Logo &amp; Brand Pack</span>
                  <span style={linkSubLabelStyle}>
                    Configure logo, icon, and favicon used across the portal.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>
            </div>

            {/* Transact */}
            <div style={sectionCardStyle}>
              <div style={sectionHeaderRowStyle}>
                <h3 style={sectionTitleStyle}>Transact</h3>
                <span style={sectionTagStyle}>Compliance</span>
              </div>
              <p style={sectionHintStyle}>
                Control compliance rules and profiles that power the Transact command
                center.
              </p>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Transaction Profiles</span>
                  <span style={linkSubLabelStyle}>
                    Define which document rules apply by office, state, and deal type.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Configuration Flags</span>
                  <span style={linkSubLabelStyle}>
                    Toggle features like Table Funding, concierge, and ARV workflows.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>
            </div>

            {/* Financial */}
            <div style={sectionCardStyle}>
              <div style={sectionHeaderRowStyle}>
                <h3 style={sectionTitleStyle}>Financial</h3>
                <span style={sectionTagStyle}>Plans</span>
              </div>
              <p style={sectionHintStyle}>
                Manage member plans and how Back Boss AI features unlock across tiers.
              </p>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Member Plans</span>
                  <span style={linkSubLabelStyle}>
                    Configure Growth, Elite, and Brokerage plans and included perks.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>

              <div style={linkRowStyle}>
                <div style={linkLeftStyle}>
                  <span style={linkLabelStyle}>Billing Notes</span>
                  <span style={linkSubLabelStyle}>
                    Track who is comped, sponsored, or billed through corporate.
                  </span>
                </div>
                <span style={linkArrowStyle}>›</span>
              </div>
            </div>
          </div>

          <div style={footerNoteStyle}>
            Changes here will eventually connect to Airtable/Softr and live data. For
            now, this is a static “control map” so we can wire real settings later.
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps<ControlPanelProps> = async (
  context
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      userEmail: session?.user?.email ?? null,
    },
  };
};

export default ControlPanelPage;
