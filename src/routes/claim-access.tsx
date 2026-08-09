import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, PlayCircle, ArrowRight } from "lucide-react";
import { claimMyAccess } from "@/lib/api/member.functions";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthLink } from "@/components/member/AuthShell";

export const Route = createFileRoute("/claim-access")({
  head: () => ({
    meta: [
      { title: "تفعيل وصولك — ملاك عرنوس" },
      { name: "description", content: "فعّلي وصولك إلى برنامجك بعد إتمام الاشتراك." },
      { property: "og:title", content: "تفعيل وصولك" },
      { property: "og:description", content: "فعّلي وصولك إلى برنامجك." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ClaimAccessPage,
});

function ClaimAccessPage() {
  const claim = useServerFn(claimMyAccess);
  const [state, setState] = useState<"idle" | "loading" | "done" | "none" | "guest">("idle");

  async function onClaim() {
    setState("loading");
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setState("guest");
      return;
    }
    try {
      const result = await claim({});
      setState(result.claimed > 0 ? "done" : "none");
    } catch {
      setState("none");
    }
  }

  return (
    <AuthShell
      title="تفعيل وصولك"
      subtitle="إذا أتممتِ الاشتراك ولم يظهر البرنامج في لوحتك، اضغطي على الزر لتفعيل وصولك بنفس البريد الإلكتروني."
      footer={
        <p>
          <AuthLink to="/dashboard">العودة إلى لوحتي</AuthLink>
        </p>
      }
    >
      {state === "done" && (
        <p className="mb-5 flex items-start gap-2 rounded-sm bg-foreground/5 px-4 py-3 text-sm">
          <CheckCircle2 className="mt-0.5 w-4 h-4 text-ember" /> تم تفعيل وصولك بنجاح.
        </p>
      )}
      {state === "none" && (
        <p className="mb-5 rounded-sm bg-ember/10 px-4 py-3 text-sm text-ember">
          لم نجد اشتراكاً مرتبطاً ببريدك الإلكتروني. تأكدي من استخدام نفس البريد، أو تواصلي معنا.
        </p>
      )}
      {state === "guest" && (
        <p className="mb-5 rounded-sm bg-ember/10 px-4 py-3 text-sm text-ember">
          سجّلي الدخول أو أنشئي حساباً أولاً بنفس بريد الشراء.
        </p>
      )}

      <button
        onClick={onClaim}
        disabled={state === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-background disabled:opacity-50"
      >
        <PlayCircle className="w-4 h-4" />
        {state === "loading" ? "لحظة..." : "تفعيل وصولي"}
      </button>

      {state === "done" && (
        <Link
          to="/dashboard"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
        >
          إلى لوحتي <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </Link>
      )}
    </AuthShell>
  );
}
