// app/general_manager/responses/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function ResponsesPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch responses
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/members/general_manager_responses/", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch responses");

      setResponses(Array.isArray(data) ? data : []); // ensure array
    } catch (err) {
      console.error("fetchData error:", err);
      alert("Failed to load responses: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // toggle visibility
  const handleToggle = async (id, currentVisible) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/members/general_manager_responses/${id}/publish/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ visible: !currentVisible }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update visibility");

      // update UI
      setResponses((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, visible: !currentVisible } : r
        )
      );
    } catch (err) {
      console.error("toggle error:", err);
      alert("Failed to update: " + err.message);
    }
  };

  if (loading) return <div className="p-6">Loading responses...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Responses</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Complaint</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Visible</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="p-2 border">{r.complaintTitle}</td>
              <td className="p-2 border">{r.responseMessage}</td>
              <td className="p-2 border">{r.senderDepartment}</td>
              <td className="p-2 border">{r.responseDate}</td>
              <td className="p-2 border">{r.visible ? "Yes" : "No"}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleToggle(r.id, r.visible)}
                  className={`px-3 py-1 rounded text-white ${
                    r.visible ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {r.visible ? "Hide" : "Show"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
