import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-gigshield-key");

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const adminToken = req.cookies.get("admin_auth_token")?.value;

  const { pathname } = req.nextUrl;

  // Protect /admin routes (except /admin/login)
  const isAdminRoute = pathname.startsWith("/admin");
  const isProtectedAdminRoute = isAdminRoute && pathname !== "/admin/login";

  if (isProtectedAdminRoute) {
    if (!adminToken) return NextResponse.redirect(new URL("/admin/login", req.url));
    try {
      await jwtVerify(adminToken, JWT_SECRET);
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Redirect away from /admin/login if logged in as admin
  if (pathname === "/admin/login" && adminToken) {
    try {
      await jwtVerify(adminToken, JWT_SECRET);
      return NextResponse.redirect(new URL("/admin", req.url));
    } catch {
      // allow them to login
    }
  }

  // Protect /dashboard and /api/policies routes
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/api/policies") || pathname.startsWith("/api/claims");
  
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      // Invalid token
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Redirect logged in users away from /login or /register
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  if (isAuthRoute && token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      // Token invalid, allow them to view login page
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/admin/:path*",
    "/api/policies/:path*",
    "/api/claims/:path*"
  ],
};
