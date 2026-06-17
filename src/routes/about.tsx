import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import coachImg from "@/assets/coach.jpg";
import { stats, brand } from "@/data/content";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Counter } from "@/components/site/Counter";
import { CTAButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Atlas Coaching" },
      { name: "description", content: "Meet the coach behind 1,240+ women's transformations. 8 years coaching, evidence-based method, results-obsessed." },
      { property: "og:title", content: "About — Atlas Coaching" },
      { property: "og:description", content: "The coach, the method, the standard." },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  { n: "01", t: "Strength First", d: "Lean comes from muscle. Every plan is built around progressive resistance training — not punishment cardio." },
  { n: "02", t: "Food Freedom", d: "No meal plans, no good/bad foods. A flexible macro framework you can actually live with for life." },
  { n: "03", t: "Behavioural Coaching", d: "Plans don't change you. Behaviours do. Weekly check-ins focus on the habits that drive 90% of results." },
  { n: "04", t: "Radical Accountability", d: "You don't pay for a PDF. You pay for a coach who notices when you skip a week and asks the right question." },
];

function AboutPage() {
  return (
    <>
      <section className="section-y relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div className="space-y-7">
            <span className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-ember" />The Coach</span>
            <h1 className="display-xl">
              Built by a woman.<br />
              <span className="text-serif-italic ember-text normal-case">Built for women.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm Dani — strength coach, lifelong lifter, and the person behind every program at Atlas. After eight years in the trenches with over 1,200 clients,
              I built Atlas because I was tired of women being sold quick fixes that don't last and workouts that leave them weaker than they started.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We coach one thing here: the slow, stubborn, undeniable work of becoming strong. Inside and out.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact"><CTAButton icon={<ArrowRight className="w-4 h-4" />}>Apply for Coaching</CTAButton></Link>
              <a href={brand.instagram} target="_blank" rel="noreferrer"><CTAButton variant="outline">@atlas.coaching</CTAButton></a>
            </div>
          </div>
          <FadeIn>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <img src={coachImg} alt="Coach Dani" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-display text-3xl uppercase">Dani Reyes</div>
                <div className="text-xs uppercase tracking-widest text-ember mt-1">NASM-CPT · PN-L2 · Founder</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-y bg-surface border-y border-border">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className="text-center lg:text-left">
                <div className="display-lg ember-text mb-2"><Counter value={s.value} suffix={s.suffix} /></div>
                <div className="eyebrow text-muted-foreground">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow="The Method" title="Four pillars." highlight="One standard." description="Everything we do at Atlas comes back to these four non-negotiables." />
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <FadeIn key={p.n} delay={i * 0.08}>
                <div className="p-8 lg:p-10 rounded-sm bg-surface border border-border hover-lift h-full">
                  <div className="font-display text-5xl ember-text mb-5">{p.n}</div>
                  <h3 className="display-md mb-3">{p.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <TelegramCTA />
    </>
  );
}
