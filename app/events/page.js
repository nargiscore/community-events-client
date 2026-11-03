"use client";
import { useEffect, useState } from "react";
import { api, EVENT_TYPES } from "@/lib/api";
import EventCard from "@/components/EventCard";
import { GridSkeleton } from "@/components/Skeletons";

export default function EventsPage() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState("");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setQuery(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setEvents(null);
    const params = new URLSearchParams();
    if (type !== "All") params.set("type", type);
    if (query) params.set("search", query);
    api(`/events?${params}`).then(setEvents).catch((e) => setError(e.message));
  }, [type, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="section-title">Upcoming events</h1>
      <p className="section-sub">Every event listed here is still ahead of us. Pick one and join.</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title" aria-label="Search events" className="input input-bordered w-full sm:max-w-sm" />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type" className="select select-bordered w-full sm:w-56">
          <option>All</option>
          {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="mt-8">
        {error ? (
          <p className="rounded-box bg-error/10 p-4 text-error">{error}</p>
        ) : !events ? (
          <GridSkeleton />
        ) : events.length === 0 ? (
          <p className="rounded-box border border-dashed border-base-300 p-10 text-center">No upcoming events match your search. Try another type or host one yourself.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => <EventCard key={e._id} event={e} />)}
          </div>
        )}
      </div>
    </div>
  );
}
