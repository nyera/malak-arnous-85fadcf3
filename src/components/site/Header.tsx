import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Send, Youtube, Menu, X, ChevronDown } from "lucide-react";
import { brand } from "@/data/content";
import { JoinNowButton } from "./CTAButton";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import logoAsset from "@/assets/logo.png.asset.json";

type NavLink = { to: string; label: string };
type NavDropdown = { label: string; to: string; children: NavLink[] };
type NavItem = NavLink | NavDropdown;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();

  const nav: NavItem[] = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/story", label: t.nav.story },
    {
      label: t.nav.programs,
      to: "/programs",
      children: [
        { to: "/the-shift", label: t.nav.theShift },
        { to: "/heal-and-receive", label: "Heal and Receive" },
      ],
    },
    { to: "/tapping-script", label: "Tapping Script" },
    { to: "/testimonials", label: "آراء العملاء" },
    { to: "/survey", label: t.nav.survey },
  ];

  const isProgramsActive = pathname === "/programs" || pathname === "/the-shift" || pathname === "/heal-and-receive";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { console.log("pathname effect", pathname); setOpen(false); setProgramsOpen(false); }, [pathname]);

  console.log("render Header", { open, programsOpen, pathname });

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 transition-all duration-500",
      scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent",
    )}>
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-11 h-11 grid place-items-center overflow-hidden">
            <img src={logoAsset.url} alt={brand.name} className="w-10 h-10 object-contain" />
          </div>
          <span className="font-display text-2xl tracking-tight">{brand.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            if ("children" in item) {
              return (
              <div
                key={item.to}
                className="group relative"
              >
                <Link
                  to={item.to}
                  aria-haspopup="menu"
                  className={cn(
                    "relative flex items-center gap-1 px-3 py-2 text-[13px] font-semibold tracking-normal transition-colors",
                    isProgramsActive ? "text-ember" : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  {isProgramsActive && <motion.span layoutId="nav-underline" className="absolute start-3 end-3 -bottom-0.5 h-px bg-ember" />}
                </Link>
                <div className="absolute top-full start-0 pt-2 min-w-[14rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="rounded-sm border border-border bg-surface shadow-elevated overflow-hidden">
                    {item.children.map((child) => {
                      const active = pathname === child.to;
                      return (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={cn(
                            "block px-4 py-3 text-sm font-medium transition-colors border-b border-border last:border-0",
                            active ? "text-ember bg-ember/5" : "text-foreground/80 hover:text-foreground hover:bg-muted",
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              );
            }
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative px-3 py-2 text-[13px] font-semibold tracking-normal transition-colors",
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
          <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 text-foreground/70 hover:text-ember transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href={brand.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="p-2 text-foreground/70 hover:text-ember transition-colors">
            <Send className="w-4 h-4 rtl:-scale-x-100" />
          </a>
          <a href={brand.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="p-2 text-foreground/70 hover:text-ember transition-colors">
            <Youtube className="w-4 h-4" />
          </a>
          <JoinNowButton size="sm" />
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <button
            type="button"
            onClick={() => { console.log("hamburger clicked", open); setOpen((v) => !v); }}
            className="p-2 text-foreground relative z-50"
            aria-label="Toggle menu"
          >
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
              {nav.map((item) => {
                if ("children" in item) {
                  return (
                    <div key={item.to} className="border-b border-border">
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.to}
                          className={cn(
                            "py-3 text-lg font-display tracking-normal",
                            isProgramsActive ? "text-ember" : "text-foreground",
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                        <button
                          onClick={() => setProgramsOpen((v) => !v)}
                          className="p-2 text-foreground"
                          aria-label={programsOpen ? "إخفاء البرامج" : "إظهار البرامج"}
                          aria-expanded={programsOpen}
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", programsOpen && "rotate-180")} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {programsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pe-4"
                          >
                            {item.children.map((child) => {
                              const active = pathname === child.to;
                              return (
                                <Link
                                  key={child.to}
                                  to={child.to}
                                  className={cn(
                                    "block py-2 text-base transition-colors",
                                    active ? "text-ember" : "text-foreground/70 hover:text-foreground",
                                  )}
                                  onClick={() => setOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "py-3 text-lg font-display tracking-normal border-b border-border",
                      pathname === item.to ? "text-ember" : "text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-3 pt-5">
                <a href={brand.instagram} target="_blank" rel="noreferrer" className="p-3 rounded-sm border border-border"><Instagram className="w-4 h-4" /></a>
                <a href={brand.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="p-3 rounded-sm border border-border"><Send className="w-4 h-4 rtl:-scale-x-100" /></a>
                <a href={brand.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="p-3 rounded-sm border border-border"><Youtube className="w-4 h-4" /></a>
                <div className="flex-1"><JoinNowButton size="sm" className="w-full" /></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
