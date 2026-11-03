"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import { PASSWORD_RULE } from "@/lib/api";
import SocialLogin from "@/components/SocialLogin";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", image: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (form.image) { try { new URL(form.image); } catch { errs.image = "Photo URL must be a valid link."; } }
    if (!PASSWORD_RULE.test(form.password))
      errs.password = "Use at least 6 characters with one uppercase and one lowercase letter.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error(Object.values(errs)[0]);
      return;
    }
    setBusy(true);
    const { error } = await authClient.signUp.email({
      name: form.name.trim(), email: form.email, password: form.password, image: form.image || undefined,
    });
    setBusy(false);
    if (error) return toast.error(error.message || "Could not create your account.");
    await Swal.fire({ icon: "success", title: "Account created", text: "You are now logged in.", timer: 1600, showConfirmButton: false });
    router.replace("/");
  };

  const field = (k, label, type = "text", ph = "") => (
    <div>
      <label className="mb-1 block text-sm font-semibold" htmlFor={k}>{label}</label>
      <input id={k} type={type} placeholder={ph} className="input input-bordered w-full" value={form[k]} onChange={set(k)} />
      {errors[k] && <p className="mt-1 text-sm text-error">{errors[k]}</p>}
    </div>
  );

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="section-title">Create your account</h1>
      <p className="section-sub">It takes under a minute.</p>
      <form onSubmit={submit} noValidate className="mt-8 space-y-4">
        {field("name", "Full name")}
        {field("email", "Email", "email")}
        {field("image", "Photo URL (optional)", "url", "https://...")}
        {field("password", "Password", "password")}
        <button disabled={busy} className="btn btn-primary w-full">
          {busy && <span className="loading loading-spinner loading-sm" />} Register
        </button>
      </form>
      <div className="divider">or</div>
      <SocialLogin redirect="/" />
      <p className="mt-6 text-center">
        Already registered? <Link href="/login" className="link link-primary font-semibold">Log in</Link>
      </p>
    </div>
  );
}
