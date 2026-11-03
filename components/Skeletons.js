export function EventCardSkeleton() {
  return (
    <div className="card border border-base-300 bg-base-100">
      <div className="skeleton h-48 w-full rounded-b-none" />
      <div className="card-body gap-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton mt-2 h-10 w-full" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => <EventCardSkeleton key={i} />)}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="skeleton mb-8 h-10 w-64" />
      <GridSkeleton count={3} />
    </div>
  );
}
