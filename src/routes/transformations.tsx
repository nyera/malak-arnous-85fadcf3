import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { transformations, testimonials, instagramPosts } from "@/data/content";
import { SectionHeader } from "@/components/site/SectionHeader";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { InstagramGrid } from "@/components/site/InstagramGrid";
import { CTAButton } from "@/components/site/CTAButton";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/transformations")({
  head: () => ({
    meta: [
      { title: "Transformations — Atlas Coaching" },
      { name: "description", content: "Real women, real results. Browse hundreds of transformations from the Atlas Coaching community." },
      { property: "og:title", content: "Transformations — Atlas Coaching" },
      { property: "og:description", content: "The proof, in pictures and words." },
      { property: "og:image", content: transformations[0].after },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader
            eyebrow="The Receipts"
            title="Real women."
            highlight="Real timelines."
            description="No filters, no flexed-and-dehydrated photos. Just the work."
            align="center"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformations.map((tr, i) => (
            <FadeIn key={tr.name} delay={i * 0.08}>
              <div className="space-y-4">
                <BeforeAfter before={tr.before} after={tr.after} alt={tr.name} />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-2xl uppercase">{tr.name}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">{tr.weeks} weeks</div>
                  </div>
                  <span className="eyebrow text-ember px-3 py-1.5 rounded-sm bg-ember/10">-{tr.lost}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section-y bg-surface border-y border-border">
        <div className="container-x">
          <SectionHeader eyebrow="Video Stories" title="Hear it from" highlight="them" description="Unscripted check-ins from women mid-transformation." />
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {instagramPosts.slice(0, 3).map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative aspect-[3/4] rounded-sm overflow-hidden cursor-pointer">
                  <img src={img} alt={`Story ${i + 1}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="w-16 h-16 rounded-full ember-gradient grid place-items-center shadow-ember group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-background fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="font-display text-xl uppercase">{testimonials[i].name}</div>
                    <div className="text-xs text-ember uppercase tracking-widest">{testimonials[i].result}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow="Written Reviews" title="In their" highlight="own words" />
          <div className="mt-16 columns-1 md:columns-2 lg:columns-3 gap-6">
            {testimonials.map((t, i) => <TestimonialCard key={t.name} t={t} index={i} />)}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x"><InstagramGrid /></div>
      </section>

      <section className="section-y">
        <div className="container-x text-center max-w-2xl">
          <h2 className="display-lg mb-6">Your <span className="text-serif-italic ember-text normal-case">story</span> is next.</h2>
          <p className="text-lg text-muted-foreground mb-8">Apply today. Be the testimonial in 16 weeks.</p>
          <Link to="/contact"><CTAButton size="lg" icon={<ArrowRight className="w-4 h-4" />}>Apply for Coaching</CTAButton></Link>
        </div>
      </section>
    </>
  );
}
