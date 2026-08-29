import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTAButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";
import { STAN_SESSION_URL } from "@/data/content";

export const Route = createFileRoute("/the-weight-shift-session")({
  head: () => ({
    meta: [
      { title: "جلسة تسريبة من The Weight Shift — ملاك عرنوس" },
      {
        name: "description",
        content:
          "جلسة مختارة من برنامج The Weight Shift: تجربة حقيقية من داخل البرنامج لتكتشفي شو واقف خلف علاقتك مع الأكل والوزن قبل ما تقرري الاشتراك بالرحلة الكاملة.",
      },  
      { property: "og:type", content: "website" },
      { property: "og:title", content: "جلسة تسريبة من The Weight Shift — ملاك عرنوس" },
      { property: "og:description", content: "جلسة مختارة من برنامج The Weight Shift: تجربة حقيقية من داخل البرنامج لتكتشفي شو واقف خلف علاقتك مع الأكل والوزن قبل ما تقرري الاشتراك بالرحلة الكاملة." },
      { property: "og:url", content: "https://malakarnoushealing369.com/the-weight-shift-session" },
      { property: "og:image", content: "https://malakarnoushealing369.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://malakarnoushealing369.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://malakarnoushealing369.com/the-weight-shift-session" }],
  }),
  component: TheWeightShiftSessionPage,
});

function SessionButton({ label, size = "md" }: { label: string; size?: "sm" | "md" | "lg" }) {
  return (
    <CTAButton href={STAN_SESSION_URL} external size={size} icon={<ArrowRight className="w-4 h-4" />}>
      {label}
    </CTAButton>
  );
}

function Block({ title, children, alt, id }: { title: string; children: React.ReactNode; alt?: boolean; id?: string }) {
  return (
    <section id={id} className={"section-y scroll-mt-24 " + (alt ? "bg-surface border-y border-border" : "")}>
      <div className="container-x max-w-3xl">
        <FadeIn>
          <h2 className="display-lg mb-8">{title}</h2>
          {children}
        </FadeIn>
      </div>
    </section>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-lg leading-relaxed">
          <span className="text-ember mt-1">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Blocks({ items }: { items: readonly string[] }) {
  return (
    <div className="space-y-3">
      {items.map((line, i) => (
        <p key={i} className="text-lg text-foreground/90 leading-relaxed">
          {line}
        </p>
      ))}
    </div>
  );
}

function TheWeightShiftSessionPage() {
  const { t } = useI18n();
  const s = t.theWeightShiftSession;

  return (
    <>
      {/* HERO */}
      <section className="section-y relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full ember-gradient opacity-10 blur-3xl" />
        <div className="container-x relative max-w-4xl text-center">
          <FadeIn>
            <p className="eyebrow text-ember mb-5">{s.heroLabel}</p>
          </FadeIn>
          <SectionHeader eyebrow="" title={s.heroTitle} highlight="" align="center" />
          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-foreground/90 mt-7 leading-relaxed max-w-2xl mx-auto">{s.heroSupport}</p>
            <p className="text-lg text-muted-foreground mt-5 leading-relaxed max-w-2xl mx-auto">{s.heroParagraph}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SessionButton label={s.ctaBook} size="lg" />
              <a
                href="#session-details"
                className="text-sm tracking-normal text-foreground/70 hover:text-ember transition-colors py-3"
              >
                {s.ctaDetails}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* INTRODUCTION */}
      <Block title={s.introTitle} alt id="session-details">
        <Blocks items={s.introBlocks} />
      </Block>

      {/* WHAT YOU WILL EXPERIENCE */}
      <Block title={s.experienceTitle}>
        <Bullets items={s.experienceItems} />
      </Block>

      {/* IMPORTANT PREPARATION */}
      <section className="section-y bg-surface border-y border-border">
        <div className="container-x max-w-3xl">
          <FadeIn>
            <div className="p-8 lg:p-10 rounded-2xl border border-ember/25 bg-ember/5">
              <h2 className="display-md mb-5">{s.prepTitle}</h2>
              <Blocks items={s.prepBlocks} />
              <p className="mt-6 text-lg text-ember leading-relaxed">{s.prepReminder}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHO IS THIS SESSION FOR? */}
      <Block title={s.forWhoTitle} alt>
        <Bullets items={s.forWhoItems} />
      </Block>

      {/* WHAT MAKES THIS DIFFERENT? */}
      <Block title={s.differentTitle}>
        <Blocks items={s.differentBlocks} />
      </Block>

      {/* ABOUT THE FULL PROGRAM */}
      <Block title={s.aboutFullTitle} alt>
        <Blocks items={s.aboutFullBlocks} />
        <div className="mt-8 flex justify-center">
          <SessionButton label={s.aboutFullCta} />
        </div>
      </Block>

      {/* HOW IT WORKS */}
      <section className="section-y scroll-mt-24">
        <div className="container-x max-w-5xl">
          <FadeIn>
            <h2 className="display-lg mb-10 text-center">{s.howTitle}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5">
            {s.howSteps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="h-full p-7 lg:p-8 rounded-2xl border border-border bg-surface hover-lift text-center">
                  <span className="inline-grid place-items-center w-10 h-10 rounded-full bg-ember/10 text-ember font-display text-lg mb-4">
                    {i + 1}
                  </span>
                  <h3 className="display-md mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section className="section-y bg-surface border-y border-border">
        <div className="container-x max-w-2xl">
          <FadeIn>
            <div className="p-8 lg:p-12 rounded-2xl border border-border bg-background text-center shadow-[0_20px_60px_-30px_oklch(0.24_0.015_30_/_0.25)]">
              <h2 className="display-lg mb-4">{s.offerTitle}</h2>
              <p className="text-serif-italic text-ember text-xl mb-4 leading-snug">{s.offerSubtitle}</p>
              <ul className="space-y-3 text-start mb-9 max-w-md mx-auto">
                {s.offerItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 leading-relaxed">
                    <span className="text-ember mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="flex items-center justify-center gap-3 mb-8" dir="ltr">
                <span className="font-display text-3xl md:text-4xl text-ember">{s.offerPrice}</span>
                <span className="font-display text-xl md:text-2xl text-muted-foreground line-through decoration-ember/70">{s.offerOldPrice}</span>
              </p>
              <div className="flex justify-center">
                <SessionButton label={s.offerCta} size="lg" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <Block title={s.faqTitle}>
        <div className="space-y-4">
          {s.faq.map((f, i) => (
            <div key={i} className="p-6 lg:p-7 rounded-2xl border border-border bg-surface">
              <h3 className="text-lg font-semibold mb-2.5">{f.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* FINAL CTA */}
      <section className="section-y relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full ember-gradient opacity-15 blur-3xl animate-ember-pulse" />
        <div className="container-x relative text-center max-w-3xl">
          <FadeIn>
            <h2 className="display-xl mb-6">{s.finalTitle}</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">{s.finalBody}</p>
            <div className="flex justify-center">
              <SessionButton label={s.finalCta} size="lg" />
            </div>
          </FadeIn>
        </div>
      </section>

      <TelegramCTA />
    </>
  );
}
