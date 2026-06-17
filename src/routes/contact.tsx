import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Instagram, Send, Clock, MessageCircle } from "lucide-react";
import { brand } from "@/data/content";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ContactForm } from "@/components/site/ContactForm";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Atlas Coaching" },
      { name: "description", content: "Talk to a coach. 24-hour response on every message — or jump into the free survey to get matched." },
      { property: "og:title", content: "Contact — Atlas Coaching" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow={t.contact.eyebrow} title={t.contact.title} highlight={t.contact.highlight} description={t.contact.description} align="center" />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid lg:grid-cols-[1fr_2fr] gap-12">
          <FadeIn>
            <div className="space-y-8 lg:sticky lg:top-28">
              <div className="p-8 rounded-sm bg-surface border border-border">
                <h3 className="display-md mb-6">{t.contact.reach}</h3>
                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-ember mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="eyebrow text-muted-foreground mb-1">{t.contact.email}</div>
                      <a href={`mailto:${brand.email}`} className="hover:text-ember break-all">{brand.email}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-ember mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="eyebrow text-muted-foreground mb-1">{t.contact.based}</div>
                      <span>{t.common.onlineWorldwide}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-ember mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="eyebrow text-muted-foreground mb-1">{t.contact.response}</div>
                      <span>{t.common.response24}</span>
                    </div>
                  </li>
                </ul>
                <div className="grid grid-cols-2 gap-2 mt-7 pt-7 border-t border-border">
                  <a href={brand.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-3 py-3 rounded-sm border border-border hover:border-ember hover:text-ember text-xs uppercase tracking-widest font-semibold transition-colors"><Instagram className="w-4 h-4" /> DM</a>
                  <a href={brand.telegram} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-3 py-3 rounded-sm border border-border hover:border-ember hover:text-ember text-xs uppercase tracking-widest font-semibold transition-colors"><Send className="w-4 h-4 rtl:-scale-x-100" /> Telegram</a>
                  <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-3 py-3 rounded-sm border border-border hover:border-ember hover:text-ember text-xs uppercase tracking-widest font-semibold transition-colors"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
                  <a href={`mailto:${brand.email}`} className="flex items-center justify-center gap-2 px-3 py-3 rounded-sm border border-border hover:border-ember hover:text-ember text-xs uppercase tracking-widest font-semibold transition-colors"><Mail className="w-4 h-4" /> Email</a>
                </div>
              </div>

              <div className="p-8 rounded-sm bg-gradient-to-br from-ember/10 to-transparent border border-ember/20">
                <h4 className="font-display text-2xl uppercase mb-3">{t.common.guarantee}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.common.guaranteeBody}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="p-8 md:p-10 rounded-sm bg-surface border border-border">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-y bg-surface border-t border-border">
        <div className="container-x">
          <SectionHeader eyebrow={t.testimonials.carouselEyebrow} title={t.testimonials.carouselTitle} highlight={t.testimonials.carouselHighlight} align="center" />
          <div className="mt-16"><TestimonialCarousel /></div>
        </div>
      </section>
    </>
  );
}
