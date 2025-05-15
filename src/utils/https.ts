/**
 * Utilities for HTTPS detection and configuration
 */

import { NextRequest } from "next/server";

/**
 * Determines if the application is running in HTTPS mode
 * This uses either environment variables or runtime detection
 */
export const isHttpsEnabled = (): boolean => {
  // Check environment variable first (set in .env.local, .env.development, etc.)
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_USE_HTTPS) {
    return process.env.NEXT_PUBLIC_USE_HTTPS === "true";
  }

  // Fallback to checking the protocol in the browser
  if (typeof window !== "undefined") {
    return window.location.protocol === "https:";
  }

  // Default based on environment in server context without explicit setting
  return process.env.NODE_ENV === "production";
};

/**
 * Determines if a specific request is using HTTPS
 */
export const isRequestHttps = (request: NextRequest): boolean => {
  return (
    request.headers.get("x-forwarded-proto") === "https" ||
    request.url.startsWith("https://")
  );
};

/**
 * Returns cookie options based on whether HTTPS is enabled
 * Use this for consistent cookie settings across the app
 */
export const getCookieOptions = (request?: NextRequest) => {
  // If we have a request, use it to determine HTTPS
  const isHttps = request ? isRequestHttps(request) : isHttpsEnabled();

  return {
    httpOnly: true,
    secure: isHttps,
    sameSite: isHttps ? ("none" as const) : ("lax" as const),
    maxAge: 60 * 60 * 24, // 1 day default
    path: "/",
  };
};
