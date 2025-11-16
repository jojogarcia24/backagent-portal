import type { RequestInit } from "next/dist/server/web/spec-extension/request";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const AIRTABLE_TASKS_TABLE_NAME =
  process.env.AIRTABLE_TASKS_TABLE_NAME || "Agent Task Table";

const AIRTABLE_INTERACTIONS_TABLE_NAME =
  process.env.AIRTABLE_INTERACTIONS_TABLE_NAME || "Nova Interaction Logs";

if (!AIRTABLE_API_KEY) {
  console.warn("[Airtable] Missing AIRTABLE_API_KEY env var");
}

if (!AIRTABLE_BASE_ID) {
  console.warn("[Airtable] Missing AIRTABLE_BASE_ID env var");
}

const AIRTABLE_API_BASE_URL = AIRTABLE_BASE_ID
  ? `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`
  : "";

/**
 * Core low-level Airtable fetch.
 * - Uses PAT ("Authorization: Bearer <token>")
 * - Points at the v0 REST API
 * - Does NOT throw on non-2xx – caller decides how to handle errors.
 */
async function airtableGetRaw(
  tableIdOrName: string,
  queryParams?: Record<string, string>
): Promise<Response> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error(
      "[Airtable] AIRTABLE_API_KEY or AIRTABLE_BASE_ID is missing – check .env.local"
    );
  }

  if (!tableIdOrName) {
    throw new Error(
      "[Airtable] tableIdOrName is empty – check AIRTABLE_TASKS_TABLE_NAME or env"
    );
  }

  const baseUrl = AIRTABLE_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("[Airtable] AIRTABLE_API_BASE_URL could not be built");
  }

  const url = new URL(
    `${baseUrl}/${encodeURIComponent(tableIdOrName)}`
  );

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    }
  }

  const init: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  };

  const res = await fetch(url.toString(), init);
  return res;
}

// ===== Public helpers =====

export function buildAssignedEmailFormula(email: string): string {
  // Escape single quotes for Airtable formulas
  const safeEmail = email.replace(/'/g, "\\'");
  return `{Agent Email} = '${safeEmail}'`;
}

type AirtableRecord<T = any> = {
  id: string;
  fields: T;
  createdTime: string;
};

type AirtableListResponse<T = any> = {
  records: AirtableRecord<T>[];
  offset?: string;
};

export type BackBossTask = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  dueDate?: string | null;
  source?: string;
  rawFields: Record<string, any>;
};

/**
 * Raw debug helper: hits the tasks table and returns the raw Response.
 * Used ONLY by /api/dev/list-raw-tasks so we can see status, URL, and body.
 */
export async function debugListTasksRaw(): Promise<Response> {
  return airtableGetRaw(AIRTABLE_TASKS_TABLE_NAME, {
    maxRecords: "10",
  });
}

/**
 * High-level helper: returns mapped tasks for a given agent email.
 * This is what /connect/tasks should be using.
 */
export async function getTasksForUser(
  email: string | null | undefined
): Promise<BackBossTask[]> {
  if (!email) {
    return [];
  }

  const filterByFormula = buildAssignedEmailFormula(email);

  const res = await airtableGetRaw(AIRTABLE_TASKS_TABLE_NAME, {
    filterByFormula,
    // Airtable v0 sort syntax: sort[0][field], sort[0][direction]
    "sort[0][field]": "Due Date",
    "sort[0][direction]": "asc",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(
      "[Airtable] getTasksForUser error",
      res.status,
      res.statusText,
      text
    );
    throw new Error(
      `Airtable error fetching tasks: ${res.status} ${res.statusText}`
    );
  }

  const json = (await res.json()) as AirtableListResponse<Record<string, any>>;

  return (json.records || []).map((record) => {
    const fields = record.fields || {};
    const titleField =
      (fields["Task Description"] as string | undefined) ||
      (fields["Name"] as string | undefined) ||
      "Task";

    const description =
      (fields["Notes"] as string | undefined) ||
      (fields["Description"] as string | undefined) ||
      "";

    const status =
      (fields["Status"] as string | undefined) ||
      (fields["Task Status"] as string | undefined) ||
      "";

    const dueDate =
      (fields["Due Date"] as string | undefined) ||
      (fields["Due date"] as string | undefined) ||
      null;

    const source =
      (fields["Source"] as string | undefined) ||
      (fields["Created By"] as string | undefined) ||
      "";

    return {
      id: record.id,
      title: titleField,
      description,
      status,
      dueDate,
      source,
      rawFields: fields,
    };
  });
}

// Placeholder exports for future Nova Interaction Logs wiring
export const AIRTABLE_CONSTANTS = {
  BASE_ID: AIRTABLE_BASE_ID,
  TASKS_TABLE_NAME: AIRTABLE_TASKS_TABLE_NAME,
  INTERACTIONS_TABLE_NAME: AIRTABLE_INTERACTIONS_TABLE_NAME,
};
