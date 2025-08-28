"use client";
import { useRouter } from "next/navigation";

export default function GeneralManagerProfile() {
  const router = useRouter();

  const handleViewUsers = () => {
    router.push("/general_manager/users");
  };

  const handleAddUser = () => {
    router.push("/general_manager/user/addUser"); // الرابط الجديد
  };

  const handleViewDepartments = () => {
    router.push("/general_manager/departments");
  };

  const handleAddDepartment = () => {
    router.push("/general_manager/department/adddepartment");
  };

  return (
    <div className="p-8">
      {/* كارد إدارة المستخدمين */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="flex gap-4">
          <button
            onClick={handleViewUsers}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            View Users
          </button>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Add User
          </button>
        </div>
      </div>

      {/* كارد إدارة الأقسام */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Departments</h2>
        <div className="flex gap-4">
          <button
            onClick={handleViewDepartments}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            View Departments
          </button>
          <button
            onClick={handleAddDepartment}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Add Department
          </button>
        </div>
      </div>
    </div>
  );
}
