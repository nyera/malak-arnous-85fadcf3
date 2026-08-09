import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthLink, Field, FormMessage, SubmitButton } from "@/components/member/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "إنشاء حساب — منطقة العضوات | ملاك عرنوس" },
      { name: "description", content: "أنشئي حسابك للوصول إلى برامج ملاك عرنوس بعد الاشتراك." },
      { property: "og:title", content: "إنشاء حساب — منطقة العضوات" },
      { property: "og:description", content: "أنشئي حسابك للوصول إلى برنامجك." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("كلمة المرور يجب أن تكون ٨ أحرف على الأقل.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
        data: { full_name: fullName.trim() },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message.includes("already") ? "هذا البريد مسجّل مسبقاً. سجّلي الدخول." : "لم نتمكن من إنشاء الحساب. حاولي مرة أخرى.");
      return;
    }
    if (data.session) {
      navigate({ to: "/dashboard" });
      return;
    }
    setSent(true);
  }

  return (
    <AuthShell
      title="إنشاء حساب"
      subtitle="استخدمي نفس البريد الإلكتروني الذي اشتركتِ به، ليتم تفعيل وصولك تلقائياً."
      footer={
        <p>
          لديك حساب بالفعل؟ <AuthLink to="/login">سجّلي الدخول</AuthLink>
        </p>
      }
    >
      <FormMessage
        error={error}
        success={sent ? "أرسلنا رسالة تأكيد إلى بريدك الإلكتروني. افتحي الرسالة لتأكيد حسابك." : null}
      />
      {!sent && (
        <form onSubmit={onSubmit}>
          <Field label="الاسم الكامل" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Field
            label="البريد الإلكتروني"
            type="email"
            required
            dir="ltr"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field
            label="كلمة المرور"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton loading={loading}>إنشاء الحساب</SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}
