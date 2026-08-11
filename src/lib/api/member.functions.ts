import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import { assertAccess, assertAdmin, isAdminUser, requireProgramBySlug } from "./member.server";

export const getMe = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email, full_name, phone")
      .eq("id", userId)
      .maybeSingle();
    return { profile, isAdmin: await isAdminUser(supabase, userId) };
  });

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [{ data: profile }, { data: programs }, { data: access }, { data: progress }] = await Promise.all([
      supabase.from("profiles").select("full_name, email").eq("id", userId).maybeSingle(),
      supabase
        .from("programs")
        .select("id, slug, title, subtitle, description, cover_url, checkout_url, sales_page_path, sort_order")
        .eq("is_published", true)
        .order("sort_order", { ascending: true }),
      supabase.from("program_access").select("program_id, status, expires_at").eq("user_id", userId),
      supabase.from("lesson_progress").select("program_id, lesson_id").eq("user_id", userId),
    ]);

    const accessMap = new Map((access ?? []).map((a) => [a.program_id, a]));
    const entitled = (programs ?? []).filter((p) => {
      const a = accessMap.get(p.id);
      return !!a && a.status === "active" && (!a.expires_at || new Date(a.expires_at) > new Date());
    });

    let lessonCounts: Record<string, number> = {};
    if (entitled.length) {
      const programIds = entitled.map((p) => p.id);
      const [{ data: publishedModules }, { data: lessons }] = await Promise.all([
        supabase.from("modules").select("id").eq("status", "published").in("program_id", programIds),
        supabase
          .from("lessons")
          .select("id, program_id, module_id")
          .eq("is_published", true)
          .in("program_id", programIds),
      ]);
      const allowed = new Set((publishedModules ?? []).map((m) => m.id));
      for (const l of lessons ?? []) {
        if (!allowed.has(l.module_id)) continue;
        lessonCounts[l.program_id] = (lessonCounts[l.program_id] ?? 0) + 1;
      }
    }


    const doneCounts: Record<string, number> = {};
    for (const p of progress ?? []) doneCounts[p.program_id] = (doneCounts[p.program_id] ?? 0) + 1;

    return {
      name: profile?.full_name ?? null,
      email: profile?.email ?? null,
      isAdmin: await isAdminUser(supabase, userId),
      programs: (programs ?? []).map((p) => {
        const a = accessMap.get(p.id);
        const hasAccess =
          !!a && a.status === "active" && (!a.expires_at || new Date(a.expires_at) > new Date());
        const total = lessonCounts[p.id] ?? 0;
        const done = Math.min(doneCounts[p.id] ?? 0, total);
        return {
          ...p,
          hasAccess,
          totalLessons: total,
          completedLessons: done,
          percent: total ? Math.round((done / total) * 100) : 0,
        };
      }),
    };
  });

export const getProgramView = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const program = await requireProgramBySlug(supabase, data.slug);
    await assertAccess(supabase, userId, program.id);

    const [{ data: modules }, { data: lessons }, { data: progress }] = await Promise.all([
      supabase
        .from("modules")
        .select("id, title, description, sort_order")
        .eq("program_id", program.id)
        .eq("status", "published")
        .order("sort_order", { ascending: true }),
      supabase
        .from("lessons")
        .select("id, module_id, slug, title, description, duration_minutes, sort_order")
        .eq("program_id", program.id)
        .eq("is_published", true)
        .order("sort_order", { ascending: true }),
      supabase.from("lesson_progress").select("lesson_id").eq("user_id", userId).eq("program_id", program.id),
    ]);

    const moduleList = modules ?? [];
    const moduleIds = new Set(moduleList.map((m) => m.id));
    const done = new Set((progress ?? []).map((p) => p.lesson_id));
    const all = (lessons ?? [])
      .filter((l) => moduleIds.has(l.module_id))
      .map((l) => ({ ...l, completed: done.has(l.id) }));
    const ordered = moduleList.flatMap((m) => all.filter((l) => l.module_id === m.id));

    return {
      program,
      modules: moduleList.map((m) => ({ ...m, lessons: all.filter((l) => l.module_id === m.id) })),
      totalLessons: ordered.length,
      completedLessons: ordered.filter((l) => l.completed).length,
      nextLesson: ordered.find((l) => !l.completed)?.slug ?? ordered[0]?.slug ?? null,
    };

  });

