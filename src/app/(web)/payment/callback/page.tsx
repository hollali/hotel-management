"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPayment } from "@/actions/bookings";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

function PaymentCallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      setMessage("No payment reference found");
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyPayment(reference);
        if (result.success) {
          setStatus("success");
          setMessage("Payment successful! Your booking is confirmed.");
        } else {
          setStatus("failed");
          setMessage("Payment was not completed. Please try again.");
        }
      } catch (error) {
        Sentry.captureException(error);
        setStatus("failed");
        setMessage("Could not verify payment. Please contact support.");
      }
    };

    verify();
  }, [reference, router]);

  return (
    <section className="kempinski-container pt-28 pb-16 text-center">
      {status === "loading" && (
        <div>
          <div className="animate-spin h-12 w-12 border-4 border-brand border-t-transparent mx-auto mb-4 rounded-full" />
          <p className="text-stellar-grey text-lg">{message}</p>
        </div>
      )}

      {status === "success" && (
        <div className="max-w-md mx-auto border border-stellar-light-grey p-10 rounded-2xl">
          <div className="w-16 h-16 bg-brand/10 flex items-center justify-center mx-auto mb-6 rounded-full">
            <span className="text-3xl text-brand font-heading icon-pulse">&#10003;</span>
          </div>
          <h1 className="font-heading text-2xl font-medium text-stellar-blue mb-2">Payment Successful!</h1>
          <p className="text-stellar-grey mb-8">{message}</p>
          <Link
            href="/dashboard/bookings"
            className="btn-primary px-8 py-3 text-sm"
          >
            View My Bookings
          </Link>
        </div>
      )}

      {status === "failed" && (
        <div className="max-w-md mx-auto border border-stellar-light-grey p-10 rounded-2xl">
          <div className="w-16 h-16 bg-red-50 flex items-center justify-center mx-auto mb-6 rounded-full">
            <span className="text-3xl text-red-500 font-heading icon-pulse">&#10007;</span>
          </div>
          <h1 className="font-heading text-2xl font-medium text-stellar-blue mb-2">Payment Failed</h1>
          <p className="text-stellar-grey mb-8">{message}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="btn-primary px-8 py-3 text-sm"
            >
              Try Again
            </Link>
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center justify-center border border-stellar-light-grey px-8 py-3 text-sm font-medium text-stellar-grey hover:text-stellar-blue transition-colors rounded-full"
            >
              My Bookings
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

const PaymentCallbackPage = () => {
  return (
    <Suspense fallback={
      <section className="kempinski-container pt-28 pb-16 text-center">
        <div className="animate-spin h-12 w-12 border-4 border-brand border-t-transparent mx-auto mb-4 rounded-full" />
        <p className="text-stellar-grey text-lg">Loading...</p>
      </section>
    }>
      <PaymentCallbackInner />
    </Suspense>
  );
};

export default PaymentCallbackPage;
