import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Youtube } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTAButton, JoinNowButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";
import { TAPPING_PAY_URL, brand } from "@/data/content";


export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "الخدمات — ملاك عرنوس" },
      { name: "description", content: "خدمات ملاك عرنوس: The Weight Shift, Heal and Receive, خدمة كتابة الـ Tapping Script, Tapping Circle, جلسات فردية، استشارات، وكورس Break Free." },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow={t.services.eyebrow} title={t.services.title} highlight="" description={t.services.description} align="center" />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid md:grid-cols-2 gap-6 items-stretch">
          {t.services.items.map((s, i) => (
            <FadeIn key={s.slug} delay={i * 0.08}>
              <div className="p-8 lg:p-10 rounded-sm border border-border bg-surface hover-lift h-full flex flex-col">
                <h3 className="display-md mb-3">{s.name}</h3>
                <p className="text-serif-italic text-ember text-xl mb-4 leading-snug">{s.tagline}</p>
                <p className="text-muted-foreground leading-relaxed flex-1">{s.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {s.link ? (
                    <Link to={s.link}><CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4" />}>{t.cta.readMore}</CTAButton></Link>
                  ) : null}
                  {s.slug === "tapping-script" ? (
                    <CTAButton href={TAPPING_PAY_URL} external size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                      {t.tappingScript.ctaOrder}
                    </CTAButton>
                  ) : (
                    <JoinNowButton size="sm" />
                  )}
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
        <div className="container-x mt-10 text-center">
          <a
            href={brand.youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ember transition-colors"
          >
            <Youtube className="w-4 h-4 text-ember" />
            {t.freeContent.servicesLine}
          </a>
        </div>
      </section>

      <TelegramCTA />
    </>
  );
}
