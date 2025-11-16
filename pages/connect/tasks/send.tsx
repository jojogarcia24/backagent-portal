import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";

type SendTaskProps = {
  userEmail: string | null;
};

const outerCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
};

const fieldLabelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 6,
};

const radioLabelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 12,
  color: "#374151",
  marginBottom: 6,
};

const mutedTextStyle: React.CSSProperties = {
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

const textareaStyle: React.CSSProperties = {
  ...textInputStyle,
  minHeight: 120,
  resize: "vertical",
};

const pillButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "1px solid #111827",
  background: "#111827",
  color: "#f9fafb",
  padding: "8px 18px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const pillSecondaryButtonStyle: React.CSSProperties = {
  borderRadius: 999,
  border: "1px solid #9ca3af",
  background: "#e5e7eb",
  color: "#111827",
  padding: "8px 18px",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};

function SendTask({ userEmail }: SendTaskProps) {
  const name = userEmail?.split("@")[0]?.replace(/\./g, " ") || "Agent";

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
          Connect / Tasks / Send a Task
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#f9fafb",
            margin: 0,
          }}
        >
          Send a Task
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#d1d5db",
            marginTop: 6,
          }}
        >
          Connect with departments and associates. Tasks are the most reliable
          way to complete a request.
        </p>
      </div>

      {/* Main card */}
      <div style={outerCardStyle}>
        {/* Top action bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <button type="button" style={pillSecondaryButtonStyle}>
            Cancel
          </button>
          <button type="button" style={pillButtonStyle}>
            Send Task
          </button>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 2fr",
            gap: 32,
          }}
        >
          {/* LEFT COLUMN – task type + recipients */}
          <div>
            {/* Select Task Type */}
            <div style={{ marginBottom: 24 }}>
              <div style={fieldLabelStyle}>Select Task Type</div>
              <div>
                {[
                  "Associate to Associate",
                  "Associate to Group",
                  "Associate to Department",
                  "Department to Associate",
                  "Personal",
                ].map((label, idx) => (
                  <label key={label} style={radioLabelStyle}>
                    <input
                      type="radio"
                      name="taskType"
                      defaultChecked={idx === 0}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Add Recipients */}
            <div style={{ marginBottom: 24 }}>
              <div style={fieldLabelStyle}>Add Recipients</div>
              <label style={radioLabelStyle}>
                <input type="radio" name="recipientType" defaultChecked />
                <span>Associate</span>
              </label>
              <div style={{ marginTop: 8, marginBottom: 8 }}>
                <div style={{ ...mutedTextStyle, marginBottom: 4 }}>
                  Search by name or phone
                </div>
                <input
                  style={textInputStyle}
                  placeholder="Click or select matching names."
                />
              </div>
            </div>

            {/* Task recipients list */}
            <div
              style={{
                borderRadius: 10,
                background: "#f3f4f6",
                padding: 10,
              }}
            >
              <div style={fieldLabelStyle}>Task Recipients</div>
              <div style={mutedTextStyle}>No current assignments.</div>
            </div>
          </div>

          {/* RIGHT COLUMN – task details */}
          <div>
            {/* Title */}
            <div style={{ marginBottom: 18 }}>
              <div style={fieldLabelStyle}>Select Task Title</div>
              <input
                style={textInputStyle}
                placeholder="( Enter Task Title )"
              />
            </div>

            {/* Request / Question */}
            <div style={{ marginBottom: 24 }}>
              <div style={fieldLabelStyle}>
                Enter Your Request or Question
              </div>
              <textarea
                style={textareaStyle}
                placeholder={`Explain what you need ${name} to do, including any key details or links.`}
              />
            </div>

            {/* Response format */}
            <div style={{ marginBottom: 24 }}>
              <div style={fieldLabelStyle}>Select Response Format</div>
              <div
                style={{
                  borderRadius: 12,
                  background: "#f3f4f6",
                  padding: 12,
                }}
              >
                {[
                  {
                    label: "Basic Task",
                    sub: "One button completion.",
                    disabled: true,
                  },
                  {
                    label: "Standard Task",
                    sub: "One button completion with approval.",
                    disabled: true,
                  },
                  {
                    label: "Yes/No Question",
                    sub: "Two button answer with approval.",
                    disabled: true,
                  },
                  {
                    label: "Single Line Answer",
                    sub: "Short answer question with approval.",
                    disabled: true,
                  },
                  {
                    label: "Multiline Answer",
                    sub: "Long answer question with approval.",
                    disabled: false,
                    defaultChecked: true,
                  },
                  {
                    label: "Multiple Choice Answer",
                    sub: "Custom list of answers with approval.",
                    disabled: true,
                  },
                ].map((opt) => (
                  <label
                    key={opt.label}
                    style={{
                      ...radioLabelStyle,
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        name="responseFormat"
                        defaultChecked={opt.defaultChecked}
                        disabled={opt.disabled}
                        style={{ marginRight: 6 }}
                      />
                      <span>{opt.label}</span>
                    </span>
                    <span style={{ ...mutedTextStyle, fontSize: 11 }}>
                      {opt.sub}
                    </span>
                  </label>
                ))}
              </div>
              <p style={{ ...mutedTextStyle, marginTop: 8 }}>
                All tasks but the 'Basic Task' require the task sender to review
                and approve each answer. Two-way comments are available to aid
                in the completion of all tasks.
              </p>
            </div>

            {/* Due date */}
            <div>
              <div style={fieldLabelStyle}>Select Due Date</div>
              <div style={{ marginBottom: 8 }}>
                <label style={radioLabelStyle}>
                  <input type="radio" name="dueOption" />
                  <span>When available, low priority task.</span>
                </label>
                <label style={radioLabelStyle}>
                  <input type="radio" name="dueOption" defaultChecked />
                  <span>Date</span>
                </label>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 0.8fr",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <input type="date" style={textInputStyle} />
                <input type="time" style={textInputStyle} />
              </div>

              <div style={{ fontSize: 12, color: "#374151" }}>
                Task due in <span style={{ fontWeight: 600 }}>1 week.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default SendTask;

export const getServerSideProps: GetServerSideProps<SendTaskProps> = async (
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
