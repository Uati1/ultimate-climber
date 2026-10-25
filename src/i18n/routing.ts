import { defineRouting } from "next-intl/routing";
import { locales } from "../i18n";

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "pl",
  localePrefix: "as-needed",
});
