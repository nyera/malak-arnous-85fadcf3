import { motion } from "framer-motion";
import { Send, Youtube, Play } from "lucide-react";
import { brand } from "@/data/content";
import { useI18n } from "@/i18n/I18nProvider";
import { CTAButton } from "./CTAButton";

export function TelegramCTA() {
  const { t } = useI18n();
  const s = t.freeContent;

  return (
    <section className="section-y">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="eyebrow inline-flex items-center gap-2.5 justify-center">
            <span className="h-px w-8 bg-ember" />
            {s.eyebrow}
          </span>
          <h2 className="display-lg mt-4">
            {s.title} <span className="text-serif-italic ember-text">{s.highlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mt-5">{s.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <FreeCard
            delay={0}
            icon={<Send className="w-5 h-5 rtl:-scale-x-100" />}
            title={s.telegramTitle}
            body={s.telegramBody}
            handle={brand.telegramHandle}
            href={brand.telegram}
            cta={s.telegramCta}
            ctaIcon={<Send className="w-4 h-4 rtl:-scale-x-100" />}
          />
          <FreeCard
            delay={0.08}
            icon={<Youtube className="w-5 h-5" />}
            title={s.youtubeTitle}
            body={s.youtubeBody}
            handle={brand.youtubeHandle}
            href={brand.youtube}
            cta={s.youtubeCta}
            ctaIcon={<Play className="w-4 h-4 rtl:-scale-x-100" />}
          />
        </div>
      </div>
    </section>
  );
}

function FreeCard({
  delay,
  icon,
  title,
  body,
  handle,
  href,
  cta,
  ctaIcon,
}: {
  delay: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  handle: string;
  href: string;
  cta: string;
  ctaIcon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-ember/25 bg-gradient-to-br from-surface to-surface-elevated p-8 lg:p-10 hover-lift flex flex-col"
    >
      <div className="absolute -top-16 -end-16 w-56 h-56 rounded-full ember-gradient opacity-15 blur-3xl animate-ember-pulse" />
      <div className="relative flex flex-col flex-1">
        <span className="w-12 h-12 rounded-full bg-ember/10 text-ember grid place-items-center mb-5">{icon}</span>
        <h3 className="display-md mb-2">{title}</h3>
        <p className="text-sm text-ember mb-4" dir="ltr">
          {handle}
        </p>
        <p className="text-muted-foreground leading-relaxed flex-1">{body}</p>
        <div className="mt-8">
          <CTAButton href={href} external icon={ctaIcon}>
            {cta}
          </CTAButton>
        </div>
      </div>
    </motion.div>
  );
}
