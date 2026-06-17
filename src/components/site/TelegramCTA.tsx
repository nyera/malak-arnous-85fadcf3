import { motion } from "framer-motion";
import { Send, Users, MessageCircle } from "lucide-react";
import { brand } from "@/data/content";
import { CTAButton } from "./CTAButton";

export function TelegramCTA() {
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
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full ember-gradient opacity-20 blur-3xl animate-ember-pulse" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="space-y-6 max-w-2xl">
              <span className="eyebrow flex items-center gap-3">
                <Send className="w-3.5 h-3.5" /> Join the inner circle
              </span>
              <h2 className="display-lg">
                Free coaching daily — inside the{" "}
                <span className="text-serif-italic ember-text normal-case">Telegram</span> community.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                4,200+ women. Daily training drops, no-fluff nutrition wins, live Q&amp;A every Sunday.
                Free to join, no pitch.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-ember" /> 4,217 members</span>
                <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-ember" /> Active daily</span>
              </div>
            </div>
            <a href={brand.telegram} target="_blank" rel="noreferrer" className="shrink-0">
              <CTAButton size="lg" icon={<Send className="w-4 h-4" />}>
                Join Telegram Free
              </CTAButton>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
