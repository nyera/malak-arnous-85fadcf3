import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { BookCallButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/the-shift")({
  head: () => ({
    meta: [
      { title: "The Shift — احجزي مكالمة مع ملاك عرنوس" },
      {
        name: "description",
        content:
          "The Shift — برنامج تحوّلي لتحرير الأكل العاطفي من الجذور. أول خطوة مكالمة قصيرة مجانية لنشوف سوا إذا البرنامج مناسب إلك.",
      },
      { property: "og:title", content: "The Shift — احجزي مكالمة مع ملاك عرنوس" },
      {
        property: "og:description",
        content: "برنامج تحوّلي لتحرير الأكل العاطفي من الجذور. ابدئي بمكالمة قصيرة مجانية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/the-shift" }],
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
              <BookCallButton label={s.ctaBookCall} size="lg" />
              <a
                href="#program-details"
                className="text-sm uppercase tracking-[0.18em] text-foreground/70 hover:text-ember transition-colors py-3"
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
              <BookCallButton label={s.ctaBookCallNow} size="lg" />
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


      <Block title={s.ifYouFeelTitle}>
        <ul className="space-y-3">
          {s.ifYouFeelItems.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="text-ember mt-1">•</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
        <p className="text-lg text-serif-italic text-ember mt-8">{s.youAreNotAlone}</p>
      </Block>

      <Block title={s.notDietTitle} alt>
        <ul className="space-y-2 mb-6">
          {s.notDietList.map((it, i) => <li key={i} className="text-lg">{it}</li>)}
        </ul>
        <p className="text-lg text-foreground leading-relaxed mb-4">{s.butIs}</p>
        <ul className="space-y-2 mb-6">
          {s.butItems.map((it, i) => <li key={i} className="text-lg">{it}</li>)}
        </ul>
        <p className="text-lg text-muted-foreground">{s.withoutResistance}</p>
      </Block>

      <Block title={s.insideTitle}>
        <p className="text-lg text-foreground mb-6">{s.insideIntro}</p>
        <ul className="space-y-3 mb-10">
          {s.insideItems.map((it, i) => (
            <li key={i} className="flex items-start gap-3 leading-relaxed">
              <span className="text-ember mt-1">•</span><span>{it}</span>
            </li>
          ))}
        </ul>
        <p className="text-lg text-foreground mb-4">{s.alsoWorkOn}</p>
        <ul className="space-y-2">
          {s.alsoItems.map((it, i) => <li key={i} className="text-lg">{it}</li>)}
        </ul>
      </Block>

      <Block title={s.goalTitle} alt>
        <p className="text-lg leading-loose whitespace-pre-line">{s.goalBody}</p>
      </Block>

      <Block title={s.afterTitle}>
        <ul className="space-y-3">
          {s.afterItems.map((it, i) => <li key={i} className="text-lg leading-relaxed">{it}</li>)}
        </ul>
      </Block>

      <Block title={s.howTitle} alt>
        <p className="text-xl mb-6">{s.howSchedule}</p>
        <div className="mb-6">
          <div className="eyebrow text-ember mb-2">{s.howDurationLabel}</div>
          <p className="text-lg">{s.howDuration}</p>
        </div>
        <div>
          <div className="eyebrow text-ember mb-3">{s.howIncludesLabel}</div>
          <ul className="space-y-2">
            {s.howIncludes.map((it, i) => <li key={i} className="text-lg">{it}</li>)}
          </ul>
        </div>
      </Block>

      <Block title={s.supportTitle}>
        <p className="text-lg mb-6 text-foreground">{s.supportIntro}</p>
        <ul className="space-y-2">
          {s.supportItems.map((it, i) => <li key={i} className="text-lg">{it}</li>)}
        </ul>
      </Block>

      <Block title={s.resultsTitle} alt>
        <ul className="space-y-3">
          {s.resultsItems.map((it, i) => <li key={i} className="text-lg leading-relaxed">{it}</li>)}
        </ul>
        <p className="mt-8 text-lg text-foreground">{s.alsoNoticeIntro}</p>
        <ul className="mt-3 space-y-1">
          {s.alsoNoticeItems.map((it, i) => <li key={i} className="flex items-start gap-3"><span className="text-ember mt-1">•</span><span>{it}</span></li>)}
        </ul>
        <p className="mt-4 text-muted-foreground italic">{s.alsoNoticeOutro}</p>
      </Block>

      <Block title={s.forYouTitle}>
        <ul className="space-y-3">
          {s.forYouItems.map((it, i) => <li key={i} className="text-lg leading-relaxed">{it}</li>)}
        </ul>
        <div className="mt-10 flex justify-center sm:justify-start">
          <BookCallButton label={s.ctaBookCallTheShift} />
        </div>
      </Block>

      <Block title={s.imagineTitle} alt>
        <ul className="space-y-2">
          {s.imagineItems.map((it, i) => <li key={i} className="text-lg text-serif-italic">{it}</li>)}
        </ul>
      </Block>

      <Block title={s.finalTitle}>
        <p className="text-lg leading-loose whitespace-pre-line">{s.finalBody}</p>
      </Block>

      <Block title={s.faqTitle} alt>
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
              <BookCallButton label={s.ctaBookCallNow} size="lg" />
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
