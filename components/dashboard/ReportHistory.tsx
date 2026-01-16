export default function ReportHistory() {
  const reports = [
    {
      id: 1,
      title: "Cinematic Product Video",
      reason: "Spam",
      date: "2026-01-15",
    },
  ];

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="mb-4 text-lg font-semibold">Report History</h3>

      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.id} className="rounded-lg bg-black/40 p-4">
            <p className="font-medium">{r.title}</p>
            <p className="text-sm text-zinc-400">{r.reason}</p>
            <p className="text-xs text-zinc-500">{r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
