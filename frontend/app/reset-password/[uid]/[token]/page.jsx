"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useParams();
  const uid = params.uid;
  const token = params.token;

  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch(
      `http://127.0.0.1:8000/members/password-reset-confirm/${uid}/${token}/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();
    setMessage(data.message);

    if (data.success) setTimeout(() => router.push("/reset-success"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-96">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <button className="w-full bg-green-500 text-white py-2 rounded">
          Reset Password
        </button>
        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}
