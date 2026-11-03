"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import PrivateRoute from "@/components/PrivateRoute";
import EventForm from "@/components/EventForm";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

function Edit() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [event, setEvent] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api(`/events/${id}`).then(setEvent).catch((e) => { toast.error(e.message); router.replace("/manage-events"); });
  }, [id, router]);

  useEffect(() => {
    if (event && session && event.createdBy !== session.user.email) {
      toast.error("You can only edit your own events.");
      router.replace("/manage-events");
    }
  }, [event, session, router]);

  const save = async (form) => {
    setBusy(true);
    try {
      await api(`/events/${id}`, { method: "PUT", body: form, auth: true });
      await Swal.fire({ icon: "success", title: "Event updated", timer: 1400, showConfirmButton: false });
      router.push("/manage-events");
    } catch (e) {
      toast.error(e.message);
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="section-title">Update event</h1>
      <div className="mt-8">
        {!event ? <div className="skeleton h-96 w-full" /> : (
          <EventForm initial={event} onSubmit={save} submitLabel="Save changes" busy={busy} />
        )}
      </div>
    </div>
  );
}

export default function EditPage() {
  return <PrivateRoute><Edit /></PrivateRoute>;
}
