import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthLink, Field, FormMessage, SubmitButton } from "@/components/member/AuthShell";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "تعيين كلمة مرور جديدة — ملاك عرنوس" },
      { name: "description", content: "عيّني كلمة مرور جديدة لحسابك في منطقة العضوات." },
      { property: "og:title", content: "تعيين كلمة مرور جديدة" },
      { property: "og:description", content: "عيّني كلمة مرور جديدة لحسابك." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("كلمة المرور يجب أن تكون ٨ أحرف على الأقل.");
      return;
    }
    if (password !== confirm) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError("انتهت صلاحية الرابط أو حدث خطأ. اطلبي رابطاً جديداً.");
      return;
    }
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthShell
      title="كلمة مرور جديدة"
      subtitle="اختاري كلمة مرور جديدة لحسابك."
      footer={
        <p>
          <AuthLink to="/forgot-password">طلب رابط جديد</AuthLink>
        </p>
      }
    >
      <FormMessage error={error} />
      <form onSubmit={onSubmit}>
        <Field
          label="كلمة المرور الجديدة"
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Field
          label="تأكيد كلمة المرور"
          type="password"
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <SubmitButton loading={loading}>حفظ كلمة المرور</SubmitButton>
      </form>
    </AuthShell>
  );
}
