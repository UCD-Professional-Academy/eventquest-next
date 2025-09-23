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

export async function GET() {
  return Response.json({ events: EVENTS });
}
