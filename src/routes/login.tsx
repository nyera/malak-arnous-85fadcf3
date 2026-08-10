import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthLink, Field, FormMessage, SubmitButton } from "@/components/member/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — منطقة العضوات | ملاك عرنوس" },
      { name: "description", content: "سجّلي الدخول إلى منطقة العضوات لمتابعة برامجك مع ملاك عرنوس." },
      { property: "og:title", content: "تسجيل الدخول — منطقة العضوات" },
      { property: "og:description", content: "سجّلي الدخول لمتابعة برنامجك." },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { next?: string } =>
    typeof search.next === "string" && search.next.startsWith("/") ? { next: search.next } : {},

  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      return;
    }
    navigate({ to: next ?? "/dashboard" });
  }

  return (
    <AuthShell
      title="تسجيل الدخول"
      subtitle="أهلاً بك من جديد. سجّلي الدخول لمتابعة برنامجك."
      footer={
        <>
          <p>
            ليس لديك حساب؟ <AuthLink to="/signup">أنشئي حسابك</AuthLink>
          </p>
          <p>
            <AuthLink to="/forgot-password">نسيت كلمة المرور؟</AuthLink>
          </p>
        </>
      }
    >
      <FormMessage error={error} />
      <form onSubmit={onSubmit}>
        <Field
          label="البريد الإلكتروني"
          type="email"
          required
          autoComplete="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="كلمة المرور"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton loading={loading}>دخول</SubmitButton>
      </form>
    </AuthShell>
  );
}
