import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FadeIn } from "@/components/site/Misc";
import { brand } from "@/data/content";

import t3 from "@/assets/testimonials/t3.jpeg.asset.json";
import t4 from "@/assets/testimonials/t4.jpeg.asset.json";
import t5 from "@/assets/testimonials/t5.jpeg.asset.json";
import t6 from "@/assets/testimonials/t6.jpeg.asset.json";
import t7 from "@/assets/testimonials/t7.jpeg.asset.json";
import t8 from "@/assets/testimonials/t8.jpeg.asset.json";
import t9 from "@/assets/testimonials/t9.jpeg.asset.json";
import t10 from "@/assets/testimonials/t10.jpeg.asset.json";
import t11 from "@/assets/testimonials/t11.jpeg.asset.json";
import t12 from "@/assets/testimonials/t12.jpeg.asset.json";

const images = [t5, t6, t7, t8, t9, t10, t3, t4, t11, t12].map((a) => a.url);

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "آراء العملاء — ملاك عرنوس" },
      { name: "description", content: "تجارب حقيقية لنساء ورجال اختبروا التحول من الجذور مع ملاك عرنوس." },
      { property: "og:title", content: "آراء العملاء — ملاك عرنوس" },
      { property: "og:description", content: "تجارب حقيقية لنساء ورجال اختبروا التحول من الجذور." },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

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
              description="مجموعة من تجارب عميلاتي وعملائي بعد العمل على الجذور العاطفية والجهاز العصبي."
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
                {images.map((src, i) => (
                  <CarouselItem key={i} className="pl-4 basis-[80%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <figure className="group relative overflow-hidden rounded-2xl bg-background border border-border shadow-soft hover-lift">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={src}
                          alt={`شهادة عميلة ${i + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    </figure>
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
            <h2 className="display-lg text-center mb-10">المزيد من <span className="text-serif-italic ember-text">القصص</span></h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {images.map((src, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <figure className="group overflow-hidden rounded-2xl bg-background border border-border shadow-soft hover-lift">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={src}
                      alt={`شهادة عميلة ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6 p-10 md:p-14 rounded-3xl bg-surface border border-border">
              <h3 className="display-md">تابعونا على إنستجرام</h3>
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
