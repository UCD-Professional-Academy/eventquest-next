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
  try {
    const events = await listEvents();
    const res = new Response(JSON.stringify({ events }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    res.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
    return res;
  } catch (error) {
    return json(
      { error: "server_error", message: "Failed to fetch events" },
      500
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const err = validateEventInput(body, { partial: false });
    if (err) return badRequest(err);

    const event = await createEvent(body);

    // Revalidate multiple paths to ensure cache is cleared
    revalidatePath("/events");
    revalidatePath("/", "layout");

    return json({ event }, 201);
  } catch (e) {
    console.error("Error creating event:", e);
    return json(
      { error: "server_error", message: "Failed to create event" },
      500
    );
  }
}
