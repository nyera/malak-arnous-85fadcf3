import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import { getProgramView } from "@/lib/api/member.functions";
import { FadeIn } from "@/components/site/Misc";
import { ProgressBar } from "@/components/member/ProgressBar";
import { TheShiftIntro } from "@/components/member/TheShiftIntro";


export const Route = createFileRoute("/_authenticated/dashboard/$programSlug/")({
  head: () => ({
    meta: [
      { title: "برنامجي — منطقة العضوات | ملاك عرنوس" },
      { name: "description", content: "جلسات برنامجك ومتابعة تقدّمك خطوة بخطوة." },
      { property: "og:title", content: "برنامجي — منطقة العضوات" },
      { property: "og:description", content: "جلسات برنامجك ومتابعة تقدّمك." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => getProgramView({ data: { slug: params.programSlug } }),
  errorComponent: () => (
    <section className="section-y">
      <div className="container-x max-w-md text-center">
        <h1 className="display-md mb-4">لا يمكن عرض هذا البرنامج</h1>
        <p className="text-muted-foreground mb-6">قد لا يكون وصولك مفعّلاً بعد.</p>
        <Link to="/dashboard" className="text-ember">العودة إلى لوحتي</Link>
      </div>
    </section>
  ),
  component: ProgramPage,
});

type Lesson = { id: string; slug: string; title: string; description: string | null; duration_minutes: number | null; completed: boolean };
type Module = { id: string; title: string; description: string | null; lessons: Lesson[] };

function ProgramPage() {
  const data = Route.useLoaderData() as {
    program: { slug: string; title: string; subtitle: string | null; description: string | null };
    modules: Module[];
    totalLessons: number;
    completedLessons: number;
    nextLesson: string | null;
  };
  const percent = data.totalLessons ? Math.round((data.completedLessons / data.totalLessons) * 100) : 0;

  return (
    <section className="section-y">
      <div className="container-x max-w-4xl">
        <FadeIn>
          <Link to="/dashboard" className="eyebrow text-muted-foreground hover:text-ember">لوحتي</Link>
          <h1 className="display-lg mt-4 mb-3">{data.program.title}</h1>
          {data.program.subtitle && <p className="text-muted-foreground text-lg leading-relaxed mb-8">{data.program.subtitle}</p>}
          <div className="rounded-sm border border-border bg-surface p-6 mb-12">
            <ProgressBar percent={percent} />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
              <span>أكملتِ {data.completedLessons} من {data.totalLessons} جلسة</span>
              {data.nextLesson && (
                <Link
                  to="/dashboard/$programSlug/lesson/$lessonSlug"
                  params={{ programSlug: data.program.slug, lessonSlug: data.nextLesson }}
                  className="inline-flex items-center gap-1 text-ember"
                >
                  متابعة من حيث توقفتِ <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </FadeIn>

        {data.modules.length === 0 && <p className="text-muted-foreground">سيتم إضافة الجلسات قريباً.</p>}

        <div className="space-y-10">
          {data.modules.map((m: Module, mi: number) => (
            <FadeIn key={m.id} delay={mi * 0.04}>
              <h2 className="display-sm mb-2">{m.title}</h2>
              {m.description && <p className="text-muted-foreground mb-4 leading-relaxed">{m.description}</p>}
              <ul className="divide-y divide-border rounded-sm border border-border bg-surface">
                {m.lessons.map((l: Lesson) => (
                  <li key={l.id}>
                    <Link
                      to="/dashboard/$programSlug/lesson/$lessonSlug"
                      params={{ programSlug: data.program.slug, lessonSlug: l.slug }}
                      className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-background"
                    >
                      {l.completed ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-ember" />
                      ) : (
                        <Circle className="w-4 h-4 shrink-0 text-foreground/30" />
                      )}
                      <span className="flex-1 text-[15px]">{l.title}</span>
                      {l.duration_minutes ? (
                        <span className="text-xs text-muted-foreground">{l.duration_minutes} دقيقة</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
                {m.lessons.length === 0 && <li className="px-5 py-4 text-sm text-muted-foreground">لا توجد جلسات منشورة بعد.</li>}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
