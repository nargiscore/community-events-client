# Hatey Hat: Community Service Events Platform

**Live site:** https://hatey-hat.vercel.app  *(replace with your deployed URL)*
**Server repo:** https://github.com/your-username/community-events-server

Hatey Hat lets neighbours create, join and track social service events such as winter clothes
distribution in Mirpur 10 or blanket drives in Mohammadpur.

## Features
- Email/password and GitHub login powered by BetterAuth with the MongoDB adapter, plus password rules (uppercase, lowercase, 6+ characters).
- Create, update and delete your own events, with form validation and a future-date-only rule.
- Public Upcoming Events page with search and type filter; past events never appear.
- One-click Join Event with a personal Joined Events page sorted by date.
- JWT-protected API: every private request carries a BetterAuth token verified by the Express server.
- Light/dark theme toggle that persists, loading skeletons, and profile name/photo update.
- Fully responsive layout (mobile, tablet, desktop) with no default browser alerts.

## Tech stack
Next.js (App Router), DaisyUI + Tailwind CSS, BetterAuth, MongoDB, Express.js, React Hot Toast, SweetAlert2.

## Run locally
```bash
cp .env.example .env.local   # fill in values
npm install
npm run dev
```
