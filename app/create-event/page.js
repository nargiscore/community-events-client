"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import EventForm from "@/components/EventForm";
import { api } from "@/lib/api";

export default function CreateEventPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const create = async (form) => {
    setBusy(true);
    try {
      await api("/events", { method: "POST", body: form, auth: true });
      await Swal.fire({ icon: "success", title: "Event created", text: "Volunteers can now find and join it.", confirmButtonColor: "#0b6b4f" });
      router.push("/events");
    } catch (e) {
      toast.error(e.message);
      setBusy(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="section-title">Host an event</h1>
        <p className="section-sub">Tell people what you are organising and where to show up.</p>
        <div className="mt-8"><EventForm onSubmit={create} submitLabel="Create event" busy={busy} /></div>
      </div>
    </PrivateRoute>
  );
}
