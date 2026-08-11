import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import { assertAdmin } from "./member.server";

const RESOURCE_BUCKET = "course-resources";

const lessonInput = z.object({
  id: z.string().uuid().optional(),
  module_id: z.string().uuid(),
  program_id: z.string().uuid(),
  slug: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(4000).optional().nullable(),
  duration_minutes: z.number().int().min(0).max(1000).optional().nullable(),
  video_type: z.enum(["zoom", "hosted"]).default("zoom"),
  video_url: z.string().trim().max(2000).optional().nullable(),
  video_passcode: z.string().trim().max(200).optional().nullable(),
  storage_path: z.string().trim().max(500).optional().nullable(),
  resources: z.array(z.object({ label: z.string().max(200), url: z.string().max(2000) })).default([]),
  subtitles: z.array(z.object({ label: z.string().max(120), url: z.string().max(2000) })).default([]),
  is_published: z.boolean().default(false),
  sort_order: z.number().int().min(0).max(9999).default(0),
});

/* ------------------------------------------------------------------ */
/* Overviews                                                           */
/* ------------------------------------------------------------------ */

export const adminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);

    const [{ data: programs }, { data: modules }, { data: lessons }, { data: access }, { data: customers }, { data: pending }] =
      await Promise.all([
        supabase.from("programs").select("*").order("sort_order", { ascending: true }),
        supabase.from("modules").select("*").order("sort_order", { ascending: true }),
        supabase.from("lessons").select("*").order("sort_order", { ascending: true }),
        supabase.from("program_access").select("*").order("granted_at", { ascending: false }),
        supabase.from("profiles").select("id, email, full_name, phone, created_at").order("created_at", { ascending: false }),
        supabase
          .from("pending_entitlements")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200),
      ]);

    const profileMap = new Map((customers ?? []).map((c) => [c.id, c]));
    const programMap = new Map((programs ?? []).map((p) => [p.id, p]));

    return {
      programs: programs ?? [],
      modules: modules ?? [],
      lessons: lessons ?? [],
      access: access ?? [],
      customers: customers ?? [],
      pending: pending ?? [],
      recentGrants: (access ?? []).slice(0, 12).map((a) => ({
        id: a.id,
        status: a.status,
        granted_at: a.granted_at,
        purchase_source: a.purchase_source,
        email: profileMap.get(a.user_id)?.email ?? null,
        program: programMap.get(a.program_id)?.title ?? null,
      })),
    };
  });

export const adminProgramsList = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);

    const [{ data: programs }, { data: modules }, { data: lessons }, { data: access }] = await Promise.all([
      supabase.from("programs").select("*").order("sort_order", { ascending: true }),
      supabase.from("modules").select("id, program_id"),
      supabase.from("lessons").select("id, program_id, is_published"),
      supabase.from("program_access").select("program_id, status"),
    ]);

    return {
      programs: (programs ?? []).map((p) => ({
        ...p,
        moduleCount: (modules ?? []).filter((m) => m.program_id === p.id).length,
        lessonCount: (lessons ?? []).filter((l) => l.program_id === p.id).length,
        publishedLessonCount: (lessons ?? []).filter((l) => l.program_id === p.id && l.is_published).length,
        studentCount: (access ?? []).filter((a) => a.program_id === p.id && a.status === "active").length,
      })),
    };
  });

export const adminProgramDetail = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);

    const { data: program, error } = await supabase.from("programs").select("*").eq("slug", data.slug).maybeSingle();
    if (error) throw new Error(error.message);
    if (!program) throw new Error("PROGRAM_NOT_FOUND");

    const [{ data: modules }, { data: lessons }, { data: access }] = await Promise.all([
      supabase.from("modules").select("*").eq("program_id", program.id).order("sort_order", { ascending: true }),
      supabase.from("lessons").select("*").eq("program_id", program.id).order("sort_order", { ascending: true }),
      supabase.from("program_access").select("program_id, status").eq("program_id", program.id),
    ]);

    const lessonList = lessons ?? [];
    const lessonIds = lessonList.map((l) => l.id);
    let resourceCounts: Record<string, number> = {};
    if (lessonIds.length) {
      const { data: resources } = await supabase.from("lesson_resources").select("lesson_id").in("lesson_id", lessonIds);
      for (const r of resources ?? []) resourceCounts[r.lesson_id] = (resourceCounts[r.lesson_id] ?? 0) + 1;
    }

    return {
      program,
      modules: (modules ?? []).map((m) => ({
        ...m,
        lessons: lessonList
          .filter((l) => l.module_id === m.id)
          .map((l) => ({ ...l, resourceCount: resourceCounts[l.id] ?? 0 })),
      })),
      orphanLessons: lessonList.filter((l) => !(modules ?? []).some((m) => m.id === l.module_id)),
      stats: {
        modules: (modules ?? []).length,
        lessons: lessonList.length,
        publishedLessons: lessonList.filter((l) => l.is_published).length,
        students: (access ?? []).filter((a) => a.status === "active").length,
      },
    };
  });

