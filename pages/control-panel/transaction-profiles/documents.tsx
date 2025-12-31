import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type DocumentsProps = {
  userEmail: string | null;
};

const pageTitleStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 800,
  letterSpacing: -0.5,
  color: "#f9fafb",
  marginBottom: 6,
};

const pageSubTitleStyle: React.CSSProperties = {
  fontSize: 16,
  color: "rgba(226,232,240,0.9)",
  maxWidth: 840,
};

const mainCardStyle: React.CSSProperties = {
  marginTop: 24,
  background: "rgba(248,250,252,0.97)",
  borderRadius: 28,
  padding: 22,
  boxShadow: "0 24px 70px rgba(15,23,42,0.78)",
  border: "1px solid rgba(148,163,184,0.4)",
  display: "flex",
  gap: 18,
};

const sidebarStyle: React.CSSProperties = {
  width: 240,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const searchInputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 10,
  border: "1px solid rgba(148,163,184,0.7)",
  padding: "7px 9px",
  fontSize: 13,
  outline: "none",
};

const sidebarSectionTitleStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  color: "#6b7280",
  letterSpacing: 0.7,
  marginTop: 6,
  marginBottom: 4,
};

const pillListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const sidebarPillStyle: React.CSSProperties = {
  borderRadius: 999,
  padding: "6px 10px",
  fontSize: 13,
  border: "1px solid rgba(209,213,219,0.9)",
  background: "#ffffff",
  color: "#374151",
  cursor: "pointer",
};

const sidebarPillActiveStyle: React.CSSProperties = {
  ...sidebarPillStyle,
  background: "#0f172a",
  borderColor: "#0f172a",
  color: "#f9fafb",
};

const addDocButtonStyle: React.CSSProperties = {
  marginTop: 10,
  borderRadius: 999,
  background: "#111827",
  color: "#f9fafb",
  border: "none",
  padding: "8px 14px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const mainAreaStyle: React.CSSProperties = {
  flex: 1,
  borderRadius: 20,
  background: "#f9fafb",
  border: "1px solid rgba(209,213,219,0.9)",
  padding: 18,
  maxHeight: "70vh",
  overflowY: "auto",
};

const helpHeaderStyle: React.CSSProperties = {
  marginBottom: 18,
};

const helpTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#111827",
};

const helpSubStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#4b5563",
};

const contactLinkStyle: React.CSSProperties = {
  color: "#1d4ed8",
  textDecoration: "underline",
};

const stageHeaderStyle: React.CSSProperties = {
  marginTop: 18,
  marginBottom: 4,
  borderRadius: 10,
  background: "#111827",
  color: "#f9fafb",
  padding: "6px 10px",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 0.5,
};

const docRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 3fr) minmax(0, 1.7fr) 90px 70px",
  alignItems: "flex-start",
  padding: "10px 6px",
  borderBottom: "1px solid rgba(229,231,235,0.9)",
  fontSize: 13,
};

const docNameStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "#ea580c",
  cursor: "pointer",
};

const docMetaStyle: React.CSSProperties = {
  marginTop: 4,
  fontSize: 12,
  color: "#4b5563",
};

const requiredBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  fontSize: 11,
  color: "#92400e",
  background: "rgba(251,191,36,0.18)",
  borderRadius: 999,
  padding: "2px 8px",
  marginRight: 6,
};

const requiredIconStyle: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: 3,
  border: "2px solid #f97316",
};

const whereLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  color: "#6b7280",
};

const miniIconRowStyle: React.CSSProperties = {
  display: "inline-flex",
  gap: 4,
  marginLeft: 4,
};

const miniIconStyle: React.CSSProperties = {
  width: 14,
  height: 14,
  borderRadius: 4,
  background: "#e5e7eb",
};

const stageTextStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#111827",
};

const codeTextStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
  textAlign: "right",
};

export const getServerSideProps: GetServerSideProps<DocumentsProps> = async (
  context
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      userEmail: session?.user?.email ?? null,
    },
  };
};

