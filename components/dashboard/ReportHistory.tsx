"use client";

import { useEffect, useState } from "react";

type Report = {
  _id: string;
  reason: string;
  createdAt: string;
  promptId: {
    title: string;
  };
};

export default function ReportHistory() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/admin/reports", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to load reports");
      }

      const data = await res.json();
      setReports(data.reports || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="glass rounded-xl p-6">
        <p className="text-zinc-400">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-xl p-6 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="mb-4 text-lg font-semibold">Report History</h3>

      {reports.length === 0 ? (
        <p className="text-sm text-zinc-400">
          No reports on your prompts 🎉
        </p>
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <div
              key={r._id}
              className="rounded-lg bg-black/40 p-4"
            >
              <p className="font-medium">
                {r.promptId?.title || "Deleted prompt"}
              </p>
              <p className="text-sm text-zinc-400">
                Reason: {r.reason}
              </p>
              <p className="text-xs text-zinc-500">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
