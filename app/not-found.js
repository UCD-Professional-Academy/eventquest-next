import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1>Not Found</h1>
      <p className="muted">The page you’re looking for doesn’t exist.</p>
      <Link className="btn" href="/">
        Go home
      </Link>
    </section>
  );
}
