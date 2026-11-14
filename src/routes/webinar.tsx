import { createFileRoute } from "@tanstack/react-router";
import { Check, CalendarDays, Clock, Globe, Gift, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/site/Misc";
import { ZOHO_WEBINAR_URL, WEBINAR } from "@/data/content";
import portraitAsset from "@/assets/malak-portrait.png.asset.json";

const TITLE = "ويبينار مجاني: كيف تغيّرين علاقتك بالأكل من الداخل — ملاك عرنوس";
const DESC =
  "ويبينار تدريبي مجاني مباشر مع ملاك عرنوس لفهم العلاقة بين مشاعرك واستجابتك الداخلية وعلاقتك بالأكل، بدون دايت جديد أو حرمان.";
const URL = "https://malakarnoushealing369.com/webinar";

export const Route = createFileRoute("/webinar")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: WebinarPage,
});

const PRIMARY = "احجزي مقعدك المجاني الآن";
const LEARN_CTA = "سجلي مجاناً الآن واكتشفي الطريقة";

function RegisterButton({ label = PRIMARY, className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={ZOHO_WEBINAR_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "inline-flex items-center justify-center gap-2 rounded-full bg-wb-plum text-wb-plum-foreground px-7 py-3.5 text-[15px] font-semibold shadow-lg shadow-wb-plum/20 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wb-gold focus-visible:ring-offset-2 " +
        className
      }
    >
      <Sparkles className="w-4 h-4" aria-hidden />
      {label}
    </a>
  );
}

function Cta({ label }: { label?: string }) {
  return (
    <div className="mt-10 flex justify-center">
      <RegisterButton label={label} />
    </div>
  );
}

function DateBox({ live }: { live?: boolean }) {
  const has = WEBINAR.date || WEBINAR.time;
  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-wb-gold/40 bg-background/70 px-6 py-4 text-wb-plum">
      {has ? (
        <>
          <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-wb-gold" aria-hidden />{WEBINAR.date}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-wb-gold" aria-hidden />{WEBINAR.time}</span>
          {!live && WEBINAR.timezone && (
            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-wb-gold" aria-hidden />{WEBINAR.timezone}</span>
          )}
        </>
      ) : (
        <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-wb-gold" aria-hidden />سيتم الإعلان عن الموعد قريباً</span>
      )}
      {live && <span className="flex items-center gap-2" dir="ltr"><Globe className="w-4 h-4 text-wb-gold" aria-hidden />Online Live Webinar</span>}
    </div>
  );
}

