// app/general_manager/complaints/page.jsx (or whichever path you use)
"use client";
import { useEffect, useState } from "react";

export default function AllComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState({}); // { [ComplaintId]: DepartmentId }
  const [loading, setLoading] = useState(true);

  // Fetch complaints + departments from the same endpoint your Django view serves
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/members/allComplaints/", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Failed to fetch");

      const complaintsData = data.complaints || [];
      const departmentsData = data.departments || [];

      setComplaints(complaintsData);
      setDepartments(departmentsData);

      // Pre-fill selectedDept for complaints that already have a Department name
      const preSelected = {};
      complaintsData.forEach((c) => {
        if (c.Department) {
          const match = departmentsData.find((d) => String(d.DepartmentName) === String(c.Department));
          if (match) preSelected[c.ComplaintId] = match.DepartmentId;
        }
      });
      setSelectedDept(preSelected);
    } catch (err) {
      console.error("fetchData error:", err);
      alert("Failed to load complaints: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Assign handler: sends PascalCase keys because your view expects ComplaintId & DepartmentId
  const handleAssign = async (complaintId) => {
    const deptId = selectedDept[complaintId];
    if (!deptId) {
      return alert("Select a department first");
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/members/allComplaints/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ComplaintId: complaintId,
          DepartmentId: Number(deptId),
        }),
      });

      const data = await res.json();

      // your Django view returns {"success": true, ...} on success
      if (res.ok && data.success) {
        // update UI locally
        const deptName = (departments.find((d) => String(d.DepartmentId) === String(deptId)) || {}).DepartmentName || null;
        setComplaints((prev) =>
          prev.map((c) =>
            c.ComplaintId === complaintId ? { ...c, Status: "In Review", Department: deptName } : c
          )
        );
        alert(data.message || "Assigned successfully");
      } else {
        // backend may return {"error": "..."} or {"success": False, "message": "..."}
        throw new Error(data.error || data.message || "Assign failed");
      }
    } catch (err) {
      console.error("assign error:", err);
      alert("Assign failed: " + err.message);
    }
  };

  if (loading) return <div className="p-6">Loading complaints...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Complaints</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Assign To</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.ComplaintId} className="border-t">
              <td className="p-2 border">{c.Title}</td>
              <td className="p-2 border">{c.Status}</td>

              <td className="p-2 border">
                <select
                  value={selectedDept[c.ComplaintId] || ""}
                  onChange={(e) =>
                    setSelectedDept({ ...selectedDept, [c.ComplaintId]: e.target.value })
                  }
                  className="border p-1 rounded"
                >
                  <option value="">-- Select Department --</option>
                  {departments.map((d) => (
                    <option key={d.DepartmentId} value={d.DepartmentId}>
                      {d.DepartmentName}
                    </option>
                  ))}
                </select>
              </td>

              <td className="p-2 border">
                <button
                  onClick={() => handleAssign(c.ComplaintId)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
