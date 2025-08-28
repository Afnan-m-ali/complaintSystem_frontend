"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, FileText, ShieldCheck,LogOut } from "lucide-react"; // أيقونات

export default function DepartmentManagerLayout({ children }) {
  const pathname = usePathname();

  const links = [
    {
      href: "/department_manager/profile",
      label: "Profile",
      icon: <User className="w-5 h-5 text-blue-600" />, // نفس أيقونة Profile بتاع GM
    },
    {
      href: "/department_manager/complaints",
      label: "Complaints / Suggestions",
      icon: <FileText className="w-5 h-5 text-gray-700" />, // أيقونة مختلفة للشكوى
    },
    { href: "/logout", label: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-start items-center">
        {/* Logo زي General Manager */}
        <div className="flex items-center mr-12">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
        </div>

        {/* Links */}
        <div className="flex space-x-8 ml-auto mr-16">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 font-medium relative transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 rounded"></span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
