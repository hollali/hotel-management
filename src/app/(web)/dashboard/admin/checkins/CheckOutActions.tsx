"use client";

import { useState } from "react";
import { checkOutBooking } from "@/actions/checkin";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/nextjs";

type Props = { bookingId: string };

const CheckOutActions = ({ bookingId }: Props) => {
  const [open, setOpen] = useState(false);
  const [damageCharges, setDamageCharges] = useState("");
  const [additionalCharges, setAdditionalCharges] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckOut = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await checkOutBooking(bookingId, {
        damageCharges: damageCharges ? Number(damageCharges) : undefined,
        additionalCharges: additionalCharges ? Number(additionalCharges) : undefined,
        notes,
      });
      toast.success("Guest checked out");
      setOpen(false);
    } catch (error) {
      Sentry.captureException(error);
      toast.error(error instanceof Error ? error.message : "Check-out failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 text-xs font-medium uppercase tracking-[0.07em] bg-stellar-blue text-white hover:bg-brand transition-colors"
      >
        Check Out
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form
            onSubmit={handleCheckOut}
            className="bg-white p-6 w-full max-w-md mx-4 space-y-4 border"
          >
            <h4 className="font-heading text-lg font-medium text-stellar-blue">Check-Out</h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.08em] text-stellar-grey mb-1">Damage Charges (GHS)</label>
                <input
                  type="number"
                  value={damageCharges}
                  onChange={(e) => setDamageCharges(e.target.value)}
                  className="w-full border border-stellar-light-grey px-3 py-2 text-sm text-stellar-blue focus:outline-none focus:border-brand"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.08em] text-stellar-grey mb-1">Extra Charges (GHS)</label>
                <input
                  type="number"
                  value={additionalCharges}
                  onChange={(e) => setAdditionalCharges(e.target.value)}
                  className="w-full border border-stellar-light-grey px-3 py-2 text-sm text-stellar-blue focus:outline-none focus:border-brand"
                />
              </div>
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
                className="flex-1 bg-stellar-blue text-white py-2 text-sm font-medium uppercase tracking-[0.07em] hover:bg-brand transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm Check-Out"}
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

export default CheckOutActions;
