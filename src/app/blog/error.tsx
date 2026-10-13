"use client";

import Link from "next/link";

export default function BlogError({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen px-6 py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Articles are temporarily unavailable</h1>
      <p className="text-text-secondary mb-8">Please try again in a moment.</p>
      <div className="flex justify-center gap-6">
        <button onClick={reset} className="text-accent hover:underline">Try again</button>
        <Link href="/" className="text-accent hover:underline">Back to home</Link>
      </div>
    </main>
  );
}
