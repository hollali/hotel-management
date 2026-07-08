export const dynamic = "force-dynamic";

import { getDashboardStats } from "@/actions/admin";
import { FaCalendarCheck, FaUsers, FaDollarSign } from "react-icons/fa";

const AdminDashboardPage = async () => {
  const stats = await getDashboardStats();

  return (
    <div>
      <h2 className="font-heading text-xl font-medium mb-6 text-stellar-blue">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border border-stellar-light-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stellar-grey text-xs uppercase tracking-[0.08em]">Total Bookings</p>
              <p className="font-heading text-3xl font-medium mt-2 text-stellar-blue">{stats.totalBookings}</p>
            </div>
            <FaCalendarCheck className="text-3xl text-brand/30" />
          </div>
        </div>

        <div className="border border-stellar-light-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stellar-grey text-xs uppercase tracking-[0.08em]">Total Users</p>
              <p className="font-heading text-3xl font-medium mt-2 text-stellar-blue">{stats.totalUsers}</p>
            </div>
            <FaUsers className="text-3xl text-brand/30" />
          </div>
        </div>

        <div className="border border-stellar-light-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stellar-grey text-xs uppercase tracking-[0.08em]">Revenue</p>
              <p className="font-heading text-3xl font-medium mt-2 text-stellar-blue">GHS {stats.revenue.toLocaleString()}</p>
            </div>
            <FaDollarSign className="text-3xl text-brand/30" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-stellar-light-grey p-6">
          <h3 className="font-heading text-lg font-medium mb-4 text-stellar-blue">Recent Bookings</h3>
          {stats.recentBookings.length === 0 ? (
            <p className="text-stellar-grey text-sm">No recent bookings</p>
          ) : (
            <div className="space-y-3">
              {stats.recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium text-stellar-blue">{booking.roomName}</p>
                    <p className="text-stellar-grey text-xs">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="capitalize px-2 py-1 text-xs font-medium bg-beige text-stellar-grey uppercase tracking-[0.08em]">
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border border-stellar-light-grey p-6">
          <h3 className="font-heading text-lg font-medium mb-4 text-stellar-blue">Recent Activity</h3>
          {stats.recentActivity.length === 0 ? (
            <p className="text-stellar-grey text-sm">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {stats.recentActivity.map((log) => (
                <div key={log.id} className="text-sm">
                  <p className="font-medium text-stellar-blue">{log.action}</p>
                  <p className="text-stellar-grey text-xs">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
