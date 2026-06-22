import { FloatingNav } from "@/components/home/floating-nav";
import { Hero } from "@/components/home/hero";
import { LogoCloud } from "@/components/home/logo-cloud";
import { HowItWorks } from "@/components/home/how-it-works";
import { IntelligenceBand } from "@/components/home/intelligence-band";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { FinalCTA } from "@/components/home/final-cta";
import { Footer } from "@/components/home/footer";

import Image from "next/image";

export default function Home() {
  return (
        <>
      <FloatingNav />
      <main>
        <Hero />
        <LogoCloud />
        <HowItWorks />
        <IntelligenceBand />
        <MetricsStrip />
        <FinalCTA />
      </main>
         <Footer />
    </>
  );
}