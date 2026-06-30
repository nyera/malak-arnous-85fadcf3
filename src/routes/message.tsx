import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import portraitAsset from "@/assets/malak-portrait.png.asset.json";
import { CTAButton, JoinNowButton } from "@/components/site/CTAButton";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/message")({
  head: () => ({
    meta: [
      { title: "رسالة إليكِ — ملاك عرنوس" },
      { name: "description", content: "رسالة من ملاك عرنوس: لماذا الالتزام صعب، ولماذا تبدأ رحلة الشفاء من تحرير ما تحت الطعام." },
      { property: "og:title", content: "رسالة إليكِ — ملاك عرنوس" },
      { property: "og:description", content: "وجودك في هذا الموقع ليس صدفة — رسالة من ملاك عرنوس." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://malak-arnous.lovable.app/message" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "رسالة إليكِ — ملاك عرنوس" },
      { name: "twitter:description", content: "وجودك في هذا الموقع ليس صدفة — رسالة من ملاك عرنوس." },
    ],
    links: [{ rel: "canonical", href: "https://malak-arnous.lovable.app/message" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "رسالة إليكِ — ملاك عرنوس",
          inLanguage: "ar",
          author: { "@type": "Person", name: "ملاك عرنوس" },
          publisher: { "@type": "Person", name: "ملاك عرنوس" },
        }),
      },
    ],
  }),
  component: MessagePage,
});

// Verbatim content from Malak's source document — do NOT rewrite, paraphrase, or shorten.
const letterShort = [
  "بسم الله الرحمن الرحيم",
  "وجودك في هذا الموقع ليس صدفة.",
  "بل هو دليل أنك تعرف أن هناك حل... لكنك تحتاج إلى من يقودك إليه.",
  "معظم الناس يعرفون ماذا يفعلون حتى ينزل الوزن:\nيأكلون أقل، يتحركون أكثر، أو يتبعون حمية.",
  "لكن السؤال الحقيقي هو...",
  "إذا كنا كلنا نعرف هذا، لماذا الالتزام صعب؟\nلماذا تختفي الإرادة بعد فترة قصيرة؟\nلماذا يبدو الطعام أقوى منا في لحظات معينة؟\nولماذا نعود دائمًا إلى نفس الدائرة؟",
  "والسؤال الأعمق من ذلك هو...",
  "إذا كان جسمك يعرف احتياجه الحقيقي — مثلًا 2000 سعرة حرارية —\nلماذا لا يتوقف بشكل تلقائي عند هذا الحد؟\nلماذا يستمر الأكل أحيانًا إلى ما بعد الشبع، وكأن هناك شيء أقوى من الإشارة الطبيعية للجوع؟",
  "الحقيقة هي أن المشكلة ليست فيك.",
  "ليست لأنك ضعيفة إرادة.\nوليست لأنك لا تملكين الانضباط.\nوليست لأنك لا تعرفين ماذا تفعلين.",
  "وليست حتى في الطعام نفسه.",
  "المشكلة في مكان أعمق...",
  "في كتل الأكل العاطفي.\nفي مشاعر لم تُحل.\nفي صدمات قديمة مخزنة داخل الجسم.\nفي ألم داخلي لم يجد طريقًا آمنًا للخروج.",
  "هذا الألم لا يختفي من تلقاء نفسه، بل يبحث عن طريقة للتخفيف... وغالبًا يجدها في الطعام.",
  "لذلك يحدث الأكل العاطفي، ليس كضعف، بل كآلية بقاء.",
  "وعندما نحاول حل المشكلة من الخارج فقط—بالحمية، بالحرمان، أو بالضغط على النفس—نحن لا نعالج السبب الحقيقي، بل نكبت الأعراض فقط.",
  "وهنا تبدأ الدوامة من جديد.",
  "أنا أؤمن أن الحل ليس في مقاومة الطعام، بل في تحرير ما تحت الطعام.",
  "لأن عندما تتحرر هذه الكتل العاطفية...\nيهدأ الصراع الداخلي...\nويخف التعلق بالأكل...\nويبدأ الجسم بالعودة لتوازنه الطبيعي.",
  "ليس بالقوة.\nوليس بالحرمان.\nبل من الداخل إلى الخارج.",
];

