"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShieldCheck, LogOut } from "lucide-react"; // أيقونة البروفايل + اللوجو

export default function DepartmentManagerLayout({ children }) {
  const pathname = usePathname();

  const links = [
    {
      href: "/student/profile",
      label: "Profile",
      icon: <User className="w-5 h-5 text-blue-600" />, // نفس أيقونة GM profile
    },
    {
      href: "/student/complaint",
      label: "Complaints / Suggestions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    { href: "/logout", label: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        {/* Logo على الشمال */}
        <div className="flex items-center">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
        </div>

        {/* Links */}
        <div className="flex space-x-8 mr-10"> 
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 font-medium relative transition ${
                  isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
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
