import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const isApiRoute = request.nextUrl.pathname.startsWith("/api/");

  // Parse allowed origins from environment variable
  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? (process.env.ALLOWED_ORIGINS || process.env.NEXT_PUBLIC_APP_FQDN || "")
          .split(",")
          .map((o) => o.trim())
      : ["http://localhost:3000", "https://localhost:3000"];

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": isApiRoute
          ? "*"
          : allowedOrigins.includes(origin)
            ? origin
            : "",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, OPTIONS, PATCH",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      },
    });
  }

  // Handle actual requests
  const response = NextResponse.next();

  // Add CORS headers to all responses
  response.headers.set(
    "Access-Control-Allow-Origin",
    isApiRoute ? "*" : allowedOrigins.includes(origin) ? origin : ""
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  response.headers.set("Vary", "Origin");

  return response;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Match all API routes
    "/api/:path*",
    // Match the specific FedCM config endpoint
    "/api/fedcm/config.json",
    // Match all other routes
    "/:path*",
  ],
};
