"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Registration failed");
      return;
    }

    // Redirect to login after success
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
      <div className="glass w-full max-w-md rounded-xl p-6">
        <h1 className="mb-6 text-2xl font-bold">Admin Register</h1>

        {error && (
          <p className="mb-4 rounded bg-red-500/20 p-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <input
          placeholder="Name"
          className="mb-3 w-full rounded bg-transparent p-2 outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="mb-3 w-full rounded bg-transparent p-2 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-5 w-full rounded bg-transparent p-2 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={handleRegister}
          className="w-full rounded bg-indigo-600 py-2 font-semibold hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </div>
    </div>
  );
}
