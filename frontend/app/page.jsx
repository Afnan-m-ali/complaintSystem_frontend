"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Student Complaints & Suggestions Platform
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to the official portal where students can share their
          complaints and suggestions with the General Manager and Department
          Managers.
        </p>

        {/* Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">Login</h2>
            <p className="text-gray-500">Access your account:</p>
            <Link
              href="/login"
              className="block w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          </div>

          {/* Register Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Register</h2>
            <p className="text-gray-500">Create a new account:</p>
            <Link
              href="/register"
              className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
