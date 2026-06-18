import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import coachImg from "@/assets/coach.jpg";
import { brand, statValues } from "@/data/content";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Counter } from "@/components/site/Counter";
import { CTAButton, JoinNowButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "My Story — Atlas Coaching" },
      { name: "description", content: "Meet the coach behind 1,240+ women's transformations. The journey, the mission, the method." },
      { property: "og:title", content: "My Story — Atlas Coaching" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  const labels = [t.stats.coached, t.stats.retention, t.stats.transformation, t.stats.experience];
  return (
    <>
      <section className="section-y relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div className="space-y-7">
            <span className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-ember" />{t.story.eyebrow}</span>
            <h1 className="display-xl">{t.story.title1}<br /><span className="text-serif-italic ember-text normal-case">{t.story.title2}</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.story.p1}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{t.story.p2}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <JoinNowButton size="lg" />
              <Link to="/survey"><CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4" />}>{t.cta.takeSurvey}</CTAButton></Link>
              <a href={brand.instagram} target="_blank" rel="noreferrer"><CTAButton variant="ghost">{brand.instagramHandle}</CTAButton></a>
            </div>
          </div>
          <FadeIn>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <img src={coachImg} alt={t.story.coachName} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-6 inset-x-6">
                <div className="font-display text-3xl">{t.story.coachName}</div>
                <div className="text-xs uppercase tracking-widest text-ember mt-1">{t.story.methodEyebrow}</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-y bg-surface border-y border-border">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {statValues.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="text-center lg:text-start">
                <div className="display-lg ember-text mb-2"><Counter value={s.value} suffix={s.suffix} /></div>
                <div className="eyebrow text-muted-foreground">{labels[i]}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow={t.story.methodEyebrow} title={t.story.methodTitle} highlight={t.story.methodHighlight} description={t.story.methodDesc} />
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {t.story.pillars.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-8 lg:p-10 rounded-sm bg-surface border border-border hover-lift h-full">
                  <div className="font-display text-5xl ember-text mb-5">0{i + 1}</div>
                  <h3 className="display-md mb-3">{p.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
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
