import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { findEvent } from "@/app/lib/eventsStore";
import EditEventForm from "./EditEventForm";

async function getEvent(id) {
  try {
    const event = await findEvent(id);
    return event;
  } catch (error) {
    return null;
  }
}

export default async function EditEventPage({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const event = await getEvent(id);

  if (!event) {
    return <p>Event not found.</p>;
  }

  // Check if user can edit this event
  const canEdit =
    session.user.role === "ADMIN" ||
    parseInt(session.user.id) === event.createdById;

  if (!canEdit) {
    redirect("/events/" + id);
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "2rem" }}>
      <h1>Edit Event</h1>
      <EditEventForm event={event} />
    </div>
  );
}
