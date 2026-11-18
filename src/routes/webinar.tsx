import { createFileRoute } from "@tanstack/react-router";
import { Check, CalendarDays, Clock, Globe, Gift, Sparkles, Heart, Zap, Sprout } from "lucide-react";
import { FadeIn } from "@/components/site/Misc";
import { ZOHO_WEBINAR_URL, ZOHO_WEBINAR_EMBED_URL, WEBINAR } from "@/data/content";
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

/* Button that opens the Zoho registration page (used inside the registration card + final section) */
function RegisterButton({ label = PRIMARY, className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={ZOHO_WEBINAR_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "inline-flex items-center justify-center gap-2 rounded-full bg-wb-rose text-wb-plum-foreground px-7 py-3.5 text-[15px] font-semibold shadow-lg shadow-wb-rose/25 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wb-gold focus-visible:ring-offset-2 " +
        className
      }
    >
      <Sparkles className="w-4 h-4" aria-hidden />
      {label}
    </a>
  );
}

/* Button that scrolls to the registration card in the hero */
function ScrollButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a
      href="#register"
      className={
        "inline-flex items-center justify-center gap-2 rounded-full bg-wb-rose text-wb-plum-foreground px-7 py-3.5 text-[15px] font-semibold shadow-lg shadow-wb-rose/25 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wb-gold focus-visible:ring-offset-2 " +
        className
      }
    >
      <Sparkles className="w-4 h-4" aria-hidden />
      {label}
    </a>
  );
}

