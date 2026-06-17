import { createFileRoute } from "@tanstack/react-router";
import { programs, faqs, testimonials } from "@/data/content";
import { ProgramCard } from "@/components/site/ProgramCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FAQ } from "@/components/site/FAQ";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Atlas Coaching" },
      { name: "description", content: "Three coaching programs for every level: Ignite (8wk on-ramp), Transform (16wk signature), Elite (12mo athlete-level partnership)." },
      { property: "og:title", content: "Programs — Atlas Coaching" },
      { property: "og:description", content: "Find your path. Apply today." },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader
            eyebrow="The Programs"
            title="Pick your path."
            highlight="Every one of them works."
            description="No tiers of effort. No watered-down versions. Every program gets the same coach, the same standard, the same obsession with your results."
            align="center"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid lg:grid-cols-3 gap-6 items-stretch">
          {programs.map((p, i) => <ProgramCard key={p.slug} program={p} index={i} />)}
        </div>
      </section>

      <section className="section-y bg-surface border-y border-border">
        <div className="container-x">
          <FadeIn>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-5 eyebrow text-muted-foreground">Feature</th>
                    {programs.map((p) => (
                      <th key={p.slug} className="text-left py-5 font-display text-xl uppercase">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ["Duration", programs.map((p) => p.duration)],
                    ["Custom training", ["✓", "✓", "✓"]],
                    ["Nutrition coaching", ["Framework", "Full", "Full + Bloodwork"]],
                    ["Check-in frequency", ["Weekly", "2× weekly", "On-demand"]],
                    ["Form reviews", ["—", "✓", "✓"]],
                    ["Direct messaging", ["—", "✓", "Phone access"]],
                    ["Alumni access", ["—", "Lifetime", "Lifetime"]],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border">
                      <td className="py-4 text-muted-foreground">{row[0] as string}</td>
                      {(row[1] as string[]).map((c, j) => (
                        <td key={j} className="py-4 font-medium">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow="From the clients" title="What women say after" highlight={`${testimonials.length}+ programs`} align="center" />
          <div className="mt-16"><TestimonialCarousel /></div>
        </div>
      </section>

      <TelegramCTA />

      <section className="section-y border-t border-border">
        <div className="container-x">
          <SectionHeader eyebrow="FAQ" title="Before you" highlight="apply" align="center" />
          <div className="mt-12 max-w-3xl mx-auto"><FAQ items={faqs} /></div>
        </div>
      </section>
    </>
  );
}
