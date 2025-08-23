"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gpa: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;

    // Username validation
    const usernameRegex = /^[\w.@+-]{1,150}$/;
    if (!usernameRegex.test(username)) {
      return "Username must be 150 characters or fewer. Letters, digits and @/./+/-/_ only.";
    }

    // Academic email validation (example domain)
    const academicEmailRegex = /^[A-Za-z0-9._%+-]+@student\.uni\.edu$/;
    if (!academicEmailRegex.test(email)) {
      return "Email must be an academic email (example@student.uni.edu).";
    }

    // Password rules
    if (password.length < 8) {
      return "Password must contain at least 8 characters.";
    }
    if (/^\d+$/.test(password)) {
      return "Password cannot be entirely numeric.";
    }
    if (password.toLowerCase().includes(username.toLowerCase())) {
      return "Password is too similar to the username.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    console.log("Register submitted:", formData);
    // TODO: send to Django API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-green-600">
          Student Register
        </h2>
        <p className="text-center text-gray-500">
          Create your student account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 transition"
            required
          />

          {/* Academic Email */}
          <input
            type="email"
            name="email"
            placeholder="Academic Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 transition"
            required
          />

          {/* GPA */}
          <input
            type="number"
            step="0.01"
            name="gpa"
            placeholder="GPA"
            value={formData.gpa}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 transition"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 transition"
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <div className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
