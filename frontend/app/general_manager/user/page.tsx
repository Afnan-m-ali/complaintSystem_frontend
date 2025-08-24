"use client";

import { useState } from "react";

export default function UsersPage() {
  const [users] = useState([
    {
      id: 1,
      username: "ali123",
      email: "ali@example.com",
      fullName: "Ali Ahmed",
      role: "Student",
      department: "IT",
    },
    {
      id: 2,
      username: "mona_hr",
      email: "mona@example.com",
      fullName: "Mona Salah",
      role: "HR Manager",
      department: "HR",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          👥 Users List
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-2xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-blue-400 text-white">
                <th className="px-6 py-4 text-left">Username</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Full Name</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Department</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b hover:bg-indigo-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{u.username}</td>
                  <td className="px-6 py-4 text-gray-700">{u.email}</td>
                  <td className="px-6 py-4">{u.fullName}</td>
                  <td className="px-6 py-4 text-gray-600">{u.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {u.department}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
