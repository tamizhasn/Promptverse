"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function AdminMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // 🔓 NOT LOGGED IN (DEFAULT)
  if (!session) {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="glass rounded-full px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
        >
          Become an Admin
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-48 rounded-xl glass p-2">
            <Link
              href="/admin/login"
              className="block rounded-lg px-4 py-2 text-sm hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>

            <Link
              href="/admin/register"
              className="mt-1 block rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    );
  }

  // 🔐 LOGGED IN (ADMIN)
  return (
    <div ref={ref} className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-full glass"
      >
        <img
          src={
            (session.user as any)?.image || "/avatar.png"
          }
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />

      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-52 rounded-xl glass p-2">
          <Link
            href="/admin/profile"
            className="block rounded-lg px-4 py-2 text-sm hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Edit Profile
          </Link>

          <Link
            href="/admin/create-prompt"
            className="block rounded-lg px-4 py-2 text-sm hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Create Prompt
          </Link>

          <Link
            href="/admin/dashboard"
            className="block rounded-lg px-4 py-2 text-sm hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Admin Dashboard
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-1 w-full rounded-lg px-4 py-2 text-left text-sm font-semibold text-red-400 hover:bg-red-500/10"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
