"use client";
import { useState, useEffect } from "react";

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    role: "Student",
    dept: "",
    password: "",
  });

  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch departments on page load
  useEffect(() => {
    fetch("http://127.0.0.1:8000/members/departments/")
      .then((res) => res.json())
      .then((data) => setDepartments(data.departments))
      .catch((err) => console.error("Failed to load departments:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/members/addUser/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.text();

      if (!res.ok) {
        setMessage(data);
      } else {
        setMessage(data);
        setFormData({
          username: "",
          email: "",
          name: "",
          role: "Student",
          dept: "",
          password: "",
        });
      }
    } catch (err) {
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
        Add User
      </h2>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          />
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          >
            <option>Student</option>
            <option>DepartmentManager</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label htmlFor="dept" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            id="dept"
            value={formData.dept}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          >
            <option value="">Select department</option>
            {departments.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 text-white text-sm rounded-md hover:bg-blue-800"
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
          >
            Cancel
          </button>
        </div>
      </form>

      {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
    </div>
  );
}
