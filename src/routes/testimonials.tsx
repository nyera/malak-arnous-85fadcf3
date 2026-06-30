import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FadeIn } from "@/components/site/Misc";
import { brand } from "@/data/content";
import { testimonials } from "@/data/testimonials";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "آراء العملاء — ملاك عرنوس" },
      { name: "description", content: "تجارب حقيقية من إنستجرام لنساء ورجال اختبروا التحول من الجذور مع ملاك عرنوس." },
      { property: "og:title", content: "آراء العملاء — ملاك عرنوس" },
      { property: "og:description", content: "تجارب حقيقية من إنستجرام مع ملاك عرنوس." },
      { property: "og:url", content: "https://malak-arnous.lovable.app/testimonials" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://malak-arnous.lovable.app/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialCard({ image, instagramUrl, alt }: { image: string; instagramUrl: string; alt: string }) {
  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={alt}
      className="group block overflow-hidden rounded-2xl bg-background border border-border shadow-soft hover-lift relative"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-background/80 to-transparent">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-background/90 border border-border">
          <Instagram className="w-3.5 h-3.5" /> عرض على إنستجرام
        </span>
      </div>
    </a>
  );
}

function TestimonialsPage() {
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <FadeIn>
            <SectionHeader
              eyebrow="شهادات حقيقية"
              title="آراء"
              highlight="العملاء"
              description="مجموعة من تجارب عميلاتي وعملائي على إنستجرام بعد العمل على الجذور العاطفية والجهاز العصبي."
              align="center"
            />
          </FadeIn>

          <div className="mt-12 md:mt-16">
            <Carousel
              opts={{ loop: true, align: "start", direction: "rtl" }}
              plugins={[Autoplay({ delay: 4500, stopOnInteraction: true })]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((t, i) => (
                  <CarouselItem key={i} className="pl-4 basis-[80%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <TestimonialCard {...t} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <FadeIn>
            <h2 className="display-lg text-center mb-10">
              المزيد من <span className="text-serif-italic ember-text">القصص</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <TestimonialCard {...t} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6 p-10 md:p-14 rounded-3xl bg-surface border border-border">
              <h2 className="display-md">تابعونا على إنستجرام</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                تابعونا على إنستجرام لمزيد من الآراء والتحديثات
              </p>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-ember/30 bg-ember/5 hover:bg-ember hover:text-background hover:border-ember transition-all duration-500"
              >
                <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium tracking-wide">{brand.instagramHandle}</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
