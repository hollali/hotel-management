"use client";

import { cancelBooking } from "@/actions/bookings";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

const CancelBookingButton = ({ bookingId }: { bookingId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setLoading(true);
    try {
      await cancelBooking(bookingId);
      toast.success("Booking cancelled");
    } catch (error) {
      Sentry.captureException(error);
      toast.error(error instanceof Error ? error.message : "Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="text-xs uppercase tracking-[0.08em] text-red-500 hover:text-red-600 transition-colors disabled:opacity-50 font-medium"
    >
      {loading ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
};

export default CancelBookingButton;
