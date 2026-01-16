"use client";

import { useState } from "react";

export default function ReportModal({
  promptId,
  onClose,
}: {
  promptId: string;
  onClose: () => void;
}) {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitReport = async () => {
    if (!reason) return;

    setLoading(true);

    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        promptId,
        reason,
        comment,
      }),
    });

    setLoading(false);
    setSuccess(true);

    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="glass w-full max-w-sm rounded-xl p-5">
        <h3 className="mb-4 text-lg font-semibold">Report Prompt</h3>

        {success ? (
          <p className="text-green-400 text-sm">Report submitted</p>
        ) : (
          <>
            <select
              className="mb-3 w-full rounded bg-transparent p-2"
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select reason</option>
              <option className="bg-zinc-900">
                Sexual / Adult Content
              </option>
              <option className="bg-zinc-900">
                Illegal Activity
              </option>
              <option className="bg-zinc-900">
                Hate / Abuse
              </option>
              <option className="bg-zinc-900">Violence</option>
              <option className="bg-zinc-900">Spam</option>
              <option className="bg-zinc-900">Other</option>
            </select>

            <textarea
              placeholder="Optional comment"
              className="mb-4 w-full rounded bg-transparent p-2"
              rows={3}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1 text-sm text-zinc-400"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={submitReport}
                className="rounded bg-red-500 px-4 py-1 text-sm font-semibold hover:bg-red-400"
              >
                Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
