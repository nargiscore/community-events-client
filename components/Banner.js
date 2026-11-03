import Link from "next/link";

export default function Banner() {
  return (
    <section className="gamchha text-primary-content">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Your neighbours are waiting for a pair of hands.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-90">
            Find a blanket drive in Mohammadpur, a tree planting in Uttara or a blood camp near you.
            Host your own in two minutes and see who joins.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-accent btn-lg">Find an event</Link>
            <Link href="/create-event" className="btn btn-lg border-white/60 bg-transparent text-white hover:bg-white hover:text-primary">Host an event</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img className="h-56 w-full rounded-2xl object-cover sm:h-64" alt="Volunteers sorting donated clothes" src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=70" />
          <img className="mt-8 h-56 w-full rounded-2xl object-cover sm:h-64" alt="Volunteers planting a tree" src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=70" />
        </div>
      </div>
    </section>
  );
}
