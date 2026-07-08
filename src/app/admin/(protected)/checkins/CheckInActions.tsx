"use client";

import { useState } from "react";
import { checkInBooking } from "@/actions/checkin";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/nextjs";

type Props = { bookingId: string };

const CheckInActions = ({ bookingId }: Props) => {
  const [open, setOpen] = useState(false);
  const [idType, setIdType] = useState("passport");
  const [idNumber, setIdNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await checkInBooking(bookingId, { idType, idNumber, notes });
      toast.success("Guest checked in");
      setOpen(false);
    } catch (error) {
      Sentry.captureException(error);
      toast.error(error instanceof Error ? error.message : "Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 text-xs font-medium uppercase tracking-[0.07em] bg-green-600 text-white hover:bg-green-700 transition-colors"
      >
        Check In
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form
            onSubmit={handleCheckIn}
            className="bg-white p-6 w-full max-w-md mx-4 space-y-4 border"
          >
            <h4 className="font-heading text-lg font-medium text-stellar-blue">Check-In</h4>

            <div>
              <label className="block text-xs uppercase tracking-[0.08em] text-stellar-grey mb-1">ID Type</label>
              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className="w-full border border-stellar-light-grey px-3 py-2 text-sm text-stellar-blue focus:outline-none focus:border-brand"
              >
                <option value="passport">Passport</option>
                <option value="national_id">National ID</option>
                <option value="drivers_license">Driver&apos;s License</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.08em] text-stellar-grey mb-1">ID Number</label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full border border-stellar-light-grey px-3 py-2 text-sm text-stellar-blue focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.08em] text-stellar-grey mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full border border-stellar-light-grey px-3 py-2 text-sm text-stellar-blue focus:outline-none focus:border-brand resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 text-sm font-medium uppercase tracking-[0.07em] hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm Check-In"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-stellar-grey hover:text-stellar-blue transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckInActions;
