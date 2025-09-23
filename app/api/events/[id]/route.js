import { findEvent, updateEvent, deleteEvent } from "@/app/lib/eventsStore";
import { json, badRequest, validateEventInput, notFound } from "@/app/lib/http";
import { revalidatePath } from "next/cache";

export function GET(_request, { params }) {
  const ev = findEvent(params.id);
  if (!ev) return notFound("Event not found");
  return json({ event: ev });
}

export async function PATCH(request, { params }) {
  const body = await request.json().catch(() => null);
  const err = validateEventInput(body, { partial: true });
  if (err) return badRequest(err);

  const updated = updateEvent(params.id, body);
  if (!updated) return notFound("Event not found");

  revalidatePath("/events");
  return json({ event: updated });
}

export async function DELETE(_request, { params }) {
  const ok = deleteEvent(params.id);
  if (!ok) return notFound("Event not found");

  revalidatePath("/events");
  return json({ ok: true });
}
