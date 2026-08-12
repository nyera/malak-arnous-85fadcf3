import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  KeyRound,
  FileText,
  Download,
  Clock,
  PlayCircle,
} from "lucide-react";
import { getLesson, setLessonProgress, getMyResourceUrl, getLessonVideoUrl } from "@/lib/api/member.functions";
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
type FileRes = {
  id: string;
  title: string;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
};
type LessonData = {
  program: { slug: string; title: string };
  moduleTitle: string | null;
  lesson: {
    id: string;
    title: string;
    description: string | null;
    duration_minutes: number | null;
    video_type: string | null;
    video_url: string | null;
    video_passcode: string | null;
    storage_path: string | null;
    resources: Res[];
    subtitles: Res[];
  };
  files: FileRes[];
  completed: boolean;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
};

function prettySize(bytes: number | null) {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function LessonPage() {
  const data = Route.useLoaderData() as LessonData;
  const router = useRouter();
  const save = useServerFn(setLessonProgress);
  const resourceUrl = useServerFn(getMyResourceUrl);
  const videoUrlFn = useServerFn(getLessonVideoUrl);
  const [completed, setCompleted] = useState(data.completed);
  const [saving, setSaving] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);
  const { programSlug } = Route.useParams();

  const hasUpload = !!data.lesson.storage_path;

  useEffect(() => {
    let active = true;
    setVideoUrl(null);
    setVideoError(false);
    if (!hasUpload) return;
    videoUrlFn({ data: { slug: programSlug, lessonId: data.lesson.id } })
      .then((res: { url: string }) => {
        if (active) setVideoUrl(res.url);
      })
      .catch(() => active && setVideoError(true));
    return () => {
      active = false;
    };
  }, [data.lesson.id, hasUpload, programSlug]);

  async function toggle() {
    setSaving(true);
    const nextValue = !completed;
    await save({ data: { slug: programSlug, lessonId: data.lesson.id, completed: nextValue } });
    setCompleted(nextValue);
    setSaving(false);
    router.invalidate();
  }

  async function openFile(resourceId: string) {
    const res = await resourceUrl({ data: { slug: programSlug, resourceId } });
    if (res?.url) window.open(res.url, "_blank", "noopener,noreferrer");
  }

  const hasFiles = (data.files?.length ?? 0) > 0 || (data.lesson.resources?.length ?? 0) > 0;

  return (
    <section className="section-y">
      <div className="container-x max-w-3xl">
        <FadeIn>
          {/* breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-ember">لوحتي</Link>
            <span>/</span>
            <Link to="/dashboard/$programSlug" params={{ programSlug }} className="hover:text-ember">
              {data.program.title}
            </Link>
            {data.moduleTitle ? (
              <>
                <span>/</span>
                <span>{data.moduleTitle}</span>
              </>
            ) : null}
          </div>

          <h1 className="display-md mt-4 mb-3">{data.lesson.title}</h1>

          <div className="mb-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {data.lesson.duration_minutes ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {data.lesson.duration_minutes} دقيقة
              </span>
            ) : null}
            {completed ? (
              <span className="inline-flex items-center gap-1.5 text-ember">
                <CheckCircle2 className="w-3.5 h-3.5" /> مكتملة
              </span>
            ) : null}
          </div>

          {/* video */}
          {hasUpload ? (
            <div className="mb-8 overflow-hidden rounded-sm border border-border bg-black/90">
              {videoUrl ? (
                <video
                  key={videoUrl}
                  src={videoUrl}
                  controls
                  controlsList="nodownload"
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full"
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center text-sm text-white/70">
                  {videoError ? "تعذّر تحميل الفيديو، حدّثي الصفحة." : "جارٍ تحضير الفيديو..."}
                </div>
              )}
            </div>
          ) : null}

          {!hasUpload && data.lesson.video_url ? (
            <div className="mb-8 rounded-sm border border-border bg-surface p-6">
              <a
                href={data.lesson.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-background"
              >
                <PlayCircle className="w-4 h-4" /> مشاهدة الجلسة
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              {data.lesson.video_passcode && (
                <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <KeyRound className="w-3.5 h-3.5" /> رمز الدخول:{" "}
                  <span dir="ltr" className="font-medium text-foreground">{data.lesson.video_passcode}</span>
                </p>
              )}
            </div>
          ) : null}

          {data.lesson.description && (
            <div className="mb-10 rounded-sm border border-border bg-surface p-6">
              <p className="whitespace-pre-line text-[16px] leading-loose text-foreground/90">
                {data.lesson.description}
              </p>
            </div>
          )}

          {/* materials */}
          {hasFiles && (
            <div className="mb-10">
              <h2 className="display-sm mb-4">مواد الجلسة</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {(data.files ?? []).map((f: FileRes) => (
                  <button
                    key={f.id}
                    onClick={() => openFile(f.id)}
                    className="group flex items-center gap-3 rounded-sm border border-border bg-surface px-4 py-4 text-start transition-colors hover:border-ember/50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember/10 text-ember">
                      <FileText className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px]">{f.title}</span>
                      <span className="block text-xs text-muted-foreground" dir="ltr">
                        {[f.file_name, prettySize(f.file_size)].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                    <Download className="w-4 h-4 shrink-0 text-muted-foreground transition-colors group-hover:text-ember" />
                  </button>
                ))}
                {(data.lesson.resources ?? []).map((r: Res, i: number) => (
                  <a
                    key={`legacy-${i}`}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-sm border border-border bg-surface px-4 py-4 transition-colors hover:border-ember/50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember/10 text-ember">
                      <ExternalLink className="w-4 h-4" />
                    </span>
                    <span className="flex-1 text-[15px]">{r.label}</span>
                  </a>
                ))}
              </div>
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

          <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm">
            {data.prev ? (
              <Link
                to="/dashboard/$programSlug/lesson/$lessonSlug"
                params={{ programSlug, lessonSlug: data.prev.slug }}
                className="inline-flex min-w-0 items-center gap-2 text-muted-foreground hover:text-ember"
              >
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{data.prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {data.next ? (
              <Link
                to="/dashboard/$programSlug/lesson/$lessonSlug"
                params={{ programSlug, lessonSlug: data.next.slug }}
                className="inline-flex min-w-0 items-center gap-2 text-ember"
              >
                <span className="truncate">{data.next.title}</span>
                <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
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
