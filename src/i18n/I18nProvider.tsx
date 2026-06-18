import { createContext, useContext, useEffect, type ReactNode } from "react";
import { translations, type Lang, type Dict } from "./translations";

interface Ctx {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dict;
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const lang: Lang = "ar";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  const value: Ctx = {
    lang,
    dir: "rtl",
    t: translations.ar,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
