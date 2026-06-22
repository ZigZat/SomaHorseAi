import type { Metadata } from "next";
import Link from "next/link";
import { FloatingNav } from "@/components/home/floating-nav";
import { Footer } from "@/components/home/footer";
import { DeveloperFAQ } from "./developer-faq";
import { ArrowUpRight, UserPlus, ClipboardCheck, MessageSquareCode, PartyPopper, Coins, Cpu, Eye, GitPullRequest } from "lucide-react";

export const metadata: Metadata = {
  title: "Join our Developer Network — Somahorse.ai",
  description: "Build robust AI infrastructure and software for African agricultural supply chains. Apply to join our vetted developer network today.",
};

const BENEFITS = [
  {
    icon: Cpu,
    title: "AI-Powered Scoping",
    desc: "No more ambiguous requirements. Our AI engine scopes agricultural problems into clear, structured milestones so you can focus strictly on writing great code.",
  },
  {
    icon: Coins,
    title: "Milestone Escrow Payouts",
    desc: "All projects are fully funded in escrow before development starts. Get weekly payouts automatically approved and paid out as soon as code passes testing.",
  },
  {
    icon: GitPullRequest,
    title: "Automated DevOps Loop",
    desc: "Deploy code and let our automated AI system handle telemetry, deployment, and minor bug patching. Sleep peacefully without production crash alerts.",
  },
  {
    icon: Eye,
    title: "Impactful Work",
    desc: "Build software that keeps critical food logistics moving. Track weights, manage distributors, coordinate cooperative farmers, and improve livelihood transparency.",
  },
] as const;

const PIPELINE = [
  {
    step: "01",
    title: "Apply & Scoping",
    desc: "Create an account, specify your tech stack (Next.js, Python, PostgreSQL, APIs), and link your GitHub profile. Our team reviews profile applications within 48 hours.",
    icon: UserPlus,
    badgeColor: "bg-blue-light text-navy-mid",
  },
  {
    step: "02",
    title: "Technical Sandbox",
    desc: "Complete a custom coding assignment simulating real agricultural logistics (e.g. offline-first inventory syncing, offline coordinate mapping, or supply-chain queues).",
    icon: ClipboardCheck,
    badgeColor: "bg-accent-teal/15 text-accent-teal",
  },
  {
    step: "03",
    title: "Live Review",
    desc: "A 45-minute live technical and architecture interview with a core Somahorse system builder to discuss your assessment, tech decisions, and workflow.",
    icon: MessageSquareCode,
    badgeColor: "bg-accent-amber/15 text-accent-amber",
  },
  {
    step: "04",
    title: "Certified Onboarding",
    desc: "Welcome to the developer network! Get matched with funded projects, deploy code with AI safety nets, and receive automated milestone payouts.",
    icon: PartyPopper,
    badgeColor: "bg-blue-vivid/15 text-blue-vivid",
  },
] as const;

