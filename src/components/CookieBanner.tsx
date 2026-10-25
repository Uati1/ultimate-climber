"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const COOKIE_CONSENT_KEY = "provolley_cookie_consent";

export default function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-foreground/10 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-foreground/90 text-sm leading-relaxed mb-4">
          {t.rich("message", {
            link: (chunks) => (
              <Link href="/polityka-prywatnosci" className="text-accent hover:underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-accent text-on-accent font-medium rounded-lg hover:bg-accent-soft transition-colors"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
