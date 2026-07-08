import Link from "next/link";
import { FaCalendarCheck, FaCog, FaShieldAlt, FaUsers, FaBed, FaClipboardList } from "react-icons/fa";
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
      ? [
          { href: "/dashboard/admin", label: "Dashboard", icon: FaShieldAlt },
          { href: "/dashboard/admin/users", label: "Users", icon: FaUsers },
          { href: "/dashboard/admin/availability", label: "Availability", icon: FaBed },
          { href: "/dashboard/admin/checkins", label: "Check-Ins", icon: FaClipboardList },
        ]
      : []),
  ];

  return (
    <div className="kempinski-container pt-28 pb-16">
      <h1 className="font-heading text-3xl font-medium mb-8 text-stellar-blue">Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="md:w-64 shrink-0">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-stellar-grey hover:bg-beige hover:text-stellar-blue transition-colors"
                >
                  <link.icon className="text-brand" />
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
