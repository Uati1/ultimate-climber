"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const LANGUAGES = [
  { code: "pl", flag: "🇵🇱", name: "Polski" },
  { code: "en", flag: "🇬🇧", name: "English" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  const handleSelect = (code: string) => {
    router.replace(pathname, { locale: code as "pl" | "en" });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 flex items-center justify-center rounded-lg border border-foreground/15 bg-surface/50 hover:border-accent/40 transition-colors"
        aria-label={`Change language, current ${current.name}`}
      >
        <span className="text-lg leading-none">{current.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 py-1 rounded-lg border border-foreground/10 bg-surface shadow-xl z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              aria-label={lang.name}
              className={`w-9 h-9 flex items-center justify-center text-lg leading-none transition-colors ${
                locale === lang.code
                  ? "bg-accent/20"
                  : "hover:bg-background"
              }`}
            >
              {lang.flag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
