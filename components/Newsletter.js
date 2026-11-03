"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Enter a valid email address.");
    toast.success("Thanks! We will email you when new events are posted.");
    setEmail("");
  };
  return (
    <section className="section">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-box bg-secondary p-8 text-secondary-content md:p-12">
          <h2 className="section-title !text-secondary-content">Get the weekend list in your inbox</h2>
          <p className="section-sub !opacity-90">One short email every Thursday with events near you.</p>
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email address" className="input input-lg w-full text-base-content" />
            <button className="btn btn-neutral btn-lg">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}
