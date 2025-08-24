"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch("http://127.0.0.1:8000/members/student/profile/", {
          method: "GET",
          credentials: "include", // important for Django session cookie
        });

        const data = await res.json();
        if (data.success) {
          setStudent(data.user);
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Request failed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (!student) {
    return <p className="text-center text-red-500">Unauthorized. Please log in.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-4 w-full max-w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <img
            src={`https://ui-avatars.com/api/?name=${student.name}&size=128&background=4f46e5&color=fff`}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full shadow-lg border-4 border-indigo-500"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {student.name} 🎓
          </h2>
          <p className="text-gray-500">Student Profile Profile</p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold">{student.name}</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold break-words">{student.email}</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">GPA</p>
            <p className="text-lg font-semibold">{student.gpa ?? "N/A"}</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Username</p>
            <p className="text-lg font-semibold">{student.username}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-4 items-center">
          <Link
            href="/student/complaint"
            className="px-8 py-4 text-lg font-semibold bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition w-full text-center"
          >
            ✍️ Write Complaint / Suggestion
          </Link>

          <Link
            href="/student/track-complaint"
            className="px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition w-full text-center"
          >
            📌 Track Your Complaint
          </Link>
        </div>
      </div>
    </div>
  );
}
