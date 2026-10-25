"use client";

import ScrollSection from "./ScrollSection";
import ScrollReveal from "./ScrollReveal";
import { useTranslations } from "next-intl";
import { SURVEY_URL } from "@/lib/constants";

export default function SurveyCta() {
  const t = useTranslations("surveyCta");

  return (
    <ScrollSection>
      <section id="ankieta" className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <p className="text-accent text-sm font-medium uppercase tracking-wider mb-3">
              {t("label")}
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.05}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-muted mb-8 max-w-xl mx-auto">{t("description")}</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <a
              href={SURVEY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent-soft transition-colors"
            >
              {t("cta")}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </ScrollSection>
  );
}
