"use client";
import { useState } from "react";

export default function TrackComplaintPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/members/track/?tracking_code=${trackingCode}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setComplaint(null);
      } else {
        setComplaint(data);
        setError("");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setComplaint(null);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          Track Your Complaint
        </h2>

        <form onSubmit={handleTrack} className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter your Tracking Code"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            className="flex-1 border-2 border-indigo-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Track
          </button>
        </form>

        {error && (
          <div className="text-red-600 font-semibold text-center">{error}</div>
        )}

        {complaint && (
          <div className="mt-6 bg-indigo-50 p-6 rounded-2xl shadow-inner space-y-2">
            <p>
              <strong>Status:</strong> {complaint.status}
            </p>
            <p>
              <strong>Type:</strong> {complaint.type}
            </p>
            <p>
              <strong>Title:</strong> {complaint.title}
            </p>
            <p>
              <strong>Description:</strong> {complaint.description}
            </p>
            <p>
              <strong>Created:</strong> {complaint.created}
            </p>
            <p>
              <strong>Tracking Code:</strong> {complaint.trackingCode}
            </p>
            <div>
              <strong>Response:</strong>
              {complaint.responses.length === 0 ? (
                <p>No responses yet.</p>
              ) : (
                complaint.responses.map((res, idx) => (
                  <div key={idx} className="border-b py-2">
                    <p>{res.message}</p>
                    <p className="text-sm text-gray-500"><strong>Date:</strong> {res.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
