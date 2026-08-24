# خدمة كتابة الـ Tapping Script — صفحة خدمة جديدة

New public page at `/tapping-script`, built with the site's existing Arabic RTL design system (same components, fonts, ember accents, cards, and animations as `/heal-and-receive`). No redesign, no course platform, no member area, no AI script generation, no payment processing inside the site.

## What gets built

Sections in order, using your copy word-for-word:

1. Hero — label, headline `Tapping Script مخصص إلك`, supporting headline + paragraph, primary CTA "اطلبي الـ Tapping Script" and secondary link "كيف بتشتغل الخدمة؟" that scrolls to the process section.
2. شو هي خدمة الـ Tapping Script؟
3. كيف بتشتغل الخدمة؟ — 4 numbered steps + CTA "اطلبي السكريبت الخاص فيكي"
4. على شو ممكن يكون الـ Tapping Script؟ — elegant card grid (9 items)
5. شو بتحصلي عليه؟ — list + supporting line
6. كيف فيكي تستخدمي السكريبت؟
7. هل سكريبت واحد بيكفي؟
8. ليش السكريبت مخصص؟
9. شو لازم تبعتي بعد الدفع؟ — two options (🎙️ Voice Note / ✉️ رسالة مكتوبة أو إيميل) + what to include + the reassuring note
10. مهم تعرفي 💛 — highlighted info card
11. هالخدمة ممكن تكون مناسبة إلك إذا… — checklist
12. الأسئلة الشائعة — 7 Q&A
13. Offer card — `Tapping Script مخصص ✨`, inclusions, price **$30**, primary CTA
14. Final CTA — headline, supporting copy, button

No medical/psychological claims, no guaranteed results, no pushy upsell language.

## Payment flow

Page → Stripe Payment Link → payment → customer sends Voice Note or email → you manually write the script → you send it to her. No Stan product, no Stripe integration or checkout code in the site — the CTAs are plain outbound links.

All CTA buttons (hero, after the steps, offer card, final CTA) point to one shared constant so the link is changed in a single place.

**One thing needed from you:** the Stripe Payment Link URL. Until you send it, the constant will hold a clearly-marked placeholder and I'll swap it in the moment you paste it (the buttons would otherwise link nowhere).

## Placement

- Top nav link in the header (desktop + mobile menu): `Tapping Script`
- A card on `/programs` (الخدمات) linking to the page
- Entry added to `sitemap.xml`
- Own SEO head: unique Arabic title, description, og:title/og:description, og:type, twitter:card, canonical

## Technical notes

- New route `src/routes/tapping-script.tsx` using `createFileRoute("/tapping-script")`
- Copy added to `src/i18n/translations.ts` under a `tappingScript` key (verbatim)
- New `TAPPING_PAY_URL` constant in `src/data/content.ts`
- Reuses `SectionHeader`, `FadeIn`, `CTAButton` (plain external-link variant, not the book-a-call analytics button), `TelegramCTA`/footer as-is
- Mobile: single-column stacking, `dir` inherited RTL, tap-friendly full-width buttons, no horizontal overflow — verified in the preview at mobile and desktop widths after build
