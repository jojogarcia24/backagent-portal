import type { NextApiRequest, NextApiResponse } from "next";
import { logNovaInteraction, getInteractionsForUser } from "@/lib/airtable";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  try {
    // You can pass ?email=someone@example.com in the URL, otherwise it defaults.
    const agentEmail =
      (req.query.email as string | undefined) || "jojo@elitelivingrealty.com";

    // 1) Log a sample interaction
    const loggedId = await logNovaInteraction({
      agentEmail,
      channel: "Portal",
      inputText: "Nova, what’s my cap status?",
      aiResponse: "You’ve used 8,400 of your 12,000 cap.",
      intent: "Stats",
      escalationNeeded: false,
      notes: "Dev test from /api/dev/test-nova-logging",
    });

    // 2) Fetch the latest 25 logs for that user
    const logs = await getInteractionsForUser(agentEmail, { limit: 25 });

    return res.status(200).json({
      ok: true,
      loggedId,
      count: logs.length,
      logs,
    });
  } catch (error: any) {
    console.error("Error in test-nova-logging API:", error);
    return res.status(500).json({
      ok: false,
      error: error?.message || "Unknown error",
    });
  }
}
