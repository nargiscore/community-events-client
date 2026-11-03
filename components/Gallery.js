const photos = [
  ["photo-1488521787991-ed7bbaae773c", "Volunteers handing out food packets"],
  ["photo-1469571486292-0ba58a3f068b", "Community members planting saplings"],
  ["photo-1532629345422-7515f3d16bb6", "Clean-up crew collecting waste by a river"],
  ["photo-1559027615-cd4628902d4a", "Volunteers working together outdoors"],
  ["photo-1593113598332-cd288d649433", "Donated clothes being sorted"],
  ["photo-1615461066841-6116e61058f4", "Blood donation camp volunteers"],
  ["photo-1509099836639-18ba1795216d", "Children at a community learning session"],
  ["photo-1542810634-71277d95dcbb", "Neighbours sharing a meal after an event"],
];

export default function Gallery() {
  return (
    <section className="section bg-base-200">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="section-title">Moments from past events</h2>
        <p className="section-sub">Small acts, repeated by many people, add up.</p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {photos.map(([id, alt]) => (
            <img key={id} src={`https://images.unsplash.com/${id}?w=600&h=450&fit=crop&q=70`} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-box object-cover" />
          ))}
        </div>
      </div>
    </section>
  );
}
