"use client";

import { useState } from "react";
const API_URL = "https://hana74.pythonanywhere.com";
export default function AddDepartmentPage() {
  const [deptName, setDeptName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/members/departments/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ DepartmentName: deptName }),
      });

      const text = await res.text();
      console.log("Raw response from Django:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        setMessage("❌ Server did not return JSON. Check backend logs.");
        return;
      }

      if (res.ok) {
        setMessage("✅ Department added successfully!");
        setDeptName(""); // clear input
      } else {
        if (data.error) {
          setMessage("❌ " + data.error);
        } else {
          setMessage("❌ Something went wrong.");
        }
      }
    } catch (error) {
      setMessage("❌ Request failed: " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg text-gray-100">
      <h2 className="text-xl font-semibold text-center mb-6">
        Add Department
      </h2>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="deptName" className="block text-sm font-medium mb-1">
            Department Name
          </label>
          <input
            type="text"
            id="deptName"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            placeholder="Enter department name"
            className="mt-1 w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>

        {/* Centered Save Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-md shadow transition"
          >
            Save
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-4 text-sm text-center text-gray-300">{message}</p>
      )}
    </div>
  );
}
