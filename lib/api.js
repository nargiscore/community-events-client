import { authClient } from "./auth-client";

const BASE = process.env.NEXT_PUBLIC_API_URL;

async function getToken() {
  const { data } = await authClient.token();
  return data?.token;
}

// Small fetch wrapper: attaches the JWT when `auth` is true and throws readable errors.
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = await getToken();
    if (!token) throw new Error("Please log in again to continue.");
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

export const EVENT_TYPES = [
  "Cleanup", "Plantation", "Donation", "Blood Donation",
  "Food Distribution", "Education", "Health Camp",
];

export const todayLocal = () => new Date().toLocaleDateString("en-CA");
export const tomorrowLocal = () =>
  new Date(Date.now() + 86400000).toLocaleDateString("en-CA");

export const formatDate = (d) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

export const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
