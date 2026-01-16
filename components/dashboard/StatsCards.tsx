"use client";

import { useEffect, useState } from "react";

export default function StatsCards() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => setStats(data.totals));
  }, []);

  if (!stats) return null;

  const items = [
    { title: "Total Prompts", value: stats.prompts },
    { title: "Total Likes", value: stats.likes },
    { title: "Total Copies", value: stats.copies },
    { title: "Total Views", value: stats.views },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((i) => (
        <div key={i.title} className="glass rounded-xl p-6">
          <p className="text-sm text-zinc-400">{i.title}</p>
          <h3 className="mt-2 text-3xl font-bold">{i.value}</h3>
        </div>
      ))}
    </div>
  );
}
