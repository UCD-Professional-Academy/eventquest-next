"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

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

      {status === "loading" ? (
        <span>Loading...</span>
      ) : session ? (
        <>
          <Link
            href="/dashboard"
            className={pathname.startsWith("/dashboard") ? "active" : ""}
          >
            Dashboard
          </Link>
          {session.user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className={pathname.startsWith("/admin") ? "active" : ""}
            >
              Admin
            </Link>
          )}
        </>
      ) : (
        <Link
          href="/auth/signin"
          className={pathname.startsWith("/auth/signin") ? "active" : ""}
        >
          Sign In
        </Link>
      )}
    </nav>
  );
}
