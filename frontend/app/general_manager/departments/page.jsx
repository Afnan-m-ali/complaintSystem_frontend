"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DepartmentsTable() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/members/departments/");
      if (!res.ok) throw new Error("Failed to fetch departments");
      const data = await res.json();
      // Add real IDs from Django
      const depts = data.departments.map((name, idx) => ({ id: idx + 1, name }));
      setDepartments(depts);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Delete department
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this department?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/members/departments/delete/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDepartments(departments.filter((d) => d.id !== id));
      } else {
        const data = await res.json();
        alert("Error deleting department: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Departments
        </h2>

        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-700 text-left text-white">
              <th className="py-3 px-4 font-medium">ID</th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, idx) => (
              <tr key={dept.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}>
                <td className="py-3 px-4 text-blue-800">{dept.id}</td>
                <td className="py-3 px-4 text-blue-800">{dept.name}</td>
                <td className="py-3 px-4 flex gap-3 justify-center">
                  <button
                    onClick={() => router.push(`/general_manager/departments/${dept.id}/edit`)}
                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg shadow hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
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
