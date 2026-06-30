export const dynamic = "force-dynamic";

import { getUserBookings } from "@/actions/bookings";
import Link from "next/link";
import CancelBookingButton from "./CancelBookingButton";

const MyBookingsPage = async () => {
  const bookings = await getUserBookings();

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    checked_in: "bg-blue-100 text-blue-800",
    checked_out: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
    no_show: "bg-orange-100 text-orange-800",
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">You have no bookings yet.</p>
          <Link
            href="/rooms"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Rooms
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{booking.roomName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Booking ID: {booking.id.slice(0, 8)}...
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    statusColors[booking.status] || "bg-gray-100"
                  }`}
                >
                  {booking.status.replace("_", " ")}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Check In</span>
                  <p className="font-medium">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Check Out</span>
                  <p className="font-medium">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Guests</span>
                  <p className="font-medium">
                    {booking.adults} Adults{booking.children > 0 ? `, ${booking.children} Children` : ""}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Total</span>
                  <p className="font-medium text-primary">
                    GHS {Number(booking.totalPrice).toLocaleString()}
                  </p>
                </div>
              </div>

              {booking.status === "confirmed" && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <CancelBookingButton bookingId={booking.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
