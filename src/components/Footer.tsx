"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BrandWordmark from "./BrandWordmark";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-foreground/10 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center">
          <BrandWordmark className="text-sm" />
        </Link>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link
            href="/polityka-prywatnosci"
            className="text-muted text-sm hover:text-foreground transition-colors"
          >
            {t("privacyPolicy")}
          </Link>
          <Link
            href="/regulamin"
            className="text-muted text-sm hover:text-foreground transition-colors"
          >
            {t("terms")}
          </Link>
          <Link
            href="/unsubscribe"
            className="text-muted text-sm hover:text-foreground transition-colors"
          >
            {t("unsubscribe")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
