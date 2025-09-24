const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Create or update test users
  const hashedPassword = await bcrypt.hash("password123", 12);
  const adminPassword = await bcrypt.hash("admin123", 12);

  // Create regular user
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword,
      role: "USER",
    },
  });

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create sample events - delete existing ones first to avoid duplicates
  await prisma.event.deleteMany({});

  const events = await prisma.event.createMany({
    data: [
      {
        title: "Coding Bootcamp - React & Next.js",
        description:
          "Free weekend workshop for students to learn React and Next.js fundamentals. Build your first full-stack web app with hands-on guidance from industry mentors.",
        date: new Date("2024-11-02T10:00:00Z"),
        location: "UCD Computer Science Building",
        imageUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
        price: 0.0,
        maxCapacity: 50,
        createdById: admin.id,
      },
      {
        title: "Student Networking Night",
        description:
          "Connect with fellow students, alumni, and local professionals. Light refreshments provided. Perfect for making new friends and career connections!",
        date: new Date("2024-10-28T18:30:00Z"),
        location: "Student Union Bar",
        imageUrl:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500",
        price: 5.0,
        maxCapacity: 200,
        createdById: admin.id,
      },
      {
        title: "Mental Health & Wellness Workshop",
        description:
          "Learn stress management techniques and self-care strategies during exam season. Led by campus counselors and wellness experts.",
        date: new Date("2024-11-15T14:00:00Z"),
        location: "Campus Wellness Center",
        imageUrl:
          "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500",
        price: 0.0,
        maxCapacity: 80,
        createdById: admin.id,
      },
      {
        title: "Student Game Night",
        description:
          "Board games, video games, and pizza! Bring your friends or make new ones. Tournament prizes and lots of fun guaranteed.",
        date: new Date("2024-10-26T19:00:00Z"),
        location: "Student Recreation Center",
        imageUrl:
          "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500",
        price: 8.0,
        maxCapacity: 100,
        createdById: admin.id,
      },
      {
        title: "Career Fair 2024",
        description:
          "Meet with top employers looking to hire students and graduates. Bring your CV and dress professionally. Entry includes lunch and networking reception.",
        date: new Date("2024-11-12T09:00:00Z"),
        location: "Main Campus Sports Hall",
        imageUrl:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500",
        price: 0.0,
        maxCapacity: 500,
        createdById: admin.id,
      },
      {
        title: "Study Abroad Information Session",
        description:
          "Learn about exchange programs, scholarships, and application processes. Hear from students who studied in Europe, Asia, and America.",
        date: new Date("2024-11-08T16:00:00Z"),
        location: "International Student Services",
        imageUrl:
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500",
        price: 0.0,
        maxCapacity: 60,
        createdById: admin.id,
      },
      {
        title: "Campus Music Festival",
        description:
          "Local student bands and artists performing live! Food trucks, activities, and great music. Support your fellow student artists.",
        date: new Date("2024-11-22T15:00:00Z"),
        location: "Campus Quad",
        imageUrl:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
        price: 12.0,
        maxCapacity: 800,
        createdById: admin.id,
      },
      {
        title: "Entrepreneurship Workshop",
        description:
          "From idea to startup: Learn how to turn your business ideas into reality. Mentorship from successful student entrepreneurs and business faculty.",
        date: new Date("2024-12-05T13:00:00Z"),
        location: "Business School Auditorium",
        imageUrl:
          "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=500",
        price: 10.0,
        maxCapacity: 120,
        createdById: admin.id,
      },
    ],
  });

  console.log("Database seeded successfully!");
  console.log(`Created user: ${user.email}`);
  console.log(`Created admin: ${admin.email}`);
  console.log(`Created ${events.count} events`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
