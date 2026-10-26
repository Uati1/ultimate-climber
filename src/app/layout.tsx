import type { Metadata } from "next";
import { Josefin_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Ultimate Climber · Plany i trening wspinaczkowy",
  description:
    "Budujemy aplikację wspierającą Twój trening. Ułożysz plan, zapiszesz sesje, resty i przeciążenia. Wahasz się, czy zwiększyć obciążenie, albo coś zaczęło Cię ciągnąć w palcu i zastanawiasz się, czy odpuścić? Sloper, asystent AI, podpowie, co robić i kiedy lepiej skonsultować to ze specjalistą.",
  icons: {
    icon: [{ url: "/assets/alt-logo.png", type: "image/png" }],
    apple: [{ url: "/assets/alt-logo.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${plusJakarta.variable} ${josefin.variable} antialiased`}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--surface)",
              color: "var(--foreground)",
              border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
            },
            success: {
              iconTheme: { primary: "var(--accent)", secondary: "var(--background)" },
            },
            error: { iconTheme: { primary: "#ef4444", secondary: "var(--background)" } },
          }}
        />
      </body>
    </html>
  );
}
