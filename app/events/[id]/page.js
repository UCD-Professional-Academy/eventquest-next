import Link from "next/link";
import Image from "next/image";
import EventActions from "./EventActions";

async function getEvent(id) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/events/${id}`, {
    next: { revalidate: 0 },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load event");
  const data = await res.json();
  return data.event;
}

export function generateMetadata({ params }) {
  return (async () => {
    const { id } = await params;
    try {
      const event = await getEvent(id);
      return { title: `${event?.title ?? "Event"} — EventQuest Next` };
    } catch {
      return { title: "Event — EventQuest Next" };
    }
  })();
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;

  try {
    const event = await getEvent(id);

    if (!event) {
      return <p className="muted">Event not found.</p>;
    }

    const eventDate = new Date(event.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <article className="card">
        {event.imageUrl && (
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={500}
            height={300}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
        )}
        <h1>{event.title}</h1>
        <p className="muted">{eventDate}</p>
        <p className="muted">📍 {event.location}</p>
        {event.price > 0 && <p className="muted">💰 €{event.price}</p>}
        <p className="muted">👥 Max capacity: {event.maxCapacity}</p>
        <p>{event.description}</p>

        {event.createdBy && (
          <p className="muted">Organized by: {event.createdBy.name}</p>
        )}

        {event.registrations && (
          <p className="muted">
            Registered: {event.registrations.length} / {event.maxCapacity}
          </p>
        )}

        <EventActions event={event} />

        <Link className="btn" href="/events">
          ← Back to events
        </Link>
      </article>
    );
  } catch (error) {
    return <p className="muted">Failed to load event details.</p>;
  }
}
