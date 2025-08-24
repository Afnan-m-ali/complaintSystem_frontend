"use client";

export default function DepartmentsTable() {
  const departments = [
    { id: 1, name: "Human Resources" },
    { id: 2, name: "Finance" },
    { id: 3, name: "IT Support" },
    { id: 4, name: "Marketing" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl bg-blue shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-white-800 mb-6 border-b pb-3">
          Departments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-700 text-left text-white">
                <th className="py-3 px-4 font-medium">Department ID</th>
                <th className="py-3 px-4 font-medium">Name</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, idx) => (
                <tr
                  key={dept.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-3 px-4 text-blue-800">{dept.id}</td>
                  <td className="py-3 px-4 text-blue-800">{dept.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
