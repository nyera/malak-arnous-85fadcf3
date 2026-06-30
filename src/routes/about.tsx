import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import portraitAsset from "@/assets/malak-portrait.png.asset.json";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTAButton, JoinNowButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { TestimonialsPreview } from "@/components/site/TestimonialsPreview";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من أنا — ملاك عرنوس" },
      { name: "description", content: "ملاك عرنوس — Nervous System-Based Emotional Eating and Weight Loss Expert." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="section-y">
        <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
          <div className="space-y-6">
            <span className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-ember" />{t.about.eyebrow}</span>
            <h1 className="display-xl">{t.about.title}</h1>
            <p className="text-base text-ember text-serif-italic">{t.about.subtitle}</p>
            <p className="text-lg text-foreground leading-relaxed">{t.about.intro}</p>
            <p className="text-muted-foreground leading-relaxed">{t.about.p1}</p>
            <p className="text-muted-foreground leading-relaxed">{t.about.p2}</p>
          </div>
          <FadeIn>
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden lg:sticky lg:top-28">
              <img src={portraitAsset.url} alt="ملاك عرنوس" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-y bg-surface border-y border-border">
        <div className="container-x max-w-4xl">
          <SectionHeader eyebrow="المنهجية" title={t.about.methodTitle} highlight="" />
          <p className="text-lg text-muted-foreground leading-relaxed mt-6">{t.about.methodIntro}</p>
          <ul className="mt-10 grid sm:grid-cols-2 gap-4">
            {t.about.pillars.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <li className="flex items-start gap-3 p-6 rounded-sm bg-background border border-border">
                  <Check className="w-5 h-5 text-ember shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed">{p}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x max-w-3xl space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">{t.about.p3}</p>
          <p className="display-md text-serif-italic ember-text">{t.about.p4}</p>
          <p className="text-lg text-foreground leading-relaxed">{t.about.p5}</p>
          <div className="flex flex-wrap gap-4 pt-4">
            <JoinNowButton size="lg" />
            <Link to="/story"><CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4" />}>{t.nav.story}</CTAButton></Link>
          </div>
        </div>
      </section>

      <TestimonialsPreview />
      <TelegramCTA />
    </>
  );
}
