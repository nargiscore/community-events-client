"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import SocialLogin from "@/components/SocialLogin";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const redirectTo = () => {
    const r = new URLSearchParams(window.location.search).get("redirect");
    return r && r.startsWith("/") ? r : "/";
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.password) errs.password = "Enter your password.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    const { error } = await authClient.signIn.email(form);
    setBusy(false);
    if (error) return toast.error(error.message || "Email or password is incorrect.");
    await Swal.fire({ icon: "success", title: "Welcome back!", timer: 1400, showConfirmButton: false });
    router.replace(redirectTo());
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="section-title">Log in</h1>
      <p className="section-sub">Pick up where you left off.</p>
      <form onSubmit={submit} noValidate className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="email">Email</label>
          <input id="email" type="email" className="input input-bordered w-full" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor="password">Password</label>
          <input id="password" type="password" className="input input-bordered w-full" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {errors.password && <p className="mt-1 text-sm text-error">{errors.password}</p>}
        </div>
        <button disabled={busy} className="btn btn-primary w-full">
          {busy && <span className="loading loading-spinner loading-sm" />} Log in
        </button>
      </form>
      <div className="divider">or</div>
      <SocialLogin redirect="/" />
      <p className="mt-6 text-center">
        New here? <Link href="/register" className="link link-primary font-semibold">Create an account</Link>
      </p>
    </div>
  );
}
