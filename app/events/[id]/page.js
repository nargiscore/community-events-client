"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { api, formatDate, todayLocal } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api(`/events/${id}`).then(setEvent).catch((e) => setError(e.message));
  }, [id]);

  useEffect(() => {
    if (!session) return setJoined(false);
    api("/joins", { auth: true })
      .then((list) => setJoined(list.some((j) => j.eventId === id)))
      .catch(() => {});
  }, [session, id]);

  const join = async () => {
    if (!session) {
      toast.error("Please log in to join this event.");
      return router.push(`/login?redirect=/events/${id}`);
    }
    setBusy(true);
    try {
      await api("/joins", { method: "POST", body: { eventId: id }, auth: true });
      setJoined(true);
      Swal.fire({ icon: "success", title: "You're in!", text: "We added this event to your Joined Events.", confirmButtonColor: "#0b6b4f" });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  if (error) return <p className="mx-auto max-w-xl px-4 py-24 text-center text-error">{error}</p>;
  if (!event)
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="skeleton h-80 w-full" />
        <div className="skeleton mt-6 h-8 w-2/3" />
        <div className="skeleton mt-4 h-24 w-full" />
      </div>
    );

  const past = event.eventDate < todayLocal();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <img src={event.thumbnail} alt={event.title} className="h-72 w-full rounded-box object-cover md:h-96" />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="badge badge-secondary badge-soft">{event.eventType}</span>
        {past && <span className="badge badge-neutral">Event has ended</span>}
      </div>
      <h1 className="section-title mt-3">{event.title}</h1>
      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-box bg-base-200 p-4"><dt className="text-sm opacity-70">Date</dt><dd className="font-semibold">{formatDate(event.eventDate)}</dd></div>
        <div className="rounded-box bg-base-200 p-4"><dt className="text-sm opacity-70">Location</dt><dd className="font-semibold">{event.location}</dd></div>
        <div className="rounded-box bg-base-200 p-4"><dt className="text-sm opacity-70">Hosted by</dt><dd className="font-semibold">{event.creatorName || event.createdBy}</dd></div>
      </dl>
      <p className="mt-6 max-w-3xl whitespace-pre-line text-lg leading-relaxed">{event.description}</p>
      <button onClick={join} disabled={busy || joined || past} className="btn btn-primary btn-lg mt-8">
        {busy && <span className="loading loading-spinner" />}
        {joined ? "You have joined" : past ? "Event ended" : "Join Event"}
      </button>
    </div>
  );
}
