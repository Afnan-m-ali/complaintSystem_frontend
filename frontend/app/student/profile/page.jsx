"use client";
import Link from "next/link";

export default function StudentProfile() {
  // مثال داتا ثابتة، بعدين هتجيبيها من API Django
  const student = {
    name: "Ali Ahmed",
    email: "ali@example.com",
    gpa: 3.5,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <img
            src="https://ui-avatars.com/api/?name=Ali+Ahmed&size=128&background=4f46e5&color=fff"
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full shadow-lg border-4 border-indigo-500"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {student.name} 🎓
          </h2>
          <p className="text-gray-500">Student Profile Dashboard</p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold">{student.name}</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{student.email}</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">GPA</p>
            <p className="text-lg font-semibold">{student.gpa}</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-semibold">Student</p>
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
            className="px-8 py-4 text-lg font-semibold bg-green-600 text-white rounded-2xl shadow-lg hover:bg-green-700 transition w-full text-center"
          >
            📌 Track Your Complaint
          </Link>
        </div>
      </div>
    </div>
  );
}
