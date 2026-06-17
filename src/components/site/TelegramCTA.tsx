import { motion } from "framer-motion";
import { Send, Users, MessageCircle } from "lucide-react";
import { brand } from "@/data/content";
import { CTAButton } from "./CTAButton";
import { useI18n } from "@/i18n/I18nProvider";

export function TelegramCTA() {
  const { t } = useI18n();
  return (
    <section className="section-y">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-sm border border-ember/30 bg-gradient-to-br from-surface to-surface-elevated p-10 md:p-16"
        >
          <div className="absolute -top-20 -right-20 rtl:right-auto rtl:-left-20 w-80 h-80 rounded-full ember-gradient opacity-20 blur-3xl animate-ember-pulse" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-6 max-w-2xl">
              <span className="eyebrow flex items-center gap-3">
                <Send className="w-3.5 h-3.5 rtl:-scale-x-100" /> {t.telegram.eyebrow}
              </span>
              <h2 className="display-lg">
                {t.telegram.title}{" "}
                <span className="text-serif-italic ember-text normal-case">{t.telegram.highlight}</span>{" "}
                {t.telegram.titleRest}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.telegram.description}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-ember" /> {t.telegram.members}</span>
                <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-ember" /> {t.telegram.activeDaily}</span>
              </div>
            </div>
            <CTAButton href={brand.telegram} external size="lg" icon={<Send className="w-4 h-4 rtl:-scale-x-100" />} className="shrink-0">
              {t.cta.joinTelegram}
            </CTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
