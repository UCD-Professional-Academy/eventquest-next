import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import SignOutButton from "./SignOutButton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "2rem" }}>
      <h1>Dashboard</h1>
      <div style={{ marginBottom: "2rem" }}>
        <p>Welcome, {session.user?.name || session.user?.email}!</p>
        <p>Role: {session.user?.role}</p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Your Account</h2>
        <p>Email: {session.user?.email}</p>
        <p>User ID: {session.user?.id}</p>
      </div>

      {session.user?.role === "ADMIN" && (
        <div
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
          }}
        >
          <h3>Admin Section</h3>
          <p>You have admin privileges!</p>
          <a
            href="/admin"
            style={{ color: "#0070f3", textDecoration: "underline" }}
          >
            Go to Admin Panel
          </a>
        </div>
      )}

      <SignOutButton />
    </div>
  );
}
