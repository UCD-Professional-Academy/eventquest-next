let EVENTS = [
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

export function listEvents() {
  return EVENTS;
}

export function findEvent(id) {
  return EVENTS.find((e) => e.id === id);
}

export function createEvent({ id, title, date, description = "" }) {
  if (findEvent(id)) throw new Error("id_exists");
  const ev = { id, title, date, description };
  EVENTS = [ev, ...EVENTS];
  return ev;
}

export function updateEvent(id, patch) {
  const index = EVENTS.findIndex((e) => e.id === id);
  if (index === -1) return null;
  EVENTS[index] = { ...EVENTS[index], ...patch };
  return EVENTS[index];
}

export function deleteEvent(id) {
  const index = EVENTS.findIndex((e) => e.id === id);
  if (index === -1) return false;
  EVENTS.splice(index, 1);
  return true;
}
