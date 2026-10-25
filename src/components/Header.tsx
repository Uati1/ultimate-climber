"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { SURVEY_URL } from "@/lib/constants";
import BrandWordmark from "./BrandWordmark";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-foreground/5">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" onClick={handleLogoClick} className="flex items-center h-full shrink-0">
          <BrandWordmark
            className="text-sm sm:text-base"
            wordmarkClassName="hidden sm:inline"
            priority
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <LanguageSwitcher />
          <a
            href={SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 flex items-center px-3 text-xs sm:px-5 sm:text-sm rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent-soft transition-colors whitespace-nowrap"
          >
            {t("fillSurvey")}
          </a>
        </div>
      </nav>
    </header>
  );
}