export const adminLessonDetail = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ slug: z.string().min(1), lessonId: z.string().uuid().optional() }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);

    const { data: program } = await supabase.from("programs").select("*").eq("slug", data.slug).maybeSingle();
    if (!program) throw new Error("PROGRAM_NOT_FOUND");

    const { data: modules } = await supabase
      .from("modules")
      .select("id, title, sort_order")
      .eq("program_id", program.id)
      .order("sort_order", { ascending: true });

    let lesson: Record<string, any> | null = null;
    let resources: Record<string, any>[] = [];
    if (data.lessonId) {
      const { data: row } = await supabase.from("lessons").select("*").eq("id", data.lessonId).maybeSingle();
      if (!row) throw new Error("LESSON_NOT_FOUND");
      lesson = row;
      const { data: res } = await supabase
        .from("lesson_resources")
        .select("*")
        .eq("lesson_id", data.lessonId)
        .order("sort_order", { ascending: true });
      resources = res ?? [];
    }

    const { count: lessonCount } = await supabase
      .from("lessons")
      .select("id", { count: "exact", head: true })
      .eq("program_id", program.id);

    return { program, modules: modules ?? [], lesson, resources, lessonCount: lessonCount ?? 0 };
  });

/* ------------------------------------------------------------------ */
/* Content writes                                                      */
/* ------------------------------------------------------------------ */

export const adminSaveProgram = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      id: z.string().uuid().optional(),
      slug: z.string().trim().min(1).max(80),
      title: z.string().trim().min(1).max(200),
      subtitle: z.string().trim().max(300).optional().nullable(),
      description: z.string().trim().max(4000).optional().nullable(),
      cover_url: z.string().trim().max(2000).optional().nullable(),
      checkout_url: z.string().trim().max(2000).optional().nullable(),
      sales_page_path: z.string().trim().max(200).optional().nullable(),
      is_published: z.boolean().default(true),
      sort_order: z.number().int().min(0).max(9999).default(0),
    }),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("programs").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSaveModule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      id: z.string().uuid().optional(),
      program_id: z.string().uuid(),
      title: z.string().trim().min(1).max(200),
      description: z.string().trim().max(2000).optional().nullable(),
      sort_order: z.number().int().min(0).max(9999).default(0),
      status: z.enum(["draft", "published"]).default("published"),
    }),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("modules").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminSaveLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(lessonInput)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: row, error } = await context.supabase.from("lessons").upsert(data).select("id").maybeSingle();
    if (error) throw new Error(error.message);
    return { ok: true, id: row?.id ?? data.id ?? null };
  });

export const adminDeleteRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ table: z.enum(["programs", "modules", "lessons"]), id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminTogglePublish = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ table: z.enum(["modules", "lessons", "programs"]), id: z.string().uuid(), value: z.boolean() }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const db = context.supabase as any;
    const patch =
      data.table === "modules" ? { status: data.value ? "published" : "draft" } : { is_published: data.value };
    const { error } = await db.from(data.table).update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminReorder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      table: z.enum(["modules", "lessons", "lesson_resources"]),
      id: z.string().uuid(),
      direction: z.enum(["up", "down"]),
    }),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const db = context.supabase as any;

    const scopeColumn =
      data.table === "modules" ? "program_id" : data.table === "lessons" ? "module_id" : "lesson_id";

    const { data: current, error: e1 } = await db
      .from(data.table)
      .select(`id, sort_order, ${scopeColumn}`)
      .eq("id", data.id)
      .maybeSingle();
    if (e1) throw new Error(e1.message);
    if (!current) throw new Error("NOT_FOUND");

    const scopeValue = (current as Record<string, any>)[scopeColumn];
    const { data: siblings } = await db
      .from(data.table)
      .select("id, sort_order")
      .eq(scopeColumn, scopeValue)
      .order("sort_order", { ascending: true });

    const list = (siblings ?? []) as { id: string; sort_order: number }[];
    const index = list.findIndex((r) => r.id === data.id);
    const target = data.direction === "up" ? index - 1 : index + 1;
    if (index === -1 || target < 0 || target >= list.length) return { ok: true };

    const reordered = [...list];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(target, 0, moved!);

    for (let i = 0; i < reordered.length; i++) {
      const { error } = await db
        .from(data.table)
        .update({ sort_order: i + 1 })
        .eq("id", reordered[i]!.id);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });


