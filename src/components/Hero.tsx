"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SURVEY_URL } from "@/lib/constants";
import BrandWordmark from "./BrandWordmark";
import GearConstellation from "./GearConstellation";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[100svh] flex flex-col pt-16 overflow-hidden">
      <GearConstellation />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <BrandWordmark layout="stack" priority className="text-2xl sm:text-4xl md:text-5xl" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6"
        >
          <span className="text-foreground">{t("headline1")} </span>
          <span className="text-accent">{t("headline2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg sm:text-xl text-muted mb-10 max-w-2xl mx-auto"
        >
          {t("mission1")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#o-nas"
            className="px-8 py-4 rounded-lg border-2 border-accent text-foreground font-semibold hover:bg-accent/10 transition-colors w-full sm:w-auto text-center"
          >
            {t("secondaryCta")}
          </a>
          <a
            href={SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent-soft transition-colors w-full sm:w-auto text-center"
          >
            {t("primaryCta")}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.32 }}
        className="relative z-10 flex justify-center pb-6"
      >
        <a
            href="#o-nas"
          className="inline-flex flex-col items-center gap-1 text-accent hover:text-accent-soft transition-colors mx-auto"
        >
          <span className="text-sm">{t("scroll")}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="motion-safe:animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
