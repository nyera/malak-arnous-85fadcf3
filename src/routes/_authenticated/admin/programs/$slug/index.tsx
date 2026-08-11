import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  adminProgramDetail,
  adminSaveModule,
  adminTogglePublish,
  adminDeleteRow,
  adminReorder,
} from "@/lib/api/admin.functions";
import { AdminButton, AdminField, AdminMessage, Badge, StatBox, inputClass } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/programs/$slug/")({
  head: () => ({
    meta: [
      { title: "إدارة محتوى البرنامج — لوحة الإدارة" },
      { name: "description", content: "إدارة وحدات البرنامج وجلساته ومواده." },
      { property: "og:title", content: "إدارة محتوى البرنامج" },
      { property: "og:description", content: "وحدات وجلسات البرنامج." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => adminProgramDetail({ data: { slug: params.slug } }),
  errorComponent: () => (
    <div className="text-sm text-muted-foreground">
      تعذّر تحميل البرنامج. <Link to="/admin/programs" className="text-ember">رجوع</Link>
    </div>
  ),
  component: ProgramWorkspace,
});

function ProgramWorkspace() {
  const data = Route.useLoaderData() as any;
  const { slug } = Route.useParams();
  const router = useRouter();
  const saveModule = useServerFn(adminSaveModule);
  const togglePublish = useServerFn(adminTogglePublish);
  const deleteRow = useServerFn(adminDeleteRow);
  const reorder = useServerFn(adminReorder);

  const [msg, setMsg] = useState<string | null>(null);
  const [newModule, setNewModule] = useState({ title: "", description: "" });
  const [showAddModule, setShowAddModule] = useState(false);
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [moduleEdit, setModuleEdit] = useState({ title: "", description: "" });

  async function run(fn: () => Promise<unknown>, ok?: string) {
    setMsg(null);
    try {
      await fn();
      if (ok) setMsg(ok);
      router.invalidate();
    } catch (e) {
      setMsg("حدث خطأ: " + (e instanceof Error ? e.message : "غير معروف"));
    }
  }

  const modules = data.modules as any[];

  return (
    <div className="space-y-8">
      <div>
        <Link to="/admin/programs" className="text-sm text-muted-foreground hover:text-ember">
          البرامج
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">{data.program.title}</h1>
        <p dir="ltr" className="text-sm text-muted-foreground">
          {data.program.slug}
        </p>
      </div>

      <AdminMessage text={msg} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBox label="الوحدات" value={data.stats.modules} />
        <StatBox label="الجلسات" value={data.stats.lessons} />
        <StatBox label="جلسات منشورة" value={data.stats.publishedLessons} />
        <StatBox label="العضوات المشتركات" value={data.stats.students} />
      </div>

      <div className="flex flex-wrap gap-3">
        <AdminButton onClick={() => setShowAddModule((v) => !v)}>+ إضافة وحدة</AdminButton>
        <Link
          to="/admin/programs/$slug/lessons/new"
          params={{ slug }}
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
        >
          + إضافة جلسة
        </Link>
      </div>

      {showAddModule && (
        <div className="rounded-lg border border-border bg-surface p-5">
          <AdminField label="عنوان الوحدة">
            <input
              className={inputClass}
              value={newModule.title}
              onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
            />
          </AdminField>
          <AdminField label="وصف الوحدة (اختياري)">
            <textarea
              rows={2}
              className={inputClass}
              value={newModule.description}
              onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
            />
          </AdminField>
          <AdminButton
            disabled={!newModule.title.trim()}
            onClick={() =>
              run(
                () =>
                  saveModule({
                    data: {
                      program_id: data.program.id,
                      title: newModule.title.trim(),
                      description: newModule.description.trim() || null,
                      sort_order: modules.length + 1,
                      status: "published",
                    },
                  }).then(() => {
                    setNewModule({ title: "", description: "" });
                    setShowAddModule(false);
                  }),
                "تم إضافة الوحدة.",
              )
            }
          >
            حفظ الوحدة
          </AdminButton>
        </div>
      )}

      <div className="space-y-5">
        {modules.map((m: any, mi: number) => (
          <div key={m.id} className="rounded-lg border border-border bg-surface">
            <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
              <span className="text-base font-semibold">{m.title}</span>
              <Badge published={m.status === "published"} />
              <span className="text-xs text-muted-foreground">{m.lessons.length} جلسة</span>
              <span className="ms-auto flex flex-wrap items-center gap-3 text-xs">
                <button
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  disabled={mi === 0}
                  onClick={() => run(() => reorder({ data: { table: "modules", id: m.id, direction: "up" } }))}
                >
                  ↑
                </button>
                <button
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  disabled={mi === modules.length - 1}
                  onClick={() => run(() => reorder({ data: { table: "modules", id: m.id, direction: "down" } }))}
                >
                  ↓
                </button>
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setEditingModule(editingModule === m.id ? null : m.id);
                    setModuleEdit({ title: m.title, description: m.description ?? "" });
                  }}
                >
                  تعديل
                </button>
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    run(
                      () =>
                        togglePublish({
                          data: { table: "modules", id: m.id, value: m.status !== "published" },
                        }),
                    )
                  }
                >
                  {m.status === "published" ? "إلغاء النشر" : "نشر"}
                </button>
                <button
                  className="text-ember"
                  onClick={() => {
                    if (!window.confirm(`حذف الوحدة "${m.title}" وكل جلساتها؟`)) return;
                    run(() => deleteRow({ data: { table: "modules", id: m.id } }), "تم الحذف.");
                  }}
                >
                  حذف
                </button>
              </span>
            </div>

            {editingModule === m.id && (
              <div className="border-b border-border px-5 py-4">
                <AdminField label="عنوان الوحدة">
                  <input
                    className={inputClass}
                    value={moduleEdit.title}
                    onChange={(e) => setModuleEdit({ ...moduleEdit, title: e.target.value })}
                  />
                </AdminField>
                <AdminField label="الوصف">
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={moduleEdit.description}
                    onChange={(e) => setModuleEdit({ ...moduleEdit, description: e.target.value })}
                  />
                </AdminField>
                <AdminButton
                  onClick={() =>
                    run(
                      () =>
                        saveModule({
                          data: {
                            id: m.id,
                            program_id: data.program.id,
                            title: moduleEdit.title.trim(),
                            description: moduleEdit.description.trim() || null,
                            sort_order: m.sort_order,
                            status: m.status === "published" ? "published" : "draft",
                          },
                        }).then(() => setEditingModule(null)),
                      "تم تحديث الوحدة.",
                    )
                  }
                >
                  حفظ التعديل
                </AdminButton>
              </div>
            )}

            <ul className="divide-y divide-border">
              {m.lessons.map((l: any, li: number) => (
                <li key={l.id} className="flex flex-wrap items-center gap-3 px-5 py-3 text-sm">
                  <span>{l.title}</span>
                  <Badge published={l.is_published} />
                  {l.duration_minutes ? (
                    <span className="text-xs text-muted-foreground">{l.duration_minutes} دقيقة</span>
                  ) : null}
                  {l.resourceCount ? (
                    <span className="text-xs text-muted-foreground">{l.resourceCount} مادة</span>
                  ) : null}
                  <span className="ms-auto flex flex-wrap items-center gap-3 text-xs">
                    <button
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={li === 0}
                      onClick={() => run(() => reorder({ data: { table: "lessons", id: l.id, direction: "up" } }))}
                    >
                      ↑
                    </button>
                    <button
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={li === m.lessons.length - 1}
                      onClick={() => run(() => reorder({ data: { table: "lessons", id: l.id, direction: "down" } }))}
                    >
                      ↓
                    </button>
                    <Link
                      to="/admin/programs/$slug/lessons/$lessonId/edit"
                      params={{ slug, lessonId: l.id }}
                      className="text-ember"
                    >
                      تعديل
                    </Link>
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        run(() => togglePublish({ data: { table: "lessons", id: l.id, value: !l.is_published } }))
                      }
                    >
                      {l.is_published ? "إلغاء النشر" : "نشر"}
                    </button>
                    <button
                      className="text-ember"
                      onClick={() => {
                        if (!window.confirm(`حذف الجلسة "${l.title}"؟`)) return;
                        run(() => deleteRow({ data: { table: "lessons", id: l.id } }), "تم الحذف.");
                      }}
                    >
                      حذف
                    </button>
                  </span>
                </li>
              ))}
              {m.lessons.length === 0 && (
                <li className="px-5 py-3 text-sm text-muted-foreground">لا توجد جلسات في هذه الوحدة.</li>
              )}
            </ul>
          </div>
        ))}
        {modules.length === 0 && (
          <p className="text-sm text-muted-foreground">لا توجد وحدات بعد. ابدئي بإضافة وحدة.</p>
        )}
      </div>
    </div>
  );
}
