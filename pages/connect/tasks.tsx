import React from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/layout/AppShell";
import type { AirtableTask } from "@/lib/airtable";
import { getTasksForUser } from "@/lib/airtable";

type TasksPageProps = {
  userEmail: string | null;
  tasks: AirtableTask[];
};

const heroTitleStyle: React.CSSProperties = {
  fontSize: 30,
  fontWeight: 800,
  color: "#f9fafb",
  marginBottom: 8,
};

const heroSubtitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "rgba(249,250,251,0.7)",
  marginBottom: 24,
};

const pageCardStyle: React.CSSProperties = {
  background: "rgba(248,250,252,0.96)",
  borderRadius: 26,
  padding: 24,
  boxShadow: "0 16px 40px rgba(15,23,42,0.35)",
};

const headerRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
  marginBottom: 20,
};

const headerLeftStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const headerTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#0f172a",
};

const headerSubtitleStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
};

const chipsRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
};

const chipStyleBase: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

const chipOpenStyle: React.CSSProperties = {
  ...chipStyleBase,
  background: "rgba(37,99,235,0.08)",
  color: "#1d4ed8",
};

const chipOverdueStyle: React.CSSProperties = {
  ...chipStyleBase,
  background: "rgba(220,38,38,0.08)",
  color: "#b91c1c",
};

const chipCompletedStyle: React.CSSProperties = {
  ...chipStyleBase,
  background: "rgba(16,185,129,0.08)",
  color: "#059669",
};

const listContainerStyle: React.CSSProperties = {
  marginTop: 18,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const taskCardStyle: React.CSSProperties = {
  borderRadius: 18,
  padding: 16,
  background: "#ffffff",
  border: "1px solid rgba(148,163,184,0.35)",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const taskHeaderRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 10,
};

const taskTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  color: "#0f172a",
};

const taskStatusPillBase: React.CSSProperties = {
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 600,
};

const taskDescriptionStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#4b5563",
};

const taskMetaRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  marginTop: 4,
  fontSize: 12,
  color: "#6b7280",
};

const emptyStateStyle: React.CSSProperties = {
  padding: 20,
  borderRadius: 16,
  background: "rgba(226,232,240,0.6)",
  border: "1px dashed rgba(148,163,184,0.9)",
  textAlign: "center",
  fontSize: 13,
  color: "#6b7280",
};

function isCompleted(status?: string): boolean {
  if (!status) return false;
  const value = status.toLowerCase();
  return value.includes("done") || value.includes("complete");
}

function isOverdue(task: AirtableTask): boolean {
  if (!task.dueDate || isCompleted(task.status)) return false;
  const due = new Date(task.dueDate);
  if (Number.isNaN(due.getTime())) return false;
  const now = new Date();
  return due < now;
}

const TasksPage: React.FC<TasksPageProps> = ({ userEmail, tasks }) => {
  const totalOpen = tasks.filter((t) => !isCompleted(t.status)).length;
  const totalCompleted = tasks.filter((t) => isCompleted(t.status)).length;
  const totalOverdue = tasks.filter((t) => isOverdue(t)).length;

  const formatDate = (value?: string | null): string => {
    if (!value) return "No due date";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "No due date";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusPillStyle = (status?: string): React.CSSProperties => {
    if (isCompleted(status)) {
      return {
        ...taskStatusPillBase,
        background: "rgba(16,185,129,0.08)",
        color: "#059669",
      };
    }
    if (status && status.toLowerCase().includes("in progress")) {
      return {
        ...taskStatusPillBase,
        background: "rgba(37,99,235,0.08)",
        color: "#1d4ed8",
      };
    }
    return {
      ...taskStatusPillBase,
      background: "rgba(148,163,184,0.16)",
      color: "#4b5563",
    };
  };

  return (
    <AppShell userEmail={userEmail} activeTab="Connect">
      <div style={{ padding: "12px 4px 28px 4px" }}>
        <div style={heroTitleStyle}>Connect · Tasks</div>
        <div style={heroSubtitleStyle}>
          A focused view of everything on your plate — pulled straight from the Agent Task Table.
        </div>

        <div style={pageCardStyle}>
          <div style={headerRowStyle}>
            <div style={headerLeftStyle}>
              <div style={headerTitleStyle}>My Tasks</div>
              <div style={headerSubtitleStyle}>
                Stay ahead of follow-ups, transaction to-dos, and coaching tasks in one place.
              </div>
            </div>
            <div style={chipsRowStyle}>
              <div style={chipOpenStyle}>
                <span>📝 Open</span>
                <span>{totalOpen}</span>
              </div>
              <div style={chipOverdueStyle}>
                <span>⏰ Overdue</span>
                <span>{totalOverdue}</span>
              </div>
              <div style={chipCompletedStyle}>
                <span>✅ Completed</span>
                <span>{totalCompleted}</span>
              </div>
            </div>
          </div>

          <div style={listContainerStyle}>
            {tasks.length === 0 ? (
              <div style={emptyStateStyle}>
                No tasks found for your email yet. Once Back Boss starts assigning items to you, they&apos;ll
                show up here automatically.
              </div>
            ) : (
              tasks.map((task) => {
                const overdue = isOverdue(task);

                return (
                  <div key={task.id} style={taskCardStyle}>
                    <div style={taskHeaderRowStyle}>
                      <div>
                        <div style={taskTitleStyle}>{task.title}</div>
                        {task.description ? (
                          <div style={taskDescriptionStyle}>{task.description}</div>
                        ) : null}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        {task.status ? (
                          <span style={getStatusPillStyle(task.status)}>{task.status}</span>
                        ) : (
                          <span style={getStatusPillStyle(undefined)}>Unspecified</span>
                        )}
                      </div>
                    </div>
                    <div style={taskMetaRowStyle}>
                      <span>
                        <strong>Due:</strong>{" "}
                        <span style={overdue ? { color: "#b91c1c", fontWeight: 600 } : undefined}>
                          {formatDate(task.dueDate || null)}
                          {overdue ? " · Overdue" : ""}
                        </span>
                      </span>
                      {task.source ? (
                        <span>
                          <strong>Source:</strong> {task.source}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps<TasksPageProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const userEmail = (session?.user?.email as string | null) || null;

  let tasks: AirtableTask[] = [];
  try {
    if (userEmail) {
      tasks = await getTasksForUser(userEmail);
    }
  } catch (error) {
    console.error("Error fetching tasks from Airtable:", error);
  }

  return {
    props: {
      userEmail,
      tasks,
    },
  };
};

export default TasksPage;
