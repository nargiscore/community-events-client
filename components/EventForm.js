"use client";
import { useState } from "react";
import { EVENT_TYPES, tomorrowLocal } from "@/lib/api";

const empty = { title: "", description: "", eventType: "", thumbnail: "", location: "", eventDate: "" };

function validate(f) {
  const e = {};
  if (f.title.trim().length < 5) e.title = "Title must be at least 5 characters.";
  if (f.description.trim().length < 20) e.description = "Description must be at least 20 characters.";
  if (!f.eventType) e.eventType = "Please choose an event type.";
  try { new URL(f.thumbnail); } catch { e.thumbnail = "Enter a valid image URL (https://...)."; }
  if (f.location.trim().length < 3) e.location = "Please add where the event will happen.";
  if (!f.eventDate) e.eventDate = "Pick an event date.";
  else if (f.eventDate < tomorrowLocal()) e.eventDate = "Event date must be in the future.";
  return e;
}

export default function EventForm({ initial, onSubmit, submitLabel, busy }) {
  const [form, setForm] = useState({ ...empty, ...initial });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handle = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(form);
  };

  const Field = ({ name, label, children }) => (
    <label className="form-control w-full">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      {children}
      {errors[name] && <span className="mt-1 block text-sm text-error">{errors[name]}</span>}
    </label>
  );

  return (
    <form onSubmit={handle} noValidate className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <Field name="title" label="Event title">
          <input className="input input-bordered w-full" value={form.title} onChange={set("title")} placeholder="Winter clothes distribution, Mirpur 10" />
        </Field>
      </div>
      <Field name="eventType" label="Event type">
        <select className="select select-bordered w-full" value={form.eventType} onChange={set("eventType")}>
          <option value="">Choose a type</option>
          {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field name="eventDate" label="Event date">
        <input type="date" min={tomorrowLocal()} className="input input-bordered w-full" value={form.eventDate} onChange={set("eventDate")} />
      </Field>
      <Field name="location" label="Location">
        <input className="input input-bordered w-full" value={form.location} onChange={set("location")} placeholder="Mirpur 10, Dhaka" />
      </Field>
      <Field name="thumbnail" label="Thumbnail image URL">
        <input className="input input-bordered w-full" value={form.thumbnail} onChange={set("thumbnail")} placeholder="https://images.unsplash.com/..." />
      </Field>
      <div className="md:col-span-2">
        <Field name="description" label="Description">
          <textarea rows={5} className="textarea textarea-bordered w-full" value={form.description} onChange={set("description")} placeholder="Tell volunteers what to bring, when to arrive and who you are helping." />
        </Field>
      </div>
      <div className="md:col-span-2">
        <button disabled={busy} className="btn btn-primary w-full md:w-auto">
          {busy && <span className="loading loading-spinner loading-sm" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
