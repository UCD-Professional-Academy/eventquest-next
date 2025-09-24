import FilterClient from "./FilterClient";
export const revalidate = 0; // Disable caching during development

async function getEvents() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/events`, {
    next: { revalidate: 0 },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load events");
  const data = await res.json();
  return Array.isArray(data.events) ? data.events : data;
}

export const metadata = { title: "Events • EventQuest-Next" };

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <section>
      <h1>Events</h1>
      <p className="muted">
        This list is statically generated and revalidated in the background
        every 30 seconds.
      </p>
      <FilterClient items={events} />
    </section>
  );
}
