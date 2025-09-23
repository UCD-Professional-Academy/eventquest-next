import Link from "next/link";

const EVENTS = [
  {
    id: "e1",
    title: "Intro to Next.js",
    date: "2025-10-01",
    desc: "Kick-off with the App Router.",
  },
  {
    id: "e2",
    title: "API Routes Deep Dive",
    date: "2025-10-08",
    desc: "Shape data with route handlers.",
  },
  {
    id: "e3",
    title: "Server vs Client Components",
    date: "2025-10-15",
    desc: "When to fetch on server vs client.",
  },
];

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }));
}

export function generateMetadata({ params }) {
  return (async () => {
    const { id } = await params;
    const title = EVENTS.find((e) => e.id === id)?.title ?? "Event";
    return { title: `${title} — EventQuest Next` };
  })();
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const ev = EVENTS.find((e) => e.id === id);

  if (!ev) {
    return <p className="muted">Event not found.</p>;
  }

  return (
    <article className="card">
      <h1>{ev.title}</h1>
      <p className="muted">{ev.date}</p>
      <p>{ev.desc}</p>
      {/* In a real app, use Link or a button with onClick and router.back() */}
      {/* to avoid full page reloads when navigating back. */}
      {/* This is just for demonstration purposes. */}
      <Link className="btn" href="/events">
        ← Back to events
      </Link>
    </article>
  );
}
