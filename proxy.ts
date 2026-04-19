import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { api } from "@/lib/api/api";

const privatePrefixes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = privatePrefixes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.includes(pathname);

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  if (!accessToken) {
  
    if (refreshToken) {
      try {
        const { headers } = await api.get("/auth/session", {
          headers: {
            Cookie: cookieHeader,
          },
        });

        const setCookie = headers["set-cookie"];

        if (setCookie) {
          const response = NextResponse.next();

          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

          for (const cookieString of cookieArray) {
            const parsed = parse(cookieString);

            const maxAge = Number(parsed["Max-Age"]);

            const options = {
              path: parsed.Path,
              expires: parsed.Expires
                ? new Date(parsed.Expires)
                : undefined,
              ...(Number.isFinite(maxAge) ? { maxAge } : {}),
            };

            if (parsed.accessToken) {
              response.cookies.set(
                "accessToken",
                parsed.accessToken,
                options
              );
            }

            if (parsed.refreshToken) {
              response.cookies.set(
                "refreshToken",
                parsed.refreshToken,
                options
              );
            }
          }

        
          if (isPublicRoute) {
            return NextResponse.redirect(new URL("/", request.url));
          }

          return response;
        }
      } catch (error) {
        
      }
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};