"use client";

import ScrollSection from "./ScrollSection";
import ScrollReveal from "./ScrollReveal";
import { useTranslations } from "next-intl";

const ITEM_KEYS = ["plans", "load", "share", "tests"] as const;

export default function Benefits() {
  const t = useTranslations("benefits");

  return (
    <ScrollSection>
      <section id="o-nas" className="relative py-20 px-6 scroll-mt-20">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-16">
            <ScrollReveal direction="up">
              <p className="text-accent text-sm font-medium uppercase tracking-wider mb-2">
                {t("label")}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">{t("title")}</h2>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12 max-w-5xl mx-auto">
            {ITEM_KEYS.map((key, index) => (
              <ScrollReveal key={key} delay={index * 0.08} direction="up" className="h-full">
                <div className="h-full text-left border-t border-accent/25 pt-6">
                  <h3 className="text-xl font-bold text-accent mb-3">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </ScrollSection>
  );
}