function DateBox({ live, dark }: { live?: boolean; dark?: boolean }) {
  const has = WEBINAR.date || WEBINAR.time;
  const tone = dark
    ? "border-wb-gold/40 bg-wb-plum-foreground/5 text-wb-plum-foreground"
    : "border-wb-gold/40 bg-background/70 text-wb-plum";
  return (
    <div className={"inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border px-6 py-4 " + tone}>
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

function H2({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <h2 className={"display-lg text-center mb-8 " + (dark ? "text-wb-plum-foreground" : "text-wb-plum")}>{children}</h2>;
}

const Divider = ({ dark }: { dark?: boolean }) => (
  <div className="flex items-center justify-center gap-3 mb-6" aria-hidden>
    <span className={"h-px w-10 " + (dark ? "bg-wb-gold/70" : "bg-wb-gold/60")} />
    <span className="h-1.5 w-1.5 rotate-45 bg-wb-gold" />
    <span className={"h-px w-10 " + (dark ? "bg-wb-gold/70" : "bg-wb-gold/60")} />
  </div>
);

const quickValues = [
  { icon: Heart, title: "افهمي الرابط بين مشاعرك والأكل" },
  { icon: Zap, title: "اكتشفي لماذا الإرادة وحدها لا تكفي" },
  { icon: Sprout, title: "ابدئي التغيير من الجذور وليس من المنع" },
];

const secrets = [
  {
    title: "السر الأول: تهدئة جهازك العصبي قبل صحنك",
    body: "لماذا خطوتك القادمة لخسارة الوزن لا يجب أن تبدأ بمعركة يومية لمنع أكلة جديدة، بل بفك الرابط بين ماضيكِ، مشاعرك، واللجوء للأكل باستخدام الـ EFT (التايبينغ).",
  },
  {
    title: "السر الثاني: خرافة قوة الإرادة",
    body: "لماذا لا تحتاجين إلى أن تصبحي «أقوى إرادة» لكي تتغيري، وكيف نهدئ الجهاز العصبي حتى تختفي الرغبة الملحّة والصرخة الداخلية من الأساس.",
  },
  {
    title: "السر الثالث: التغيير وسط الفوضى",
    body: "كيف تسيطرين على نمط الأكل العاطفي في قلب يومك المليء بالضغط والفوضى، دون أن تضطري لانتظار أن تصبح ظروف حياتك وروتينك \"مثالية\".",
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
      {/* HERO — dark premium plum, two-column: messaging (right) + registration card (left) */}
      <section className="relative overflow-hidden bg-wb-plum-deep text-wb-plum-foreground">
        {/* soft blush/gold glow elements */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-wb-rose/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-wb-gold/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-wb-plum/60 blur-3xl" aria-hidden />

        <div className="container-x relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
          {/* Messaging (right side in RTL) */}
          <FadeIn>
            <div className="text-center lg:text-right">
              <p className="inline-block rounded-full border border-wb-gold/40 bg-wb-plum-foreground/5 px-4 py-1.5 text-[13px] leading-relaxed text-wb-plum-foreground/90 mb-6">
                ويبينار تدريبي مجاني للسيدات اللواتي تعبن من وعود «سأبدأ دايت من جديد يوم الإثنين»
              </p>
              <h1 className="display-xl mb-6 leading-[1.35] text-wb-plum-foreground">
                كيف تغيّرين علاقتك بالأكل وتخسرين الوزن من الداخل إلى الخارج... بدون دايت جديد أو حرمان.
              </h1>
              <div className="space-y-4 text-wb-plum-foreground/80 text-[16px] leading-loose">
                <p>تعرفين تماماً ما المفروض أن تأكليه، لكنكِ ترجعين للأكل العاطفي مع كل ضغط، تعب، أو يوم صعب؟</p>
                <p>هذا اللقاء المباشر مصمم ليساعدكِ تفهمي العلاقة بين مشاعرك، استجابتك الداخلية، وعلاقتك بالأكل بطريقة مختلفة عن الدايت والمنع والحرمان.</p>
              </div>
              <div className="mt-8"><DateBox dark /></div>
            </div>
          </FadeIn>

          {/* Registration card (left side in RTL) — soft gold border/glow */}
          <FadeIn>
            <div
              id="register"
              className="relative mx-auto w-full max-w-md scroll-mt-24 rounded-[2rem] border border-wb-gold/50 bg-wb-plum-dark/80 p-8 text-center shadow-[0_0_60px_-15px] shadow-wb-gold/30 backdrop-blur"
            >
              <img
                src={portraitAsset.url}
                alt="ملاك عرنوس"
                className="mx-auto -mt-20 mb-5 h-24 w-24 rounded-full border-2 border-wb-gold/60 object-cover shadow-lg"
              />
              <h2 className="text-xl font-semibold text-wb-plum-foreground mb-2">{PRIMARY}</h2>
              <p className="text-[14px] leading-loose text-wb-plum-foreground/70 mb-6">
                التسجيل مجاني — سيصلك رابط الدخول وتفاصيل الويبينار على بريدك الإلكتروني.
              </p>
              {/* Official Zoho registration embed */}
              <div className="overflow-hidden rounded-2xl border border-wb-gold/30 bg-wb-plum-foreground/5">
                <iframe
                  src={ZOHO_WEBINAR_EMBED_URL}
                  title="التسجيل في الويبينار"
                  className="block h-[240px] w-full"
                  frameBorder={0}
                />
              </div>
              <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-wb-plum-foreground/60" dir="ltr">
                <Globe className="w-3.5 h-3.5 text-wb-gold" aria-hidden />
                Online Live Webinar
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* QUICK VALUE CARDS — 3 premium dark cards right under the hero */}
      <section className="relative bg-wb-plum-deep pb-16 md:pb-24 pt-2">
        <div className="container-x max-w-5xl">
          <FadeIn>
            <div className="grid gap-6 md:grid-cols-3">
              {quickValues.map((q) => (
                <article
                  key={q.title}
                  className="rounded-3xl border border-wb-gold/25 bg-wb-plum-dark/70 p-7 text-center shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-wb-gold/50"
                >
                  <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-wb-gold/40 bg-wb-plum-foreground/5">
                    <q.icon className="h-5 w-5 text-wb-gold" aria-hidden />
                  </span>
                  <h3 className="text-[17px] font-semibold leading-relaxed text-wb-plum-foreground">{q.title}</h3>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROBLEM — light cream, split layout */}
      <section className="bg-wb-cream py-16 md:py-24">
        <div className="container-x max-w-5xl">
          <FadeIn>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <Divider />
                <h2 className="display-lg text-wb-plum mb-8 text-center md:text-right">وجودكِ هنا ليس صدفة…</h2>
                <div className="space-y-5 text-[16px] leading-loose text-foreground/85">
                  <p>ربما جرّبتِ الحميات، وعدّ السعرات، والصيام المتقطع، ومنعتِ نفسكِ من تناول الطعام. كنتِ صادقة عندما وعدتِ نفسك بالالتزام، لكن بمجرد أن يمر عليكِ يوم مزعج، أو تتغير خططك، أو تشعري بالضغط... تجدين نفسك تعودين إلى الأكل بحثاً عن الراحة.</p>
                  <p>ثم تبدأ دوامة التأنيب، وتكتشفين أنكِ أكلتِ أكثر مما كنتِ تريدين.</p>
                  <p className="text-wb-plum font-semibold text-lg">المشكلة لم تكن في الطعام أبدًا، ولا في ضعف إرادتك. المشكلة في المشاعر والصدمات المخزّنة في جهازك العصبي التي تدفعك للأكل كطوق نجاة.</p>
                </div>
                <p className="mt-8 border-r-2 border-wb-gold pr-5 text-lg text-wb-plum leading-loose">
                  في هذا اللقاء المجاني المباشر، سأشاركك النهج المختلف الذي سيحررك من هذه الدوامة.
                </p>
              </div>
              {/* subtle abstract wellness visual */}
              <div className="relative mx-auto aspect-square w-full max-w-sm" aria-hidden>
                <div className="absolute inset-0 rounded-full bg-wb-blush/50 blur-2xl" />
                <div className="absolute inset-8 rounded-full border border-wb-gold/40" />
                <div className="absolute inset-16 rounded-full bg-gradient-to-br from-wb-rose/30 to-wb-gold/20 blur-sm" />
                <div className="absolute inset-24 rounded-full bg-wb-plum/10 backdrop-blur-sm" />
                <div className="absolute top-6 right-10 h-16 w-16 rounded-full bg-wb-gold/30 blur-md" />
                <div className="absolute bottom-8 left-8 h-20 w-20 rounded-full bg-wb-rose/30 blur-md" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHAT YOU WILL LEARN — dark plum */}
      <section className="relative overflow-hidden bg-wb-plum-deep py-16 md:py-24 text-wb-plum-foreground">
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-wb-rose/15 blur-3xl" aria-hidden />
        <div className="container-x relative max-w-5xl">
          <FadeIn>
            <Divider dark />
            <H2 dark>في هذا التدريب، ستكتشفين:</H2>
            <div className="grid gap-6 md:grid-cols-3">
              {secrets.map((s, i) => (
                <article key={s.title} className="rounded-3xl border border-wb-gold/25 bg-wb-plum-dark/70 p-7 shadow-lg shadow-black/20 backdrop-blur">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-wb-rose/20 text-wb-gold font-semibold border border-wb-gold/30">{i + 1}</span>
                  <h3 className="text-lg font-semibold text-wb-plum-foreground mb-3 leading-relaxed">{s.title}</h3>
                  <p className="text-[15px] leading-loose text-wb-plum-foreground/70">{s.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <ScrollButton label={LEARN_CTA} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ماذا لو — light transition banner */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-x max-w-3xl text-center">
          <FadeIn>
            <Divider />
            <h2 className="display-xl text-wb-plum leading-[1.4]">ماذا لو لم يكن الحل في دايت جديد؟</h2>
            <div className="mt-8 flex justify-center">
              <ScrollButton label={PRIMARY} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-wb-cream py-16 md:py-24">
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
                <div className="mt-8"><ScrollButton label={LEARN_CTA} /></div>
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
        <div className="mt-10 flex justify-center">
          <ScrollButton label="احجزي مقعدك المجاني الآن واقطعي دائرة التأنيب" />
        </div>
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

      {/* FINAL — dark plum */}
      <section className="relative overflow-hidden bg-wb-plum-deep py-16 md:py-24 text-wb-plum-foreground">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-wb-gold/15 blur-3xl" aria-hidden />
        <div className="container-x relative max-w-3xl text-center">
          <FadeIn>
            <h2 className="display-lg mb-8 text-wb-plum-foreground">جاهزة تبدأي تفهمي علاقتك بالأكل بطريقة مختلفة؟</h2>
            <DateBox live dark />
            <div className="mt-8">
              <RegisterButton className="px-8 py-4 text-base" />
            </div>
            <p className="mt-4 text-[13px] opacity-80">التسجيل مجاني — بعد التسجيل رح يوصلك إيميل التأكيد ورابط الدخول الخاص فيكِ.</p>
          </FadeIn>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-wb-gold/30 bg-wb-cream/95 p-3 pl-20 backdrop-blur md:hidden">
        <ScrollButton label={PRIMARY} className="w-full" />
      </div>
    </div>
  );
}
