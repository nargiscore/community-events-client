"use client";
import Link from "next/link";
import { formatDate } from "@/lib/api";

const FALLBACK =
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=70";

export default function EventCard({ event }) {
  return (
    <article className="card h-full border border-base-300 bg-base-100 transition-shadow hover:shadow-lg">
      <figure className="h-48 w-full overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK;
          }}
        />
      </figure>
      <div className="card-body gap-2">
        <span className="badge badge-secondary badge-soft w-fit">{event.eventType}</span>
        <h3 className="card-title line-clamp-2 min-h-[3.2rem] text-lg leading-snug">{event.title}</h3>
        <p className="flex items-center gap-2 text-sm opacity-80">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-5.500 7-11a7 7 0 1 0-14 0c0 5.500 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/></svg>
          <span className="line-clamp-1">{event.location}</span>
        </p>
        <p className="flex items-center gap-2 text-sm opacity-80">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
          {formatDate(event.eventDate)}
        </p>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/events/${event._id}`} className="btn btn-primary w-full">View Event</Link>
        </div>
      </div>
    </article>
  );
}