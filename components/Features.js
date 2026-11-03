const features = [
  { t: "Host in minutes", d: "Add a title, place, date and photo. Your event goes live on the Upcoming Events page right away." },
  { t: "Join with one click", d: "See the details first, then sign in and join. Your spot is saved to your Joined Events list." },
  { t: "Stay in control", d: "Edit or delete the events you created. Nobody else can change them." },
  { t: "Only what's coming up", d: "Events disappear from the public list once their date has passed, so you never chase old posts." },
];

export default function Features() {
  return (
    <section className="section bg-base-200">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="section-title">Built for people who show up</h2>
        <p className="section-sub">Everything you need to organise or join a service event, without group-chat chaos.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.t} className="h-full rounded-box border border-base-300 bg-base-100 p-6">
              <h3 className="text-lg font-bold text-primary">{f.t}</h3>
              <p className="mt-2 leading-relaxed opacity-80">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
