import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { AssessmentForm } from "@/components/site/AssessmentForm";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/survey")({
  head: () => ({
    meta: [
      { title: "Free Coaching Survey — Atlas Coaching" },
      { name: "description", content: "Take the free 2-minute assessment and get matched with the right coaching program in 24 hours." },
      { property: "og:title", content: "Free Coaching Survey — Atlas" },
      { property: "og:url", content: "/survey" },
    ],
    links: [{ rel: "canonical", href: "/survey" }],
  }),
  component: SurveyPage,
});

function SurveyPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow={t.survey.eyebrow} title={t.survey.title} highlight={t.survey.highlight} description={t.survey.description} align="center" />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x max-w-3xl">
          <FadeIn>
            <div className="p-8 md:p-12 rounded-sm bg-surface border border-border">
              <AssessmentForm />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-y bg-surface border-y border-border">
        <div className="container-x">
          <SectionHeader eyebrow={t.testimonials.carouselEyebrow} title={t.testimonials.carouselTitle} highlight={t.testimonials.carouselHighlight} align="center" />
          <div className="mt-16"><TestimonialCarousel /></div>
        </div>
      </section>

      <TelegramCTA />
    </>
  );
}
