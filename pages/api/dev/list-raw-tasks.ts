import type { NextApiRequest, NextApiResponse } from "next";
import { debugListTasksRaw, AIRTABLE_CONSTANTS } from "@/lib/airtable";

type DevListResponse = {
  ok: boolean;
  status?: number;
  url?: string;
  rawBody?: string;
  error?: string;
  // Debug
  baseId?: string | null;
  tasksTableName?: string | null;
  hasKey?: boolean;
  keyLength?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DevListResponse>
) {
  const baseId = AIRTABLE_CONSTANTS.BASE_ID || null;
  const tasksTableName = AIRTABLE_CONSTANTS.TASKS_TABLE_NAME || null;
  const key = process.env.AIRTABLE_API_KEY || "";
  const hasKey = !!key;
  const keyLength = key.length;

  try {
    const response = await debugListTasksRaw();
    const rawBody = await response.text();

    res.status(200).json({
      ok: response.ok,
      status: response.status,
      url: response.url,
      rawBody,
      baseId,
      tasksTableName,
      hasKey,
      keyLength,
    });
  } catch (err: any) {
    console.error("[/api/dev/list-raw-tasks] Error:", err);
    res.status(500).json({
      ok: false,
      error: err?.message || "Unknown error",
      baseId,
      tasksTableName,
      hasKey,
      keyLength,
    });
  }
}
