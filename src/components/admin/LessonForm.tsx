import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  adminSaveLesson,
  adminRenameResource,
  adminDeleteResource,
  adminResourceUrl,
  adminReorder,
  adminCreateUploadUrl,
  adminRegisterResource,
  adminSetLessonVideoFile,
  adminDeleteLessonVideoFile,
  adminMediaPreviewUrl,
} from "@/lib/api/admin.functions";
import { uploadToSignedPath } from "@/lib/upload";
import { AdminButton, AdminField, AdminMessage, inputClass, formatBytes } from "@/components/admin/AdminUI";

type Module = { id: string; title: string; sort_order: number };
type Resource = {
  id: string;
  title: string;
  file_name: string;
  file_type: string | null;
  file_size: number | null;
  sort_order: number;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function LessonForm({
  programId,
  programSlug,
  modules,
  lesson,
  resources,
  defaultOrder,
  onSaved,
}: {
  programId: string;
  programSlug: string;
  modules: Module[];
  lesson: Record<string, any> | null;
  resources: Resource[];
  defaultOrder: number;
  onSaved: () => void;
}) {
  const navigate = useNavigate();
  const save = useServerFn(adminSaveLesson);
  const rename = useServerFn(adminRenameResource);
  const removeRes = useServerFn(adminDeleteResource);
  const signUrl = useServerFn(adminResourceUrl);
  const reorder = useServerFn(adminReorder);
  const createUploadUrl = useServerFn(adminCreateUploadUrl);
  const registerResource = useServerFn(adminRegisterResource);
  const setVideoFile = useServerFn(adminSetLessonVideoFile);
  const deleteVideoFile = useServerFn(adminDeleteLessonVideoFile);
  const previewUrl = useServerFn(adminMediaPreviewUrl);

  const [msg, setMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: lesson?.title ?? "",
    slug: lesson?.slug ?? "",
    module_id: lesson?.module_id ?? modules[0]?.id ?? "",
    sort_order: String(lesson?.sort_order ?? defaultOrder),
    duration_minutes: String(lesson?.duration_minutes ?? 60),
    description: lesson?.description ?? "",
    video_type: (lesson?.video_type ?? "zoom") as "zoom" | "hosted" | "upload",
    video_url: lesson?.video_url ?? "",
    video_passcode: lesson?.video_passcode ?? "",
    is_published: Boolean(lesson?.is_published),
  });

  const [resTitle, setResTitle] = useState("");
  const [resFile, setResFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFileState] = useState<File | null>(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoPath, setVideoPath] = useState<string | null>((lesson?.storage_path as string | null) ?? null);


  async function submit() {
    setMsg(null);
    if (!form.title.trim()) return setMsg("عنوان الجلسة مطلوب.");
    if (!form.module_id) return setMsg("اختاري الوحدة أولاً.");
    setSaving(true);
    try {
      await save({
        data: {
          ...(lesson?.id ? { id: lesson.id as string } : {}),
          program_id: programId,
          module_id: form.module_id,
          title: form.title.trim(),
          slug: (form.slug.trim() || slugify(form.title) || `lesson-${Date.now()}`).slice(0, 80),
          description: form.description.trim() || null,
          duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
          video_type: form.video_type,
          video_url: form.video_type === "zoom" ? form.video_url.trim() || null : form.video_url.trim() || null,
          video_passcode: form.video_type === "zoom" ? form.video_passcode.trim() || null : null,
          is_published: form.is_published,
          sort_order: form.sort_order ? Number(form.sort_order) : defaultOrder,
          resources: [],
          subtitles: [],
        },
      });
      navigate({ to: "/admin/programs/$slug", params: { slug: programSlug } });
    } catch (e) {
      setMsg("حدث خطأ: " + (e instanceof Error ? e.message : "غير معروف"));
    }
    setSaving(false);
  }

  async function doUpload(replaceResourceId?: string) {
    if (!resFile || !lesson?.id) return;
    setUploading(true);
    setMsg(null);
    try {
      const { path, token, bucket } = await createUploadUrl({
        data: { lessonId: lesson.id as string, fileName: resFile.name, kind: "resource" },
      });
      await uploadToSignedPath(bucket, path, token, resFile);
      await registerResource({
        data: {
          lessonId: lesson.id as string,
          title: resTitle.trim() || resFile.name,
          path,
          fileName: resFile.name,
          fileType: resFile.type || null,
          fileSize: resFile.size,
          ...(replaceResourceId ? { replaceResourceId } : {}),
        },
      });
      setResTitle("");
      setResFile(null);
      onSaved();
      setMsg("تم رفع الملف.");
    } catch (e) {
      setMsg("تعذّر رفع الملف: " + (e instanceof Error ? e.message : "غير معروف"));
    }
    setUploading(false);
  }

  async function doVideoUpload() {
    if (!videoFile || !lesson?.id) return;
    setVideoUploading(true);
    setMsg(null);
    try {
      const { path, token, bucket } = await createUploadUrl({
        data: { lessonId: lesson.id as string, fileName: videoFile.name, kind: "video" },
      });
      await uploadToSignedPath(bucket, path, token, videoFile);
      await setVideoFile({ data: { lessonId: lesson.id as string, path } });
      setVideoPath(path);
      setVideoFileState(null);
      setForm((f) => ({ ...f, video_type: "upload" }));
      onSaved();
      setMsg("تم رفع الفيديو بنجاح.");
    } catch (e) {
      setMsg("تعذّر رفع الفيديو: " + (e instanceof Error ? e.message : "غير معروف"));
    }
    setVideoUploading(false);
  }


  async function openResource(id: string) {
    const { url } = await signUrl({ data: { id } });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-8">
      <AdminMessage text={msg} />

      <div className="grid gap-x-6 md:grid-cols-2">
        <AdminField label="عنوان الجلسة">
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="مثال: الجلسة الأولى"
          />
        </AdminField>
        <AdminField label="المعرّف (slug)" hint="يُولّد تلقائياً إذا تُرك فارغاً">
          <input
            dir="ltr"
            className={inputClass}
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="session-1"
          />
        </AdminField>
        <AdminField label="الوحدة">
          <select
            className={inputClass}
            value={form.module_id}
            onChange={(e) => setForm({ ...form, module_id: e.target.value })}
          >
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="الترتيب">
          <input
            dir="ltr"
            type="number"
            className={inputClass}
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
          />
        </AdminField>
        <AdminField label="المدة (دقيقة)">
          <input
            dir="ltr"
            type="number"
            className={inputClass}
            value={form.duration_minutes}
            onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
          />
        </AdminField>
        <AdminField label="نوع الفيديو">
          <select
            className={inputClass}
            value={form.video_type}
            onChange={(e) => setForm({ ...form, video_type: e.target.value as "zoom" | "hosted" })}
          >
            <option value="zoom">تسجيل Zoom</option>
            <option value="hosted">فيديو مستضاف</option>
          </select>
        </AdminField>
      </div>

      <AdminField label="الوصف">
        <textarea
          rows={4}
          className={inputClass}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </AdminField>

      {form.video_type === "zoom" ? (
        <div className="grid gap-x-6 md:grid-cols-2">
          <AdminField label="رابط تسجيل Zoom" hint="لا يظهر لغير المشتركات">
            <input
              dir="ltr"
              className={inputClass}
              value={form.video_url}
              onChange={(e) => setForm({ ...form, video_url: e.target.value })}
              placeholder="https://zoom.us/rec/share/..."
            />
          </AdminField>
          <AdminField label="رمز الدخول (اختياري)">
            <input
              dir="ltr"
              className={inputClass}
              value={form.video_passcode}
              onChange={(e) => setForm({ ...form, video_passcode: e.target.value })}
            />
          </AdminField>
        </div>
      ) : (
        <AdminField label="رابط الفيديو">
          <input
            dir="ltr"
            className={inputClass}
            value={form.video_url}
            onChange={(e) => setForm({ ...form, video_url: e.target.value })}
          />
        </AdminField>
      )}

      <AdminField label="الحالة">
        <select
          className={inputClass}
          value={form.is_published ? "published" : "draft"}
          onChange={(e) => setForm({ ...form, is_published: e.target.value === "published" })}
        >
          <option value="draft">مسودة</option>
          <option value="published">منشورة</option>
        </select>
      </AdminField>

      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="mb-4 text-base font-semibold">المواد المرفقة (PDF وغيرها)</h2>
        {!lesson?.id ? (
          <p className="text-sm text-muted-foreground">احفظي الجلسة أولاً ثم يمكنك رفع الملفات.</p>
        ) : (
          <>
            <div className="mb-5 grid gap-x-6 md:grid-cols-2">
              <AdminField label="اسم المادة">
                <input
                  className={inputClass}
                  value={resTitle}
                  onChange={(e) => setResTitle(e.target.value)}
                  placeholder="مثال: كتيّب التمارين"
                />
              </AdminField>
              <AdminField label="الملف">
                <input
                  type="file"
                  className={inputClass}
                  onChange={(e) => setResFile(e.target.files?.[0] ?? null)}
                />
              </AdminField>
              <div>
                <AdminButton onClick={() => doUpload()} disabled={!resFile || uploading}>
                  {uploading ? "جارٍ الرفع..." : "+ رفع مادة"}
                </AdminButton>
              </div>
            </div>

            <ul className="divide-y divide-border rounded-md border border-border">
              {resources.map((r, i) => (
                <li key={r.id} className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
                  <span className="font-medium">{r.title}</span>
                  <span dir="ltr" className="text-xs text-muted-foreground">
                    {r.file_name} · {r.file_type ?? "ملف"} · {formatBytes(r.file_size)}
                  </span>
                  <span className="ms-auto flex flex-wrap items-center gap-3 text-xs">
                    <button className="text-ember" onClick={() => openResource(r.id)}>
                      تحميل
                    </button>
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={async () => {
                        const value = window.prompt("الاسم الجديد", r.title);
                        if (!value) return;
                        await rename({ data: { id: r.id, title: value } });
                        onSaved();
                      }}
                    >
                      تعديل الاسم
                    </button>
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        if (!resFile) {
                          setMsg("اختاري الملف الجديد أولاً من الأعلى ثم اضغطي استبدال.");
                          return;
                        }
                        doUpload(r.id);
                      }}
                    >
                      استبدال الملف
                    </button>
                    <button
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={i === 0}
                      onClick={async () => {
                        await reorder({ data: { table: "lesson_resources", id: r.id, direction: "up" } });
                        onSaved();
                      }}
                    >
                      ↑
                    </button>
                    <button
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={i === resources.length - 1}
                      onClick={async () => {
                        await reorder({ data: { table: "lesson_resources", id: r.id, direction: "down" } });
                        onSaved();
                      }}
                    >
                      ↓
                    </button>
                    <button
                      className="text-ember"
                      onClick={async () => {
                        if (!window.confirm(`حذف "${r.title}"؟`)) return;
                        await removeRes({ data: { id: r.id } });
                        onSaved();
                      }}
                    >
                      حذف
                    </button>
                  </span>
                </li>
              ))}
              {resources.length === 0 && (
                <li className="px-4 py-3 text-sm text-muted-foreground">لا توجد مواد مرفقة.</li>
              )}
            </ul>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <AdminButton onClick={submit} disabled={saving}>
          {saving ? "جارٍ الحفظ..." : "حفظ الجلسة"}
        </AdminButton>
        <AdminButton
          variant="outline"
          onClick={() => navigate({ to: "/admin/programs/$slug", params: { slug: programSlug } })}
        >
          إلغاء
        </AdminButton>
      </div>
    </div>
  );
}
