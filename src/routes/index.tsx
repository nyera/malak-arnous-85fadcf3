import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Instagram, Send, Sparkles } from "lucide-react";
import { useRef } from "react";

import heroImg from "@/assets/hero.jpg";
import { brand, stats, programs, testimonials, transformations } from "@/data/content";

import { CTAButton } from "@/components/site/CTAButton";
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
import { faqs } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas Coaching — Transform Your Body, Reclaim Your Power" },
      { name: "description", content: "Elite 1:1 online strength coaching for women. 1,240+ women coached. 98% retention. Apply for your transformation today." },
      { property: "og:title", content: "Atlas Coaching — Transform Your Body, Reclaim Your Power" },
      { property: "og:description", content: "Elite 1:1 online strength coaching for women. Apply today." },
      { property: "og:image", content: "/og-home.jpg" },
    ],
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden -mt-20 pt-20">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover object-[60%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </motion.div>

      <motion.div style={{ opacity }} className="container-x relative z-10 py-20">
        <div className="max-w-3xl space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-ember/30 bg-ember/5 backdrop-blur"
          >
            <Sparkles className="w-3.5 h-3.5 text-ember" />
            <span className="eyebrow text-foreground/90">Now accepting Q1 2026 clients</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="display-xl"
          >
            Transform your body.<br />
            <span className="text-serif-italic ember-text normal-case">Reclaim</span> your power.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            {brand.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to="/contact">
              <CTAButton size="lg" icon={<ArrowRight className="w-4 h-4" />}>Apply for Coaching</CTAButton>
            </Link>
            <a href={brand.telegram} target="_blank" rel="noreferrer">
              <CTAButton size="lg" variant="outline" icon={<Send className="w-4 h-4" />}>Free Community</CTAButton>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-5 pt-4"
          >
            <div className="flex -space-x-3">
              {testimonials.slice(0, 5).map((t) => (
                <img key={t.name} src={t.avatar} alt={t.name} loading="lazy" className="w-10 h-10 rounded-full ring-2 ring-background object-cover" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-ember">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">1,240+ women transformed</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="section-y border-b border-border">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.08}>
            <div className="text-center lg:text-left">
              <div className="display-lg ember-text mb-2">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="eyebrow text-muted-foreground">{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function FeaturedTestimonial() {
  const t = testimonials[0];
  return (
    <section className="section-y bg-surface relative overflow-hidden">
      <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full ember-gradient opacity-10 blur-3xl" />
      <div className="container-x grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center relative">
        <FadeIn>
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <img src={transformations[0].after} alt="Featured client" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="eyebrow text-ember mb-1">Success Story</div>
              <div className="font-display text-3xl uppercase">{t.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{t.result}</div>
            </div>
          </div>
        </FadeIn>
        <div className="space-y-7">
          <SectionHeader eyebrow="Featured Story" title="From years of yo-yo dieting to" highlight="strongest woman in the room" />
          <FadeIn delay={0.1}>
            <blockquote className="text-2xl md:text-3xl text-serif-italic text-foreground leading-snug">
              "{t.quote}"
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <img src={t.avatar} alt={t.name} loading="lazy" className="w-12 h-12 rounded-full ring-2 ring-ember/40 object-cover" />
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.handle} · Transform Program</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProgramsPreview() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader
          eyebrow="The Programs"
          title="Three paths."
          highlight="One standard — elite."
          description="Whether you're new to lifting or chasing your strongest year ever, there's a program engineered for you."
          align="center"
        />
        <div className="mt-16 grid lg:grid-cols-3 gap-6 items-stretch">
          {programs.map((p, i) => <ProgramCard key={p.slug} program={p} index={i} />)}
        </div>
        <div className="mt-12 text-center">
          <Link to="/programs">
            <CTAButton variant="ghost" icon={<ArrowRight className="w-4 h-4" />}>Compare all programs</CTAButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TransformationsPreview() {
  return (
    <section className="section-y bg-surface">
      <div className="container-x">
        <SectionHeader eyebrow="Real Women · Real Results" title="The proof is in the" highlight="transformations" description="Drag the slider on any image. These are real clients with real timelines — not stock photos, not promises." />
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {transformations.map((tr, i) => (
            <FadeIn key={tr.name} delay={i * 0.1}>
              <div className="space-y-4">
                <BeforeAfter before={tr.before} after={tr.after} alt={tr.name} />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-xl uppercase">{tr.name}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">{tr.weeks} weeks</div>
                  </div>
                  <span className="eyebrow text-ember px-3 py-1.5 rounded-sm bg-ember/10">-{tr.lost}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/transformations">
            <CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4" />}>See every transformation</CTAButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CarouselSection() {
  return (
    <section className="section-y border-y border-border">
      <div className="container-x">
        <SectionHeader eyebrow="Words from the women" title="Read it in their" highlight="own words" align="center" />
        <div className="mt-16"><TestimonialCarousel /></div>
      </div>
    </section>
  );
}

function TestimonialGrid() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader eyebrow="The Receipts" title="Hundreds of stories." highlight="One common thread." description="Honest, unedited reviews from women in the Atlas community." />
        <div className="mt-16 columns-1 md:columns-2 lg:columns-3 gap-6">
          {testimonials.map((t, i) => <TestimonialCard key={t.name} t={t} index={i} />)}
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
  return (
    <section className="section-y">
      <div className="container-x grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <div>
          <SectionHeader eyebrow="Common Questions" title="Got" highlight="questions?" description="Everything you want to know before applying. If we missed something, just ask." />
          <div className="mt-8">
            <Link to="/contact"><CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4" />}>Ask a question</CTAButton></Link>
          </div>
        </div>
        <FAQ items={faqs} />
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full ember-gradient opacity-15 blur-3xl animate-ember-pulse" />
      <div className="container-x relative text-center max-w-3xl">
        <FadeIn>
          <span className="eyebrow">Your move</span>
          <h2 className="display-xl mt-5 mb-7">
            Stop waiting for<br />
            <span className="text-serif-italic ember-text normal-case">Monday</span>.
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Apply today. Get a personal response within 24 hours.
            No commitment until we know it's the right fit — for both of us.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact"><CTAButton size="lg" icon={<ArrowRight className="w-4 h-4" />}>Apply for Coaching</CTAButton></Link>
            <a href={brand.instagram} target="_blank" rel="noreferrer"><CTAButton size="lg" variant="outline" icon={<Instagram className="w-4 h-4" />}>Follow on Instagram</CTAButton></a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
