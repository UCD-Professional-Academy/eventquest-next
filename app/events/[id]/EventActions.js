"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventActions({ event }) {
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
        window.location.href = "/events";
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

  const handleEdit = () => {
    router.push(`/events/${event.id}/edit`);
  };

  if (!canEdit) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "2rem",
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={handleEdit}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ✏️ Edit Event
      </button>

      {!showDeleteConfirm ? (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🗑️ Delete Event
        </button>
      ) : (
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ color: "#dc3545", fontWeight: "bold" }}>
            Are you sure?
          </span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isDeleting ? "not-allowed" : "pointer",
            }}
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
