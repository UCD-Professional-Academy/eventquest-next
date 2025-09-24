import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth/next";
import { createEvent } from "@/app/lib/eventsStore";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, date, location, imageUrl, price, maxCapacity } =
      body;

    if (!title || !description || !date || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await createEvent({
      title,
      description,
      date,
      location,
      imageUrl,
      price: price || 0,
      maxCapacity: maxCapacity || 100,
      createdById: parseInt(session.user.id),
    });

    // Revalidate paths to ensure cache is cleared
    revalidatePath("/events");
    revalidatePath("/", "layout");

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
