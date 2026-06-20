import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTAButton, JoinNowButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";
import portraitAsset from "@/assets/malak-portrait.png.asset.json";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "قصتي — ملاك عرنوس" },
      { name: "description", content: "قصة ملاك عرنوس مع الأكل العاطفي والوزن والشفاء." },
    ],
    links: [{ rel: "canonical", href: "/story" }],
  }),
  component: StoryPage,
});

function StoryPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow={t.story.eyebrow} title={t.story.title} highlight="" align="center" />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <FadeIn>
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden lg:sticky lg:top-28">
              <img src={portraitAsset.url} alt="ملاك عرنوس" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </FadeIn>
          <div className="space-y-6 max-w-2xl">
            {t.story.paragraphs.map((p, i) => (
              <FadeIn key={i} delay={Math.min(i * 0.04, 0.3)}>
                <p className={i === 0 ? "display-md text-serif-italic ember-text" : "text-lg text-foreground/90 leading-relaxed"}>
                  {p}
                </p>
              </FadeIn>
            ))}
            <div className="flex flex-wrap gap-4 pt-6">
              <JoinNowButton size="lg" />
              <Link to="/the-shift"><CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4" />}>{t.nav.theShift}</CTAButton></Link>
            </div>
          </div>
        </div>
      </section>

      <TelegramCTA />
    </>
  );
}
