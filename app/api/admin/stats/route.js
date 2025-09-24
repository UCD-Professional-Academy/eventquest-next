import { prisma } from "@/app/lib/prisma";
import { unauthorized, json } from "@/app/lib/http";

export async function GET(request) {
  const token = request.headers.get("x-admin-token");
  if (token !== (process.env.ADMIN_TOKEN || "dev-admin")) {
    return unauthorized("Missing or invalid token");
  }

  try {
    // Get counts
    const [userCount, eventCount, registrationCount] = await Promise.all([
      prisma.user.count(),
      prisma.event.count(),
      prisma.registration.count(),
    ]);

    // Get recent events
    const recentEvents = await prisma.event.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: {
          select: { name: true },
        },
        _count: {
          select: { registrations: true },
        },
      },
    });

    // Get popular events (most registrations)
    const popularEvents = await prisma.event.findMany({
      take: 5,
      include: {
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: {
        registrations: {
          _count: "desc",
        },
      },
    });

    return json({
      stats: {
        totalUsers: userCount,
        totalEvents: eventCount,
        totalRegistrations: registrationCount,
      },
      recentEvents: recentEvents.map((event) => ({
        id: event.id,
        title: event.title,
        date: event.date,
        createdBy: event.createdBy.name,
        registrations: event._count.registrations,
        createdAt: event.createdAt,
      })),
      popularEvents: popularEvents.map((event) => ({
        id: event.id,
        title: event.title,
        date: event.date,
        registrations: event._count.registrations,
        maxCapacity: event.maxCapacity,
      })),
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return json({ error: "Failed to fetch stats" }, 500);
  }
}
