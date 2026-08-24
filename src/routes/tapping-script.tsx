import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTAButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";
import { TAPPING_PAY_URL } from "@/data/content";

export const Route = createFileRoute("/tapping-script")({
  head: () => ({
    meta: [
      { title: "خدمة كتابة الـ Tapping Script — ملاك عرنوس" },
      {
        name: "description",
        content:
          "خدمة شخصية: Tapping Script مخصص مبني على قصتك والـ pattern اللي عم يتكرر معك. بعد الدفع تبعتي Voice Note أو رسالة، ويتم تحضير السكريبت خصيصاً إلك.",
      },
      { property: "og:title", content: "Tapping Script مخصص إلك — ملاك عرنوس" },
      {
        property: "og:description",
        content: "خدمة شخصية بسعر رمزي: سكريبت Tapping مخصص حسب قصتك والموضوع اللي حابة تشتغلي عليه.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tapping-script" }],
  }),
  component: TappingScriptPage,
});

function OrderButton({ label, size = "md" }: { label: string; size?: "sm" | "md" | "lg" }) {
  return (
    <CTAButton href={TAPPING_PAY_URL} external size={size} icon={<ArrowRight className="w-4 h-4" />}>
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

function TappingScriptPage() {
  const { t } = useI18n();
  const s = t.tappingScript;

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
            <p className="text-lg md:text-xl text-foreground/90 mt-7 leading-relaxed max-w-2xl mx-auto">{s.heroSubtitle}</p>
            <p className="text-lg text-muted-foreground mt-5 leading-relaxed max-w-2xl mx-auto">{s.heroBody}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <OrderButton label={s.ctaPrimary} size="lg" />
              <a
                href="#how-it-works"
                className="text-sm uppercase tracking-[0.18em] text-foreground/70 hover:text-ember transition-colors py-3"
              >
                {s.ctaSecondary}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHAT IS IT */}
      <Block title={s.whatTitle} alt>
        <Blocks items={s.whatBlocks} />
      </Block>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section-y scroll-mt-24">
        <div className="container-x max-w-5xl">
          <FadeIn>
            <h2 className="display-lg mb-10 text-center">{s.howTitle}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {s.howSteps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="h-full p-7 lg:p-8 rounded-2xl border border-border bg-surface hover-lift">
                  <span className="inline-grid place-items-center w-10 h-10 rounded-full bg-ember/10 text-ember font-display text-lg mb-4">
                    {i + 1}
                  </span>
                  <h3 className="display-md mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.15}>
            <div className="mt-12 flex justify-center">
              <OrderButton label={s.ctaOrder} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHAT CAN IT BE ABOUT */}
      <section className="section-y bg-surface border-y border-border">
        <div className="container-x max-w-5xl">
          <FadeIn>
            <h2 className="display-lg mb-10 text-center">{s.aboutTitle}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {s.aboutItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="h-full p-6 rounded-2xl border border-border bg-background flex items-start gap-3">
                  <span className="text-ember mt-1">✦</span>
                  <p className="leading-relaxed">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <Block title={s.receiveTitle}>
        <Bullets items={s.receiveItems} />
        <p className="mt-8 text-lg text-serif-italic text-ember leading-relaxed">{s.receiveOutro}</p>
      </Block>

      {/* HOW TO USE */}
      <Block title={s.useTitle} alt>
        <Blocks items={s.useBlocks} />
      </Block>

      {/* ONE OR MORE */}
      <Block title={s.oneTitle}>
        <Blocks items={s.oneBlocks} />
      </Block>

      {/* WHY PERSONALIZED */}
      <Block title={s.whyTitle} alt>
        <Blocks items={s.whyBlocks} />
      </Block>

      {/* WHAT TO SEND AFTER PAYMENT */}
      <Block title={s.sendTitle}>
        <p className="text-lg text-foreground mb-5">{s.sendIntro}</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-9">
          {s.sendOptions.map((opt, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-surface text-lg text-center">
              {opt}
            </div>
          ))}
        </div>
        <p className="text-lg text-foreground mb-4">{s.sendListIntro}</p>
        <Bullets items={s.sendItems} />
        <p className="mt-8 p-6 rounded-2xl bg-ember/5 border border-ember/20 text-muted-foreground leading-relaxed">
          {s.sendNote}
        </p>
      </Block>

      {/* IMPORTANT */}
      <section className="section-y bg-surface border-y border-border">
        <div className="container-x max-w-3xl">
          <FadeIn>
            <div className="p-8 lg:p-10 rounded-2xl border border-ember/25 bg-ember/5">
              <h2 className="display-md mb-5">{s.importantTitle}</h2>
              <Blocks items={s.importantBlocks} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <Block title={s.forWhoTitle}>
        <Bullets items={s.forWhoItems} />
      </Block>

      {/* FAQ */}
      <Block title={s.faqTitle} alt>
        <div className="space-y-4">
          {s.faq.map((f, i) => (
            <div key={i} className="p-6 lg:p-7 rounded-2xl border border-border bg-background">
              <h3 className="text-lg font-semibold mb-2.5">{f.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* OFFER */}
      <section className="section-y">
        <div className="container-x max-w-2xl">
          <FadeIn>
            <div className="p-8 lg:p-12 rounded-2xl border border-border bg-surface text-center shadow-[0_20px_60px_-30px_oklch(0.24_0.015_30_/_0.25)]">
              <h2 className="display-lg mb-4">{s.offerTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{s.offerBody}</p>
              <ul className="space-y-3 text-start mb-9 max-w-md mx-auto">
                {s.offerItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 leading-relaxed">
                    <span className="text-ember mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-display text-4xl md:text-5xl text-ember mb-8">{s.offerPrice}</p>
              <div className="flex justify-center">
                <OrderButton label={s.ctaPrimary} size="lg" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-y relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full ember-gradient opacity-15 blur-3xl animate-ember-pulse" />
        <div className="container-x relative text-center max-w-3xl">
          <FadeIn>
            <h2 className="display-xl mb-6">{s.finalTitle}</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">{s.finalBody}</p>
            <div className="flex justify-center">
              <OrderButton label={s.ctaOrder} size="lg" />
            </div>
          </FadeIn>
        </div>
      </section>

      <TelegramCTA />
    </>
  );
}
