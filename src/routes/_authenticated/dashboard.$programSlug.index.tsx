import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, ArrowLeft, Clock, PlayCircle } from "lucide-react";
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
          <h1 className="display-md mt-4 mb-3">{data.program.title}</h1>
          {data.program.subtitle && <p className="text-muted-foreground text-[16px] leading-relaxed mb-8">{data.program.subtitle}</p>}

          {/* progress + continue */}
          <div className="rounded-sm border border-border bg-surface p-6 mb-10">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                أكملتِ <span className="font-medium text-foreground">{data.completedLessons}</span> من {data.totalLessons} جلسة
              </p>
              <span className="text-sm font-medium text-ember" dir="ltr">{percent}%</span>
            </div>
            <ProgressBar percent={percent} />
            {data.nextLesson && (
              <Link
                to="/dashboard/$programSlug/lesson/$lessonSlug"
                params={{ programSlug: data.program.slug, lessonSlug: data.nextLesson }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-90"
              >
                <PlayCircle className="w-4 h-4" />
                {data.completedLessons === 0 ? "ابدئي الجلسة الأولى" : "متابعة من حيث توقفتِ"}
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {data.program.slug === "the-shift" && <TheShiftIntro />}
        </FadeIn>

        {data.modules.length === 0 && <p className="text-muted-foreground">سيتم إضافة الجلسات قريباً.</p>}

        <div className="mt-10 space-y-8">
          {data.modules.map((m: Module, mi: number) => {
            const done = m.lessons.filter((l) => l.completed).length;
            const allDone = m.lessons.length > 0 && done === m.lessons.length;
            return (
              <FadeIn key={m.id} delay={mi * 0.04}>
                <div className="overflow-hidden rounded-sm border border-border bg-surface">
                  <div className="border-b border-border px-5 py-5 sm:px-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
                          (allDone ? "bg-ember text-background" : "bg-ember/10 text-ember")
                        }
                        dir="ltr"
                      >
                        {mi + 1}
                      </span>
                      <h2 className="display-sm flex-1 !mb-0">{m.title}</h2>
                      <span className="text-xs text-muted-foreground" dir="ltr">
                        {done}/{m.lessons.length}
                      </span>
                    </div>
                    {m.description && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-loose text-muted-foreground">{m.description}</p>
                    )}
                  </div>

                  <ul className="divide-y divide-border">
                    {m.lessons.map((l: Lesson, li: number) => {
                      const isNext = data.nextLesson === l.slug;
                      return (
                        <li key={l.id}>
                          <Link
                            to="/dashboard/$programSlug/lesson/$lessonSlug"
                            params={{ programSlug: data.program.slug, lessonSlug: l.slug }}
                            className={
                              "flex items-center gap-4 px-5 py-4 transition-colors hover:bg-background sm:px-6 " +
                              (isNext ? "bg-ember/[0.06]" : "")
                            }
                          >
                            {l.completed ? (
                              <CheckCircle2 className="w-4 h-4 shrink-0 text-ember" />
                            ) : (
                              <Circle className="w-4 h-4 shrink-0 text-foreground/30" />
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="block text-[15px]">
                                <span className="text-muted-foreground" dir="ltr">{li + 1}. </span>
                                {l.title}
                              </span>
                              {isNext && !l.completed && (
                                <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-ember">
                                  التالية لكِ
                                </span>
                              )}
                            </span>
                            {l.duration_minutes ? (
                              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="w-3.5 h-3.5" /> {l.duration_minutes} د
                              </span>
                            ) : null}
                            <ArrowLeft className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                          </Link>
                        </li>
                      );
                    })}
                    {m.lessons.length === 0 && (
                      <li className="px-5 py-4 text-sm text-muted-foreground sm:px-6">لا توجد جلسات منشورة بعد.</li>
                    )}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
