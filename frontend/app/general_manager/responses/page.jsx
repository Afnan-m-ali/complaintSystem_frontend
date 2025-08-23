"use client";
import { useState } from "react";

export default function ResponsesTable() {
  // مثال بيانات (ممكن تيجي بعدين من API)
  const responses = [
    {
      id: 1,
      complaintTitle: "Slow Internet",
      responseMessage: "We are upgrading the network infrastructure.",
      senderDepartment: "IT",
      responseDate: "2025-08-20",
      visible: false,
    },
    {
      id: 2,
      complaintTitle: "Salary Delay",
      responseMessage: "Salaries will be processed by the end of this week.",
      senderDepartment: "HR",
      responseDate: "2025-08-21",
      visible: true,
    },
  ];

  // تخزين حالة الرؤية لكل response
  const [visibility, setVisibility] = useState(
    responses.reduce((acc, res) => {
      acc[res.id] = res.visible;
      return acc;
    }, {})
  );

  const toggleVisibility = (id) => {
    setVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    // هنا ممكن تستدعي API لتحديث حالة الرؤية في السيرفر
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">All Responses</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Complaint Title</th>
              <th className="border border-gray-300 px-4 py-2">Response Message</th>
              <th className="border border-gray-300 px-4 py-2">Sender Department</th>
              <th className="border border-gray-300 px-4 py-2">Response Date</th>
              <th className="border border-gray-300 px-4 py-2">Visible</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((res) => (
              <tr key={res.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {res.complaintTitle}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {res.responseMessage}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {res.senderDepartment}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {res.responseDate}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {visibility[res.id] ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => toggleVisibility(res.id)}
                    className={`px-3 py-1 rounded text-white ${
                      visibility[res.id]
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {visibility[res.id] ? "Hide from Student" : "Send to Student"}
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
