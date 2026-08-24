import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { BookCallButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";
import { HEAL_CALL_URL } from "@/data/content";

export const Route = createFileRoute("/heal-and-receive")({
  head: () => ({
    meta: [
      { title: "Heal and Receive — برنامج تحرير جذور منع الاستقبال" },
      {
        name: "description",
        content:
          "Heal and Receive — برنامج عميق لتحرير جذور منع الاستقبال وفتح مساحة أكبر للوفرة، بالعمل على الشاكرات السبع. ابدئي بمكالمة قصيرة مجانية.",
      },
      { property: "og:title", content: "Heal and Receive — برنامج تحرير جذور منع الاستقبال" },
      {
        property: "og:description",
        content: "برنامج عميق يعمل على جذور منع الاستقبال، وليس فقط على السلوك الظاهر. ابدئي بمكالمة قصيرة مجانية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/heal-and-receive" }],
  }),
  component: HealAndReceivePage,
});

function HealAndReceivePage() {
  const { t } = useI18n();
  const s = t.healAndReceive;
  return (
    <>
      <section className="section-y">
        <div className="container-x max-w-4xl text-center">
          <FadeIn>
            <p className="eyebrow text-ember mb-5">{s.heroLabel}</p>
          </FadeIn>
          <SectionHeader eyebrow="" title={s.title} highlight="" align="center" />
          <FadeIn delay={0.1}>
            <p className="eyebrow text-ember mt-6">{s.subtitle}</p>
            <p className="text-xl md:text-2xl text-serif-italic text-foreground mt-8 leading-snug">{s.heroQuestion}</p>
            <div className="mt-6 space-y-2">
              {s.heroBlocks.map((line, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <BookCallButton label={s.ctaBookCall} size="lg" href={HEAL_CALL_URL} />
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

      <section id="program-details" className="section-y bg-surface border-y border-border scroll-mt-24">
        <div className="container-x max-w-3xl">
          <FadeIn>
            <p className="text-lg text-foreground mb-4">{s.whyMustLabel}</p>
            <ul className="space-y-3">
              {s.whyMustItems.map((it, i) => (
                <li key={i} className="flex items-start gap-3 text-lg leading-relaxed">
                  <span className="text-ember mt-1">•</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3">
              {s.heroCloseBlocks.map((line, i) => (
                <p key={i} className="text-lg text-foreground/90 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Block title={s.whyHardTitle}>
        <p className="text-lg text-foreground mb-4">{s.whyHardIntro}</p>
        <ul className="space-y-2 mb-8">
          {s.whyHardTopics.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="text-ember mt-1">•</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-3 mb-6">
          {s.whyHardBlocks.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
        <ul className="space-y-2 mb-8">
          {s.whyHardBeliefs.map((it, i) => (
            <li key={i} className="text-lg leading-relaxed text-serif-italic text-foreground">
              {it}
            </li>
          ))}
        </ul>
        <div className="space-y-3">
          {s.whyHardOutro.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </Block>

      <Block title={s.chakrasTitle} alt>
        <div className="space-y-3 mb-8">
          {s.chakrasBlocks.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
        <ul className="space-y-3">
          {s.chakrasItems.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="text-ember mt-1">•</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xl text-serif-italic text-ember">{s.chakrasOutro}</p>
      </Block>

      <Block title={s.allChakrasTitle}>
        <div className="space-y-3">
          {s.allChakrasBlocks.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <BookCallButton label={s.ctaBookCall} href={HEAL_CALL_URL} />
        </div>
      </Block>

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

      <Block title={s.questionTitle}>
        <div className="space-y-3">
          {s.questionBlocks.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </Block>

      <Block title={s.receivingTitle} alt>
        <div className="space-y-3">
          {s.receivingBlocks.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </Block>

      <Block title={s.finalTitle}>
        <div className="space-y-3">
          {s.finalBlocks.map((line, i) => (
            <p key={i} className="text-lg text-foreground/90 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
        <p className="mt-8 text-xl text-serif-italic text-ember">{s.tagline}</p>
      </Block>

      <section className="section-y relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full ember-gradient opacity-15 blur-3xl animate-ember-pulse" />
        <div className="container-x relative text-center max-w-3xl">
          <FadeIn>
            <h2 className="display-xl mb-6">{s.bookTitle}</h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">{s.bookBody}</p>
            <div className="flex justify-center">
              <BookCallButton label={s.ctaBookCall} size="lg" href={HEAL_CALL_URL} />
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
