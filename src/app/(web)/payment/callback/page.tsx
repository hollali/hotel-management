"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPayment } from "@/actions/bookings";
import Link from "next/link";

function PaymentCallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
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
      } catch {
        setStatus("failed");
        setMessage("Could not verify payment. Please contact support.");
      }
    };

    verify();
  }, [reference, router]);

  return (
    <section className="container mx-auto px-4 py-16 text-center">
      {status === "loading" && (
        <div>
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400">{message}</p>
        </div>
      )}

      {status === "success" && (
        <div>
          <div className="text-6xl mb-4">&#10003;</div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
          <Link
            href="/dashboard/bookings"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            View My Bookings
          </Link>
        </div>
      )}

      {status === "failed" && (
        <div>
          <div className="text-6xl mb-4">&#10007;</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/rooms"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/dashboard/bookings"
              className="inline-block border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
      </section>
    }>
      <PaymentCallbackInner />
    </Suspense>
  );
};

export default PaymentCallbackPage;