function Section({ children, tone = "cream", id }: { children: React.ReactNode; tone?: "cream" | "ivory" | "blush"; id?: string }) {
  const bg = tone === "blush" ? "bg-wb-blush/50" : tone === "ivory" ? "bg-background" : "bg-wb-cream";
  return (
    <section id={id} className={bg + " py-16 md:py-24"}>
      <div className="container-x max-w-3xl">
        <FadeIn>{children}</FadeIn>
      </div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="display-lg text-wb-plum text-center mb-8">{children}</h2>;
}

const Divider = () => (
  <div className="flex items-center justify-center gap-3 mb-6" aria-hidden>
    <span className="h-px w-10 bg-wb-gold/60" />
    <span className="h-1.5 w-1.5 rotate-45 bg-wb-gold" />
    <span className="h-px w-10 bg-wb-gold/60" />
  </div>
);

const secrets = [
  {
    title: "السر الأول: تهدئة جهازك العصبي قبل صحنك",
    body: "لماذا خطوتك القادمة لا يجب أن تبدأ بمعركة يومية لمنع أكلة جديدة، بل بفهم الرابط بين تجاربك، مشاعرك، واللجوء للأكل، والتعرف على استخدام الـ EFT (التايبينغ).",
  },
  {
    title: "السر الثاني: خرافة قوة الإرادة",
    body: "لماذا لا تحتاجين إلى أن تصبحي «أقوى إرادة» حتى تبدأي بالتغيير، وكيف يمكن العمل على الاستجابة الداخلية بدل الدخول كل مرة في معركة جديدة مع الرغبة بالأكل.",
  },
  {
    title: "السر الثالث: التغيير وسط الفوضى",
    body: "كيف تبدأين بالتعامل مع نمط الأكل العاطفي وسط يومك المليء بالضغط والفوضى، بدون انتظار أن تصبح حياتك وروتينك \"مثاليين\".",
  },
];

const forYou = [
  {
    title: "تريدين خسارة الوزن وتلاحظين أن المشاعر تؤثر في أكلك:",
    body: "تلجئين للطعام عند الزعل أو الضغط أو الحاجة للراحة، حتى عندما لا تكونين جائعة.",
  },
  {
    title: "تعرفين الكثير عن الأكل لكنك تعودين للنمط نفسه:",
    body: "تبدئين بنية صادقة وتعرفين ما يجب فعله، ثم يعيدك يوم صعب أو تغيّر في الروتين إلى نفس العادات التي أردتِ تركها.",
  },
  {
    title: "تعبتِ من المنع والمقاومة والذنب:",
    body: "وتريدين فهم الجذور التي تجعلك ترجعين للأكل العاطفي، بدل الاعتماد على المزيد من القسوة على نفسك وقوة الإرادة.",
  },
];

function WebinarPage() {
  return (
    <div dir="rtl" className="bg-wb-cream text-foreground pb-24 md:pb-0">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-wb-blush/60 via-wb-cream to-wb-cream pt-14 pb-16 md:pt-24 md:pb-24">
        <div className="container-x max-w-3xl text-center">
          <FadeIn>
            <p className="inline-block rounded-full border border-wb-rose/40 bg-background/60 px-4 py-1.5 text-[13px] leading-relaxed text-wb-plum mb-6">
              ويبينار تدريبي مجاني للسيدات اللواتي تعبن من وعود «سأبدأ دايت من جديد يوم الإثنين»
            </p>
            <h1 className="display-xl text-wb-plum mb-6 leading-[1.35]">
              كيف تغيّرين علاقتك بالأكل وتخسرين الوزن من الداخل إلى الخارج... بدون دايت جديد أو حرمان.
            </h1>
            <div className="space-y-4 text-muted-foreground text-[16px] leading-loose max-w-2xl mx-auto">
              <p>تعرفين تماماً ما المفروض أن تأكليه، لكنكِ ترجعين للأكل العاطفي مع كل ضغط، تعب، أو يوم صعب؟</p>
              <p>هذا اللقاء المباشر مصمم ليساعدكِ تفهمي العلاقة بين مشاعرك، استجابتك الداخلية، وعلاقتك بالأكل بطريقة مختلفة عن الدايت والمنع والحرمان.</p>
            </div>
            <div className="mt-8"><DateBox /></div>
            <div className="mt-8"><RegisterButton className="text-base px-8 py-4" /></div>
            <p className="mt-4 text-[13px] text-muted-foreground">
              التسجيل مجاني — بعد التسجيل سيصلك إيميل التأكيد ورابط الدخول الخاص فيكِ.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PROBLEM */}
      <Section tone="ivory">
        <Divider />
        <H2>وجودكِ هنا ليس صدفة…</H2>
        <div className="space-y-5 text-[16px] leading-loose text-foreground/85">
          <p>ربما جرّبتِ الحميات، وعدّ السعرات، والصيام المتقطع، ومنعتِ نفسكِ من تناول الطعام.</p>
          <p>كنتِ صادقة عندما وعدتِ نفسك بالالتزام، لكن بمجرد أن يمر عليكِ يوم مزعج، أو تتغير خططك، أو تشعري بالضغط... تجدين نفسك تعودين إلى الأكل بحثاً عن الراحة.</p>
          <p>ثم تبدأ دوامة التأنيب، وتكتشفين أنكِ أكلتِ أكثر مما كنتِ تريدين.</p>
          <p className="text-wb-plum font-semibold text-lg">المشكلة لم تكن في الطعام أبدًا، ولا في ضعف إرادتك.</p>
          <p>الهدف من هذا اللقاء هو مساعدتكِ على فهم العلاقة بين المشاعر، التجارب السابقة، استجابة الجهاز العصبي، واللجوء للأكل كمساحة للراحة.</p>
        </div>
        <p className="mt-10 border-r-2 border-wb-gold pr-5 text-lg text-wb-plum leading-loose">
          في هذا اللقاء المجاني المباشر، سأشاركك النهج المختلف الذي يساعدكِ تبدأي تفهمي هذه الدوامة من الداخل.
        </p>
      </Section>

      {/* LEARN */}
      <section className="bg-wb-cream py-16 md:py-24">
        <div className="container-x max-w-5xl">
          <FadeIn>
            <Divider />
            <H2>في هذا التدريب، ستكتشفين:</H2>
            <div className="grid gap-6 md:grid-cols-3">
              {secrets.map((s, i) => (
                <article key={s.title} className="rounded-3xl border border-wb-gold/30 bg-background p-7 shadow-sm">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-wb-blush text-wb-plum font-semibold">{i + 1}</span>
                  <h3 className="text-lg font-semibold text-wb-plum mb-3 leading-relaxed">{s.title}</h3>
                  <p className="text-[15px] leading-loose text-muted-foreground">{s.body}</p>
                </article>
              ))}
            </div>
            <Cta label={LEARN_CTA} />
          </FadeIn>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-background py-16 md:py-24">
        <div className="container-x max-w-5xl">
          <FadeIn>
            <div className="grid items-center gap-10 md:grid-cols-[2fr_3fr]">
              <div className="relative mx-auto w-full max-w-xs">
                <div className="absolute -inset-3 rounded-[2rem] bg-wb-blush/60 rotate-3" aria-hidden />
                <img src={portraitAsset.url} alt="ملاك عرنوس" loading="lazy" className="relative aspect-[4/5] w-full rounded-[2rem] object-cover" />
              </div>
              <div>
                <h2 className="display-lg text-wb-plum mb-6">من هي ملاك عرنوس؟</h2>
                <div className="space-y-4 text-[16px] leading-loose text-foreground/85">
                  <p>أنا ملاك عرنوس، متخصصة في مساعدة النساء على فهم وتغيير علاقتهن مع الأكل العاطفي والعمل على الأسباب الأعمق خلف هذا النمط، وليس فقط التركيز على السلوك الظاهر.</p>
                  <p>أساعدكِ على فهم المشاعر والأنماط التي تدفعكِ للجوء إلى الأكل، والعمل عليها بطريقة أكثر وعياً، لتبني علاقة أهدأ وأكثر حرية مع الطعام.</p>
                </div>
                <div className="mt-8"><RegisterButton label={LEARN_CTA} /></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOR WHO */}
      <Section tone="blush">
        <Divider />
        <H2>هل هذا اللقاء التدريبي مناسب لكِ؟</H2>
        <p className="text-center text-lg text-foreground/85 mb-8">هذا الويبينار مصمم خصيصاً لكِ إذا كنتِ:</p>
        <div className="space-y-4">
          {forYou.map((f) => (
            <div key={f.title} className="flex gap-4 rounded-2xl bg-background p-6 shadow-sm">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-wb-plum text-wb-plum-foreground">
                <Check className="w-4 h-4" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-wb-plum mb-1.5 leading-relaxed">{f.title}</h3>
                <p className="text-[15px] leading-loose text-muted-foreground">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-dashed border-wb-gold bg-wb-cream/80 p-6">
          <p className="font-semibold text-wb-plum mb-2">ملاحظة:</p>
          <p className="text-[15px] leading-loose text-foreground/80">هذا اللقاء ليس لمن تبحث عن جدول وجبات جديد، حساب للسعرات الحرارية، أو قائمة صارمة بالأطعمة المسموحة والممنوعة.</p>
        </div>
      </Section>

      {/* WHY NOW */}
      <Section tone="ivory">
        <Divider />
        <H2>لماذا يجب أن تحضري الآن؟</H2>
        <p className="text-[16px] leading-loose text-foreground/85 mb-6">الاستمرار في نفس النمط القديم يعني استمرار التكلفة التي تدفعينها يومياً:</p>
        <ul className="space-y-3 mb-8">
          {[
            "بقاء الأكل شاغلاً لمساحة كبيرة من تفكيرك بين الوجبات،",
            "فقدان الثقة بوعودك لنفسك مع كل \"بداية جديدة\"،",
            "والبقاء في دائرة خسارة الوزن واستعادته.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3 rounded-xl bg-wb-blush/40 px-5 py-4 text-[15px] leading-loose">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-wb-rose" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <p className="text-[16px] leading-loose text-wb-plum">هذا التدريب سيعطيكِ منظوراً مختلفاً وأداة عملية تساعدكِ على البدء بفهم العلاقة بين مشاعرك واستجابتك للأكل من الداخل، بدل الاعتماد المستمر على المنع والمقاومة.</p>
        <Cta label="احجزي مقعدك المجاني الآن واقطعي دائرة التأنيب" />
      </Section>

      {/* BONUS */}
      <section className="bg-wb-cream py-14">
        <div className="container-x max-w-2xl">
          <FadeIn>
            <div className="rounded-3xl border border-wb-gold/50 bg-gradient-to-br from-background to-wb-blush/50 p-8 text-center">
              <Gift className="mx-auto mb-4 h-8 w-8 text-wb-gold" aria-hidden />
              <h2 className="text-xl md:text-2xl font-semibold text-wb-plum mb-3">وفي مفاجأة للحاضرات للنهاية ✨</h2>
              <p className="text-[15px] leading-loose text-foreground/80">خلال البث المباشر، رح يكون في هدية خاصة بانتظار اللي رح يبقوا معنا حتى نهاية اللقاء.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL */}
      <section id="register" className="bg-wb-plum py-16 md:py-24 text-wb-plum-foreground">
        <div className="container-x max-w-3xl text-center">
          <FadeIn>
            <h2 className="display-lg mb-8 text-wb-plum-foreground">جاهزة تبدأي تفهمي علاقتك بالأكل بطريقة مختلفة؟</h2>
            <DateBox live />
            <div className="mt-8">
              <a
                href={ZOHO_WEBINAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-wb-cream text-wb-plum px-8 py-4 font-semibold shadow-lg transition hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" aria-hidden />
                {PRIMARY}
              </a>
            </div>
            <p className="mt-4 text-[13px] opacity-80">التسجيل مجاني — بعد التسجيل رح يوصلك إيميل التأكيد ورابط الدخول الخاص فيكِ.</p>
          </FadeIn>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-wb-gold/30 bg-wb-cream/95 p-3 pl-20 backdrop-blur md:hidden">
        <RegisterButton className="w-full" />
      </div>
    </div>
  );
}
