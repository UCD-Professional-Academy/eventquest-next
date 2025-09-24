import { findEvent, updateEvent, deleteEvent } from "@/app/lib/eventsStore";
import { json, badRequest, validateEventInput, notFound } from "@/app/lib/http";
import { revalidatePath } from "next/cache";

export async function GET(_request, { params }) {
  const { id } = await params;
  try {
    const ev = await findEvent(id);
    if (!ev) return notFound("Event not found");
    return json({ event: ev });
  } catch (error) {
    return json(
      { error: "server_error", message: "Failed to fetch event" },
      500
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const body = await request.json().catch(() => null);
    const err = validateEventInput(body, { partial: true });
    if (err) return badRequest(err);

    const updated = await updateEvent(params.id, body);
    if (!updated) return notFound("Event not found");

    // Revalidate multiple paths to ensure cache is cleared
    revalidatePath("/events");
    revalidatePath(`/events/${params.id}`);
    revalidatePath("/", "layout");

    return json({ event: updated });
  } catch (error) {
    return json(
      { error: "server_error", message: "Failed to update event" },
      500
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const ok = await deleteEvent(params.id);
    if (!ok) return notFound("Event not found");

    // Revalidate multiple paths to ensure cache is cleared
    revalidatePath("/events");
    revalidatePath(`/events/${params.id}`);
    revalidatePath("/", "layout");

    return json({ ok: true });
  } catch (error) {
    return json(
      { error: "server_error", message: "Failed to delete event" },
      500
    );
  }
}
