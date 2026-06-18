import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { ProgramCard } from "@/components/site/ProgramCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FAQ } from "@/components/site/FAQ";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { JoinNowButton } from "@/components/site/CTAButton";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "البرامج — ملاك عرنوس" },
      { name: "description", content: "Three coaching programs: The Shift (8wk on-ramp), Heal & Recieve (16wk signature), Coming Soon.. (12mo athlete-level partnership)." },
      { property: "og:title", content: "Programs — Atlas Coaching" },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow={t.programs.eyebrow} title={t.programs.headingPage} highlight={t.programs.headingHighlight} description={t.programs.pageDescription} align="center" />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid lg:grid-cols-3 gap-6 items-stretch">
          {t.programs.items.map((p, i) => <ProgramCard key={p.slug} program={p} index={i} />)}
        </div>
        <div className="container-x mt-12 text-center"><JoinNowButton size="lg" /></div>
      </section>

      <section className="section-y bg-surface border-y border-border">
        <div className="container-x">
          <SectionHeader eyebrow={t.testimonials.carouselEyebrow} title={t.testimonials.carouselTitle} highlight={t.testimonials.carouselHighlight} align="center" />
          <div className="mt-16"><TestimonialCarousel /></div>
        </div>
      </section>

      <TelegramCTA />

      <section className="section-y border-t border-border">
        <div className="container-x">
          <SectionHeader eyebrow={t.faq.eyebrow} title={t.faq.title} highlight={t.faq.highlight} align="center" />
          <div className="mt-12 max-w-3xl mx-auto"><FAQ items={t.faq.items} /></div>
          <FadeIn><div className="mt-12 text-center"><JoinNowButton size="lg" /></div></FadeIn>
        </div>
      </section>
    </>
  );
}
