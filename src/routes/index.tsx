import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRef } from "react";

import portraitAsset from "@/assets/malak-portrait.png.asset.json";
import { useI18n } from "@/i18n/I18nProvider";
import { CTAButton, JoinNowButton } from "@/components/site/CTAButton";
import { SectionHeader } from "@/components/site/SectionHeader";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { TestimonialsPreview } from "@/components/site/TestimonialsPreview";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ملاك عرنوس — متخصصة في الأكل العاطفي وخسارة الوزن من الجذور" },
      { name: "description", content: "تحرري من الأكل العاطفي وخسارة الوزن من الجذور. أنا ملاك عرنوس، Nervous System-Based Emotional Eating and Weight Loss Expert." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <TestimonialsPreview />
      <TelegramCTA />
      <FinalCTA />
    </>
  );
}

function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden -mt-20 pt-20">
      <div className="container-x relative z-10 py-20 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
        <div className="space-y-7 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-ember/30 bg-ember/5 backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-ember" />
            <span className="eyebrow text-foreground/90">{t.home.heroEyebrow}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="display-xl">
            {t.home.heroTitle1}{" "}
            <span className="text-serif-italic ember-text normal-case">{t.home.heroTitle2}</span>
            <br />
            {t.home.heroTitle3}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-lg md:text-xl text-muted-foreground leading-loose">
            {t.home.heroDescription}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="flex flex-wrap items-center gap-4">
            <JoinNowButton size="lg" />
            <Link to="/survey"><CTAButton size="lg" variant="outline">{t.cta.takeSurvey}</CTAButton></Link>
          </motion.div>
        </div>

        <motion.div style={{ y }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative">
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden group">
            <img src={portraitAsset.url} alt="ملاك عرنوس" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -start-4 rtl:-end-4 rtl:start-auto bg-background border border-ember/30 px-5 py-3 rounded-sm shadow-lg">
            <div className="eyebrow text-ember">ملاك عرنوس</div>
            <div className="text-xs text-muted-foreground mt-1">Emotional Eating & Weight Loss Expert</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutPreview() {
  const { t } = useI18n();
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-x grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <FadeIn>
          <SectionHeader eyebrow={t.home.aboutEyebrow} title={t.home.aboutTitle} highlight={t.home.aboutSubtitle} />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-5">
            <p className="text-lg text-foreground leading-loose">{t.home.aboutIntro}</p>
            <p className="text-muted-foreground leading-loose">{t.home.aboutBody}</p>
            <Link to="/about"><CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4" />}>{t.cta.readMore}</CTAButton></Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const { t } = useI18n();
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader eyebrow={t.home.servicesEyebrow} title={t.home.servicesTitle} highlight="" description={t.home.servicesDescription} align="center" />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.services.items.map((s, i) => (
            <FadeIn key={s.slug} delay={i * 0.08}>
              <div className="p-7 rounded-sm border border-border bg-surface hover-lift h-full flex flex-col">
                <h3 className="font-display text-2xl mb-2">{s.name}</h3>
                <p className="text-serif-italic text-ember text-base mb-3 leading-snug">{s.tagline}</p>
                <p className="text-sm text-muted-foreground leading-loose flex-1">{s.description}</p>
                {s.link && (
                  <Link to={s.link} className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-ember hover:gap-3 transition-all">
                    {t.cta.readMore} <ArrowRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
                  </Link>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/programs"><CTAButton variant="ghost" icon={<ArrowRight className="w-4 h-4" />}>{t.cta.compareAll}</CTAButton></Link>
        </div>
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
          <span className="eyebrow">{t.home.ctaEyebrow}</span>
          <h2 className="display-xl mt-5 mb-7">{t.home.ctaTitle}</h2>
          <p className="text-xl text-muted-foreground mb-10 leading-loose">{t.home.ctaBody}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <JoinNowButton size="lg" />
            <Link to="/survey"><CTAButton size="lg" variant="outline">{t.cta.takeSurvey}</CTAButton></Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
