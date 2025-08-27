"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DepartmentManagerProfile() {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://127.0.0.1:8000/members/department/profile/", {
          method: "GET",
          credentials: "include", // 🔑 important if using Django sessions
        });

        const data = await response.json();

        if (data.success) {
          setManager(data.user);
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!manager) {
    return <div className="flex justify-center items-center h-screen">Failed to load profile</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <img
            src={`https://ui-avatars.com/api/?name=${manager.name.replace(
              " ",
              "+"
            )}&size=128&background=9333ea&color=fff`}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full shadow-lg border-4 border-blue-500"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {manager.name} 🏢
          </h2>
          <p className="text-gray-500">Department Manager Dashboard</p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold">{manager.name}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{manager.email}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-semibold">{manager.role}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-lg font-semibold">{manager.department}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-4 items-center">
          <Link
            href="/department_manager/complaints"
            className="px-8 py-4 text-lg font-semibold bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition w-full text-center"
          >
            📂 View Department Complaints & Suggestions
          </Link>
        </div>
      </div>
    </div>
  );
}
