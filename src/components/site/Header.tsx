import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Send, Menu, X, Globe } from "lucide-react";
import { brand } from "@/data/content";
import { JoinNowButton } from "./CTAButton";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t, lang, toggleLang } = useI18n();

  const nav = [
    { to: "/", label: t.nav.home },
    { to: "/programs", label: t.nav.programs },
    { to: "/transformations", label: t.nav.results },
    { to: "/about", label: t.nav.story },
    { to: "/survey", label: t.nav.survey },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 transition-all duration-500",
      scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent",
    )}>
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-full ember-gradient grid place-items-center font-display text-background text-lg italic">M</div>
          <span className="font-display text-2xl tracking-tight">{brand.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative px-3 py-2 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors",
                  active ? "text-ember" : "text-foreground/70 hover:text-foreground",
                )}
              >
                {item.label}
                {active && <motion.span layoutId="nav-underline" className="absolute start-3 end-3 -bottom-0.5 h-px bg-ember" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-widest font-semibold text-foreground/70 hover:text-ember transition-colors"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "ع" : "EN"}
          </button>
          <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 text-foreground/70 hover:text-ember transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href={brand.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="p-2 text-foreground/70 hover:text-ember transition-colors">
            <Send className="w-4 h-4 rtl:-scale-x-100" />
          </a>
          <JoinNowButton size="sm" />
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <button onClick={toggleLang} className="px-2 py-2 text-[11px] uppercase tracking-widest font-semibold text-foreground/70" aria-label="Toggle language">
            {lang === "en" ? "ع" : "EN"}
          </button>
          <button onClick={() => setOpen((v) => !v)} className="p-2 text-foreground" aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="container-x py-6 flex flex-col gap-1">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} className="py-3 text-lg font-display uppercase tracking-wide border-b border-border">
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-5">
                <a href={brand.instagram} target="_blank" rel="noreferrer" className="p-3 rounded-sm border border-border"><Instagram className="w-4 h-4" /></a>
                <a href={brand.telegram} target="_blank" rel="noreferrer" className="p-3 rounded-sm border border-border"><Send className="w-4 h-4 rtl:-scale-x-100" /></a>
                <div className="flex-1"><JoinNowButton size="sm" className="w-full" /></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
