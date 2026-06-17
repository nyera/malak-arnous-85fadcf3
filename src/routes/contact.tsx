import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Instagram, Send, Clock } from "lucide-react";
import { brand } from "@/data/content";
import { SectionHeader } from "@/components/site/SectionHeader";
import { AssessmentForm } from "@/components/site/AssessmentForm";
import { ContactForm } from "@/components/site/ContactForm";
import { FadeIn } from "@/components/site/Misc";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Apply — Atlas Coaching" },
      { name: "description", content: "Apply for elite 1:1 online coaching. Free assessment, 24-hour response, no commitment until the fit is right." },
      { property: "og:title", content: "Apply for Coaching — Atlas" },
      { property: "og:description", content: "Start your transformation today." },
    ],
  }),
  component: Page,
});

function Page() {
  const [tab, setTab] = useState<"assessment" | "contact">("assessment");
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader
            eyebrow="Start Here"
            title="Apply for"
            highlight="coaching."
            description="Take the 2-minute assessment so we can match you with the right program — or send a direct message. Either way, you'll hear from us within 24 hours."
            align="center"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid lg:grid-cols-[1fr_2fr] gap-12">
          <FadeIn>
            <div className="space-y-8 lg:sticky lg:top-28">
              <div className="p-8 rounded-sm bg-surface border border-border">
                <h3 className="display-md mb-6">Reach us</h3>
                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-ember mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="eyebrow text-muted-foreground mb-1">Email</div>
                      <a href={`mailto:${brand.email}`} className="hover:text-ember break-all">{brand.email}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-ember mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="eyebrow text-muted-foreground mb-1">Based</div>
                      <span>{brand.location}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-ember mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="eyebrow text-muted-foreground mb-1">Response</div>
                      <span>Within 24 hours</span>
                    </div>
                  </li>
                </ul>
                <div className="flex gap-3 mt-7 pt-7 border-t border-border">
                  <a href={brand.instagram} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-sm border border-border hover:border-ember hover:text-ember text-xs uppercase tracking-widest font-semibold transition-colors">
                    <Instagram className="w-4 h-4" /> DM
                  </a>
                  <a href={brand.telegram} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-sm border border-border hover:border-ember hover:text-ember text-xs uppercase tracking-widest font-semibold transition-colors">
                    <Send className="w-4 h-4" /> Telegram
                  </a>
                </div>
              </div>

              <div className="p-8 rounded-sm bg-gradient-to-br from-ember/10 to-transparent border border-ember/20">
                <h4 className="font-display text-2xl uppercase mb-3">30-day guarantee</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Follow the program for 30 days. If you're not seeing results, full refund — or we coach you free until you do.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="p-8 md:p-10 rounded-sm bg-surface border border-border">
              <div className="flex gap-2 p-1 bg-background rounded-sm mb-8 w-fit">
                {(["assessment", "contact"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "px-5 py-2.5 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all",
                      tab === t ? "bg-ember text-background" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t === "assessment" ? "Coaching Assessment" : "Quick Message"}
                  </button>
                ))}
              </div>
              {tab === "assessment" ? <AssessmentForm /> : <ContactForm />}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
