import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1>Welcome to EventQuest - NextJS</h1>
      <p className="meta">Welcome. Use the nav to browse events.</p>
      <div className="notice">
        This project demonstrates the App Router, file-based routing, a dynamic
        route, a minimal API route, and fetching data in a Server Component.
      </div>
      <img src="hero.jpg" alt="Hero image" style={{width: "100%"}} />
      <Link className="btn btn-secondary" href="/events">
        View Events
      </Link>
    </section>
  );
}
