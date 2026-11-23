import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Check, CalendarDays, Clock, Globe, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/site/Misc";
import { WEBINAR, ZOHO_WEBINAR_URL } from "@/data/content";
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

/* Native Zoho Webinar registration form (posts directly to Zoho) */
function ZohoForm() {
  const [tz, setTz] = useState("Asia/Riyadh");
  const [error, setError] = useState("");
  useEffect(() => {
    try { const z = Intl.DateTimeFormat().resolvedOptions().timeZone; if (z) setTz(z); } catch {}
  }, []);
  const field = "w-full rounded-xl border border-input bg-wb-cream/50 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-wb-rose focus:outline-none focus:ring-2 focus:ring-wb-rose/30";
  return (
    <form action="https://webinar.zoho.com/meeting/WebForm" name="WebForm5774894000000017011" method="POST" acceptCharset="UTF-8" target="_blank" className="space-y-3" onSubmit={(event) => {
      const form = event.currentTarget;
      const result = z.object({
        NAME: z.string().trim().min(1).max(40),
        REGISTRATIONCF1: z.string().trim().min(1).max(100),
        EMAIL: z.string().trim().email().max(251),
      }).safeParse(Object.fromEntries(new FormData(form)));
      if (!result.success) {
        event.preventDefault();
        setError("يرجى إدخال الاسم الأول واسم العائلة وبريد إلكتروني صحيح.");
        return;
      }
      setError("");
      for (const [name, value] of Object.entries(result.data)) {
        const input = form.elements.namedItem(name);
        if (input instanceof HTMLInputElement) input.value = value;
      }
    }}>
      <input type="hidden" name="xnQsjsdp" value="a18cbe9e86c5266173c325ad5f8c6f009ae8610bc07998bc58d3667a10a163bc" />
      <input type="hidden" name="zc_gad" value="" />
      <input type="hidden" name="xmIwtLD" value="ec5760e3e35147b3274d6ac4d37a0eb7dcdd1a4917340fc3e7ad35fbb93e2f3864107b7ba0bcdd4a8fe9532d7c5ff4ce" />
      <input type="hidden" name="actionType" value="UmVnaXN0cmF0aW9ucw==" />
      <input type="hidden" name="returnURL" value="https://webinar.zoho.com/postregister" />
      <input type="hidden" name="sysId" value="5774894000000017006" />
      <input type="hidden" name="isEmbedForm" value="true" />
      <input type="hidden" name="timezone" value={tz} />
      <label className="sr-only" htmlFor="wb-first">الاسم الأول</label>
      <input id="wb-first" name="NAME" required maxLength={40} placeholder="الاسم الأول *" className={field} />
      <label className="sr-only" htmlFor="wb-last">اسم العائلة</label>
      <input id="wb-last" name="REGISTRATIONCF1" required maxLength={100} placeholder="اسم العائلة *" className={field} />
      <label className="sr-only" htmlFor="wb-email">البريد الإلكتروني</label>
      <input id="wb-email" name="EMAIL" type="email" required maxLength={251} placeholder="البريد الإلكتروني *" dir="rtl" className={field} />
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <button type="submit" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wb-yellow px-6 py-3.5 text-[15px] font-bold text-wb-plum shadow-lg shadow-wb-yellow/40 transition hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl">
        <Sparkles className="w-4 h-4" aria-hidden />
        {PRIMARY}
      </button>
    </form>
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

function Section({ children, tone = "cream", id, last }: { children: React.ReactNode; tone?: "cream" | "ivory" | "blush"; id?: string; last?: boolean }) {
  const bg = tone === "blush" ? "bg-wb-blush/50" : tone === "ivory" ? "bg-background" : "bg-wb-cream";
  return (
    <section id={id} className={bg + (last ? " pt-16 pb-10 md:pt-24 md:pb-14" : " py-16 md:py-24")}>
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
    <div dir="rtl" className="bg-wb-cream text-foreground pb-20 md:pb-0">
      {/* HERO — light cream; centered headline, then portrait + registration form */}
      <section className="relative overflow-hidden bg-wb-cream">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-wb-blush/60 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-wb-gold/15 blur-3xl" aria-hidden />

        <div className="container-x relative py-12 md:py-16">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-block rounded-full border border-wb-gold/40 bg-background/70 px-4 py-1.5 text-[13px] leading-relaxed text-wb-plum mb-5">
                ويبينار تدريبي مجاني للسيدات اللواتي تعبن من وعود «سأبدأ دايت من جديد يوم الإثنين»
              </p>
              <h1 className="display-xl mb-5 leading-[1.35] text-wb-plum">
                كيف تغيّرين علاقتك بالأكل وتخسرين الوزن من الداخل إلى الخارج... بدون دايت جديد أو حرمان.
              </h1>
              <div className="space-y-3 text-foreground/80 text-[16px] leading-loose">
                <p>تعرفين تماماً ما المفروض أن تأكليه، لكنكِ ترجعين للأكل العاطفي مع كل ضغط، تعب، أو يوم صعب؟</p>
                <p>هذا اللقاء المباشر مصمم ليساعدكِ تفهمي العلاقة بين مشاعرك، استجابتك الداخلية، وعلاقتك بالأكل بطريقة مختلفة عن الدايت والمنع والحرمان.</p>
              </div>
            </div>
          </FadeIn>

          <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="order-2 lg:order-none"><FadeIn>
              <figure className="mx-auto w-full max-w-md">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-wb-gold/30 bg-wb-blush/40 shadow-lg shadow-wb-rose/10">
                  <img src={portraitAsset.url} alt="ملاك عرنوس" className="absolute inset-0 h-full w-full object-cover object-[center_20%]" />
                </div>
                <figcaption className="mt-2 text-center text-[13px] text-muted-foreground">مع ملاك عرنوس</figcaption>
              </figure>
            </FadeIn></div>
            <FadeIn>
              <div id="register" className="scroll-mt-24 overflow-hidden rounded-3xl border border-wb-gold/40 bg-background shadow-xl shadow-wb-rose/15">
                <div className="flex items-center justify-center gap-2 bg-wb-rose px-4 py-3 text-[14px] font-semibold text-wb-plum-foreground">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  مقاعد محدودة — التسجيل مجاني
                </div>
                <div className="p-6">
                  {(WEBINAR.date || WEBINAR.time) && <div className="mb-5 space-y-1.5 text-center text-[14px] text-wb-plum">
                    <p className="flex items-center justify-center gap-2"><CalendarDays className="w-4 h-4 text-wb-gold" aria-hidden />{WEBINAR.date}</p>
                    <p className="flex items-center justify-center gap-2"><Clock className="w-4 h-4 text-wb-gold" aria-hidden />{WEBINAR.time} — {WEBINAR.timezone}</p>
                  </div>}
                  <ZohoForm />
                  <a href={ZOHO_WEBINAR_URL} target="_blank" rel="noopener noreferrer" className="mt-4 block text-center text-sm text-wb-plum underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-wb-gold">رابط التسجيل</a>
                  <p className="mt-4 text-center text-[12px] leading-relaxed text-muted-foreground">
                    سيصلك رابط الدخول وتفاصيل الويبينار على بريدك الإلكتروني.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PROBLEM — light cream, split layout */}
      <section className="bg-wb-cream py-16 md:py-24">
        <div className="container-x max-w-5xl">
          <FadeIn>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Divider />
                <h2 className="display-lg text-wb-plum mb-8 text-center lg:text-right">وجودكِ هنا ليس صدفة…</h2>
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
      <section className="relative overflow-hidden bg-wb-blush/40 py-16 md:py-24">
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-wb-rose/15 blur-3xl" aria-hidden />
        <div className="container-x relative max-w-5xl">
          <FadeIn>
            <Divider />
            <H2>في هذا التدريب، ستكتشفين:</H2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {secrets.map((s, i) => (
                <article key={s.title} className="rounded-3xl border border-wb-gold/30 bg-background p-7 shadow-sm">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-wb-rose text-wb-plum-foreground font-semibold">{i + 1}</span>
                  <h3 className="text-lg font-semibold text-wb-plum mb-3 leading-relaxed">{s.title}</h3>
                  <p className="text-[15px] leading-loose text-foreground/75">{s.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <ScrollButton label={LEARN_CTA} />
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
      <Section tone="cream" last>
        <Divider />
        <H2>لماذا يجب أن تحضري الآن؟</H2>
        <p className="text-[16px] leading-loose text-foreground/85">الاستمرار في نفس النمط القديم يعني استمرار التكلفة التي تدفعينها يومياً: بقاء الأكل كشغل شاغل يستهلك تفكيرك بين الوجبات، فقدان الثقة بوعودك لنفسك مع كل "بداية جديدة" تُكسر، والبقاء في دوامة خسارة الوزن واستعادته. حضوركِ لهذا التدريب سيمنحكِ الفهم العصبي والأداة العملية لتغيير هذه المعادلة من الداخل، وبناء علاقة أهدأ مع الطعام لا تعتمد على مقاومتك المستمرة.</p>
        <div className="mt-10 flex justify-center">
          <ScrollButton label="احجزي مقعدك المجاني الآن واقطعي دائرة التأنيب" />
        </div>
      </Section>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-wb-gold/30 bg-wb-cream/95 p-3 pl-20 backdrop-blur md:hidden">
        <ScrollButton label={PRIMARY} className="w-full" />
      </div>
    </div>
  );
}
