"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-card rounded-3xl p-6 premium-shadow border border-black/5 flex flex-col gap-4 text-center">
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-sm text-subtitle">
            {error?.message || "An unexpected error occurred while loading the app."}
          </p>
          <button
            onClick={reset}
            className="h-12 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
