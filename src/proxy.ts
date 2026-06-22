import { type NextRequest, NextResponse } from "next/server";

import { getPostAuthRedirect } from "@/lib/auth/redirect";
import { fetchProfile } from "@/lib/auth/profile";
import { updateSession } from "@/lib/supabase/middleware";

const AUTH_ROUTES = ["/login", "/signup"];
const PROTECTED_PREFIXES = ["/onboarding", "/dashboard"];

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isProtectedRoute(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function proxy(request: NextRequest) {
  const { supabase, user, supabaseResponse } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (!user && isProtectedRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user) {
    const profile = await fetchProfile(supabase, user.id);
    const destination = profile
      ? getPostAuthRedirect(profile.role, profile.onboarding_status)
      : "/onboarding/client";

    if (isAuthRoute(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = destination;
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/onboarding/")) {
      const expectedOnboarding = destination.startsWith("/onboarding")
        ? destination
        : null;

      if (expectedOnboarding && pathname !== expectedOnboarding) {
        const url = request.nextUrl.clone();
        url.pathname = expectedOnboarding;
        return NextResponse.redirect(url);
      }

      if (!expectedOnboarding) {
        const url = request.nextUrl.clone();
        url.pathname = destination;
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
