"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import { GridSkeleton } from "@/components/Skeletons";
import { api, formatDate } from "@/lib/api";

function Joined() {
  const [joins, setJoins] = useState(null);
  useEffect(() => {
    api("/joins", { auth: true }).then(setJoins).catch((e) => { toast.error(e.message); setJoins([]); });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="section-title">Events you've joined</h1>
      <p className="section-sub">Sorted by date, so the next one is always first.</p>
      <div className="mt-8">
        {!joins ? <GridSkeleton count={3} /> : joins.length === 0 ? (
          <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
            <p>You haven't joined any events yet.</p>
            <Link href="/events" className="btn btn-primary mt-4">Browse upcoming events</Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {joins.map((j) => (
              <article key={j._id} className="card h-full border border-base-300 bg-base-100">
                <figure className="h-48 w-full overflow-hidden"><img src={j.thumbnail} alt={j.eventTitle} className="h-full w-full object-cover" /></figure>
                <div className="card-body gap-2">
                  <span className="badge badge-secondary badge-soft w-fit">{j.eventType}</span>
                  <h3 className="card-title line-clamp-2 min-h-[3.2rem] text-lg">{j.eventTitle}</h3>
                  <p className="text-sm opacity-80">{j.eventLocation}</p>
                  <p className="text-sm opacity-80">{formatDate(j.eventDate)}</p>
                  <Link href={`/events/${j.eventId}`} className="btn btn-primary mt-auto">View Event</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function JoinedEventsPage() {
  return <PrivateRoute><Joined /></PrivateRoute>;
}
