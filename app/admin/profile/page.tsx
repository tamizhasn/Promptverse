"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import BackButton from "@/components/BackButton";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();


  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfileImage(data.profileImage || "");
        setDob(data.dob ? data.dob.substring(0, 10) : "");
        setMobile(data.mobile || "");
        setTermsAccepted(data.termsAccepted || false);
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileImage,
        dob,
        mobile,
        termsAccepted,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setMessage("Failed to update profile");
      return;
    }

    setMessage("Profile updated successfully");

    // redirect to home after short delay
    setTimeout(() => {
    router.push("/");
    }, 800);

  };

  return (
    <div className="container-app mt-10 max-w-3xl grid-bg">
      <h1 className="mb-6 text-3xl font-bold">Edit Profile</h1>

      <div className="glass rounded-xl p-6 space-y-6">
        {/* Profile Image */}
        <div>
          <p className="mb-2 text-sm text-zinc-400">Profile Image</p>
          <ImageUpload onUpload={setProfileImage} />
          {profileImage && (
            <img
              src={profileImage}
              className="mt-3 h-24 w-24 rounded-full object-cover"
            />
          )}
        </div>

        {/* DOB */}
        <div>
          <label className="text-sm text-zinc-400">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1 w-full rounded bg-transparent p-3 outline-none"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm text-zinc-400">Mobile Number</label>
          <input
            type="tel"
            value={mobile}
            placeholder="+91xxxxxxxxxx"
            onChange={(e) => setMobile(e.target.value)}
            className="mt-1 w-full rounded bg-transparent p-3 outline-none"
          />
        </div>

        {/* Terms */}
        <div className="rounded-lg bg-zinc-800/40 p-4 text-sm">
          <p className="mb-2 font-semibold">Prompt Usage Terms</p>
          <ul className="list-disc space-y-1 pl-5 text-zinc-300">
            <li>No mature, adult, or explicit content prompts.</li>
            <li>No illegal, harmful, or abusive content.</li>
            <li>No hate speech, harassment, or violence prompts.</li>
            <li>No prompts encouraging illegal activities.</li>
            <li>
              Violation of these rules may result in <b>account termination</b>.
            </li>
          </ul>

          <label className="mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span>I accept the terms & conditions</span>
          </label>
        </div>

        {/* Save */}
        <button
          disabled={loading || !termsAccepted}
          onClick={handleSave}
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>

        {message && (
          <p className="text-center text-sm text-green-400">{message}</p>
        )}
      </div>
      <div className="top-20 py-7 z-40">
        <BackButton />
      </div>

    </div>
  );
}
