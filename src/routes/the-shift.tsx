import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { JoinNowButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/the-shift")({
  head: () => ({
    meta: [
      { title: "The Shift — ملاك عرنوس" },
      { name: "description", content: "The Shift — برنامج 8 أسابيع لتحرير الأكل العاطفي والوزن من الجذور." },
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
          <SectionHeader eyebrow={s.eyebrow} title={s.title} highlight="" align="center" />
          <FadeIn delay={0.1}>
            <p className="text-2xl md:text-3xl text-serif-italic text-foreground mt-8 leading-snug">{s.subtitle}</p>
            <p className="eyebrow text-ember mt-6">{s.sparkleLine}</p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
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
      </Block>

      <Block title={s.imagineTitle} alt>
        <ul className="space-y-2">
          {s.imagineItems.map((it, i) => <li key={i} className="text-lg text-serif-italic">{it}</li>)}
        </ul>
      </Block>

      <Block title={s.finalTitle}>
        <p className="text-lg leading-loose whitespace-pre-line">{s.finalBody}</p>
      </Block>

      <section className="section-y relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full ember-gradient opacity-15 blur-3xl animate-ember-pulse" />
        <div className="container-x relative text-center max-w-3xl">
          <FadeIn>
            <h2 className="display-xl mb-6">{s.bookTitle}</h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">{s.bookBody}</p>
            <JoinNowButton size="lg" />
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