export const adminSetAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      email: z.string().trim().email().max(255),
      program_id: z.string().uuid(),
      status: z.enum(["active", "revoked"]),
      expires_at: z.string().optional().nullable(),
    }),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);
    const email = data.email.toLowerCase();

    const { data: profile } = await supabase.from("profiles").select("id").ilike("email", email).maybeSingle();

    if (profile) {
      const { error } = await supabase.from("program_access").upsert(
        {
          user_id: profile.id,
          program_id: data.program_id,
          status: data.status,
          purchase_source: "admin",
          expires_at: data.expires_at ?? null,
        },
        { onConflict: "user_id,program_id" },
      );
      if (error) throw new Error(error.message);
      return { result: "granted" as const };
    }

    if (data.status === "revoked") return { result: "no_account" as const };

    const { error } = await supabase.from("pending_entitlements").insert({
      email,
      program_id: data.program_id,
      purchase_source: "admin",
    });
    if (error) throw new Error(error.message);
    return { result: "pending" as const };
  });

/* ------------------------------------------------------------------ */
/* Lesson resources (private storage)                                  */
/* ------------------------------------------------------------------ */

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function safeName(name: string) {
  const cleaned = name.replace(/[^\w.\-]+/g, "-").replace(/-+/g, "-");
  return cleaned.slice(-80) || "file";
}

export const adminUploadResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      lessonId: z.string().uuid(),
      title: z.string().trim().min(1).max(200),
      fileName: z.string().trim().min(1).max(200),
      fileType: z.string().trim().max(120).optional().nullable(),
      base64: z.string().min(1).max(28_000_000),
      replaceResourceId: z.string().uuid().optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);

    const { data: lesson } = await supabase
      .from("lessons")
      .select("id, program_id, module_id, sort_order")
      .eq("id", data.lessonId)
      .maybeSingle();
    if (!lesson) throw new Error("LESSON_NOT_FOUND");

    const [{ data: program }, { data: mod }] = await Promise.all([
      supabase.from("programs").select("slug").eq("id", lesson.program_id).maybeSingle(),
      supabase.from("modules").select("sort_order").eq("id", lesson.module_id).maybeSingle(),
    ]);

    const binary = atob(data.base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    const path = `${program?.slug ?? "program"}/module-${pad(mod?.sort_order ?? 0)}/lesson-${pad(
      lesson.sort_order ?? 0,
    )}/${Date.now()}-${safeName(data.fileName)}`;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: upErr } = await supabaseAdmin.storage
      .from(RESOURCE_BUCKET)
      .upload(path, bytes, { contentType: data.fileType || "application/octet-stream", upsert: false });
    if (upErr) throw new Error(upErr.message);

    if (data.replaceResourceId) {
      const { data: old } = await supabase
        .from("lesson_resources")
        .select("file_path")
        .eq("id", data.replaceResourceId)
        .maybeSingle();
      const { error } = await supabase
        .from("lesson_resources")
        .update({
          title: data.title,
          file_path: path,
          file_name: data.fileName,
          file_type: data.fileType ?? null,
          file_size: bytes.length,
        })
        .eq("id", data.replaceResourceId);
      if (error) throw new Error(error.message);
      if (old?.file_path) await supabaseAdmin.storage.from(RESOURCE_BUCKET).remove([old.file_path]);
      return { ok: true };
    }

    const { count } = await supabase
      .from("lesson_resources")
      .select("id", { count: "exact", head: true })
      .eq("lesson_id", data.lessonId);

    const { error } = await supabase.from("lesson_resources").insert({
      lesson_id: data.lessonId,
      title: data.title,
      file_path: path,
      file_name: data.fileName,
      file_type: data.fileType ?? null,
      file_size: bytes.length,
      sort_order: (count ?? 0) + 1,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminRenameResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid(), title: z.string().trim().min(1).max(200) }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("lesson_resources").update({ title: data.title }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    await assertAdmin(supabase, context.userId);
    const { data: row } = await supabase.from("lesson_resources").select("file_path").eq("id", data.id).maybeSingle();
    const { error } = await supabase.from("lesson_resources").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    if (row?.file_path) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.storage.from(RESOURCE_BUCKET).remove([row.file_path]);
    }
    return { ok: true };
  });

export const adminResourceUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    await assertAdmin(supabase, context.userId);
    const { data: row } = await supabase.from("lesson_resources").select("file_path").eq("id", data.id).maybeSingle();
    if (!row) throw new Error("NOT_FOUND");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from(RESOURCE_BUCKET)
      .createSignedUrl(row.file_path, 60 * 10);
    if (error) throw new Error(error.message);
    return { url: signed.signedUrl };
  });
