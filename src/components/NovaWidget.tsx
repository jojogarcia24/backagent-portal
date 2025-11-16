"use client";

import { useState } from "react";

export function NovaWidget() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [lastReply, setLastReply] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);

    try {
      await new Promise((r) => setTimeout(r, 400));

      setLastReply(
        "This is a placeholder Nova reply. Next step we’ll connect this to Back Boss AI + Airtable."
      );
      setMessage("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Ask Nova anything
          </h2>
          <p className="text-xs text-slate-400">
            Try: &quot;Show my missing docs&quot; or &quot;What&apos;s my cap
            status?&quot;
          </p>
        </div>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold">
          N
        </span>
      </div>

      <div className="mb-3 flex-1 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-300">
        {lastReply ? (
          <p>{lastReply}</p>
        ) : (
          <p className="text-slate-500">
            Nova is online and ready. Ask a question to see the response here.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto space-y-2">
        <textarea
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-blue-500"
          placeholder="Type a question or command…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500">
            Nova will use your Back Boss data to answer.
          </span>
          <button
            type="submit"
            disabled={isSending}
            className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
          >
            {isSending ? "Thinking…" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
