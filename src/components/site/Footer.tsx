import { Link } from "@tanstack/react-router";
import { Instagram, Send, Youtube, Mail, MapPin, MessageCircle } from "lucide-react";
import { brand } from "@/data/content";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="container-x py-20">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div className="space-y-5 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full ember-gradient grid place-items-center font-display text-background text-lg italic">M</div>
              <span className="font-display text-2xl tracking-tight">{brand.name}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.hero.description}</p>
            <div className="flex items-center gap-3 pt-2">
              <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href={brand.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="w-10 h-10 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"><Send className="w-4 h-4 rtl:-scale-x-100" /></a>
              <a href={brand.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-10 h-10 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"><MessageCircle className="w-4 h-4" /></a>
              <a href={brand.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="w-10 h-10 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          <FooterCol title={t.footer.coaching}>
            <Link to="/programs" className="footer-link">{t.footer.allPrograms}</Link>
            <Link to="/survey" className="footer-link">{t.nav.survey}</Link>
            <Link to="/transformations" className="footer-link">{t.nav.results}</Link>
            <a href={brand.telegram} target="_blank" rel="noreferrer" className="footer-link">{t.footer.free}</a>
          </FooterCol>

          <FooterCol title={t.footer.about}>
            <Link to="/about" className="footer-link">{t.nav.story}</Link>
            <Link to="/about" className="footer-link">{t.footer.method}</Link>
            <Link to="/transformations" className="footer-link">{t.nav.results}</Link>
            <Link to="/contact" className="footer-link">{t.footer.apply}</Link>
          </FooterCol>

          <FooterCol title={t.footer.contact}>
            <a href={`mailto:${brand.email}`} className="footer-link flex items-center gap-2"><Mail className="w-3.5 h-3.5" />{brand.email}</a>
            <span className="footer-link flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{t.common.onlineWorldwide}</span>
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="footer-link flex items-center gap-2"><Instagram className="w-3.5 h-3.5" />{brand.instagramHandle}</a>
            <a href={brand.telegram} target="_blank" rel="noreferrer" className="footer-link flex items-center gap-2"><Send className="w-3.5 h-3.5 rtl:-scale-x-100" />{brand.telegramHandle}</a>
          </FooterCol>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {brand.full}. {t.common.rights}</p>
          <p className="uppercase tracking-widest">{t.common.builtForStrong}</p>
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
