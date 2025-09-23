import { listEvents } from "@/app/lib/eventsStore";
import { unauthorized, json } from "@/app/lib/http";

export async function GET(request) {
  const token = request.headers.get("x-admin-token");
  if (token !== (process.env.ADMIN_TOKEN || "dev-admin")) {
    return unauthorized("Missing or invalid token");
  }

  const events = listEvents();
  const stats = {
    count: events.length,
    newest: events[0].id || null,
  };

  return json({ stats });
}
