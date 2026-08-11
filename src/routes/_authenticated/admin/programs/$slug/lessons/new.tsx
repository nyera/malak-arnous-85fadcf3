import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { adminLessonDetail } from "@/lib/api/admin.functions";
import { LessonForm } from "@/components/admin/LessonForm";

export const Route = createFileRoute("/_authenticated/admin/programs/$slug/lessons/new")({
  head: () => ({
    meta: [
      { title: "إضافة جلسة — لوحة الإدارة" },
      { name: "description", content: "إضافة جلسة جديدة إلى البرنامج." },
      { property: "og:title", content: "إضافة جلسة" },
      { property: "og:description", content: "إضافة جلسة جديدة." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => adminLessonDetail({ data: { slug: params.slug } }),
  errorComponent: () => <p className="text-sm text-muted-foreground">تعذّر تحميل الصفحة.</p>,
  component: NewLessonPage,
});

function NewLessonPage() {
  const data = Route.useLoaderData() as any;
  const { slug } = Route.useParams();
  const router = useRouter();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link to="/admin/programs/$slug" params={{ slug }} className="text-sm text-muted-foreground hover:text-ember">
          {data.program.title}
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">إضافة جلسة</h1>
      </div>
      {data.modules.length === 0 ? (
        <p className="text-sm text-muted-foreground">أضيفي وحدة أولاً قبل إضافة الجلسات.</p>
      ) : (
        <LessonForm
          programId={data.program.id}
          programSlug={slug}
          modules={data.modules}
          lesson={null}
          resources={[]}
          defaultOrder={data.lessonCount + 1}
          onSaved={() => router.invalidate()}
        />
      )}
    </div>
  );
}
