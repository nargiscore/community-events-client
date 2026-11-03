import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="section-title">We couldn't find that page</h1>
      <p className="section-sub mx-auto">The link may be old or mistyped. Head back and find an event to join.</p>
      <Link href="/events" className="btn btn-primary mt-6">Browse events</Link>
    </div>
  );
}
