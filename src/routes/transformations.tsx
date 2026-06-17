import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { transformationImages, instagramPosts, testimonialMeta } from "@/data/content";
import { SectionHeader } from "@/components/site/SectionHeader";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { InstagramGrid } from "@/components/site/InstagramGrid";
import { JoinNowButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/transformations")({
  head: () => ({
    meta: [
      { title: "Testimonials — Atlas Coaching" },
      { name: "description", content: "Real women, real results. Browse transformations, video stories, Instagram reviews and written testimonials." },
      { property: "og:title", content: "Testimonials" },
      { property: "og:url", content: "/transformations" },
      { property: "og:image", content: transformationImages[0].after },
    ],
    links: [{ rel: "canonical", href: "/transformations" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  const items = t.testimonials.items.map((it, i) => ({ ...it, avatar: testimonialMeta[i].avatar }));
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow={t.results.eyebrow} title={t.results.pageTitle} highlight={t.results.pageHighlight} description={t.results.pageDesc} align="center" />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.transformItems.map((tr, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="space-y-4">
                <BeforeAfter before={transformationImages[i].before} after={transformationImages[i].after} alt={tr.name} />
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-2xl uppercase truncate">{tr.name}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">{tr.weeks} {t.common.weeks}</div>
                  </div>
                  <span className="eyebrow text-ember px-3 py-1.5 rounded-sm bg-ember/10 shrink-0">-{tr.lost}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section-y bg-surface border-y border-border">
        <div className="container-x">
          <SectionHeader eyebrow={t.results.videoEyebrow} title={t.results.videoTitle} highlight={t.results.videoHighlight} description={t.results.videoDesc} />
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {instagramPosts.slice(0, 3).map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative aspect-[3/4] rounded-sm overflow-hidden cursor-pointer">
                  <img src={img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="w-16 h-16 rounded-full ember-gradient grid place-items-center shadow-ember group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-background fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-5 inset-x-5">
                    <div className="font-display text-xl uppercase">{items[i].name}</div>
                    <div className="text-xs text-ember uppercase tracking-widest">{items[i].result}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow={t.testimonials.eyebrow} title={t.results.writtenTitle} highlight={t.results.writtenHighlight} />
          <div className="mt-16 columns-1 md:columns-2 lg:columns-3 gap-6">
            {items.map((tt, i) => <TestimonialCard key={i} t={tt} index={i} />)}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x"><InstagramGrid /></div>
      </section>

      <TelegramCTA />

      <section className="section-y">
        <div className="container-x text-center max-w-2xl">
          <h2 className="display-lg mb-6">{t.results.yourStory} <span className="text-serif-italic ember-text normal-case">{t.results.yourStoryHighlight}</span> {t.results.yourStoryRest}</h2>
          <p className="text-lg text-muted-foreground mb-8">{t.results.yourStoryDesc}</p>
          <JoinNowButton size="lg" />
        </div>
      </section>
    </>
  );
}
