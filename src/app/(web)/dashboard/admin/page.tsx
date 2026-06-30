export const dynamic = "force-dynamic";

import { getDashboardStats } from "@/actions/admin";
import { FaCalendarCheck, FaUsers, FaDollarSign } from "react-icons/fa";

const AdminDashboardPage = async () => {
  const stats = await getDashboardStats();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold mt-1">{stats.totalBookings}</p>
            </div>
            <FaCalendarCheck className="text-3xl text-primary opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-bold mt-1">{stats.totalUsers}</p>
            </div>
            <FaUsers className="text-3xl text-secondary opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Revenue</p>
              <p className="text-3xl font-bold mt-1">GHS 0</p>
            </div>
            <FaDollarSign className="text-3xl text-green-500 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-4">Recent Bookings</h3>
          {stats.recentBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent bookings</p>
          ) : (
            <div className="space-y-3">
              {stats.recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">{booking.roomName}</p>
                    <p className="text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="capitalize px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          {stats.recentActivity.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {stats.recentActivity.map((log) => (
                <div key={log.id} className="text-sm">
                  <p className="font-medium">{log.action}</p>
                  <p className="text-gray-500">
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
