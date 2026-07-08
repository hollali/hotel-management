"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { initializePayment } from "@/actions/bookings";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/nextjs";
import type { SanityRoom } from "@/app/libs/sanityFetch";

type Props = {
  room: SanityRoom;
};

const BookingForm = ({ room }: Props) => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateDays = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000));
  };

  const days = calculateDays();
  const roomDiscountAmount = room.discount > 0 ? (room.price * room.discount) / 100 : 0;
  const priceAfterRoomDiscount = room.price - roomDiscountAmount;
  const promoDiscountAmount = (priceAfterRoomDiscount * promoDiscount) / 100;
  const pricePerNightAfterPromo = priceAfterRoomDiscount - promoDiscountAmount;
  const totalPrice = pricePerNightAfterPromo * days;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setValidatingPromo(true);
    setPromoError("");
    setPromoDiscount(0);
    try {
      const res = await fetch("/api/promotions/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        setPromoError(data.error || "Invalid promo code");
        return;
      }
      setPromoDiscount(data.discountPercentage);
      toast.success(`Promo applied! ${data.discountPercentage}% off`);
    } catch {
      setPromoError("Failed to validate promo code");
    } finally {
      setValidatingPromo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      router.push("/auth");
      return;
    }

    setLoading(true);
    try {
      const result = await initializePayment({
        roomId: room._id,
        roomName: room.name,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        adults,
        children,
        totalPrice,
        discount: room.discount,
        promoCode: promoDiscount > 0 ? promoCode.trim() : undefined,
      });

      window.location.href = result.authorizationUrl;
    } catch (error) {
      Sentry.captureException(error);
      toast.error(error instanceof Error ? error.message : "Failed to initialize payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium mb-1.5 text-stellar-grey uppercase tracking-[0.08em]">Check-In</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          min={today}
          required
          className="w-full border border-stellar-light-grey px-4 py-3 bg-transparent text-stellar-blue focus:outline-none focus:border-brand transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1.5 text-stellar-grey uppercase tracking-[0.08em]">Check-Out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          min={checkIn || today}
          required
          className="w-full border border-stellar-light-grey px-4 py-3 bg-transparent text-stellar-blue focus:outline-none focus:border-brand transition-colors text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5 text-stellar-grey uppercase tracking-[0.08em]">Adults</label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="w-full border border-stellar-light-grey px-4 py-3 bg-transparent text-stellar-blue focus:outline-none focus:border-brand transition-colors text-sm"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5 text-stellar-grey uppercase tracking-[0.08em]">Children</label>
          <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="w-full border border-stellar-light-grey px-4 py-3 bg-transparent text-stellar-blue focus:outline-none focus:border-brand transition-colors text-sm"
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-stellar-light-grey pt-4">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => { setPromoCode(e.target.value); setPromoDiscount(0); setPromoError(""); }}
            placeholder="Promo code"
            className="flex-1 border border-stellar-light-grey px-3 py-2 bg-transparent text-stellar-blue focus:outline-none focus:border-brand transition-colors text-sm"
          />
          <button
            type="button"
            onClick={handleApplyPromo}
            disabled={validatingPromo || !promoCode.trim()}
            className="px-4 py-2 text-xs font-medium uppercase tracking-[0.07em] bg-stellar-blue text-white hover:bg-brand transition-colors disabled:opacity-50"
          >
            {validatingPromo ? "..." : "Apply"}
          </button>
        </div>
        {promoError && (
          <p className="text-red-500 text-xs mb-4">{promoError}</p>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-stellar-grey">
            <span>GHS {priceAfterRoomDiscount} x {days} {days > 1 ? "nights" : "night"}</span>
            <span>GHS {priceAfterRoomDiscount * days}</span>
          </div>
          {room.discount > 0 && (
            <div className="flex justify-between text-sm text-brand">
              <span>Room Discount ({room.discount}%)</span>
              <span>-GHS {roomDiscountAmount * days}</span>
            </div>
          )}
          {promoDiscount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Promo Discount ({promoDiscount}%)</span>
              <span>-GHS {promoDiscountAmount * days}</span>
            </div>
          )}
          <div className="flex justify-between font-heading font-medium text-lg border-t border-stellar-light-grey pt-2">
            <span className="text-stellar-blue">Total</span>
            <span className="text-brand">GHS {totalPrice}</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-stellar-blue text-white py-3 font-medium text-sm uppercase tracking-[0.07em] hover:bg-brand transition-colors disabled:opacity-50"
      >
        {loading ? "Redirecting to Paystack..." : isSignedIn ? "Book Now & Pay" : "Sign In to Book"}
      </button>
    </form>
  );
};

export default BookingForm;
