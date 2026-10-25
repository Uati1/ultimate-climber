"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import ScrollSection from "./ScrollSection";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const CHECKBOX_REGULAMIN_FULL = (
  <>
    Potwierdzam, że zapoznałem się i akceptuję{" "}
    <Link href="/regulamin" className="text-accent hover:underline">
      regulamin strony internetowej
    </Link>{" "}
    oraz potwierdzam, że zapoznałem się z{" "}
    <Link href="/polityka-prywatnosci" className="text-accent hover:underline">
      polityką prywatności strony internetowej
    </Link>
    . Administratorem danych osobowych zbieranych za pośrednictwem strony internetowej jest Szymon
    Łatacz prowadzący działalność gospodarczą pod firmą SZYMON ŁATACZ. Dane są lub mogą być
    przetwarzane w celach oraz na podstawach wskazanych szczegółowo w polityce prywatności (np.
    realizacja umowy, marketing bezpośredni). Polityka prywatności zawiera pełną informację na temat
    przetwarzania danych przez administratora wraz z prawami przysługującymi osobie, której dane
    dotyczą. Kontakt z administratorem:{" "}
    <Link href="/polityka-prywatnosci" className="text-accent hover:underline">
      polityka prywatności
    </Link>
    .
  </>
);

const CHECKBOX_MARKETING_FULL = (
  <>
    Wyrażam zgodę na używanie mojego adresu e-mail przez właściciela strony Szymon Łatacz do celów
    przesyłania informacji handlowej w rozumieniu przepisów ustawy z dnia 18 lipca 2002 r. o
    świadczeniu usług drogą elektroniczną, w tym marketingu bezpośredniego, za pośrednictwem poczty
    elektronicznej.
  </>
);

function CollapsibleCheckbox({
  id,
  checked,
  onChange,
  summary,
  fullContent,
  expandLabel,
  collapseLabel,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  summary: React.ReactNode;
  fullContent: React.ReactNode;
  expandLabel: string;
  collapseLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-foreground/10 rounded-lg p-3 bg-surface/60">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 rounded border-foreground/20 bg-surface text-accent focus:ring-accent shrink-0"
        />
        <div className="flex-1 min-w-0">
          <span className="text-sm text-muted group-hover:text-foreground">{summary}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setExpanded((v) => !v);
            }}
            className="ml-1 text-accent hover:underline text-sm"
          >
            {expanded ? collapseLabel : expandLabel}
          </button>
        </div>
      </label>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-foreground/10 text-sm text-muted pl-8">
          {fullContent}
        </div>
      )}
    </div>
  );
}

export default function Newsletter() {
  const t = useTranslations("newsletter");
  const tToast = useTranslations("toast");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [gdprMarketing, setGdprMarketing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error(tToast("emailRequired"));
      return;
    }

    if (!gdprConsent || !gdprMarketing) {
      toast.error(tToast("gdprRequired"));
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      toast.success(tToast("success"));
      setEmail("");
      setGdprConsent(false);
      setGdprMarketing(false);
    } catch (err) {
      setStatus("idle");
      toast.error(err instanceof Error ? err.message : tToast("error"));
    }
  };

  return (
    <ScrollSection>
      <section id="newsletter" className="pt-16 pb-10 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
            {t("earlyAccess")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("title")} <span className="text-accent">{t("titleHighlight")}</span>
            <span className="block text-muted font-normal">{t("titleSuffix")}</span>
          </h2>
          <p className="text-muted mb-10">{t("description")}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-lg bg-surface border border-foreground/10 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? t("joining") : t("joinButton")}
              </button>
            </div>

            <div className="flex flex-col gap-3 text-left max-w-md mx-auto">
              <CollapsibleCheckbox
                id="gdpr-consent"
                checked={gdprConsent}
                onChange={setGdprConsent}
                summary={t.rich("checkboxRegulaminSummary", {
                  regulamin: (chunks) => (
                    <Link href="/regulamin" className="text-accent hover:underline">
                      {chunks}
                    </Link>
                  ),
                  polityka: (chunks) => (
                    <Link href="/polityka-prywatnosci" className="text-accent hover:underline">
                      {chunks}
                    </Link>
                  ),
                })}
                fullContent={CHECKBOX_REGULAMIN_FULL}
                expandLabel={t("expand")}
                collapseLabel={t("collapse")}
              />
              <CollapsibleCheckbox
                id="gdpr-marketing"
                checked={gdprMarketing}
                onChange={setGdprMarketing}
                summary={t("checkboxMarketingSummary")}
                fullContent={CHECKBOX_MARKETING_FULL}
                expandLabel={t("expand")}
                collapseLabel={t("collapse")}
              />
            </div>
          </form>

          <p className="text-muted text-sm mt-6">{t("noSpam")}</p>
        </div>
      </section>
    </ScrollSection>
  );
}
