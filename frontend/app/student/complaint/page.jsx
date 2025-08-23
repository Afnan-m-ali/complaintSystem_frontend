"use client";
import { useState } from "react";

export default function ComplaintPage() {
  const [data, setData] = useState({
    type: "Complaint",
    title: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setData({ ...data, file: e.target.files[0] }); // ناخد أول ملف
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // تجهيز البيانات مع الملف
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.file) {
      formData.append("file", data.file);
    }

    console.log("Complaint Submitted:", data);

    // TODO: send formData to Django API
    // fetch("http://127.0.0.1:8000/api/complaints/", {
    //   method: "POST",
    //   body: formData,
    // });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-2">
            Submit Your Complaint / Suggestion
          </h2>
          <p className="text-gray-600">
            Please fill in the form below to send your message to the management.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={data.type}
              onChange={handleChange}
              className="w-full border-2 border-indigo-200 rounded-xl px-4 py-3 bg-indigo-50 text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="Complaint">Complaint</option>
              <option value="Suggestion">Suggestion</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter title..."
              value={data.title}
              onChange={handleChange}
              className="w-full border-2 border-pink-200 rounded-xl px-4 py-3 bg-pink-50 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write your complaint or suggestion..."
              value={data.description}
              onChange={handleChange}
              className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 bg-purple-50 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              rows="6"
              required
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Upload File / Image
            </label>
            <input
              type="file"
              name="file"
              accept="image/*,.pdf,.doc,.docx" // تقدري تتحكمي في الأنواع
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:scale-105 transform transition"
            >
              🚀 Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
