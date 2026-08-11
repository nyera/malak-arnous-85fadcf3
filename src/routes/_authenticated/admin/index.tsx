import { createFileRoute, Link } from "@tanstack/react-router";
import { adminOverview } from "@/lib/api/admin.functions";
import { AdminCard, StatBox } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "لوحة الإدارة — ملاك عرنوس" },
      { name: "description", content: "إدارة البرامج والجلسات والعضوات والوصول." },
      { property: "og:title", content: "لوحة الإدارة" },
      { property: "og:description", content: "إدارة البرامج والجلسات والعضوات." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: () => adminOverview(),
  errorComponent: () => <p className="text-sm text-muted-foreground">تعذّر تحميل البيانات.</p>,
  component: AdminHome,
});

function AdminHome() {
  const data = Route.useLoaderData() as any;
  const pending = data.pending.filter((p: any) => !p.claimed_at).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">لوحة الإدارة</h1>
        <Link
          to="/admin/programs"
          className="rounded-md bg-ember px-4 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          إدارة البرامج
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBox label="البرامج" value={data.programs.length} />
        <StatBox label="العضوات" value={data.customers.length} />
        <StatBox label="الجلسات" value={data.lessons.length} />
        <StatBox label="اشتراكات معلّقة" value={pending} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard
          title="البرامج"
          action={
            <Link to="/admin/programs" className="text-sm text-ember">
              الكل
            </Link>
          }
        >
          <ul className="divide-y divide-border">
            {data.programs.map((p: any) => (
              <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                <span>{p.title}</span>
                <Link to="/admin/programs/$slug" params={{ slug: p.slug }} className="text-ember">
                  إدارة
                </Link>
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard title="محتوى الدورات">
          <div className="grid grid-cols-3 gap-3 text-center">
            <StatBox label="وحدات" value={data.modules.length} />
            <StatBox label="جلسات" value={data.lessons.length} />
            <StatBox
              label="منشورة"
              value={data.lessons.filter((l: any) => l.is_published).length}
            />
          </div>
        </AdminCard>

        <AdminCard
          title="أحدث عمليات الوصول"
          action={
            <Link to="/admin/students" className="text-sm text-ember">
              العضوات
            </Link>
          }
        >
          <ul className="divide-y divide-border">
            {data.recentGrants.map((g: any) => (
              <li key={g.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
                <span dir="ltr" className="text-muted-foreground">
                  {g.email ?? "—"}
                </span>
                <span>
                  {g.program ?? "—"} · {g.status === "active" ? "مفعّل" : "ملغى"} · {g.purchase_source}
                </span>
              </li>
            ))}
            {data.recentGrants.length === 0 && (
              <li className="py-2.5 text-sm text-muted-foreground">لا يوجد</li>
            )}
          </ul>
        </AdminCard>

        <AdminCard title="اشتراكات بانتظار إنشاء حساب">
          <ul className="divide-y divide-border">
            {data.pending.slice(0, 10).map((p: any) => (
              <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                <span dir="ltr">{p.email}</span>
                <span className="text-muted-foreground">{p.claimed_at ? "تم التفعيل" : "معلّق"}</span>
              </li>
            ))}
            {data.pending.length === 0 && <li className="py-2.5 text-sm text-muted-foreground">لا يوجد</li>}
          </ul>
        </AdminCard>
      </div>
    </div>
  );
}
