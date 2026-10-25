"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function UnsubscribePage() {
  const t = useTranslations("unsubscribe");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setMessage(t("success"));

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : t("error"));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-12"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t("backToHome")}
        </Link>

        <div className="p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">{t("title")}</h1>
          <p className="text-muted text-sm mb-8">{t("description")}</p>

          {status === "success" ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-green-400">{t("success")}</p>
                  <p className="text-sm text-muted mt-1">{t("redirecting")}</p>
                </div>
              </div>
              <Link
                href="/"
                className="block text-center py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent-soft transition-colors"
              >
                {t("returnHome")}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">
                  {t("emailLabel")}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-lg bg-surface border border-foreground/10 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                  disabled={status === "loading"}
                />
              </div>

              {message && <p className="text-sm text-red-400">{message}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? t("processing") : "Unsubscribe"}
              </button>
            </form>
          )}
        </div>

        <p className="text-muted text-xs text-center mt-8">
          © {new Date().getFullYear()} ProVolley · Analytics platform for volleyball clubs &
          academies
        </p>
      </div>
    </div>
  );
}
