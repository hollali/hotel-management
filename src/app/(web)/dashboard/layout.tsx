import Link from "next/link";
import { FaCalendarCheck, FaCog, FaShieldAlt } from "react-icons/fa";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const metadata = (session.sessionClaims as Record<string, unknown>)?.metadata as
    | Record<string, unknown>
    | undefined;
  const isAdmin = metadata?.role === "admin";

  const links = [
    { href: "/dashboard/bookings", label: "My Bookings", icon: FaCalendarCheck },
    { href: "/dashboard/settings", label: "Settings", icon: FaCog },
    ...(isAdmin
      ? [{ href: "/dashboard/admin", label: "Admin Panel", icon: FaShieldAlt }]
      : []),
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="md:w-64 shrink-0">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <link.icon className="text-primary" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 min-h-[60vh]">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
