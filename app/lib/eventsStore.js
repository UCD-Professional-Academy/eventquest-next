import { prisma } from "./prisma.js";

// List all events
export async function listEvents() {
  try {
    const events = await prisma.event.findMany({
      include: {
        createdBy: {
          select: { name: true, email: true },
        },
        registrations: true,
      },
      orderBy: {
        date: "asc",
      },
    });
    return events;
  } catch (error) {
    console.error("Error listing events:", error);
    throw new Error("Failed to fetch events");
  }
}

// Find a specific event by ID
export async function findEvent(id) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        createdBy: {
          select: { name: true, email: true },
        },
        registrations: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
      },
    });
    return event;
  } catch (error) {
    console.error("Error finding event:", error);
    return null;
  }
}

// Create a new event
export async function createEvent({
  title,
  description,
  date,
  location,
  imageUrl,
  price = 0,
  maxCapacity = 100,
  createdById,
}) {
  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        imageUrl,
        price: parseFloat(price),
        maxCapacity: parseInt(maxCapacity),
        createdById: parseInt(createdById),
      },
      include: {
        createdBy: {
          select: { name: true, email: true },
        },
      },
    });
    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
}

// Update an existing event
export async function updateEvent(id, patch) {
  try {
    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        ...patch,
        date: patch.date ? new Date(patch.date) : undefined,
        price: patch.price ? parseFloat(patch.price) : undefined,
        maxCapacity: patch.maxCapacity
          ? parseInt(patch.maxCapacity)
          : undefined,
      },
      include: {
        createdBy: {
          select: { name: true, email: true },
        },
      },
    });
    return event;
  } catch (error) {
    console.error("Error updating event:", error);
    return null;
  }
}

// Delete an event
export async function deleteEvent(id) {
  try {
    await prisma.event.delete({
      where: { id: parseInt(id) },
    });
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    return false;
  }
}

// Register user for an event
export async function registerForEvent(userId, eventId) {
  try {
    const registration = await prisma.registration.create({
      data: {
        userId: parseInt(userId),
        eventId: parseInt(eventId),
      },
    });
    return registration;
  } catch (error) {
    console.error("Error registering for event:", error);
    throw new Error("Failed to register for event");
  }
}

// Unregister user from an event
export async function unregisterFromEvent(userId, eventId) {
  try {
    await prisma.registration.delete({
      where: {
        userId_eventId: {
          userId: parseInt(userId),
          eventId: parseInt(eventId),
        },
      },
    });
    return true;
  } catch (error) {
    console.error("Error unregistering from event:", error);
    return false;
  }
}
