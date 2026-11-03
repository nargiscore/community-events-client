import Link from "next/link";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21.5l-7.1 8.1L22.75 22h-6.55l-5.13-6.7L5.2 22H1.94l7.6-8.68L1.5 2h6.72l4.64 6.13L18.244 2zm-1.14 18h1.8L7.02 3.9H5.1L17.104 20z"/></svg>
);
const FbIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.9c0-.9.3-1.5 1.600-1.500h1.700V4.600c-.3 0-1.300-.1-2.400-.1-2.400 0-4 1.400-4 4.100v2.200H7.600V14h2.800v8h3.100z"/></svg>
);
const GhIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.160 19.490c.5.090.680-.220.680-.480v-1.700c-2.780.600-3.370-1.340-3.370-1.340-.450-1.160-1.110-1.470-1.110-1.470-.910-.620.070-.610.070-.610 1 .070 1.530 1.030 1.530 1.030.890 1.530 2.340 1.090 2.910.830.090-.650.350-1.090.630-1.340-2.220-.250-4.560-1.110-4.560-4.940 0-1.090.390-1.980 1.030-2.680-.100-.250-.450-1.270.100-2.650 0 0 .840-.270 2.750 1.020a9.500 9.500 0 0 1 5 0c1.910-1.290 2.750-1.020 2.750-1.020.550 1.380.200 2.400.100 2.650.640.700 1.030 1.590 1.030 2.680 0 3.840-2.340 4.680-4.570 4.930.360.310.680.920.680 1.850v2.740c0 .270.180.580.690.480A10 10 0 0 0 12 2z"/></svg>
);

export default function Footer() {
  return (
    <footer className="gamchha text-primary-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="brand text-2xl font-extrabold">Hatey Hat</p>
          <p className="mt-3 max-w-md leading-relaxed opacity-90">
            A neighbourhood-first platform where people in Dhaka and beyond organise
            winter clothes drives, blood donation camps, tree plantations and clean-up days, then
            show up together.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="btn btn-circle btn-sm bg-white/15 border-0 text-white hover:bg-white/30"><XIcon /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="btn btn-circle btn-sm bg-white/15 border-0 text-white hover:bg-white/30"><FbIcon /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="btn btn-circle btn-sm bg-white/15 border-0 text-white hover:bg-white/30"><GhIcon /></a>
          </div>
        </div>
        <div>
          <p className="font-bold">Explore</p>
          <ul className="mt-3 space-y-2 opacity-90">
            <li><Link href="/events" className="hover:underline">Upcoming Events</Link></li>
            <li><Link href="/create-event" className="hover:underline">Create an Event</Link></li>
            <li><Link href="/joined-events" className="hover:underline">Joined Events</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold">Contact</p>
          <ul className="mt-3 space-y-2 opacity-90">
            <li>Badda, Dhaka 1212</li>
            <li>hello@hateyhat.org</li>
            <li>+880 1700-000000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-sm opacity-90">
        © {new Date().getFullYear()} Hatey Hat. Built for communities, run by volunteers.
      </div>
    </footer>
  );
}
