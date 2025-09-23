import Link from "next/link";
import "./globals.css";
import NavBar from "./NavBar";

export const metadata = {
  title: "EventQuest-Next",
  description: "Next.js Basics: routing, layout, and a tiny API in JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="header-content">
            <Link href="/" className="logo">
              EventQuest
            </Link>
            <NavBar />
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">EventQuest-Next :: v1</footer>
      </body>
    </html>
  );
}
