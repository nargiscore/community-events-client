"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import Avatar from "@/components/Avatar";
import { authClient } from "@/lib/auth-client";

function Profile() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) { setName(user.name || ""); setImage(user.image || ""); }
  }, [user]);

  const save = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("Name must be at least 2 characters.");
    if (image) { try { new URL(image); } catch { return toast.error("Photo URL must be a valid link."); } }
    setBusy(true);
    const { error } = await authClient.updateUser({ name: name.trim(), image: image || null });
    setBusy(false);
    if (error) toast.error(error.message || "Could not update your profile.");
    else toast.success("Profile updated.");
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="section-title">My profile</h1>
      <div className="mt-6 flex items-center gap-4">
        <Avatar user={{ name, image, email: user?.email }} size="w-20" />
        <div><p className="text-lg font-bold">{user?.name}</p><p className="opacity-70">{user?.email}</p></div>
      </div>
      <form onSubmit={save} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="pname">Name</label>
          <input id="pname" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="pimg">Photo URL</label>
          <input id="pimg" className="input input-bordered w-full" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
        </div>
        <button disabled={busy} className="btn btn-primary">{busy && <span className="loading loading-spinner loading-sm" />} Save profile</button>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  return <PrivateRoute><Profile /></PrivateRoute>;
}
