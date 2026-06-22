"use client";
 
import { ArrowUpRight, Menu, ShieldCheck, UserRound, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
 
const EASE = [0.16, 1, 0.3, 1] as const;
 
const NAV = [
  { href: "/#platform", label: "Platform" },
  { href: "/#agriculture", label: "Agriculture" },
  { href: "/developers", label: "For Developers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];
 
export function FloatingNav() {
  const pathname = usePathname();
  const isDevPage = pathname === "/developers";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
 
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));
 
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
 
  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className={[
          "mx-auto flex w-full items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-500",
          scrolled
            ? "max-w-3xl border-border bg-white/85 shadow-nav backdrop-blur-xl"
            : "max-w-5xl border-border/60 bg-white/65 shadow-soft backdrop-blur-md",
        ].join(" ")}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2 pl-1">
          <Image
            src="/somahorse-logo.png"
            alt="Somahorse.ai"
            width={34}
            height={34}
            className="size-8 rounded-full object-contain"
            priority
          />
          <span className="font-display text-[15px] font-bold tracking-tight text-navy">
            Somahorse<span className="text-blue-vivid">.ai</span>
          </span>
        </Link>
 
        <ul className="hidden items-center gap-1.5 lg:flex">
          {NAV.map((item) => (
            <li key={item.href} className="px-1">
              <Link
                href={item.href}
                className="relative py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-navy group"
              >
                {item.label}
                <span className={`absolute left-0 -bottom-0.5 h-[2px] w-full rounded-full bg-blue-vivid transition-all duration-300 origin-center ${
                  pathname === item.href
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                }`} />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#protection"
              className="ml-1 flex items-center gap-1.5 rounded-full bg-blue-light px-3 py-1.5 text-sm font-semibold text-navy-mid ring-1 ring-navy-mid/15 transition hover:bg-blue-vivid/15"
            >
              <ShieldCheck className="size-3.5" aria-hidden />
              Protection
              <ArrowUpRight className="size-3" aria-hidden />
            </Link>
          </li>
        </ul>
 
        <div className="hidden items-center gap-1.5 lg:flex">
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:text-navy"
          >
            <UserRound className="size-4" aria-hidden />
            Sign in
          </Link>
          <Link
            href={isDevPage ? "/signup?role=developer" : "#start"}
            className="rounded-full bg-navy-mid px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-navy"
          >
            {isDevPage ? "Sign up" : "Start a project"}
          </Link>
        </div>
 
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="grid size-9 place-items-center rounded-full text-navy transition hover:bg-blue-mist lg:hidden"
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </nav>
 
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/97 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between p-5">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <Image src="/somahorse-logo.png" alt="" width={34} height={34} className="size-8 rounded-full object-contain" />
                <span className="font-display text-lg font-bold text-navy">
                  Somahorse<span className="text-blue-vivid">.ai</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-xl border border-border"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
 
            <ul className="flex flex-col gap-1 px-5 pt-2">
              {[...NAV, { href: "#protection", label: "Protection" }].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 font-display text-xl font-semibold text-navy hover:bg-blue-mist"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
 
            <div className="mt-6 flex flex-col gap-3 px-5">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-4 py-3 text-center text-sm font-semibold text-navy"
              >
                Sign in
              </Link>
              <Link
                href={isDevPage ? "/signup?role=developer" : "#start"}
                onClick={() => setOpen(false)}
                className="rounded-full bg-navy-mid px-4 py-3 text-center text-sm font-semibold text-white"
              >
                {isDevPage ? "Sign up" : "Start a project"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}