export const getLesson = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ slug: z.string().min(1), lessonSlug: z.string().min(1) }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const program = await requireProgramBySlug(supabase, data.slug);
    await assertAccess(supabase, userId, program.id);

    const [{ data: modules }, { data: lessons }] = await Promise.all([
      supabase
        .from("modules")
        .select("id, title, sort_order")
        .eq("program_id", program.id)
        .eq("status", "published")
        .order("sort_order", { ascending: true }),
      supabase
        .from("lessons")
        .select(
          "id, slug, title, description, duration_minutes, video_type, video_url, video_passcode, storage_path, resources, subtitles, sort_order, module_id",
        )
        .eq("program_id", program.id)
        .eq("is_published", true)
        .order("sort_order", { ascending: true }),
    ]);

    const moduleList = modules ?? [];
    const list = moduleList.flatMap((m) => (lessons ?? []).filter((l) => l.module_id === m.id));
    const index = list.findIndex((l) => l.slug === data.lessonSlug);
    if (index === -1) throw new Error("LESSON_NOT_FOUND");
    const lesson = list[index]!;

    const [{ data: progress }, { data: resources }] = await Promise.all([
      supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", userId)
        .eq("lesson_id", lesson.id)
        .maybeSingle(),
      supabase
        .from("lesson_resources")
        .select("id, title, file_name, file_type, file_size, sort_order")
        .eq("lesson_id", lesson.id)
        .order("sort_order", { ascending: true }),
    ]);

    return {
      program: { slug: program.slug, title: program.title },
      moduleTitle: moduleList.find((m) => m.id === lesson.module_id)?.title ?? null,
      lesson,
      files: resources ?? [],
      completed: !!progress,
      prev: index > 0 ? { slug: list[index - 1]!.slug, title: list[index - 1]!.title } : null,
      next:
        index < list.length - 1 ? { slug: list[index + 1]!.slug, title: list[index + 1]!.title } : null,
    };

  });

export const setLessonProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ slug: z.string().min(1), lessonId: z.string().uuid(), completed: z.boolean() }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const program = await requireProgramBySlug(supabase, data.slug);
    await assertAccess(supabase, userId, program.id);

    if (data.completed) {
      const { error } = await supabase
        .from("lesson_progress")
        .upsert(
          { user_id: userId, lesson_id: data.lessonId, program_id: program.id },
          { onConflict: "user_id,lesson_id" },
        );
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from("lesson_progress")
        .delete()
        .eq("user_id", userId)
        .eq("lesson_id", data.lessonId);
      if (error) throw new Error(error.message);
    }
    return { ok: true, completed: data.completed };
  });

export const claimMyAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .maybeSingle();
    const email = profile?.email?.toLowerCase();
    if (!email) return { claimed: 0 };

    const { data: pending } = await supabaseAdmin
      .from("pending_entitlements")
      .select("id, program_id, purchase_source, purchase_reference")
      .is("claimed_at", null)
      .ilike("email", email);

    let claimed = 0;
    for (const p of pending ?? []) {
      if (!p.program_id) continue;
      await supabaseAdmin.from("program_access").upsert(
        {
          user_id: userId,
          program_id: p.program_id,
          status: "active",
          purchase_source: p.purchase_source,
          purchase_reference: p.purchase_reference,
        },
        { onConflict: "user_id,program_id" },
      );
      await supabaseAdmin
        .from("pending_entitlements")
        .update({ claimed_at: new Date().toISOString(), claimed_by: userId })
        .eq("id", p.id);
      claimed += 1;
    }
    return { claimed };
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({ full_name: z.string().trim().max(120).optional(), phone: z.string().trim().max(40).optional() }),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("profiles").update(data).eq("id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getLessonMediaUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ slug: z.string().min(1), path: z.string().min(1) }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const program = await requireProgramBySlug(supabase, data.slug);
    await assertAccess(supabase, userId, program.id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from("program-resources")
      .createSignedUrl(data.path, 60 * 60);
    if (error) throw new Error(error.message);
    return { url: signed.signedUrl };
  });

export const requireAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    return { ok: true };
  });

export const getMyResourceUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ slug: z.string().min(1), resourceId: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const program = await requireProgramBySlug(supabase, data.slug);
    await assertAccess(supabase, userId, program.id);

    const { data: resource } = await supabase
      .from("lesson_resources")
      .select("file_path, lesson_id")
      .eq("id", data.resourceId)
      .maybeSingle();
    if (!resource) throw new Error("NOT_FOUND");

    const { data: lesson } = await supabase
      .from("lessons")
      .select("id, program_id, is_published")
      .eq("id", resource.lesson_id)
      .maybeSingle();
    if (!lesson || !lesson.is_published || lesson.program_id !== program.id) throw new Error("NOT_FOUND");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from("course-resources")
      .createSignedUrl(resource.file_path, 60 * 10);
    if (error) throw new Error(error.message);
    return { url: signed.signedUrl };
  });
