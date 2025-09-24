"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditEventForm({ event }) {
  const router = useRouter();
  const [title, setTitle] = useState(event.title || "");
  const [description, setDescription] = useState(event.description || "");
  const [date, setDate] = useState(
    event.date ? new Date(event.date).toISOString().slice(0, 16) : ""
  );
  const [location, setLocation] = useState(event.location || "");
  const [imageUrl, setImageUrl] = useState(event.imageUrl || "");
  const [price, setPrice] = useState(event.price?.toString() || "0");
  const [maxCapacity, setMaxCapacity] = useState(
    event.maxCapacity?.toString() || "100"
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          date,
          location,
          imageUrl,
          price: parseFloat(price),
          maxCapacity: parseInt(maxCapacity),
        }),
      });

      if (response.ok) {
        setMessage("Event updated successfully!");
        setTimeout(() => {
          // Force a hard refresh to clear all caches
          window.location.href = `/events/${event.id}`;
        }, 1000);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message || "Failed to update event"}`);
      }
    } catch (error) {
      setMessage("Error: Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="date">Date & Time:</label>
        <input
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="maxCapacity">Max Capacity:</label>
        <input
          id="maxCapacity"
          type="number"
          min="1"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
      </div>

      {message && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.5rem",
            backgroundColor: message.includes("Error") ? "#fee" : "#efe",
            color: message.includes("Error") ? "#c00" : "#060",
            borderRadius: "4px",
          }}
        >
          {message}
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Updating..." : "Update Event"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          style={{
            padding: "0.75rem 1.5rem",
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
    </form>
  );
}
