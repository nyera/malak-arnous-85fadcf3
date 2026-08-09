import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthLink, Field, FormMessage, SubmitButton } from "@/components/member/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "استعادة كلمة المرور — ملاك عرنوس" },
      { name: "description", content: "أرسلي رابط استعادة كلمة المرور إلى بريدك الإلكتروني." },
      { property: "og:title", content: "استعادة كلمة المرور" },
      { property: "og:description", content: "استعيدي الوصول إلى حسابك." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin + "/reset-password",
    });
    setLoading(false);
    if (error) {
      setError("لم نتمكن من إرسال الرابط. حاولي مرة أخرى.");
      return;
    }
    setSent(true);
  }

  return (
    <AuthShell
      title="استعادة كلمة المرور"
      subtitle="أدخلي بريدك الإلكتروني وسنرسل لك رابطاً لتعيين كلمة مرور جديدة."
      footer={
        <p>
          <AuthLink to="/login">العودة لتسجيل الدخول</AuthLink>
        </p>
      }
    >
      <FormMessage error={error} success={sent ? "تم إرسال الرابط. تفقّدي بريدك الإلكتروني." : null} />
      {!sent && (
        <form onSubmit={onSubmit}>
          <Field
            label="البريد الإلكتروني"
            type="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SubmitButton loading={loading}>إرسال الرابط</SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}
