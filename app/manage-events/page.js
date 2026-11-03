"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import { GridSkeleton } from "@/components/Skeletons";
import { api, formatDate } from "@/lib/api";

function Manage() {
  const [events, setEvents] = useState(null);

  const load = () => api("/events/mine", { auth: true }).then(setEvents).catch((e) => { toast.error(e.message); setEvents([]); });
  useEffect(() => { load(); }, []);

  const remove = async (event) => {
    const res = await Swal.fire({
      title: "Delete this event?",
      text: `"${event.title}" and everyone's sign-ups will be removed.`,
      icon: "warning", showCancelButton: true,
      confirmButtonColor: "#d64545", confirmButtonText: "Delete event", cancelButtonText: "Keep it",
    });
    if (!res.isConfirmed) return;
    try {
      await api(`/events/${event._id}`, { method: "DELETE", auth: true });
      setEvents((list) => list.filter((e) => e._id !== event._id));
      toast.success("Event deleted.");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-title">Manage your events</h1>
          <p className="section-sub">Update details or remove events you created.</p>
        </div>
        <Link href="/create-event" className="btn btn-primary">Host a new event</Link>
      </div>
      <div className="mt-8">
        {!events ? <GridSkeleton count={3} /> : events.length === 0 ? (
          <p className="rounded-box border border-dashed border-base-300 p-10 text-center">You haven't created any events yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead><tr><th>Event</th><th>Type</th><th>Date</th><th>Location</th><th className="text-right">Actions</th></tr></thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={e.thumbnail} alt="" className="h-12 w-16 rounded object-cover" />
                        <Link href={`/events/${e._id}`} className="font-semibold hover:underline">{e.title}</Link>
                      </div>
                    </td>
                    <td>{e.eventType}</td>
                    <td className="whitespace-nowrap">{formatDate(e.eventDate)}</td>
                    <td>{e.location}</td>
                    <td className="whitespace-nowrap text-right">
                      <Link href={`/manage-events/${e._id}/edit`} className="btn btn-sm btn-outline btn-primary mr-2">Update</Link>
                      <button onClick={() => remove(e)} className="btn btn-sm btn-error btn-outline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ManageEventsPage() {
  return <PrivateRoute><Manage /></PrivateRoute>;
}
