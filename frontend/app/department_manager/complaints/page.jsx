"use client";
import { useState } from "react";

export default function DepartmentComplaints() {
  // داتا ثابتة مؤقتا (بعد كده تجيب من API Django)
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      type: "Complaint",
      status: "In Review",
      title: "Chatbot Issue",
      description: "Chatbot test is not working properly.",
      createdDate: "Aug. 21, 2025, 6:38 p.m.",
      attachment: "/attachments/Basics_Python_Sheet.pdf",
      response: "",
    },
  ]);

  // Send Response
  const handleResponse = (id) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: "Responded" } : c
    );
    setComplaints(updated);
    alert("Response sent successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          📂 Complaints & Suggestions for Your Department
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-2xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-blue-400 text-white">
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">Created Date</th>
                <th className="px-6 py-4 text-left">Attachments</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-indigo-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{c.type}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      c.status === "In Review"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {c.status}
                  </td>
                  <td className="px-6 py-4">{c.title}</td>
                  <td className="px-6 py-4 text-gray-600">{c.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {c.createdDate}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={c.attachment}
                      target="_blank"
                      className="text-indigo-600 underline hover:text-indigo-800"
                    >
                      View File
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <textarea
                      value={c.response}
                      onChange={(e) => {
                        const updated = complaints.map((x) =>
                          x.id === c.id ? { ...x, response: e.target.value } : x
                        );
                        setComplaints(updated);
                      }}
                      placeholder="Type your response..."
                      className="w-full p-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 mb-2"
                    />
                    <button
                      onClick={() => handleResponse(c.id)}
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                    >
                      Send Response
                    </button>
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
