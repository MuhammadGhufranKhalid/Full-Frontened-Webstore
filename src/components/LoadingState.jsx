// src/components/LoadingState.jsx
// Skeleton-card loader so the page doesn't jump when real cards arrive.

export default function LoadingState({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl">
          <div className="skeleton aspect-[4/3] w-full rounded-2xl" />
          <div className="skeleton mt-3 h-4 w-3/4 rounded-full" />
          <div className="skeleton mt-2 h-3 w-1/2 rounded-full" />
        </div>
      ))}
    </div>
  );
}
