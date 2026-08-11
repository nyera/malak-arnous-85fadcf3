import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { requireAdmin } from "@/lib/api/member.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    try {
      await requireAdmin();
    } catch {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
          <span className="text-sm font-semibold">لوحة الإدارة</span>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link to="/admin" activeOptions={{ exact: true }} activeProps={{ className: "text-ember font-medium" }}>
              الرئيسية
            </Link>
            <Link to="/admin/programs" activeProps={{ className: "text-ember font-medium" }}>
              البرامج
            </Link>
            <Link to="/admin/students" activeProps={{ className: "text-ember font-medium" }}>
              العضوات
            </Link>
          </nav>
          <Link to="/dashboard" className="ms-auto text-sm text-muted-foreground hover:text-ember">
            العودة إلى الموقع
          </Link>
        </div>
      </header>
      <main className="container-x py-8">
        <Outlet />
      </main>
    </div>
  );
}
