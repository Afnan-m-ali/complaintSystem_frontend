"use client";
import Link from "next/link";

export default function GeneralManagerDashboard() {
  const generalManager = {
    name: "Super Admin",
    email: "hanasmsalah105@gmail.com",
    role: "General Manager",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <img
            src={`https://ui-avatars.com/api/?name=${generalManager.name.replace(
              " ",
              "+"
            )}&size=128&background=ec4899&color=fff`}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full shadow-lg border-4 border-blue-500"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {generalManager.name} 👑
          </h2>
          <p className="text-gray-500">General Manager Dashboard</p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold">{generalManager.name}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{generalManager.email}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-semibold">{generalManager.role}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Dashboard Info</p>
            <p className="text-lg font-semibold">
              Manage departments & managers
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-4 items-center">
          <Link
            href="/general_manager/admin"
            className="px-8 py-4 text-lg font-semibold bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition w-full text-center"
          >
            ⚙️ Go to Admin Interface
          </Link>

          <Link
            href="/general_manager/responses"
            className="px-8 py-4 text-lg font-semibold bg-blue-500 text-white rounded-2xl shadow-lg hover:bg-blue-600 transition w-full text-center"
          >
            📑 View All Responses
          </Link>

          <Link
            href="/general_manager/complaints"
            className="px-8 py-4 text-lg font-semibold bg-blue-400 text-white rounded-2xl shadow-lg hover:bg-blue-500 transition w-full text-center"
          >
            📝 View All Complaints
          </Link>
        </div>
      </div>
    </div>
  );
}