export default function DocumentsPage({ userEmail }: DocumentsProps) {
  return (
    <AppShell userEmail={userEmail} activeTab="Start">
      <div>
        <h1 style={pageTitleStyle}>Document Requirements</h1>
        <p style={pageSubTitleStyle}>
          TX / Elite Living Realty – profile-level document rules that power the
          Transact checklist. This is the office-facing view; agents will only
          see a simplified, phase-based list inside their transactions.
        </p>

        <div style={mainCardStyle}>
          {/* Sidebar */}
          <aside style={sidebarStyle}>
            <input placeholder="Title search" style={searchInputStyle} />
            <input
              placeholder="Condition search"
              style={searchInputStyle}
            />

            <div>
              <div style={sidebarSectionTitleStyle}>Deal Type</div>
              <div style={pillListStyle}>
                <button type="button" style={sidebarPillActiveStyle}>
                  Residential Sale
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Residential Lease
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Commercial Sale
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Commercial Lease
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Apartment Lease
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Referred / Referral Only
                </button>
              </div>
            </div>

            <div>
              <div style={sidebarSectionTitleStyle}>Party</div>
              <div style={pillListStyle}>
                <button type="button" style={sidebarPillActiveStyle}>
                  Seller
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Buyer
                </button>
              </div>
            </div>

            <div>
              <div style={sidebarSectionTitleStyle}>Status</div>
              <div style={pillListStyle}>
                <button type="button" style={sidebarPillActiveStyle}>
                  Active
                </button>
                <button type="button" style={sidebarPillStyle}>
                  All
                </button>
              </div>
            </div>

            <div>
              <div style={sidebarSectionTitleStyle}>Displayed</div>
              <div style={pillListStyle}>
                <button type="button" style={sidebarPillActiveStyle}>
                  Required
                </button>
                <button type="button" style={sidebarPillStyle}>
                  Optional
                </button>
                <button type="button" style={sidebarPillStyle}>
                  All
                </button>
              </div>
            </div>

            <button type="button" style={addDocButtonStyle}>
              + Add Document
            </button>
          </aside>

          {/* Main area */}
          <section style={mainAreaStyle}>
            <div style={helpHeaderStyle}>
              <div style={helpTitleStyle}>
                Have a question about the document requirements?
              </div>
              <div style={helpSubStyle}>
                The following document requirements are active for this
                profile. For assistance with this interface please{" "}
                <a
                  href="mailto:admin@dfweliteliving.com"
                  style={contactLinkStyle}
                >
                  contact us
                </a>
                .
              </div>
            </div>

            {/* START – 5 rows */}
            <div style={stageHeaderStyle}>Start</div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  General Information and Notice to Seller
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Start</div>
              <div style={codeTextStyle}>20</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Information about Brokerage Services
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                  <span style={miniIconRowStyle}>
                    <span style={miniIconStyle} />
                    <span style={miniIconStyle} />
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>BLDP, HUDF, REOF</div>
              </div>
              <div style={stageTextStyle}>Start</div>
              <div style={codeTextStyle}>20</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Wire Fraud Warning</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Start</div>
              <div style={codeTextStyle}>20</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Listing Agreement (Exclusive Right to Sell)
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>BLDP, HUDF</div>
              </div>
              <div style={stageTextStyle}>Start</div>
              <div style={codeTextStyle}>40</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Seller&apos;s Disclosure Notice (Listing)
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>
                  BLDR, BLDP, HUDF, LAND, REOF
                </div>
              </div>
              <div style={stageTextStyle}>Start</div>
              <div style={codeTextStyle}>41</div>
            </div>

            {/* TERMINATION (REPRESENTATION) – 1 row */}
            <div style={stageHeaderStyle}>Termination (Representation)</div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Termination of Listing Agreement
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> TMRE
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>TermStart</div>
              <div style={codeTextStyle}>48</div>
            </div>

            {/* SHOWING – 0 rows */}
            <div style={stageHeaderStyle}>Showing</div>

            {/* CONTRACT – 15 rows */}
            <div style={stageHeaderStyle}>Contract</div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Buyer&apos;s Representation Agreement
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> BOTH
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>50</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Information about Brokerage Services for Co-op Client
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> BOTH, NOCO
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>50</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Residential Contract</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>60</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Addendum for Property Subj. to Mand. Membership in Owners
                  Assoc.
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> HOAP
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>BLDP</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>61</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Addendum for Seller&apos;s Disclosure of Information on Lead-Based
                  Paint (Signed by all parties)
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> BE78
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>BLDR, BLDP, HUDF</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>61</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Information about Special Flood Hazard Areas
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> FLDP
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>61</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Intermediary Notice</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> INHO
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>61</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Notice to Purchaser of Real Property in a Water District
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Recommended
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> MUDP
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>61</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Seller Financing Addendum</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> SOFI
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>61</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Seller&apos;s Disclosure Notice (Signed by all parties)
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>61</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Short Sale Addendum</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> SHRT
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>61</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Third Party Financing Addendum</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> CONM, FHAM, USDA, VETM
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>BLDP, HUDF, REOF</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>61</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Amendment to Extend Closing Date</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> HAMD
                  </span>
                  <span style={miniIconRowStyle}>
                    <span style={miniIconStyle} />
                    <span style={miniIconStyle} />
                    <span style={miniIconStyle} />
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>63</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Site Survey</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>CNDO</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>70</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  T-47 Residential Real Property Affidavit
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> SVSE
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>Contract</div>
              <div style={codeTextStyle}>70</div>
            </div>

            {/* PRE-CLOSING – 0 rows */}
            <div style={stageHeaderStyle}>Pre-Closing</div>

            {/* TERMINATION (CONTRACT) – 2 rows */}
            <div style={stageHeaderStyle}>Termination (Contract)</div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Notice of Buyer&apos;s Termination of Contract
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> TMCO
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>TermContract</div>
              <div style={codeTextStyle}>68</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Release of Earnest Money</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> TMCO
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>No Exceptions</div>
              </div>
              <div style={stageTextStyle}>TermContract</div>
              <div style={codeTextStyle}>68</div>
            </div>

            {/* POST-CLOSING – 1 row */}
            <div style={stageHeaderStyle}>Post-Closing</div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>
                  Closing Disclosure / HUD-1 Settlement
                </div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>TMCO, TMRE</div>
              </div>
              <div style={stageTextStyle}>Post-Closing</div>
              <div style={codeTextStyle}>80</div>
            </div>

            {/* SUBMIT – 1 row */}
            <div style={stageHeaderStyle}>Submit</div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Funding Request</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>TMNF</div>
              </div>
              <div style={stageTextStyle}>Submit</div>
              <div style={codeTextStyle}>90</div>
            </div>

            {/* CONFIRMATION – 4 rows */}
            <div style={stageHeaderStyle}>Confirmation</div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Funding Confirmation</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>TMNF</div>
              </div>
              <div style={stageTextStyle}>Confirmation</div>
              <div style={codeTextStyle}>91</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Disbursement Authorization</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> Show Always
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>TMNF</div>
              </div>
              <div style={stageTextStyle}>Confirmation</div>
              <div style={codeTextStyle}>92</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Contribution Letter for Buyer</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> HCLB
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>TMNF</div>
              </div>
              <div style={stageTextStyle}>Confirmation</div>
              <div style={codeTextStyle}>93</div>
            </div>

            <div style={docRowStyle}>
              <div>
                <div style={docNameStyle}>Contribution Letter for Seller</div>
                <div style={docMetaStyle}>
                  <span style={requiredBadgeStyle}>
                    <span style={requiredIconStyle} /> Required
                  </span>
                  <span>
                    <span style={whereLabelStyle}>Where:</span> HCLS
                  </span>
                </div>
              </div>
              <div>
                <div style={whereLabelStyle}>Except:</div>
                <div style={docMetaStyle}>TMNF</div>
              </div>
              <div style={stageTextStyle}>Confirmation</div>
              <div style={codeTextStyle}>93</div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
