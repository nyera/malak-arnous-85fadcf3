import { Link } from "@tanstack/react-router";
import { Instagram, Send, Mail, MapPin } from "lucide-react";
import { brand } from "@/data/content";
import { useI18n } from "@/i18n/I18nProvider";
import logoAsset from "@/assets/logo.png.asset.json";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="container-x py-20">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div className="space-y-5 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-full bg-ember/10 grid place-items-center overflow-hidden">
                <img src={logoAsset.url} alt={brand.name} className="w-9 h-9 object-contain" style={{ filter: "invert(35%) sepia(45%) saturate(900%) hue-rotate(330deg)" }} />
              </div>
              <span className="font-display text-2xl tracking-tight">{brand.name}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.hero.description}</p>
            <div className="flex items-center gap-3 pt-2">
              <a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href={brand.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" className="w-10 h-10 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"><Send className="w-4 h-4 rtl:-scale-x-100" /></a>
              <a href={`mailto:${brand.email}`} aria-label="Email" className="w-10 h-10 grid place-items-center rounded-sm border border-border hover:border-ember hover:text-ember transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

          <FooterCol title={t.footer.coaching}>
            <Link to="/programs" className="footer-link">{t.nav.services}</Link>
            <Link to="/the-shift" className="footer-link">{t.nav.theShift}</Link>
            <Link to="/testimonials" className="footer-link">آراء العملاء</Link>
            <Link to="/survey" className="footer-link">{t.nav.survey}</Link>
            <a href={brand.telegram} target="_blank" rel="noreferrer" className="footer-link">{t.footer.free}</a>
          </FooterCol>

          <FooterCol title={t.footer.about}>
            <Link to="/about" className="footer-link">{t.nav.about}</Link>
            <Link to="/story" className="footer-link">{t.nav.story}</Link>
            
          </FooterCol>

          <FooterCol title={t.footer.contact}>
            <a href={`mailto:${brand.email}`} className="footer-link inline-flex items-center gap-2.5 leading-relaxed">
              <Mail className="w-4 h-4 shrink-0 text-ember" aria-hidden />
              <span>{brand.email}</span>
            </a>
            <span className="footer-link inline-flex items-center gap-2.5 leading-relaxed">
              <MapPin className="w-4 h-4 shrink-0 text-ember" aria-hidden />
              <span>{t.common.onlineWorldwide}</span>
            </span>
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="footer-link inline-flex items-center gap-2.5 leading-relaxed">
              <Instagram className="w-4 h-4 shrink-0 text-ember" aria-hidden />
              <span>{brand.instagramHandle}</span>
            </a>
            <a href={brand.telegram} target="_blank" rel="noreferrer" className="footer-link inline-flex items-center gap-2.5 leading-relaxed">
              <Send className="w-4 h-4 shrink-0 text-ember rtl:-scale-x-100" aria-hidden />
              <span>{brand.telegramHandle}</span>
            </a>
          </FooterCol>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">تابعونا على إنستجرام لمزيد من الآراء والتحديثات</p>
          <a
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-ember/30 bg-ember/5 hover:bg-ember hover:text-background hover:border-ember transition-all duration-500 text-xs font-medium tracking-wide"
          >
            <Instagram className="w-3.5 h-3.5" />
            {brand.instagramHandle}
          </a>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
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
