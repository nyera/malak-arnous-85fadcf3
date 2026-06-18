import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { I18nProvider } from "@/i18n/I18nProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-xl ember-text">404</h1>
        <h2 className="mt-4 display-md">Page not found</h2>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-sm bg-ember px-6 py-3 text-xs font-semibold uppercase tracking-widest text-background">Go home</Link>
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
        <h1 className="display-md">Something broke.</h1>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-sm bg-ember px-6 py-3 text-xs font-semibold uppercase tracking-widest text-background">Try again</button>
          <a href="/" className="rounded-sm border border-border px-6 py-3 text-xs font-semibold uppercase tracking-widest">Home</a>
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
      { title: "ملاك عرنوس — مدربة حياة للنساء" },
      { name: "description", content: "ملاك عرنوس — مدربة حياة وتطوير ذاتي للنساء. رحلة شفاء داخلي، تنظيم الجهاز العصبي، والتحرر من الأكل العاطفي." },
      { property: "og:title", content: "ملاك عرنوس — مدربة حياة للنساء" },
      { property: "og:description", content: "ملاك عرنوس — مدربة حياة وتطوير ذاتي للنساء. رحلة شفاء داخلي، تنظيم الجهاز العصبي، والتحرر من الأكل العاطفي." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ملاك عرنوس — مدربة حياة للنساء" },
      { name: "twitter:description", content: "ملاك عرنوس — مدربة حياة وتطوير ذاتي للنساء. رحلة شفاء داخلي، تنظيم الجهاز العصبي، والتحرر من الأكل العاطفي." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/04b91ba2-10c1-4749-96a3-bdfdb9f67e69/id-preview-c0c9e697--2d8667bd-9071-4c3f-beb7-9fe4c8d279e3.lovable.app-1781788900387.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/04b91ba2-10c1-4749-96a3-bdfdb9f67e69/id-preview-c0c9e697--2d8667bd-9071-4c3f-beb7-9fe4c8d279e3.lovable.app-1781788900387.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Noto+Kufi+Arabic:wght@300;400;500;600;700&display=swap" },
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
