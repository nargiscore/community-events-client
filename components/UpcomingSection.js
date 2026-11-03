"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import EventCard from "./EventCard";
import { GridSkeleton } from "./Skeletons";

export default function UpcomingSection() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/events?limit=6").then(setEvents).catch((e) => setError(e.message));
  }, []);

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Happening soon</h2>
            <p className="section-sub">The next six events on the calendar, soonest first.</p>
          </div>
          <Link href="/events" className="btn btn-outline btn-primary">See all events</Link>
        </div>
        <div className="mt-10">
          {error ? (
            <p className="rounded-box bg-error/10 p-4 text-error">{error}</p>
          ) : !events ? (
            <GridSkeleton />
          ) : events.length === 0 ? (
            <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
              <p className="font-semibold">No upcoming events yet.</p>
              <Link href="/create-event" className="btn btn-primary mt-4">Be the first to host one</Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => <EventCard key={e._id} event={e} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
