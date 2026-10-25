import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import SurveyCta from "@/components/SurveyCta";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="atmosphere absolute inset-0" />
        <div className="atmosphere-shift absolute inset-0" />
      </div>
      <Header />
      <main className="relative z-10">
        <Hero />
        <Benefits />
        <SurveyCta />
        <Newsletter />
        <Footer />
      </main>
    </div>
  );
}
