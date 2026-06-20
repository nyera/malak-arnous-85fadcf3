import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/site/SectionHeader";
import { AssessmentForm } from "@/components/site/AssessmentForm";
import { TelegramCTA } from "@/components/site/TelegramCTA";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/survey")({
  head: () => ({
    meta: [
      { title: "استبيان الأكل العاطفي — ملاك عرنوس" },
      { name: "description", content: "استبيان الأكل العاطفي، التدمير الذاتي، والتحول في الحياة." },
    ],
    links: [{ rel: "canonical", href: "/survey" }],
  }),
  component: SurveyPage,
});

function SurveyPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow={t.survey.eyebrow} title={t.survey.title} highlight={t.survey.highlight} description={t.survey.description} align="center" />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x max-w-3xl">
          <FadeIn>
            <div className="p-6 md:p-10 rounded-sm bg-surface border border-border">
              <AssessmentForm />
            </div>
          </FadeIn>
        </div>
      </section>

      <TelegramCTA />
    </>
  );
}
