import { Link } from "@tanstack/react-router";
import { Instagram, ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FadeIn } from "@/components/site/Misc";
import { testimonials } from "@/data/testimonials";
import { brand } from "@/data/content";

export function TestimonialsPreview() {
  const items = testimonials.slice(0, 4);
  return (
    <section className="section-y bg-surface border-y border-border">
      <div className="container-x">
        <FadeIn>
          <SectionHeader
            eyebrow="شهادات حقيقية"
            title="آراء"
            highlight="العملاء"
            description="تجارب من إنستجرام لنساء ورجال عملوا على الجذور العاطفية مع ملاك."
            align="center"
          />
        </FadeIn>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {items.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <a
                href={t.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t.alt}
                className="group block overflow-hidden rounded-2xl bg-background border border-border shadow-soft hover-lift"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link to="/testimonials">
              <CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4 rtl:-scale-x-100" />}>
                اطّلعي على كل الآراء
              </CTAButton>
            </Link>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-ember/30 bg-ember/5 hover:bg-ember hover:text-background hover:border-ember transition-all duration-500 text-sm font-medium"
            >
              <Instagram className="w-4 h-4" />
              <span>{brand.instagramHandle}</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
