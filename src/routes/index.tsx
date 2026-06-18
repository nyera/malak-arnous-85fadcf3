import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Instagram, Send, Sparkles, ArrowRight } from "lucide-react";
import { useRef } from "react";

import heroImg from "@/assets/hero.jpg";
import { brand, statValues, testimonialMeta, transformationImages } from "@/data/content";
import { useI18n } from "@/i18n/I18nProvider";

import { CTAButton, JoinNowButton } from "@/components/site/CTAButton";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Counter } from "@/components/site/Counter";
import { ProgramCard } from "@/components/site/ProgramCard";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { FAQ } from "@/components/site/FAQ";
import { InstagramGrid } from "@/components/site/InstagramGrid";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { MarqueeBar, FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ملاك عرنوس — مدربة حياة للنساء" },
      { name: "description", content: "ملاك عرنوس — مدربة حياة للنساء. رحلة شفاء داخلي، تنظيم الجهاز العصبي، والتحرر من الأكل العاطفي." },
      { property: "og:title", content: "ملاك عرنوس — مدربة حياة للنساء" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBar />
      <StatsSection />
      <FeaturedTestimonial />
      <ProgramsPreview />
      <HowItWorks />
      <TransformationsPreview />
      <CarouselSection />
      <TestimonialGrid />
      <InstagramSection />
      <TelegramCTA />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden -mt-20 pt-20">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover object-[60%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </motion.div>

      <motion.div style={{ opacity }} className="container-x relative z-10 py-20">
        <div className="max-w-3xl space-y-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-ember/30 bg-ember/5 backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-ember" />
            <span className="eyebrow text-foreground/90">{t.common.nowAccepting}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="display-xl">
            {t.hero.title1}<br />
            <span className="text-serif-italic ember-text normal-case">{t.hero.title2}</span> {t.hero.title3}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.hero.description}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="flex flex-wrap items-center gap-4">
            <JoinNowButton size="lg" />
            <Link to="/survey"><CTAButton size="lg" variant="outline">{t.cta.takeSurvey}</CTAButton></Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex items-center gap-5 pt-4">
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {testimonialMeta.slice(0, 5).map((m, i) => (
                <img key={i} src={m.avatar} alt="" loading="lazy" className="w-10 h-10 rounded-full ring-2 ring-background object-cover" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-ember">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{t.common.womenTransformed}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function StatsSection() {
  const { t } = useI18n();
  const labels = [t.stats.coached, t.stats.retention, t.stats.transformation, t.stats.experience];
  return (
    <section className="section-y border-b border-border">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
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
  );
}

function FeaturedTestimonial() {
  const { t } = useI18n();
  const tt = t.testimonials.items[0];
  const avatar = testimonialMeta[0].avatar;
  return (
    <section className="section-y bg-surface relative overflow-hidden">
      <div className="absolute top-1/2 -left-40 rtl:left-auto rtl:-right-40 w-80 h-80 rounded-full ember-gradient opacity-10 blur-3xl" />
      <div className="container-x grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center relative">
        <FadeIn>
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <img src={transformationImages[0].after} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 inset-x-6">
              <div className="eyebrow text-ember mb-1">{t.featured.eyebrow}</div>
              <div className="font-display text-3xl uppercase">{tt.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{tt.result}</div>
            </div>
          </div>
        </FadeIn>
        <div className="space-y-7">
          <SectionHeader eyebrow={t.featured.eyebrow} title={t.featured.title} highlight={t.featured.highlight} />
          <FadeIn delay={0.1}>
            <blockquote className="text-2xl md:text-3xl text-serif-italic text-foreground leading-snug">"{tt.quote}"</blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <img src={avatar} alt={tt.name} loading="lazy" className="w-12 h-12 rounded-full ring-2 ring-ember/40 object-cover" />
              <div className="min-w-0">
                <div className="font-semibold truncate">{tt.name}</div>
                <div className="text-sm text-muted-foreground truncate">{tt.handle} · {tt.program}</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProgramsPreview() {
  const { t } = useI18n();
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader eyebrow={t.programs.eyebrow} title={t.programs.title} highlight={t.programs.highlight} description={t.programs.description} align="center" />
        <div className="mt-16 grid lg:grid-cols-3 gap-6 items-stretch">
          {t.programs.items.map((p, i) => <ProgramCard key={p.slug} program={p} index={i} />)}
        </div>
        <div className="mt-12 text-center">
          <Link to="/programs"><CTAButton variant="ghost" icon={<ArrowRight className="w-4 h-4" />}>{t.cta.compareAll}</CTAButton></Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useI18n();
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-x">
        <SectionHeader eyebrow={t.howItWorks.eyebrow} title={t.howItWorks.title} highlight={t.howItWorks.highlight} align="center" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.howItWorks.steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="relative p-8 rounded-sm border border-border bg-background h-full hover-lift">
                <div className="font-display text-5xl ember-text mb-4">0{i + 1}</div>
                <h3 className="display-md mb-3">{s.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-12 text-center flex flex-wrap gap-3 justify-center">
          <Link to="/survey"><CTAButton size="lg" variant="outline">{t.cta.takeSurvey}</CTAButton></Link>
          <JoinNowButton size="lg" />
        </div>
      </div>
    </section>
  );
}

function TransformationsPreview() {
  const { t } = useI18n();
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader eyebrow={t.results.eyebrow} title={t.results.title} highlight={t.results.highlight} description={t.results.description} />
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {t.transformItems.map((tr, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="space-y-4">
                <BeforeAfter before={transformationImages[i].before} after={transformationImages[i].after} alt={tr.name} />
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-xl uppercase truncate">{tr.name}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">{tr.weeks} {t.common.weeks}</div>
                  </div>
                  <span className="eyebrow text-ember px-3 py-1.5 rounded-sm bg-ember/10 shrink-0">-{tr.lost}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/transformations"><CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4" />}>{t.cta.seeAll}</CTAButton></Link>
        </div>
      </div>
    </section>
  );
}

function CarouselSection() {
  const { t } = useI18n();
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-x">
        <SectionHeader eyebrow={t.testimonials.carouselEyebrow} title={t.testimonials.carouselTitle} highlight={t.testimonials.carouselHighlight} align="center" />
        <div className="mt-16"><TestimonialCarousel /></div>
      </div>
    </section>
  );
}

function TestimonialGrid() {
  const { t } = useI18n();
  const items = t.testimonials.items.map((it, i) => ({ ...it, avatar: testimonialMeta[i].avatar }));
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} highlight={t.testimonials.highlight} description={t.testimonials.description} />
        <div className="mt-16 columns-1 md:columns-2 lg:columns-3 gap-6">
          {items.map((tt, i) => <TestimonialCard key={i} t={tt} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="section-y bg-surface">
      <div className="container-x">
        <InstagramGrid />
      </div>
    </section>
  );
}

function FAQSection() {
  const { t } = useI18n();
  return (
    <section className="section-y">
      <div className="container-x grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <div>
          <SectionHeader eyebrow={t.faq.eyebrow} title={t.faq.title} highlight={t.faq.highlight} description={t.faq.description} />
          <div className="mt-8">
            <Link to="/contact"><CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4" />}>{t.cta.askQuestion}</CTAButton></Link>
          </div>
        </div>
        <FAQ items={t.faq.items} />
      </div>
    </section>
  );
}

function FinalCTA() {
  const { t } = useI18n();
  return (
    <section className="section-y relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full ember-gradient opacity-15 blur-3xl animate-ember-pulse" />
      <div className="container-x relative text-center max-w-3xl">
        <FadeIn>
          <span className="eyebrow">{t.common.yourMove}</span>
          <h2 className="display-xl mt-5 mb-7">
            {t.finalCta.title1}<br />
            <span className="text-serif-italic ember-text normal-case">{t.finalCta.highlight}</span>.
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">{t.finalCta.description}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <JoinNowButton size="lg" />
            <a href={brand.instagram} target="_blank" rel="noreferrer"><CTAButton size="lg" variant="outline" icon={<Instagram className="w-4 h-4" />}>{t.cta.followIG}</CTAButton></a>
            <a href={brand.telegram} target="_blank" rel="noreferrer"><CTAButton size="lg" variant="outline" icon={<Send className="w-4 h-4 rtl:-scale-x-100" />}>{t.cta.joinTelegram}</CTAButton></a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
