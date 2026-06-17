import { Link } from "@tanstack/react-router";
import { Instagram, Send, Youtube, Mail, MapPin } from "lucide-react";
import { brand } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="container-x py-20">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div className="space-y-5 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-sm ember-gradient grid place-items-center font-display text-background text-xl">A</div>
              <span className="font-display text-xl tracking-widest">{brand.name}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{brand.description}</p>
            <div className="flex items-center gap-3 pt-2">
              <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href={brand.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="w-10 h-10 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"><Send className="w-4 h-4" /></a>
              <a href={brand.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="w-10 h-10 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          <FooterCol title="Coaching">
            <Link to="/programs" className="footer-link">All Programs</Link>
            <Link to="/programs" className="footer-link">Ignite</Link>
            <Link to="/programs" className="footer-link">Transform</Link>
            <Link to="/programs" className="footer-link">Elite</Link>
          </FooterCol>

          <FooterCol title="About">
            <Link to="/about" className="footer-link">The Method</Link>
            <Link to="/transformations" className="footer-link">Results</Link>
            <Link to="/contact" className="footer-link">Apply</Link>
            <a href={brand.telegram} target="_blank" rel="noreferrer" className="footer-link">Free Community</a>
          </FooterCol>

          <FooterCol title="Contact">
            <a href={`mailto:${brand.email}`} className="footer-link flex items-center gap-2"><Mail className="w-3.5 h-3.5" />{brand.email}</a>
            <span className="footer-link flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{brand.location}</span>
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="footer-link flex items-center gap-2"><Instagram className="w-3.5 h-3.5" />{brand.instagramHandle}</a>
          </FooterCol>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {brand.full}. All rights reserved.</p>
          <p className="uppercase tracking-widest">Built for the strong.</p>
        </div>
      </div>

      <style>{`.footer-link { display: block; color: var(--color-muted-foreground); font-size: 0.875rem; transition: color 0.2s; }
        .footer-link:hover { color: var(--color-ember); }`}</style>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="eyebrow text-foreground mb-5">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
