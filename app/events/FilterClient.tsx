"use client";

import { useMemo, useState } from "react";
import EventCard from "./EventCard";

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
}

interface FilterClientProps {
  items: Event[];
}

export default function FilterClient({ items }: FilterClientProps) {
  const [q, setQ] = useState("");
  const [local, setLocal] = useState(items);

  const filtered = useMemo(() => {
    const cleanText = q.trim().toLowerCase();
    if (!cleanText) return local;

    return local.filter(
      (ev) =>
        ev.title.toLowerCase().includes(cleanText) ||
        ev.description?.toLowerCase().includes(cleanText) ||
        ev.location?.toLowerCase().includes(cleanText) ||
        new Date(ev.date).toLocaleDateString().includes(cleanText)
    );
  }, [q, local]);

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
      <div className="card-container">
        {filtered.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>
    </section>
  );
}
