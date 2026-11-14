import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "تم تسجيلك بنجاح — ويبينار ملاك عرنوس";
const DESC = "تم حجز مقعدك في الويبينار المجاني. شيّكي بريدك الإلكتروني لتفاصيل اللقاء ورابط الدخول.";

export const Route = createFileRoute("/webinar_/thank-you")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <section dir="rtl" className="bg-gradient-to-b from-wb-blush/60 to-wb-cream py-24 md:py-32">
      <div className="container-x max-w-xl text-center">
        <h1 className="display-xl text-wb-plum mb-6">تم تسجيلك بنجاح ✨</h1>
        <p className="text-lg text-wb-plum font-semibold mb-3">مقعدك صار محجوز.</p>
        <p className="text-[16px] leading-loose text-foreground/80">
          شيّكي بريدك الإلكتروني، لأن Zoho Webinar رح يبعتلك إيميل التأكيد وتفاصيل اللقاء ورابط الدخول الخاص فيكِ.
        </p>
        <Link to="/" className="mt-10 inline-flex rounded-full bg-wb-plum text-wb-plum-foreground px-8 py-3.5 font-semibold">
          الرجوع إلى الموقع
        </Link>
      </div>
    </section>
  );
}
