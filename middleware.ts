import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
const { auth: middleware } = NextAuth(authConfig);

const authRoutes = ["/login", "/register"];

const publicRoutes = ["/", "/login", "/register", "/aboutUs"];

const userRoutes = ["/agreement", "/chat", "/profile"];

const clientRoutes = [
  ...publicRoutes,
  ...userRoutes,
  "/providers",
  "/providers/createReserve",
  /^\/providers\/\d+\/info$/, // Ruta dinámica para /providers/[id]/info
];

const providerRoutes = [
  ...publicRoutes.filter((route) => route !== "/"),
  ...userRoutes,
  "/clients",
  "/dashboard",
  "searchClients",
  /^\/clients\/\d+\/info$/,
];

export default middleware((req) => {

  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;


  if (authRoutes.includes(nextUrl.pathname) && isLoggedIn) {
    if (auth?.user.role === "CLIENT") {
      return NextResponse.redirect(new URL("/", nextUrl));
    } else if (auth?.user.role === "PROVIDER") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  if (
    nextUrl.pathname !== "/profile" &&
    (auth?.user.name === null || auth?.user.lastname === null)
  ) {
    return NextResponse.redirect(new URL("/profile", nextUrl));
  }

  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (
    !clientRoutes.some((route) => nextUrl.pathname.match(route)) &&
    isLoggedIn &&
    auth?.user.role === "CLIENT"
  ) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (
    !providerRoutes.some((route) => nextUrl.pathname.match(route)) &&
    isLoggedIn &&
    auth?.user.role === "PROVIDER"
  ) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images/.*|.*\\.svg$).*)",
    "/((?!api|_next/static|_next/image|images/.*|.*\\.png$).*)",
  ],
};

