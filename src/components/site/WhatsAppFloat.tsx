import { MessageCircle } from "lucide-react";
import { brand } from "@/data/content";

export function WhatsAppFloat() {
  return (
    <a
      href={brand.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={`واتساب الدعم ${brand.whatsappDisplay}`}
      className="fixed bottom-5 end-5 z-50 flex items-center gap-2 rounded-full bg-ember px-4 py-3 text-background shadow-lg transition-all duration-300 hover:-translate-y-0.5"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-xs font-semibold" dir="ltr">{brand.whatsappDisplay}</span>
    </a>
  );
}
