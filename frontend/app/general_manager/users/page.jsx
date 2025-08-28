"use client";
import { useEffect, useState } from "react";

export default function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/members/users/");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      const filteredUsers = data.users.filter(u => u.role !== "GeneralManager");
      setUsers(filteredUsers);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/members/deleteUser/${userId}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter((u) => u.UserId !== userId));
      } else {
        const data = await res.json();
        alert("Error deleting user: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Users
        </h2>

        <table className="w-full table-auto border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-blue-700 text-left text-white">
              <th className="py-3 px-4 font-medium">ID</th>
              <th className="py-3 px-4 font-medium">Username</th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Role</th>
              <th className="py-3 px-4 font-medium">GPA</th>
              <th className="py-3 px-4 font-medium">Department</th>
              <th className="py-3 px-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr
                key={u.UserId}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
              >
                <td className="py-3 px-4 text-blue-800">{u.UserId}</td>
                <td className="py-3 px-4 text-blue-800">{u.username}</td>
                <td className="py-3 px-4 text-blue-800">{u.name}</td>
                <td className="py-3 px-4 text-blue-800">{u.email}</td>
                <td className="py-3 px-4 text-blue-800">{u.role}</td>
                <td className="py-3 px-4 text-blue-800">{u.gpa}</td>
                <td className="py-3 px-4 text-blue-800">{u.department || "-"}</td>
                <td className="py-3 px-4 flex gap-3 justify-center">
                  <button
                    onClick={() => handleDelete(u.UserId)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
