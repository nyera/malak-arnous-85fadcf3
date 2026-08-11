import { createFileRoute, Link } from "@tanstack/react-router";
import { adminProgramsList } from "@/lib/api/admin.functions";
import { Badge } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/programs/")({
  head: () => ({
    meta: [
      { title: "إدارة البرامج — لوحة الإدارة" },
      { name: "description", content: "قائمة البرامج مع عدد الوحدات والجلسات والعضوات." },
      { property: "og:title", content: "إدارة البرامج" },
      { property: "og:description", content: "قائمة البرامج وإدارة محتواها." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: () => adminProgramsList(),
  errorComponent: () => <p className="text-sm text-muted-foreground">تعذّر تحميل البرامج.</p>,
  component: ProgramsPage,
});

function ProgramsPage() {
  const { programs } = Route.useLoaderData() as any;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">البرامج</h1>

      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full text-right text-sm">
          <thead className="border-b border-border text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">البرنامج</th>
              <th className="px-4 py-3 font-medium">المعرّف</th>
              <th className="px-4 py-3 font-medium">وحدات</th>
              <th className="px-4 py-3 font-medium">جلسات</th>
              <th className="px-4 py-3 font-medium">عضوات</th>
              <th className="px-4 py-3 font-medium">الحالة</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {programs.map((p: any) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted-foreground" dir="ltr">
                  {p.slug}
                </td>
                <td className="px-4 py-3">{p.moduleCount}</td>
                <td className="px-4 py-3">
                  {p.lessonCount}
                  <span className="text-muted-foreground"> ({p.publishedLessonCount} منشورة)</span>
                </td>
                <td className="px-4 py-3">{p.studentCount}</td>
                <td className="px-4 py-3">
                  <Badge published={p.is_published} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    to="/admin/programs/$slug"
                    params={{ slug: p.slug }}
                    className="rounded-md bg-ember px-3 py-1.5 text-xs font-medium text-background"
                  >
                    إدارة البرنامج
                  </Link>
                </td>
              </tr>
            ))}
            {programs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                  لا توجد برامج بعد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
