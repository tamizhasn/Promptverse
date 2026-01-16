"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
      <div className="glass w-full max-w-md rounded-xl p-6">
        <h1 className="mb-6 text-2xl font-bold">Admin Login</h1>

        {error && (
          <p className="mb-4 rounded bg-red-500/20 p-2 text-sm text-red-300">
            {error}
          </p>
        )}

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
          onClick={handleLogin}
          className="w-full rounded bg-indigo-600 py-2 font-semibold hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
