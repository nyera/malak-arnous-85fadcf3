# The Shift Member Platform — Audit + Build Plan

## Phase 1 — Audit (done, no changes made)

**Current architecture**
- TanStack Start (React 19, Vite, Tailwind v4, shadcn/ui, Framer Motion), file routes in `src/routes/`.
- Public routes: `/`, `/about`, `/programs`, `/story`, `/survey`, `/testimonials`, `/the-shift`, `/sitemap.xml`.
- Arabic-only, RTL locked in `src/i18n/I18nProvider.tsx`; `<html lang="ar" dir="rtl">` in `src/routes/__root.tsx`.
- Design system in `src/styles.css` (ivory/ember tokens, `display-*`, `eyebrow`, `container-x`, `section-y`, Alexandria/Cairo Arabic fonts).
- Reusable components in `src/components/site/`: `CTAButton` (incl. `JoinNowButton`), `SectionHeader`, `TelegramCTA`, `Testimonials`, `Misc` (`FadeIn`), `Header`, `Footer`, `AssessmentForm`.
- Copy lives in `src/i18n/translations.ts`; links/config in `src/data/content.ts` (`STAN_URL = https://stan.store/malakarnous`, Telegram invite).

**Existing `/the-shift`**
- `src/routes/the-shift.tsx` — long marketing page built from `translations.ts` `theShift` block plus a local `Block` helper, ending in `JoinNowButton` + `TelegramCTA`. It stays exactly as-is (only a small secondary login link added).

**Backend**
- No Lovable Cloud / database / auth / storage / server functions exist. Nothing to reuse; everything backend is new.

**Risks**
- Enabling Cloud adds generated integration files and an `_authenticated` route gate — public routes are unaffected.
- `/dashboard/the-shift` vs public `/the-shift` must stay separate route files (no route collisions).
- Zoom URLs must never be sent to the browser unless entitlement is verified server-side.
- RTL in tables/admin layouts needs care; admin stays functional-but-branded.

## Phase 2 — Data + Auth

Enable Lovable Cloud, then one migration creating: `profiles`, `user_roles` (+ `has_role`), `programs`, `modules`, `lessons`, `program_access`, `pending_entitlements`, `lesson_progress`, `stan_events` (idempotency), each with GRANTs and RLS. Public reads limited to published program metadata; everything else owner-scoped via `auth.uid()`, admin via `has_role`. Trigger on signup creates the profile and auto-claims matching `pending_entitlements` into active `program_access`. Seed The Shift program row (slug `the-shift`) with its Stan checkout URL. Private storage bucket for workbooks/resources/subtitles.

Auth pages: `/login`, `/signup`, `/forgot-password`, `/reset-password`, styled with existing tokens.

## Phase 3 — Customer experience

- `/dashboard` — "أهلاً [الاسم]"، بطاقات البرامج (Active + نسبة التقدّم + متابعة البرنامج / مقفل + اكتشفي البرنامج → `/the-shift`)، و"متابعة من حيث توقفتِ".
- `/dashboard/the-shift` — protected course home: cover, intro, progress, modules → sessions list, completed markers.
- `/dashboard/the-shift/lesson/$slug` — lesson page, Arabic, mobile-first; "مشاهدة الجلسة" opens the Zoom recording only after server-side entitlement check; resources; "تمت مشاهدة الجلسة" writes progress; previous/next.
- Small secondary text link on public `/the-shift`: "مشتركة بالفعل؟ سجّلي الدخول" → `/login`. No other copy touched.

## Phase 4 — Admin

`/admin` (admin-only): Overview, Programs, Modules, Lessons, Customers, Access, Pending Purchases, Settings (incl. editable Stan checkout URL per program). Lesson editor: module, order, title, description, duration, video type (zoom → url + passcode / hosted → storage path), resources, 3 subtitle slots, draft/published. Fast reorder and quick-add for bulk Telegram migration. Manual grant/revoke/restore with `purchase_source = admin | import`.

## Phase 5 — Stan → Zapier

`POST /api/public/stan-purchase` server route: shared-secret header check (secret stored in backend secrets only), Zod validation, email normalization, Stan product → program mapping, idempotency on `purchase_reference`, grant access if account exists else create pending entitlement. Plus `/claim-access` page and exact Zapier setup instructions delivered in chat.

## Phase 6–7 — Migration + QA

Migration-friendly admin flow for existing sessions, then walk tests A–J (public page intact, unauthenticated block, pending→claim, shared lesson URL denied, duplicate Zapier event, revoke).

## Technical notes

Protected routes live under `src/routes/_authenticated/` using the integration-managed gate; every lesson/Zoom/resource read goes through `createServerFn` with `requireSupabaseAuth` plus an entitlement check, never client-side hiding. Stan stays the only checkout — no Stripe, no Lovable payments. Existing public pages, nav, footer, Telegram links, and testimonials are untouched.

Delivery: I'll build Phases 2–3 first (auth, data, dashboard, course, lessons), then 4, then 5, checking in between.
