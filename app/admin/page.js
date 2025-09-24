import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import CreateEventForm from "./CreateEventForm";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "2rem" }}>
      <h1>Admin Panel</h1>
      <p>
        Welcome to the admin panel, {session.user?.name || session.user?.email}!
      </p>

      <div style={{ marginTop: "2rem" }}>
        <h2>Event Management</h2>
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/events"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              marginRight: "1rem",
            }}
          >
            📋 View All Events
          </Link>
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>
            View events list where you can edit/delete events directly
          </p>
        </div>

        <h3>Create New Event</h3>
        <CreateEventForm />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <a
          href="/dashboard"
          style={{ color: "#0070f3", textDecoration: "underline" }}
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}
