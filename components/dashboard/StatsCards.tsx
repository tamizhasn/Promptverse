"use client";

import { useEffect, useState } from "react";

type Stats = {
  prompts: number;
  likes: number;
  copies: number;
  views: number;
};

export default function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setError(null);

      const res = await fetch("/api/admin/analytics", {
        cache: "no-store", // 🚫 disable cache
      });

      if (!res.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await res.json();
      setStats(data.totals);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="grid grid-cols-1">
        <div className="glass rounded-xl p-6 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="glass rounded-xl p-6 animate-pulse"
          >
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="mt-4 h-8 w-16 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

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
          <h3 className="mt-2 text-3xl font-bold">
            {i.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
