"use client";

import { useState } from "react";

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);

    if (res.ok) onSuccess();
    else alert("Registration failed");
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full rounded-md bg-black/40 px-4 py-2"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full rounded-md bg-black/40 px-4 py-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full rounded-md bg-black/40 px-4 py-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={submit}
        disabled={loading}
        className="w-full rounded-md bg-green-500 py-2 font-semibold hover:bg-green-600"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </div>
  );
}
