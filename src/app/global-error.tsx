"use client";

import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  Sentry.captureException(error);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="mb-4 text-4xl font-bold">Something went wrong!</h2>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
