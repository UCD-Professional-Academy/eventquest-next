"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav>
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        Home
      </Link>
      <Link
        href="/events"
        className={pathname.startsWith("/events") ? "active" : ""}
      >
        Events
      </Link>
    </nav>
  );
}
