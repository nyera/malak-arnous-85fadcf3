import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { brand } from "@/data/content";

export function WhatsAppFloat() {
  return (
    <a
      href={brand.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصلي معنا على واتساب"
      className="fixed bottom-5 end-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-whatsapp-foreground shadow-lg ring-1 ring-whatsapp-dark/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-whatsapp-dark"
    >
      <WhatsAppIcon className="w-5 h-5" />
      <span className="text-xs font-semibold">تواصلي معنا</span>
    </a>
  );
}
