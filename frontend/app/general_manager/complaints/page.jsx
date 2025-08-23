"use client";
import { useState } from "react";

export default function ComplaintsTable() {
  // مثال على الداتا (بعد كده هتيجي من API)
  const complaints = [
    {
      id: 1,
      type: "Technical",
      status: "Pending",
      title: "Slow Internet",
      description: "The lab internet is very slow during peak hours.",
      currentDepartment: "IT",
      attachment: "network_issue.png",
    },
    {
      id: 2,
      type: "HR",
      status: "Resolved",
      title: "Salary Delay",
      description: "Delay in salary payment for last month.",
      currentDepartment: "HR",
      attachment: "salary_delay.pdf",
    },
  ];

  const departments = ["IT", "HR", "Finance", "Admin"];

  // تخزين الاختيار لكل شكوى
  const [assignments, setAssignments] = useState({});

  const handleAssign = (complaintId) => {
    const selectedDept = assignments[complaintId];
    if (selectedDept) {
      alert(`Complaint ${complaintId} assigned to ${selectedDept}`);
      // هنا تقدر تبعت الـ API عشان تحدث الداتا
    } else {
      alert("Please select a department before assigning.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">All Complaints</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Current Department</th>
              <th className="border border-gray-300 px-4 py-2">Attachment</th>
              <th className="border border-gray-300 px-4 py-2">Assign</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td className="border border-gray-300 px-4 py-2">{complaint.type}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 font-semibold ${
                    complaint.status === "Pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {complaint.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">{complaint.title}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.currentDepartment}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-blue-600 underline cursor-pointer">
                  {complaint.attachment}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={assignments[complaint.id] || ""}
                    onChange={(e) =>
                      setAssignments({ ...assignments, [complaint.id]: e.target.value })
                    }
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, idx) => (
                      <option key={idx} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAssign(complaint.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Assign
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
