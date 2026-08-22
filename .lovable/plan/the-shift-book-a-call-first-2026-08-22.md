# The Shift: book-a-call first

The existing `/the-shift` page stays as it is in structure, branding, Arabic RTL and responsive behaviour. Only the sales flow changes: no public checkout link, every conversion button now sends visitors to the free discovery call booking page on Stan.

Booking URL used everywhere: `https://stan.store/MalakArnous/p/---the-shift`

## What changes on /the-shift

1. **Hero** — keeps the current title and sparkle line, gains a short paragraph explaining that because the program is personal and transformational, the first step is a short call. Two buttons: primary `احجزي مكالمة للتعرّف على البرنامج`, secondary `اكتشفي تفاصيل البرنامج` which smooth-scrolls to the program details section.
2. **New section: ليش منبلّش بمكالمة؟** — warm, premium, three short lines explaining the purpose of the call (understanding her situation, explaining the program, deciding together if it fits). Not framed as an application or screening.
3. **New section: كيف بتنضمي لـ The Shift؟** — 4 numbered soft cards (احجزي مكالمة / منحكي سوا / بتوصلك تفاصيل الاشتراك / بتبلّشي البرنامج) using the copy you supplied, followed by a CTA `احجزي مكالمتك الآن`.
4. **Existing program content stays** — the intro blocks, "إذا كنت تشعرين أن...", "The Shift ليس برنامج دايت", "ماذا يحدث داخل البرنامج", results, "لمن هذا البرنامج", session structure and support sections are all preserved word for word. They already cover benefits, fit, what's included and the topic preview, so no duplicate sections get invented and no new marketing claims are written.
5. **What's included wording** — the line that implies self-serve enrolment is adjusted so access is described as happening through Stan Store after enrolment. No Zoom URLs or passcodes anywhere.
6. **New FAQ section** — your six questions verbatim, with the call stated as free (`المكالمة مجانية`), rendered as an accessible accordion.
7. **Final CTA section** — replaces the current "احجزي الآن + انضمي الآن" block: headline `يمكن أول خطوة بالتغيير تكون مكالمة.`, your supporting line, button `احجزي مكالمتك الآن`.
8. **Telegram CTA and footer** stay unchanged.

## Removed

- The direct checkout button at the bottom of `/the-shift` that points to the Stan product URL.
- The `STAN_THE_SHIFT_URL` constant, so the private payment link no longer exists anywhere in the public code.

Homepage, `/programs` and other pages keep their current `انضمي الآن` buttons pointing to the Stan storefront root, per your choice — those never exposed the private product link.

## CTA count and tracking

Four booking CTAs total: hero, after "كيف بتنضمي", after the fit/results content, and the final section. All share one small `BookCallButton` component reading a single `STAN_CALL_URL` constant, so the URL is changed in one place. Each click fires a `the_shift_book_call_click` event through the existing analytics layer if one is present; otherwise it's a no-op `dataLayer`/`gtag`-safe helper — no new analytics platform is added.

## Technical notes

- Copy lives in `src/i18n/translations.ts` under `theShift` (new keys for the call sections, steps, FAQ, final CTA); markup in `src/routes/the-shift.tsx`.
- `src/data/content.ts`: add `STAN_CALL_URL`, remove `STAN_THE_SHIFT_URL`.
- New `BookCallButton` in `src/components/site/CTAButton.tsx` reusing the existing button styling; booking page opens in a new tab to match the site's existing external-link convention.
- FAQ uses the existing shadcn accordion; the 4 steps and cards use the existing `bg-surface`/`border-border` tokens, cream/blush palette, soft rounded cards — no new colors or fonts.
- Mobile: full-width tappable CTAs, single-column stacking for steps and cards, no horizontal overflow. Verified after the build with a mobile-width pass.
- Page `head()` description updated to reflect the call-first flow. No auth, dashboard, payment or member code is added.
