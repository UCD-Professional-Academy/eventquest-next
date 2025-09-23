import { listEvents, createEvent } from "@/app/lib/eventsStore";
import { json, badRequest, validateEventInput } from "@/app/lib/http";
import { revalidatePath } from "next/cache";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function GET() {
  const res = new Response(JSON.stringify({ events: listEvents() }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  res.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
  return res;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const err = validateEventInput(body, { partial: false });
    if (err) return badRequest(err);

    const event = createEvent(body);

    revalidatePath("/events");

    return json({ event }, 201);
  } catch (e) {
    if (e.message === "id_exists") {
      return badRequest("Event ID already exists", { field: "id" });
    }
    return json({ error: "server_error", message: "Unexpected Error" }, 500);
  }
}
