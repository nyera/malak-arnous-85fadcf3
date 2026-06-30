import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { I18nProvider } from "@/i18n/I18nProvider";
import logoAsset from "@/assets/logo.png.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-xl ember-text">404</h1>
        <h2 className="mt-4 display-md">الصفحة غير موجودة</h2>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-sm bg-ember px-6 py-3 text-xs font-semibold uppercase tracking-widest text-background">العودة للرئيسية</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-md">حدث خطأ ما.</h1>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-sm bg-ember px-6 py-3 text-xs font-semibold uppercase tracking-widest text-background">حاولي مرة أخرى</button>
          <a href="/" className="rounded-sm border border-border px-6 py-3 text-xs font-semibold uppercase tracking-widest">الرئيسية</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ملاك عرنوس — متخصصة في الأكل العاطفي وخسارة الوزن من الجذور" },
      { name: "description", content: "ملاك عرنوس — Nervous System-Based Emotional Eating and Weight Loss Expert. تحرري من الأكل العاطفي وخسارة الوزن من الجذور." },
      { property: "og:title", content: "ملاك عرنوس" },
      { property: "og:description", content: "تحرري من الأكل العاطفي وخسارة الوزن من الجذور" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: logoAsset.url },
      { rel: "apple-touch-icon", href: logoAsset.url },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Cairo:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "ملاك عرنوس",
          alternateName: "Malak Arnous",
          jobTitle: "Nervous System-Based Emotional Eating and Weight Loss Expert",
          description: "متخصصة في التحرر من الأكل العاطفي وخسارة الوزن من الجذور.",
          url: "https://malak-arnous.lovable.app",
          image: "https://malak-arnous.lovable.app" + logoAsset.url,
          sameAs: ["https://instagram.com/malakarnous369"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Header />
        <main className="pt-20">
          <Outlet />
        </main>
        <Footer />
      </I18nProvider>
    </QueryClientProvider>
  );
}
