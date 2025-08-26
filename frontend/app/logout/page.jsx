"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function logoutUser() {
      try {
        await fetch("http://127.0.0.1:8000/members/logout/", {
          method: "POST",
          credentials: "include", // sends the session cookie
        });
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        router.push("/login");
      }
    }
    logoutUser();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-xl font-semibold text-gray-700">Logging out...</p>
    </div>
  );
}
