import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { adminOverview, adminSaveLesson, adminSaveModule, adminSetAccess, adminDeleteRow } from "@/lib/api/admin.functions";
import { Field } from "@/components/member/AuthShell";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "الإدارة — منطقة العضوات | ملاك عرنوس" },
      { name: "description", content: "إدارة البرامج والوحدات والجلسات والعضوات والوصول." },
      { property: "og:title", content: "الإدارة" },
      { property: "og:description", content: "إدارة البرامج والجلسات والوصول." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: () => adminOverview(),
  errorComponent: () => (
    <section className="section-y">
      <div className="container-x max-w-md text-center">
        <h1 className="display-md mb-4">هذه الصفحة للإدارة فقط</h1>
        <Link to="/dashboard" className="text-ember">العودة إلى لوحتي</Link>
      </div>
    </section>
  ),
  component: AdminPage,
});

type Row = Record<string, any>;

function AdminPage() {
  const data = Route.useLoaderData() as {
    programs: Row[];
    modules: Row[];
    lessons: Row[];
    access: Row[];
    customers: Row[];
    pending: Row[];
  };
  const router = useRouter();
  const saveModule = useServerFn(adminSaveModule);
  const saveLesson = useServerFn(adminSaveLesson);
  const setAccess = useServerFn(adminSetAccess);
  const deleteRow = useServerFn(adminDeleteRow);

  const [msg, setMsg] = useState<string | null>(null);
  const [programId, setProgramId] = useState<string>(data.programs[0]?.id ?? "");
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleId, setModuleId] = useState<string>(data.modules[0]?.id ?? "");
  const [lesson, setLesson] = useState({ title: "", slug: "", url: "", passcode: "", duration: "", order: "" });
  const [grant, setGrant] = useState({ email: "", status: "active" as "active" | "revoked" });

  async function run(fn: () => Promise<unknown>, ok: string) {
    setMsg(null);
    try {
      await fn();
      setMsg(ok);
      router.invalidate();
    } catch (e) {
      setMsg("حدث خطأ: " + (e instanceof Error ? e.message : "غير معروف"));
    }
  }

  const programModules = data.modules.filter((m) => m.program_id === programId);

  return (
    <section className="section-y">
      <div className="container-x max-w-5xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow text-ember mb-3">الإدارة</p>
            <h1 className="display-lg">لوحة الإدارة</h1>
          </div>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-ember">لوحتي</Link>
        </div>

        {msg && <p className="mb-8 rounded-sm bg-ember/10 px-4 py-3 text-sm text-ember">{msg}</p>}

        <div className="grid gap-4 sm:grid-cols-4 mb-12">
          {[
            ["البرامج", data.programs.length],
            ["الجلسات", data.lessons.length],
            ["العضوات", data.customers.length],
            ["اشتراكات معلّقة", data.pending.filter((p) => !p.claimed_at).length],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-sm border border-border bg-surface p-5">
              <p className="eyebrow text-muted-foreground mb-2">{label}</p>
              <p className="display-sm">{value}</p>
            </div>
          ))}
        </div>

        <Card title="اختيار البرنامج">
          <select
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-[15px]"
          >
            {data.programs.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </Card>

        <Card title="إضافة وحدة">
          <Field label="عنوان الوحدة" value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} />
          <Btn
            onClick={() =>
              run(
                () =>
                  saveModule({
                    data: { program_id: programId, title: moduleTitle, sort_order: programModules.length + 1 },
                  }).then(() => setModuleTitle("")),
                "تم إضافة الوحدة.",
              )
            }
          >
            إضافة الوحدة
          </Btn>
          <ul className="mt-5 divide-y divide-border rounded-sm border border-border">
            {programModules.map((m) => (
              <li key={m.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span>{m.title}</span>
                <button
                  onClick={() => run(() => deleteRow({ data: { table: "modules", id: m.id } }), "تم الحذف.")}
                  className="text-ember"
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="إضافة جلسة">
          <label className="block mb-4">
            <span className="block mb-2 text-[13px] font-medium text-foreground/80">الوحدة</span>
            <select
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
              className="w-full rounded-sm border border-border bg-background px-4 py-3 text-[15px]"
            >
              {programModules.map((m) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </label>
          <Field label="عنوان الجلسة" value={lesson.title} onChange={(e) => setLesson({ ...lesson, title: e.target.value })} />
          <Field label="المعرّف بالإنجليزية (slug)" dir="ltr" value={lesson.slug} onChange={(e) => setLesson({ ...lesson, slug: e.target.value })} />
          <Field label="رابط تسجيل Zoom" dir="ltr" value={lesson.url} onChange={(e) => setLesson({ ...lesson, url: e.target.value })} />
          <Field label="رمز الدخول" dir="ltr" value={lesson.passcode} onChange={(e) => setLesson({ ...lesson, passcode: e.target.value })} />
          <Field label="المدة بالدقائق" dir="ltr" value={lesson.duration} onChange={(e) => setLesson({ ...lesson, duration: e.target.value })} />
          <Field label="الترتيب" dir="ltr" value={lesson.order} onChange={(e) => setLesson({ ...lesson, order: e.target.value })} />
          <Btn
            onClick={() =>
              run(
                () =>
                  saveLesson({
                    data: {
                      module_id: moduleId,
                      program_id: programId,
                      title: lesson.title,
                      slug: lesson.slug,
                      video_type: "zoom" as const,
                      video_url: lesson.url || null,
                      video_passcode: lesson.passcode || null,
                      duration_minutes: lesson.duration ? Number(lesson.duration) : null,
                      sort_order: lesson.order ? Number(lesson.order) : data.lessons.length + 1,
                      resources: [],
                      subtitles: [],
                      is_published: true,
                    },
                  }).then(() => setLesson({ title: "", slug: "", url: "", passcode: "", duration: "", order: "" })),
                "تم إضافة الجلسة ونشرها.",
              )
            }
          >
            إضافة الجلسة
          </Btn>
          <ul className="mt-5 divide-y divide-border rounded-sm border border-border">
            {data.lessons
              .filter((l) => l.program_id === programId)
              .map((l) => (
                <li key={l.id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span>
                    {l.title} {l.is_published ? "" : "(مسودة)"}
                  </span>
                  <button
                    onClick={() => run(() => deleteRow({ data: { table: "lessons", id: l.id } }), "تم الحذف.")}
                    className="text-ember"
                  >
                    حذف
                  </button>
                </li>
              ))}
          </ul>
        </Card>

        <Card title="منح أو إلغاء الوصول يدوياً">
          <Field label="بريد العضوة" dir="ltr" value={grant.email} onChange={(e) => setGrant({ ...grant, email: e.target.value })} />
          <label className="block mb-4">
            <span className="block mb-2 text-[13px] font-medium text-foreground/80">الحالة</span>
            <select
              value={grant.status}
              onChange={(e) => setGrant({ ...grant, status: e.target.value as "active" | "revoked" })}
              className="w-full rounded-sm border border-border bg-background px-4 py-3 text-[15px]"
            >
              <option value="active">منح الوصول</option>
              <option value="revoked">إلغاء الوصول</option>
            </select>
          </label>
          <Btn
            onClick={() =>
              run(
                () => setAccess({ data: { email: grant.email, program_id: programId, status: grant.status } }),
                "تم تحديث الوصول.",
              )
            }
          >
            تنفيذ
          </Btn>
        </Card>

        <Card title="العضوات">
          <ul className="divide-y divide-border rounded-sm border border-border">
            {data.customers.map((c) => (
              <li key={c.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span>{c.full_name ?? "—"}</span>
                <span dir="ltr" className="text-muted-foreground">{c.email}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="اشتراكات بانتظار إنشاء حساب">
          <ul className="divide-y divide-border rounded-sm border border-border">
            {data.pending.map((p) => (
              <li key={p.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span dir="ltr">{p.email}</span>
                <span className="text-muted-foreground">{p.claimed_at ? "تم التفعيل" : "معلّق"}</span>
              </li>
            ))}
            {data.pending.length === 0 && <li className="px-4 py-3 text-sm text-muted-foreground">لا يوجد</li>}
          </ul>
        </Card>
      </div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-sm border border-border bg-surface p-6">
      <h2 className="display-sm mb-5">{title}</h2>
      {children}
    </div>
  );
}

function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-ember px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-background"
    >
      {children}
    </button>
  );
}
