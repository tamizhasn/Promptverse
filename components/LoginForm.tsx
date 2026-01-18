"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (!res?.error) onSuccess();
    else alert("Invalid credentials");
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full rounded-md bg-black/40 px-4 py-2 outline-none"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full rounded-md bg-black/40 px-4 py-2 outline-none"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={submit}
        disabled={loading}
        className="w-full rounded-md bg-indigo-500 py-2 font-semibold hover:bg-indigo-600"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </div>
  );
}
