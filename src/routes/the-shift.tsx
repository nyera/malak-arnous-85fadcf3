import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { BookCallButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DISCOVERY_CALL_URL } from "@/data/content";

export const Route = createFileRoute("/the-shift")({
  head: () => ({
    meta: [
      { title: "The Weight Shift — احجزي مكالمة مع ملاك عرنوس" },
      {
        name: "description",
        content:
          "The Weight Shift — برنامج تحوّلي لتحرير الأكل العاطفي من الجذور. أول خطوة مكالمة قصيرة مجانية لنشوف سوا إذا البرنامج مناسب إلك.",
      },  
      { property: "og:type", content: "website" },
      { property: "og:title", content: "The Weight Shift — احجزي مكالمة مع ملاك عرنوس" },
      { property: "og:description", content: "The Weight Shift — برنامج تحوّلي لتحرير الأكل العاطفي من الجذور. أول خطوة مكالمة قصيرة مجانية لنشوف سوا إذا البرنامج مناسب إلك." },
      { property: "og:url", content: "https://malakarnoushealing369.com/the-shift" },
      { property: "og:image", content: "https://malakarnoushealing369.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://malakarnoushealing369.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://malakarnoushealing369.com/the-shift" }],
  }),
  component: TheShiftPage,
});

function TheShiftPage() {
  const { t } = useI18n();
  const s = t.theShift;
  return (
    <>
      <section className="section-y">
        <div className="container-x max-w-4xl text-center">
          <FadeIn>
            <p className="eyebrow text-ember mb-5">{s.heroLabel}</p>
          </FadeIn>
          <SectionHeader eyebrow="" title={s.title} highlight="" align="center" />
          <FadeIn delay={0.1}>
            <p className="text-xl md:text-2xl text-serif-italic text-foreground mt-8 leading-snug">{s.heroSupport}</p>
            <p className="eyebrow text-ember mt-6">{s.sparkleLine}</p>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed max-w-2xl mx-auto">{s.heroCallNote}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <BookCallButton label={s.ctaBookCall} size="lg" href={DISCOVERY_CALL_URL} />
              <a
                href="#program-details"
                className="text-sm tracking-normal text-foreground/70 hover:text-ember transition-colors py-3"
              >
                {s.ctaDiscoverDetails}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Block title={s.whyCallTitle} alt>
        <div className="space-y-4">
          {s.whyCallBlocks.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </Block>

      <section className="section-y">
        <div className="container-x max-w-4xl">
          <FadeIn>
            <h2 className="display-lg mb-10 text-center">{s.stepsTitle}</h2>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2">
            {s.steps.map((step, i) => (
              <FadeIn key={i} delay={Math.min(i * 0.06, 0.24)}>
                <div className="h-full rounded-3xl border border-border bg-surface/60 p-7 shadow-[0_10px_40px_-30px_oklch(0.24_0.015_30_/_0.5)]">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ember/12 text-ember text-sm font-semibold">
                    {i + 1}
                  </span>
                  <h3 className="text-xl mt-5 mb-3 font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.15}>
            <div className="mt-12 flex justify-center">
              <BookCallButton label={s.ctaBookCallNow} size="lg" href={DISCOVERY_CALL_URL} />
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="program-details" className="pb-24 scroll-mt-24">
        <div className="container-x max-w-3xl space-y-4">
          {s.introBlocks.map((line, i) => (
            <FadeIn key={i} delay={Math.min(i * 0.03, 0.2)}>
              <p className="text-lg text-foreground/90 leading-relaxed">{line}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <Block title={s.forWhoTitle} alt>
        <p className="text-lg text-foreground mb-6">{s.forWhoIntro}</p>
        <ul className="space-y-3">
          {s.forWhoItems.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="text-ember mt-1">•</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </Block>

      <section className="section-y">
        <div className="container-x max-w-3xl">
          <FadeIn>
            <h2 className="display-lg mb-10">{s.insideTitle}</h2>
          </FadeIn>
          <div className="space-y-6">
            {s.insideSections.map((sec, i) => (
              <FadeIn key={i} delay={Math.min(i * 0.05, 0.25)}>
                <div className="rounded-3xl border border-border bg-surface/60 p-7 shadow-[0_10px_40px_-30px_oklch(0.24_0.015_30_/_0.5)]">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ember/12 text-ember text-sm font-semibold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{sec.title}</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{sec.body}</p>
                      {"items" in sec && sec.items ? (
                        <ul className="mt-4 space-y-2">
                          {sec.items.map((it, j) => (
                            <li key={j} className="flex items-start gap-3 leading-relaxed">
                              <span className="text-ember mt-1">•</span>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.15}>
            <div className="mt-12 flex justify-center">
              <BookCallButton label={s.ctaBookCallTheShift} href={DISCOVERY_CALL_URL} />
            </div>
          </FadeIn>
        </div>
      </section>

      <Block title={s.bodyQTitle} alt>
        <div className="space-y-3">
          {s.bodyQBlocks.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">{line}</p>
          ))}
        </div>
      </Block>

      <Block title={s.notAgainstTitle}>
        <div className="space-y-3 mb-8">
          {s.notAgainstBlocks.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">{line}</p>
          ))}
        </div>
        <p className="text-lg text-foreground mb-4">{s.builtOnLabel}</p>
        <ul className="space-y-2">
          {s.builtOnItems.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="text-ember mt-1">•</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title={s.finalTitle} alt>
        <div className="space-y-3">
          {s.finalBlocks.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">{line}</p>
          ))}
        </div>
        <p className="mt-8 text-xl text-serif-italic text-ember">{s.tagline}</p>
      </Block>

      <Block title={s.faqTitle}>
        <Accordion type="single" collapsible className="w-full">
          {s.faq.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-start text-lg leading-relaxed">{item.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Block>

      <section className="section-y relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full ember-gradient opacity-15 blur-3xl animate-ember-pulse" />
        <div className="container-x relative text-center max-w-3xl">
          <FadeIn>
            <h2 className="display-xl mb-6">{s.bookTitle}</h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">{s.bookBody}</p>
            <div className="flex justify-center">
              <BookCallButton label={s.ctaBookCallNow} size="lg" href={DISCOVERY_CALL_URL} />
            </div>
          </FadeIn>
        </div>
      </section>


      <TelegramCTA />
    </>
  );
}

function Block({ title, children, alt }: { title: string; children: React.ReactNode; alt?: boolean }) {
  return (
    <section className={"section-y " + (alt ? "bg-surface border-y border-border" : "")}>
      <div className="container-x max-w-3xl">
        <FadeIn>
          <h2 className="display-lg mb-8">{title}</h2>
          {children}
        </FadeIn>
      </div>
    </section>
  );
}
