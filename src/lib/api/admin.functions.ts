import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

import { assertAdmin } from "./member.server";

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

    return {
      programs: programs ?? [],
      modules: modules ?? [],
      lessons: lessons ?? [],
      access: access ?? [],
      customers: customers ?? [],
      pending: pending ?? [],
    };
  });

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
    const { error } = await context.supabase.from("lessons").upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
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
