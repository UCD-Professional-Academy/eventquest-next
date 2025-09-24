import { NextResponse } from "next/server";

export function json(data, init = 200) {
  const status = typeof init === "number" ? init : init?.status || 200;
  return NextResponse.json(data, { status });
}

export function badRequest(message, extra = {}) {
  return json({ error: "bad_request", message, ...extra }, 400);
}

export function notFound(message = "Not found") {
  return json({ error: "Not_found", message }, 404);
}

export function unauthorized(message = "Unauthorized") {
  return json({ error: "unauthorized", message }, 401);
}

export function validateEventInput(body, { partial = false } = {}) {
  if (!partial) {
    if (!body || typeof body !== "object") return "Body must be JSON object";
    if (!body.id || typeof body.id !== "string")
      return "id (string) is required";
    if (!body.title || typeof body.title !== "string")
      return "title (string) is required";
    if (!body.date || typeof body.date !== "string")
      return "date (YYYY-MM-DD) is required";
  } else {
    if (!body || typeof body !== "object") return "Body must be JSON object";
    const allowed = [
      "title",
      "date",
      "description",
      "location",
      "imageUrl",
      "price",
      "maxCapacity",
    ];
    const keys = Object.keys(body);
    if (keys.length === 0) return "Provide at least one updatable field";
    const invalid = keys.filter((k) => !allowed.includes(k));
    if (invalid.length) return `Invalid fields: ${invalid.join(", ")}`;
  }

  return null;
}
