import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { adminLessonDetail } from "@/lib/api/admin.functions";
import { LessonForm } from "@/components/admin/LessonForm";

export const Route = createFileRoute("/_authenticated/admin/programs/$slug/lessons/$lessonId/edit")({
  head: () => ({
    meta: [
      { title: "تعديل الجلسة — لوحة الإدارة" },
      { name: "description", content: "تعديل بيانات الجلسة والمواد المرفقة." },
      { property: "og:title", content: "تعديل الجلسة" },
      { property: "og:description", content: "تعديل بيانات الجلسة." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => adminLessonDetail({ data: { slug: params.slug, lessonId: params.lessonId } }),
  errorComponent: () => <p className="text-sm text-muted-foreground">تعذّر تحميل الجلسة.</p>,
  component: EditLessonPage,
});

function EditLessonPage() {
  const data = Route.useLoaderData() as any;
  const { slug } = Route.useParams();
  const router = useRouter();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link to="/admin/programs/$slug" params={{ slug }} className="text-sm text-muted-foreground hover:text-ember">
          {data.program.title}
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">تعديل: {data.lesson?.title}</h1>
      </div>
      <LessonForm
        programId={data.program.id}
        programSlug={slug}
        modules={data.modules}
        lesson={data.lesson}
        resources={data.resources}
        defaultOrder={data.lesson?.sort_order ?? 1}
        onSaved={() => router.invalidate()}
      />
    </div>
  );
}
