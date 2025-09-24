import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Admin routes require ADMIN role
        if (pathname.startsWith("/admin")) {
          return token?.role === "ADMIN";
        }

        // Dashboard and other protected routes require any authenticated user
        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/api/admin")
        ) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/admin/:path*"],
};
