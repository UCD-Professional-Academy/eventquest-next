"use client";

import { useMemo, useState } from "react";

export default function FilterClient({ items }) {
  const [q, setQ] = useState("");
  const [local, setLocal] = useState(items);

  const filtered = useMemo(() => {
    const cleanText = q.trim().toLowerCase();
    if (!cleanText) return local;

    return local.filter(
      (ev) =>
        ev.title.toLowerCase().includes(cleanText) ||
        ev.date.includes(cleanText)
    );
  }, [q, local]);

  async function addSample() {
    const id = "ux-" + Math.random().toString(36).slice(2, 7);
    const res = await fetch("http://localhost:3000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title: "Event added",
        date: "2025-01-01",
        decsription: "Created from UI",
      }),
    });

    if (res.ok) {
      const { event } = await res.json();
      setLocal((prev) => [event, ...prev]);
    } else {
      console.error("Failed to add sample", await res.json().catch(() => ({})));
    }
  }

  return (
    <section>
      <label htmlFor="q">Filter</label>
      <input
        id="q"
        placeholder="Type to filter..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ display: "block", margin: "0.5rem 0 1rem", padding: "0.5rem" }}
      />
      <button className="btn" onClick={addSample}>
        + Add sample event
      </button>
      <ul className="card-container">
        {filtered.map((ev) => (
          <li key={ev.id} className="card">
            <h3>{ev.title}</h3>
            <p className="muted">{ev.date}</p>
            <a className="btn" href={`/events/${ev.id}`}>
              Details
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
