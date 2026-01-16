"use client";

import { useEffect, useState } from "react";

type Prompt = {
  _id: string;
  title: string;
  category?: string;
  likes: number;
  copies: number;
  views: number;
  isHidden: boolean;
  previewImage?: string;
};

export default function MyPromptsTable() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  /* ============================
     📡 FETCH ADMIN PROMPTS
  ============================ */
  const fetchPrompts = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/analytics");
    const data = await res.json();
    setPrompts(data.prompts || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  /* ============================
     🚫 HIDE PROMPT (SOFT DELETE)
  ============================ */
  const hidePrompt = async (id: string) => {
    await fetch(`/api/prompts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isHidden: true }),
    });
    fetchPrompts();
  };

  /* ============================
     🗑️ DELETE PROMPT (HARD)
  ============================ */
  const deletePrompt = async (id: string) => {
    const ok = confirm("Delete this prompt permanently?");
    if (!ok) return;

    await fetch(`/api/prompts/${id}`, {
      method: "DELETE",
    });
    fetchPrompts();
  };

  if (loading) {
    return (
      <div className="glass rounded-xl p-6">
        <p className="text-zinc-400">Loading prompts...</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="mb-4 text-lg font-semibold">My Prompts</h3>

      {prompts.length === 0 ? (
        <p className="text-sm text-zinc-400">
          You have not created any prompts yet.
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-zinc-400">
            <tr>
              <th className="text-left">Preview</th>
              <th className="text-left">Title</th>
              <th className="text-left">Category</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Copies</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {prompts.map((p) => (
              <tr
                key={p._id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                {/* Preview */}
                <td>
                  <img
                    src={p.previewImage || "/sample-prompt.png"}
                    className="h-12 w-20 rounded object-cover"
                  />
                </td>

                {/* Title */}
                <td className="max-w-[200px] truncate">
                  {p.title}
                </td>

                {/* Category */}
                <td>{p.category || "-"}</td>

                {/* Views */}
                <td className="text-center">{p.views}</td>

                {/* Likes */}
                <td className="text-center">{p.likes}</td>

                {/* Copies */}
                <td className="text-center">{p.copies}</td>

                {/* Status */}
                <td>
                  <span
                    className={`text-xs ${
                      p.isHidden
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {p.isHidden ? "Hidden" : "Published"}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex gap-3 py-2">
                  <button
                    onClick={() => hidePrompt(p._id)}
                    className="text-xs text-yellow-400 hover:underline"
                  >
                    Hide
                  </button>

                  <button
                    onClick={() => deletePrompt(p._id)}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
