"use client";

import { FaCalendarCheck, FaUsers, FaDollarSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { motion, type Easing } from "framer-motion";

interface Booking {
  id: string;
  roomName: string;
  createdAt: Date;
  status: string;
}

interface ActivityLog {
  id: string;
  action: string;
  createdAt: Date;
}

interface DashboardStats {
  totalBookings: number;
  totalUsers: number;
  revenue: number;
  recentBookings: Booking[];
  recentActivity: ActivityLog[];
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  checked_in: "bg-blue-50 text-blue-700 border-blue-200",
  checked_out: "bg-stellar-grey/10 text-stellar-grey border-stellar-light-grey",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

const easeOut: Easing = [0.16, 1, 0.3, 1];
const easeInOut: Easing = [0.76, 0, 0.24, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: easeOut },
  }),
};

const DashboardClient = ({ stats }: { stats: DashboardStats }) => {
  const cards = [
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: FaCalendarCheck,
      trend: "+12%",
      up: true,
      gradient: "from-brand to-brand/80",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: FaUsers,
      trend: "+5%",
      up: true,
      gradient: "from-stellar-blue to-blue-800",
    },
    {
      label: "Revenue",
      value: `GHS ${stats.revenue.toLocaleString()}`,
      icon: FaDollarSign,
      trend: "+23%",
      up: true,
      gradient: "from-emerald-600 to-emerald-500",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <p className="text-stellar-grey text-sm">Overview of your hotel performance</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {cards.map((card) => (
          <motion.div
            key={card.label}
            variants={cardVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(2,16,42,0.1)" }}
            className="relative overflow-hidden rounded-xl bg-white border border-stellar-light-grey/50 p-6 group cursor-default"
          >
            <div className="flex items-start justify-between">
              <div className="relative z-10">
                <p className="text-stellar-grey text-xs uppercase tracking-[0.1em] font-medium">
                  {card.label}
                </p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: easeOut }}
                  className="font-heading text-3xl mt-2 text-stellar-blue"
                >
                  {card.value}
                </motion.p>
                <div className="flex items-center gap-1.5 mt-3">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className={`flex items-center text-xs font-medium ${card.up ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {card.up ? <FaArrowUp className="mr-0.5" size={10} /> : <FaArrowDown className="mr-0.5" size={10} />}
                    {card.trend}
                  </motion.span>
                  <span className="text-stellar-grey text-xs">vs last month</span>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center shrink-0`}
              >
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    transition: { duration: 3, repeat: Infinity, ease: easeInOut },
                  }}
                >
                  <card.icon className="text-white text-lg" />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: easeOut }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand/30 to-transparent origin-left"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-xl border border-stellar-light-grey/50 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-stellar-light-grey/30">
            <h3 className="font-heading text-lg text-stellar-blue">Recent Bookings</h3>
          </div>
          <div className="p-6">
            {stats.recentBookings.length === 0 ? (
              <p className="text-stellar-grey text-sm text-center py-8">No recent bookings</p>
            ) : (
              <div className="space-y-1">
                {stats.recentBookings.map((booking, i) => (
                  <motion.div
                    key={booking.id}
                    custom={i}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ x: 4, backgroundColor: "rgba(245,245,240,0.5)" }}
                    className="flex items-center justify-between py-2.5 px-2 -mx-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.2, backgroundColor: "rgba(181,161,145,0.2)" }}
                        className="w-8 h-8 rounded-full bg-beige flex items-center justify-center shrink-0"
                      >
                        <FaCalendarCheck className="text-stellar-grey text-xs" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-medium text-stellar-blue">{booking.roomName}</p>
                        <p className="text-xs text-stellar-grey">
                          {new Date(booking.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`text-[11px] font-medium uppercase tracking-[0.08em] px-3 py-1 rounded-full border ${
                        statusStyles[booking.status] || "bg-stellar-grey/10 text-stellar-grey border-stellar-light-grey"
                      }`}
                    >
                      {booking.status.replace("_", " ")}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-xl border border-stellar-light-grey/50 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-stellar-light-grey/30">
            <h3 className="font-heading text-lg text-stellar-blue">Recent Activity</h3>
          </div>
          <div className="p-6">
            {stats.recentActivity.length === 0 ? (
              <p className="text-stellar-grey text-sm text-center py-8">No recent activity</p>
            ) : (
              <div className="space-y-0">
                {stats.recentActivity.slice(0, 10).map((log, i) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.04, duration: 0.3 }}
                    className="flex items-start gap-3 py-3 border-b border-stellar-light-grey/20 last:border-0 group"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.8, 1, 0.8],
                        transition: { duration: 2, repeat: Infinity, ease: easeInOut },
                      }}
                      className="w-2 h-2 rounded-full bg-brand mt-1.5 shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-stellar-blue font-medium">{log.action}</p>
                      <p className="text-xs text-stellar-grey">
                        {new Date(log.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardClient;
