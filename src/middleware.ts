import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

export default async function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") ?? "";
  const defaultLocale = country === "PL" ? "pl" : "en";

  const handleI18nRouting = createMiddleware({
    ...routing,
    defaultLocale,
  });

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
