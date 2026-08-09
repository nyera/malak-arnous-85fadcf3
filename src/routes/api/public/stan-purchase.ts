import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const payloadSchema = z.object({
  email: z.string().trim().email().max(255),
  name: z.string().trim().max(200).optional().nullable(),
  program_slug: z.string().trim().max(80).optional().nullable(),
  product_name: z.string().trim().max(300).optional().nullable(),
  purchase_reference: z.string().trim().max(200).optional().nullable(),
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/stan-purchase")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["STAN_WEBHOOK_SECRET"];
        if (!secret) return json({ error: "not_configured" }, 500);

        const provided = request.headers.get("x-stan-secret") ?? "";
        if (provided.length !== secret.length || provided !== secret) {
          return json({ error: "unauthorized" }, 401);
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ error: "invalid_json" }, 400);
        }

        const parsed = payloadSchema.safeParse(raw);
        if (!parsed.success) return json({ error: "invalid_payload", details: parsed.error.flatten() }, 400);

        const email = parsed.data.email.toLowerCase();
        const reference =
          parsed.data.purchase_reference?.trim() ||
          `${email}:${parsed.data.program_slug ?? parsed.data.product_name ?? "unknown"}`;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: existingEvent } = await supabaseAdmin
          .from("stan_events")
          .select("id")
          .eq("purchase_reference", reference)
          .maybeSingle();
        if (existingEvent) return json({ ok: true, duplicate: true });

        // Resolve the program: explicit slug first, then a product-name match.
        let programId: string | null = null;
        let programSlug = parsed.data.program_slug?.trim() || null;

        const { data: programs } = await supabaseAdmin.from("programs").select("id, slug, title");
        const list = programs ?? [];

        if (programSlug) {
          programId = list.find((p) => p.slug === programSlug)?.id ?? null;
        }
        if (!programId && parsed.data.product_name) {
          const needle = parsed.data.product_name.toLowerCase();
          const match =
            list.find((p) => needle.includes(p.slug.replace(/-/g, " "))) ??
            list.find((p) => needle.includes(p.title.toLowerCase()));
          if (match) {
            programId = match.id;
            programSlug = match.slug;
          }
        }
        if (!programId && list.length === 1) {
          programId = list[0]!.id;
          programSlug = list[0]!.slug;
        }

        if (!programId) {
          await supabaseAdmin.from("stan_events").insert({
            purchase_reference: reference,
            email,
            program_slug: programSlug,
            status: "unmatched_program",
            raw_payload: parsed.data,
          });
          return json({ ok: false, error: "program_not_matched" }, 422);
        }

        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .ilike("email", email)
          .maybeSingle();

        let outcome: "granted" | "pending";
        if (profile) {
          const { error } = await supabaseAdmin.from("program_access").upsert(
            {
              user_id: profile.id,
              program_id: programId,
              status: "active",
              purchase_source: "stan",
              purchase_reference: reference,
            },
            { onConflict: "user_id,program_id" },
          );
          if (error) return json({ error: error.message }, 500);
          outcome = "granted";
        } else {
          const { error } = await supabaseAdmin.from("pending_entitlements").insert({
            email,
            program_id: programId,
            program_slug: programSlug,
            buyer_name: parsed.data.name ?? null,
            purchase_source: "stan",
            purchase_reference: reference,
            raw_payload: parsed.data,
          });
          if (error) return json({ error: error.message }, 500);
          outcome = "pending";
        }

        await supabaseAdmin.from("stan_events").insert({
          purchase_reference: reference,
          email,
          program_slug: programSlug,
          status: outcome,
          raw_payload: parsed.data,
        });

        return json({ ok: true, outcome });
      },
    },
  },
});
