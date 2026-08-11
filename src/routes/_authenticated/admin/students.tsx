import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminOverview, adminSetAccess } from "@/lib/api/admin.functions";
import { AdminCard, AdminButton, AdminField, AdminMessage, inputClass } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/students")({
  head: () => ({
    meta: [
      { title: "العضوات — لوحة الإدارة" },
      { name: "description", content: "قائمة العضوات ومنح أو إلغاء الوصول يدوياً." },
      { property: "og:title", content: "العضوات" },
      { property: "og:description", content: "إدارة العضوات والوصول." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: () => adminOverview(),
  errorComponent: () => <p className="text-sm text-muted-foreground">تعذّر تحميل البيانات.</p>,
  component: StudentsPage,
});

function StudentsPage() {
  const data = Route.useLoaderData() as any;
  const router = useRouter();
  const setAccess = useServerFn(adminSetAccess);
  const [msg, setMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    program_id: data.programs[0]?.id ?? "",
    status: "active" as "active" | "revoked",
  });

  async function submit() {
    setMsg(null);
    try {
      const res: any = await setAccess({ data: form });
      setMsg(
        res.result === "granted"
          ? "تم تحديث الوصول."
          : res.result === "pending"
            ? "لا يوجد حساب بهذا البريد — سيتم التفعيل تلقائياً عند التسجيل."
            : "لا يوجد حساب بهذا البريد.",
      );
      router.invalidate();
    } catch (e) {
      setMsg("حدث خطأ: " + (e instanceof Error ? e.message : "غير معروف"));
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">العضوات</h1>
      <AdminMessage text={msg} />

      <AdminCard title="منح أو إلغاء الوصول يدوياً">
        <div className="grid gap-x-6 md:grid-cols-3">
          <AdminField label="بريد العضوة">
            <input
              dir="ltr"
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </AdminField>
          <AdminField label="البرنامج">
            <select
              className={inputClass}
              value={form.program_id}
              onChange={(e) => setForm({ ...form, program_id: e.target.value })}
            >
              {data.programs.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </AdminField>
          <AdminField label="الحالة">
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "revoked" })}
            >
              <option value="active">منح الوصول</option>
              <option value="revoked">إلغاء الوصول</option>
            </select>
          </AdminField>
        </div>
        <AdminButton onClick={submit} disabled={!form.email || !form.program_id}>
          تنفيذ
        </AdminButton>
      </AdminCard>

      <AdminCard title={`الحسابات (${data.customers.length})`}>
        <ul className="divide-y divide-border">
          {data.customers.map((c: any) => (
            <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
              <span>{c.full_name ?? "—"}</span>
              <span dir="ltr" className="text-muted-foreground">
                {c.email}
              </span>
            </li>
          ))}
        </ul>
      </AdminCard>

      <AdminCard title="اشتراكات بانتظار إنشاء حساب">
        <ul className="divide-y divide-border">
          {data.pending.map((p: any) => (
            <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
              <span dir="ltr">{p.email}</span>
              <span className="text-muted-foreground">{p.claimed_at ? "تم التفعيل" : "معلّق"}</span>
            </li>
          ))}
          {data.pending.length === 0 && <li className="py-2.5 text-sm text-muted-foreground">لا يوجد</li>}
        </ul>
      </AdminCard>
    </div>
  );
}
