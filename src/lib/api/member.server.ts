import type { SupabaseClient } from "@supabase/supabase-js";

export type Sb = SupabaseClient<any, "public", any>;

export async function requireProgramBySlug(supabase: Sb, slug: string) {
  const { data, error } = await supabase
    .from("programs")
    .select("id, slug, title, subtitle, description, cover_url, checkout_url, sales_page_path")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("PROGRAM_NOT_FOUND");
  return data;
}

export async function assertAccess(supabase: Sb, userId: string, programId: string) {
  const { data, error } = await supabase
    .from("program_access")
    .select("id, status, expires_at")
    .eq("user_id", userId)
    .eq("program_id", programId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  const active =
    !!data && data.status === "active" && (!data.expires_at || new Date(data.expires_at) > new Date());
  if (!active) throw new Error("NO_ACCESS");
}

export async function isAdminUser(supabase: Sb, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  return data === true;
}

export async function assertAdmin(supabase: Sb, userId: string) {
  if (!(await isAdminUser(supabase, userId))) throw new Error("FORBIDDEN");
}
