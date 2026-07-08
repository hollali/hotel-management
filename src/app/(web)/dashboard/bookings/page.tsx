export const dynamic = "force-dynamic";

import { getUserBookings } from "@/actions/bookings";
import Link from "next/link";
import CancelBookingButton from "./CancelBookingButton";

const MyBookingsPage = async () => {
  let bookings;
  try {
    bookings = await getUserBookings();
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return (
      <div>
        <h2 className="font-heading text-xl font-medium mb-6 text-stellar-blue">My Bookings</h2>
        <div className="text-center py-16 border border-stellar-light-grey">
          <p className="text-stellar-grey mb-2">Unable to load bookings right now.</p>
          <p className="text-xs text-stellar-grey mb-6">The database service might be temporarily unavailable. Please try again.</p>
          <Link href="/dashboard/bookings" className="btn-primary px-8 py-3 text-sm">
            Retry
          </Link>
        </div>
      </div>
    );
  }

  const statusStyles: Record<string, string> = {
    pending: "bg-beige text-stellar-grey",
    pending_payment: "bg-beige text-brand",
    confirmed: "bg-stellar-blue/10 text-stellar-blue",
    checked_in: "bg-stellar-blue/10 text-stellar-blue",
    checked_out: "bg-beige text-stellar-grey",
    cancelled: "bg-red-50 text-red-600",
    no_show: "bg-red-50 text-red-600",
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-medium mb-6 text-stellar-blue">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-16 border border-stellar-light-grey">
          <p className="text-stellar-grey mb-6">You have no bookings yet.</p>
          <Link
            href="/rooms"
            className="btn-primary px-8 py-3 text-sm"
          >
            Browse Rooms
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-stellar-light-grey p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading text-lg font-medium text-stellar-blue">{booking.roomName}</h3>
                  <p className="text-xs text-stellar-grey mt-1">
                    Booking ID: {booking.id.slice(0, 8)}...
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] ${
                    statusStyles[booking.status] || "bg-beige text-stellar-grey"
                  }`}
                >
                  {booking.status.replace("_", " ")}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-[0.08em] text-stellar-grey block mb-1">Check In</span>
                  <p className="font-medium text-stellar-blue">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.08em] text-stellar-grey block mb-1">Check Out</span>
                  <p className="font-medium text-stellar-blue">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.08em] text-stellar-grey block mb-1">Guests</span>
                  <p className="font-medium text-stellar-blue">
                    {booking.adults} Adults{booking.children > 0 ? `, ${booking.children} Children` : ""}
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.08em] text-stellar-grey block mb-1">Total</span>
                  <p className="font-heading font-medium text-brand">
                    GHS {Number(booking.totalPrice).toLocaleString()}
                  </p>
                </div>
              </div>

              {(booking.status === "confirmed" || booking.status === "pending_payment") && (
                <div className="mt-4 pt-4 border-t border-stellar-light-grey">
                  {booking.status === "pending_payment" && (
                    <p className="text-xs text-brand mb-2">
                      Awaiting payment — you can cancel if you changed your mind.
                    </p>
                  )}
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
