import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Lock, ArrowLeft, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getDashboard } from "@/lib/api/member.functions";
import { FadeIn } from "@/components/site/Misc";
import { ProgressBar } from "@/components/member/ProgressBar";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  head: () => ({
    meta: [
      { title: "لوحتي — منطقة العضوات | ملاك عرنوس" },
      { name: "description", content: "لوحة العضوات: برامجك، تقدّمك، ومتابعة الجلسات." },
      { property: "og:title", content: "لوحتي — منطقة العضوات" },
      { property: "og:description", content: "برامجك وتقدّمك في مكان واحد." },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: () => getDashboard(),
  component: DashboardPage,
});

type ProgramCard = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  checkout_url: string | null;
  sales_page_path: string | null;
  hasAccess: boolean;
  totalLessons: number;
  completedLessons: number;
  percent: number;
};

function DashboardPage() {
  const data = Route.useLoaderData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

  const programs = data.programs as ProgramCard[];
  const active = programs.filter((p) => p.hasAccess);
  const locked = programs.filter((p) => !p.hasAccess);

  return (
    <section className="section-y">
      <div className="container-x max-w-5xl">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="eyebrow text-ember mb-3">منطقة العضوات</p>
              <h1 className="display-lg">أهلاً {data.name?.split(" ")[0] ?? "بك"}</h1>
            </div>
            <div className="flex items-center gap-3">
              {data.isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] hover:border-foreground"
                >
                  <Shield className="w-3.5 h-3.5" /> الإدارة
                </Link>
              )}
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70 hover:border-foreground hover:text-foreground"
              >
                <LogOut className="w-3.5 h-3.5 rtl:-scale-x-100" /> خروج
              </button>
            </div>
          </div>
        </FadeIn>

        {active.length === 0 && (
          <FadeIn>
            <div className="rounded-sm border border-border bg-surface p-7 mb-10">
              <h2 className="display-sm mb-3">لا يوجد برنامج مفعّل بعد</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                إذا كنت قد اشتركت بالفعل، فعّلي وصولك من هنا. وإذا استخدمت بريداً مختلفاً عند الشراء، تواصلي معنا.
              </p>
              <Link
                to="/claim-access"
                className="inline-flex rounded-full bg-ember px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-background"
              >
                تفعيل وصولي
              </Link>
            </div>
          </FadeIn>
        )}

        {active.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 mb-14">
            {active.map((p: ProgramCard, i: number) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <Link
                  to="/dashboard/$programSlug"
                  params={{ programSlug: p.slug }}
                  className="block h-full rounded-sm border border-border bg-surface p-6 transition-colors hover:border-ember/50"
                >
                  <p className="eyebrow text-ember mb-3">برنامج مفعّل</p>
                  <h2 className="display-sm mb-2">{p.title}</h2>
                  {p.subtitle && <p className="text-muted-foreground text-[15px] leading-relaxed mb-5">{p.subtitle}</p>}
                  <ProgressBar percent={p.percent} />
                  <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {p.completedLessons} من {p.totalLessons} جلسة
                    </span>
                    <span className="inline-flex items-center gap-1 text-ember">
                      متابعة البرنامج <ArrowLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        {locked.length > 0 && (
          <>
            <FadeIn>
              <h2 className="display-sm mb-5">برامج أخرى</h2>
            </FadeIn>
            <div className="grid gap-5 sm:grid-cols-2">
              {locked.map((p: ProgramCard, i: number) => (
                <FadeIn key={p.id} delay={i * 0.05}>
                  <div className="h-full rounded-sm border border-border bg-background p-6">
                    <p className="eyebrow text-muted-foreground mb-3 inline-flex items-center gap-2">
                      <Lock className="w-3 h-3" /> غير مفعّل
                    </p>
                    <h3 className="display-sm mb-2">{p.title}</h3>
                    {p.subtitle && <p className="text-muted-foreground text-[15px] leading-relaxed mb-5">{p.subtitle}</p>}
                    <a
                      href={p.sales_page_path ?? p.checkout_url ?? "/programs"}
                      className="inline-flex rounded-full border border-foreground/25 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] hover:border-foreground"
                    >
                      اكتشفي البرنامج
                    </a>
                  </div>
                </FadeIn>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