export default function DevelopersPage() {
  return (
    <>
      <FloatingNav />
      
      <main className="relative min-h-screen bg-background hero-field dotted-grid pt-24 sm:pt-28 overflow-hidden">
        {/* Background radial spotlights */}
        <div className="pointer-events-none absolute left-1/2 top-12 size-[650px] -translate-x-1/2 rounded-full bg-blue-sky/15 blur-[130px]" />
        <div className="pointer-events-none absolute right-10 top-1/3 size-[500px] rounded-full bg-navy-mid/10 blur-[130px]" />
        <div className="pointer-events-none absolute -left-20 bottom-1/4 size-[550px] rounded-full bg-blue-light/50 blur-[130px]" />

        {/* Hero Section */}
        <section className="relative px-6 py-16 sm:py-24 text-center max-w-5xl mx-auto z-10">
          <span className="cue inline-block px-3.5 py-1.5 rounded-full border border-blue-vivid/20 bg-blue-light/60 text-navy-mid font-semibold text-xs animate-fade-up">
            Vetted Developer Pool
          </span>
          <h1 className="h-hero text-gradient mt-6 tracking-tight font-display animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Build the future of African Agriculture
          </h1>
          <p className="lead mt-6 max-w-3xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Join a certified network of software engineers building high-impact tech infrastructure. Describe your tech background, complete a sandbox challenge, and get matched with funded supply-chain projects.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/signup?role=developer"
              className="w-full sm:w-auto min-h-12 flex items-center justify-center gap-1.5 rounded-full bg-navy-mid px-8 text-sm font-semibold text-white shadow-glow transition hover:bg-navy hover:scale-[1.02]"
            >
              Apply to join <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="#pipeline"
              className="w-full sm:w-auto min-h-12 flex items-center justify-center rounded-full border border-border-strong bg-white/80 px-8 text-sm font-semibold text-navy transition hover:bg-blue-mist"
            >
              See how it works
            </Link>
          </div>
        </section>

        {/* Value Props Section */}
        <section className="relative px-6 py-16 border-t border-border bg-white/40 backdrop-blur-md z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="cue text-muted-foreground">The Developer Experience</span>
              <h2 className="h-section text-navy font-display mt-2">Engineered for builders, backed by AI</h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={idx}
                    className="group relative rounded-3xl border border-border/80 bg-white/70 p-6 shadow-soft transition hover:border-border-strong hover:bg-white hover:shadow-card hover:-translate-y-1 duration-300"
                  >
                    <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-blue-light text-navy-mid mb-5 group-hover:bg-blue-vivid group-hover:text-white transition-colors duration-300">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-navy mb-2">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stepper Timeline Section */}
        <section id="pipeline" className="relative px-6 py-20 sm:py-28 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="cue text-navy-mid">Onboarding Process</span>
              <h2 className="h-section text-navy font-display mt-2">Your journey to joining Somahorse</h2>
              <p className="lead max-w-xl mx-auto mt-4">
                We maintain a vetted network of premium engineers. Here is the 4-step pipeline to get certified.
              </p>
            </div>

            <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Stepper Connecting Lines (Desktop only) */}
              <div className="hidden lg:block absolute top-12 left-8 right-8 h-0.5 bg-border -z-10" />

              {PIPELINE.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative flex flex-col items-start bg-white/80 border border-border/80 rounded-3xl p-6 sm:p-7 shadow-card">
                    {/* Step badge & icon */}
                    <div className="flex w-full items-center justify-between mb-5">
                      <div className={`flex size-12 items-center justify-center rounded-2xl ${step.badgeColor} shadow-soft`}>
                        <Icon className="size-6" />
                      </div>
                      <span className="font-display text-3xl font-extrabold text-navy/10 leading-none select-none">
                        {step.step}
                      </span>
                    </div>

                    {/* Step Details */}
                    <h3 className="font-display text-lg font-bold text-navy mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="dev-faq" className="relative px-6 py-20 bg-white/40 border-t border-border backdrop-blur-md z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="cue text-muted-foreground">Common Inquiries</span>
              <h2 className="h-section text-navy font-display mt-2">Frequently Asked Questions</h2>
            </div>
            <DeveloperFAQ />
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="relative px-6 py-24 z-10">
          <div className="max-w-5xl mx-auto overflow-hidden rounded-[34px] border border-border bg-white px-6 py-16 text-center shadow-card sm:px-12 sm:py-20 relative">
            {/* Ambient background blur */}
            <div className="pointer-events-none absolute left-1/2 top-0 size-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-light/70 blur-[120px]" />
            
            <div className="relative">
              <span className="cue text-navy-mid">Take the first step</span>
              <h2 className="h-section mx-auto max-w-3xl text-balance mt-3">
                Ready to build resilient digital infrastructure?
              </h2>
              <p className="lead mx-auto mt-5 max-w-2xl">
                Apply today, pass our logistics coding sandbox, and start earning by solving high-impact supply chain challenges.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center">
                <Link
                  href="/signup?role=developer"
                  className="w-full sm:w-auto min-h-12 flex items-center justify-center gap-1.5 rounded-full bg-navy-mid px-8 text-sm font-semibold text-white shadow-glow transition hover:bg-navy hover:scale-[1.02]"
                >
                  Join Network <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href="/"
                  className="w-full sm:w-auto min-h-12 flex items-center justify-center rounded-full border border-border-strong bg-white px-8 text-sm font-semibold text-navy transition hover:bg-blue-mist"
                >
                  Back to homepage
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
