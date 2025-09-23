import FilterClient from "./FilterClient";

async function getEvents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/events`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to load events");
  }

  const data = await res.json();
  return data.events;
}

export const metadata = { title: "Events - EventQuest-Next" };

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <section>
      <h1>Events</h1>
      <p className="muted">Browse upcoming sessions.</p>
      <FilterClient items={events} />
    </section>
  );
}
