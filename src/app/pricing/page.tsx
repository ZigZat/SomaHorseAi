import { FloatingNav } from "@/components/home/floating-nav";
import { Footer } from "@/components/home/footer";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { PricingTiers } from "@/components/pricing/pricing-tiers";
import { RevenueSplit } from "@/components/pricing/revenue-split";
import { PricingFAQ } from "@/components/pricing/pricing-faq";

export default function PricingPage() {
  return (
    <>
      <FloatingNav />
      <main>
        <PricingHero />
        <PricingTiers />
        <RevenueSplit />
        <PricingFAQ />
      </main>
      <Footer />
    </>
  );
}
