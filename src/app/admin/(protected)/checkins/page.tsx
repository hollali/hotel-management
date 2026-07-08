import { getConfirmedBookings, getCheckedInBookings } from "@/actions/checkin";
import CheckInActions from "./CheckInActions";
import CheckOutActions from "./CheckOutActions";

export const dynamic = "force-dynamic";

const CheckInsPage = async () => {
  const [confirmed, checkedIn] = await Promise.all([
    getConfirmedBookings(),
    getCheckedInBookings(),
  ]);

  return (
    <div>
      <h2 className="font-heading text-xl font-medium mb-6 text-stellar-blue">
        Check-In / Check-Out
      </h2>

      <div className="mb-10">
        <h3 className="font-heading text-lg font-medium mb-4 text-stellar-blue flex items-center gap-2">
          Awaiting Check-In
          {confirmed.length > 0 && (
            <span className="text-xs px-2 py-0.5 bg-brand text-white rounded-full">
              {confirmed.length}
            </span>
          )}
        </h3>

        {confirmed.length === 0 ? (
          <p className="text-stellar-grey text-sm">No bookings awaiting check-in.</p>
        ) : (
          <div className="space-y-3">
            {confirmed.map((booking) => (
              <div
                key={booking.id}
                className="border border-stellar-light-grey p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium text-stellar-blue text-sm">{booking.roomName}</p>
                  <p className="text-stellar-grey text-xs">
                    {new Date(booking.checkIn).toLocaleDateString()} —{" "}
                    {new Date(booking.checkOut).toLocaleDateString()} |{" "}
                    {booking.adults} adults, {booking.children} children
                  </p>
                </div>
                <CheckInActions bookingId={booking.id} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-heading text-lg font-medium mb-4 text-stellar-blue flex items-center gap-2">
          Currently Checked In
          {checkedIn.length > 0 && (
            <span className="text-xs px-2 py-0.5 bg-green-600 text-white rounded-full">
              {checkedIn.length}
            </span>
          )}
        </h3>

        {checkedIn.length === 0 ? (
          <p className="text-stellar-grey text-sm">No guests currently checked in.</p>
        ) : (
          <div className="space-y-3">
            {checkedIn.map((booking) => (
              <div
                key={booking.id}
                className="border border-stellar-light-grey p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium text-stellar-blue text-sm">{booking.roomName}</p>
                  <p className="text-stellar-grey text-xs">
                    Checked in since {new Date(booking.checkIn).toLocaleDateString()} |
                    Expected check-out: {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                </div>
                <CheckOutActions bookingId={booking.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInsPage;
