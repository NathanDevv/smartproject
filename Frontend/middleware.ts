import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Lista de rutas protegidas
const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.get("auth")?.value === "true";

  const url = request.nextUrl.clone();

  if (protectedRoutes.includes(url.pathname)) {
    if (!isAuth) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Indicar qué rutas deben ser chequeadas
export const config = {
  matcher: ["/dashboard"],
};
