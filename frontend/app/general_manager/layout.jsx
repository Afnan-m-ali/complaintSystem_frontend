"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  User,
  FileText,
  MessageCircle,
  UserPlus,
  LogOut,
} from "lucide-react"; // أيقونات

export default function GeneralManagerLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { href: "/general_manager/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { href: "/general_manager/complaints", label: "Complaints", icon: <FileText className="w-5 h-5" /> },
    { href: "/general_manager/responses", label: "Responses", icon: <MessageCircle className="w-5 h-5" /> },
    { href: "/general_manager/admin", label: "Add Managers / Departments", icon: <UserPlus className="w-5 h-5" /> },
    { href: "/logout", label: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
          {/* <span className="font-bold text-xl text-blue-600">General Manager</span> */}
        </div>

        {/* Links */}
        <div className="flex space-x-6">
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
