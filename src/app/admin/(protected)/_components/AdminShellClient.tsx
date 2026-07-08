"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShieldAlt, FaUsers, FaBed, FaClipboardList, FaSignOutAlt, FaHome, FaHotel } from "react-icons/fa";
import { motion, type Easing } from "framer-motion";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: FaShieldAlt },
  { href: "/admin/users", label: "Users", icon: FaUsers },
  { href: "/admin/availability", label: "Availability", icon: FaBed },
  { href: "/admin/checkins", label: "Check-Ins", icon: FaClipboardList },
];

const easeOut: Easing = [0.16, 1, 0.3, 1];
const easeInOut: Easing = [0.76, 0, 0.24, 1];

const sidebarVariants = {
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.2 + i * 0.06, duration: 0.4, ease: easeOut },
  }),
};

const AdminShellClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="w-64 min-h-screen bg-stellar-blue text-white shrink-0 hidden md:flex md:flex-col"
      >
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
              className="w-9 h-9 rounded-lg bg-brand/20 flex items-center justify-center"
            >
              <FaHotel className="text-brand text-base" />
            </motion.div>
            <div>
              <h2 className="font-heading text-lg text-white leading-tight">Sky Inn</h2>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">Management</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <motion.div
                key={link.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-3.5 px-4 py-2.5 text-sm rounded-lg group relative ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  } transition-all`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 rounded-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="relative z-10"
                  >
                    <link.icon className="shrink-0 text-base group-hover:text-brand transition-colors" />
                  </motion.div>
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="px-3 py-4 border-t border-white/10 space-y-1"
        >
          <Link
            href="/"
            className="flex items-center gap-3.5 px-4 py-2.5 text-sm text-white/40 hover:text-white hover:bg-white/10 transition-all rounded-lg group"
          >
            <FaHome className="shrink-0 text-base group-hover:text-brand transition-colors" />
            <span>Back to Site</span>
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3.5 px-4 py-2.5 text-sm text-white/40 hover:text-white hover:bg-white/10 transition-all rounded-lg group"
            >
              <FaSignOutAlt className="shrink-0 text-base group-hover:text-brand transition-colors" />
              <span>Sign Out</span>
            </button>
          </form>
        </motion.div>
      </motion.aside>

      <main className="flex-1 min-h-screen">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="h-16 bg-white border-b border-stellar-light-grey/50 flex items-center justify-between px-6 md:px-8 sticky top-0 z-30"
        >
          <div>
            <h1 className="font-heading text-xl text-stellar-blue">Dashboard</h1>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{
                y: [0, -2, 0],
                transition: { duration: 3, repeat: Infinity, ease: easeInOut },
              }}
              className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center"
            >
              <FaShieldAlt className="text-brand text-xs" />
            </motion.div>
            <span className="text-sm text-stellar-grey hidden sm:block">Admin</span>
          </motion.div>
        </motion.header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 md:p-8"
        >
          {children}
        </motion.div>
      </main>
    </>
  );
};

export default AdminShellClient;
