// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";
import { CookingPot } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 py-28 text-center">
      <CookingPot
        className="h-9 w-9 text-charcoal-soft/40"
        strokeWidth={1.5}
      />
      <p className="font-mono text-xs uppercase tracking-widest text-charcoal-soft">
        404
      </p>
      <h1 className="font-display text-2xl font-semibold text-charcoal">
        This page burned in the oven
      </h1>
      <Link
        to="/"
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-cream transition-opacity hover:opacity-90"
      >
        Back to the kitchen
      </Link>
    </div>
  );
}
