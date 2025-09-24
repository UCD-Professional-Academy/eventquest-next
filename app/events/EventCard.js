"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventCard({ event }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Check if user can edit/delete this event
  const canEdit =
    session?.user &&
    (session.user.role === "ADMIN" ||
      parseInt(session.user.id) === event.createdById);

  const handleDelete = async () => {
    if (!canEdit) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Force a hard refresh to clear all caches
        window.location.reload();
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      alert("Failed to delete event");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="card" style={{ position: "relative" }}>
      {canEdit && (
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            display: "flex",
            gap: "0.5rem",
            zIndex: 1,
          }}
        >
          <Link
            href={`/events/${event.id}/edit`}
            style={{
              padding: "0.25rem 0.5rem",
              backgroundColor: "#0070f3",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "0.8rem",
            }}
          >
            ✏️
          </Link>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                padding: "0.25rem 0.5rem",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              🗑️
            </button>
          ) : (
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                style={{
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  fontSize: "0.7rem",
                }}
              >
                {isDeleting ? "..." : "✓"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.7rem",
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}

      {event.imageUrl && (
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={300}
          height={200}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px 8px 0 0",
          }}
        />
      )}

      <div style={{ padding: "1rem" }}>
        <h3>
          <Link
            href={`/events/${event.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {event.title}
          </Link>
        </h3>
        <p className="muted">{eventDate}</p>
        <p className="muted">📍 {event.location}</p>
        {event.price > 0 && <p className="muted">💰 €{event.price}</p>}
        <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>
          {event.description?.slice(0, 100)}...
        </p>

        {event.registrations && (
          <p className="muted" style={{ fontSize: "0.8rem" }}>
            👥 {event.registrations.length} / {event.maxCapacity} registered
          </p>
        )}
      </div>
    </div>
  );
}
