import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, ExternalLink, ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import { getLesson, setLessonProgress } from "@/lib/api/member.functions";
import { FadeIn } from "@/components/site/Misc";

export const Route = createFileRoute("/_authenticated/dashboard/$programSlug/lesson/$lessonSlug")({
  head: () => ({
    meta: [
      { title: "الجلسة — منطقة العضوات | ملاك عرنوس" },
      { name: "description", content: "تسجيل الجلسة والمواد المرفقة داخل برنامجك." },
      { property: "og:title", content: "الجلسة — منطقة العضوات" },
      { property: "og:description", content: "تسجيل الجلسة والمواد المرفقة." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => getLesson({ data: { slug: params.programSlug, lessonSlug: params.lessonSlug } }),
  errorComponent: () => (
    <section className="section-y">
      <div className="container-x max-w-md text-center">
        <h1 className="display-md mb-4">هذه الجلسة غير متاحة</h1>
        <p className="text-muted-foreground mb-6">قد لا يكون وصولك مفعّلاً بعد.</p>
        <Link to="/dashboard" className="text-ember">العودة إلى لوحتي</Link>
      </div>
    </section>
  ),
  component: LessonPage,
});

type Res = { label: string; url: string };
type LessonData = {
  program: { slug: string; title: string };
  lesson: {
    id: string;
    title: string;
    description: string | null;
    duration_minutes: number | null;
    video_url: string | null;
    video_passcode: string | null;
    resources: Res[];
    subtitles: Res[];
  };
  completed: boolean;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
};

function LessonPage() {
  const data = Route.useLoaderData() as LessonData;
  const router = useRouter();
  const save = useServerFn(setLessonProgress);
  const [completed, setCompleted] = useState(data.completed);
  const [saving, setSaving] = useState(false);
  const { programSlug } = Route.useParams();

  async function toggle() {
    setSaving(true);
    const nextValue = !completed;
    await save({ data: { slug: programSlug, lessonId: data.lesson.id, completed: nextValue } });
    setCompleted(nextValue);
    setSaving(false);
    router.invalidate();
  }

  return (
    <section className="section-y">
      <div className="container-x max-w-3xl">
        <FadeIn>
          <Link
            to="/dashboard/$programSlug"
            params={{ programSlug }}
            className="eyebrow text-muted-foreground hover:text-ember"
          >
            {data.program.title}
          </Link>
          <h1 className="display-lg mt-4 mb-3">{data.lesson.title}</h1>
          {data.lesson.duration_minutes ? (
            <p className="text-sm text-muted-foreground mb-6">مدة الجلسة: {data.lesson.duration_minutes} دقيقة</p>
          ) : null}
          {data.lesson.description && (
            <p className="text-[17px] leading-loose text-foreground/90 whitespace-pre-line mb-8">{data.lesson.description}</p>
          )}

          {data.lesson.video_url && (
            <div className="rounded-sm border border-border bg-surface p-6 mb-8">
              <a
                href={data.lesson.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-background"
              >
                مشاهدة الجلسة <ExternalLink className="w-3.5 h-3.5" />
              </a>
              {data.lesson.video_passcode && (
                <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <KeyRound className="w-3.5 h-3.5" /> رمز الدخول:{" "}
                  <span dir="ltr" className="font-medium text-foreground">{data.lesson.video_passcode}</span>
                </p>
              )}
            </div>
          )}

          {(data.files?.length > 0 || data.lesson.resources?.length > 0) && (
            <div className="mb-8">
              <h2 className="display-sm mb-3">المواد المرفقة</h2>
              <ul className="divide-y divide-border rounded-sm border border-border bg-surface">
                {(data.files ?? []).map((f: FileRes) => (
                  <li key={f.id}>
                    <button
                      onClick={() => openFile(f.id)}
                      className="flex w-full items-center justify-between px-5 py-4 text-[15px] hover:bg-background"
                    >
                      <span>
                        📄 {f.title}
                        {f.file_type ? (
                          <span className="ms-2 text-xs text-muted-foreground" dir="ltr">
                            {f.file_name}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-xs text-ember">تحميل</span>
                    </button>
                  </li>
                ))}
                {(data.lesson.resources ?? []).map((r: Res, i: number) => (
                  <li key={`legacy-${i}`}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-5 py-4 text-[15px] hover:bg-background"
                    >
                      {r.label} <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}


          <button
            onClick={toggle}
            disabled={saving}
            className={
              "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors disabled:opacity-50 " +
              (completed ? "bg-foreground text-background" : "border border-foreground/25 hover:border-foreground")
            }
          >
            <CheckCircle2 className="w-4 h-4" /> {completed ? "تمت مشاهدة الجلسة" : "تحديد كمكتملة"}
          </button>

          <div className="mt-12 flex items-center justify-between border-t border-border pt-6 text-sm">
            {data.prev ? (
              <Link
                to="/dashboard/$programSlug/lesson/$lessonSlug"
                params={{ programSlug, lessonSlug: data.prev.slug }}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-ember"
              >
                <ArrowRight className="w-3.5 h-3.5" /> السابقة
              </Link>
            ) : (
              <span />
            )}
            {data.next ? (
              <Link
                to="/dashboard/$programSlug/lesson/$lessonSlug"
                params={{ programSlug, lessonSlug: data.next.slug }}
                className="inline-flex items-center gap-2 text-ember"
              >
                التالية <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
