"use client";

import { useMemo, useState } from "react";

export default function FilterClient({ items }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const cleanText = q.trim().toLowerCase();
    if (!cleanText) return items;

    return items.filter(
      (ev) =>
        ev.title.toLowerCase().includes(cleanText) ||
        ev.date.includes(cleanText)
    );
  }, [q, items]);

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
      <ul>
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
