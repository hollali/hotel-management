"use client";

import { cancelBooking } from "@/actions/bookings";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CancelBookingButton = ({ bookingId }: { bookingId: string }) => {
  const router = useRouter();

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await cancelBooking(bookingId);
      toast.success("Booking cancelled");
      router.refresh();
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <button
      onClick={handleCancel}
      className="text-sm text-red-600 hover:underline"
    >
      Cancel Booking
    </button>
  );
};

export default CancelBookingButton;