const letterLong = [
  "بسم الله الرحمن الرحيم",
  "وجودك في هذا الموقع ليس صدفة.",
  "بل هو دليل على أن جزءًا منك يعرف أن هناك حلًا... لكنه يحتاج إلى من يقوده إليه.",
  "ربما جرّبت الحميات، وعدّ السعرات، والصيام المتقطع، ومنعت نفسك من الأكل، ووعدت نفسك أن تبدأ من جديد كل يوم إثنين... لكنك وجدت نفسك تعود إلى نفس الدوامة مرة بعد مرة.",
  "لأن المشكلة لم تكن في الطعام أبدًا.",
  "أنا ملاك عرنوس، مختصة بتحرير الصدمات، ومتخصصة في علاج الأكل العاطفي، وخبيرة في مساعدة الأشخاص على التخلص من الوزن الزائد، من خلال تحرير الصدمات والمشاعر السلبية التي تقودهم إلى الأكل أكثر من احتياج أجسامهم.",
  "خلال رحلتي، ساعدت مئات النساء على التحرر من الأكل العاطفي واستعادة علاقة صحية مع الطعام، لأننا لا نركز على الأعراض... بل نعمل على الجذور.",
  "معظم الناس يعرفون ماذا يجب أن يفعلوا حتى ينخفض وزنهم.",
  "أن يأكلوا أقل.\nأن يتحركوا أكثر.\nأن يلتزموا بحمية غذائية.",
  "لكن إذا كان الجميع يعرف ذلك...",
  "لماذا الالتزام صعب؟\nلماذا تختفي الإرادة بعد أيام؟\nلماذا يبدو الطعام مغريًا رغم أنك لا تشعر بالجوع؟\nولماذا تعود إلى نفس الحلقة مهما حاولت؟",
  "إليك الحقيقة التي لا يتحدث عنها الكثيرون...",
  "المشكلة ليست فيك.",
  "أنت لست ضعيف الإرادة.",
  "ولست بحاجة إلى مزيد من الانضباط.",
  "وفي كثير من الحالات، المشكلة ليست في الطعام نفسه.",
  "المشكلة الحقيقية قد تكون في صدمات لم تُشفَ بعد، ومشاعر سلبية مكبوتة، وألم عاطفي مخزن في الجسم، يجعل الطعام وسيلة للهروب أو للراحة أو للشعور بالأمان.",
  "لهذا السبب، أنا لا أعلّمك كيف تمنع نفسك من الأكل.",
  "ولا أضع لك حمية جديدة.",
  "ولا أعتمد على الحرمان.",
  "ولا على الإبر أو الأدوية.",
  "بل أساعدك على تحرير الجذور التي تدفعك للأكل العاطفي، حتى يصبح الأكل المتوازن أسهل وأكثر طبيعية، ويخف الصراع الداخلي مع الطعام.",
  "تخيل أن تستيقظ دون أن يكون أول ما تفكر فيه هو الطعام.",
  "أن تأكل لأن جسمك يحتاج إلى الطعام، وليس لأن مشاعرك تطلبه.",
  "أن تشعر بالسلام مع نفسك، وأن يصبح الاهتمام بصحتك أمرًا طبيعيًا، لا معركة يومية.",
  "أنا أؤمن أن الشفاء الحقيقي يبدأ من الداخل.",
  "وعندما يتحرر الداخل... يبدأ الخارج بالتغير.",
  "وأتطلع لأن أكون جزءًا من رحلتك نحو حياة أكثر حرية، وسلامًا، وصح.",
];

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-6">
      {items.map((p, i) => (
        <FadeIn key={i} delay={Math.min(i * 0.03, 0.25)}>
          <p
            className={
              i === 0
                ? "display-md text-serif-italic ember-text whitespace-pre-line"
                : "text-lg text-foreground/90 leading-loose whitespace-pre-line"
            }
          >
            {p}
          </p>
        </FadeIn>
      ))}
    </div>
  );
}

function MessagePage() {
  return (
    <>
      <section className="section-y">
        <div className="container-x grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <FadeIn>
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden lg:sticky lg:top-28">
              <img
                src={portraitAsset.url}
                alt="ملاك عرنوس"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </FadeIn>

          <div className="max-w-2xl space-y-12">
            <header className="space-y-4">
              <span className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-ember" />
                رسالة إليكِ
              </span>
              <h1 className="display-xl">رسالة من <span className="text-serif-italic ember-text">ملاك</span></h1>
            </header>

            <Paragraphs items={letterShort} />

            <div className="h-px w-24 bg-ember/40 mx-auto" aria-hidden />

            <Paragraphs items={letterLong} />

            <div className="flex flex-wrap gap-4 pt-6">
              <JoinNowButton size="lg" />
              <Link to="/survey">
                <CTAButton variant="outline" icon={<ArrowRight className="w-4 h-4" />}>املئي الاستبيان</CTAButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TelegramCTA />
    </>
  );
}
