# Turn the project back into a public marketing website

Stan Store becomes the only place programs are sold and delivered. This project keeps the public Arabic (RTL) marketing site exactly as it looks today, and everything member/course related is removed.

## What gets removed

Member and course pages:
- `/login`, `/signup`, `/forgot-password`, `/reset-password`
- `/claim-access`
- `/dashboard`, `/dashboard/<program>`, `/dashboard/<program>/lesson/<lesson>`
- The whole admin course area: `/admin`, `/admin/programs`, program detail, new/edit lesson, `/admin/students`
- The protected route layout that wrapped all of the above

Components and code:
- Admin course UI (lesson form, admin UI helpers)
- Member components (auth shell, progress bar, The Shift intro used only inside the dashboard)
- All course/member server functions and their helpers, plus the file-upload helper used only for lesson videos and PDFs
- The Stan purchase webhook endpoint `/api/public/stan-purchase` (its only job was unlocking courses here)
- Header links "دخول العضوات" (desktop + mobile) and the "مشتركة بالفعل؟ سجّلي الدخول" line on `/the-shift`

Database (all dropped, per your choice): `lesson_progress`, `lesson_resources`, `lessons`, `modules`, `program_access`, `pending_entitlements`, `stan_events`, `programs`, `user_roles`, `profiles`, plus the helper functions and the signup trigger that created accounts. The public site reads none of these — all marketing copy is static in the code.

Storage: the private `course-resources` and `program-resources` buckets and their files. No public website images live there.

Secrets: `STAN_WEBHOOK_SECRET` is no longer used; I'll flag it for you to delete rather than touching it silently.

## What stays untouched

Homepage, `/programs`, `/the-shift`, `/about`, `/story`, `/testimonials`, `/survey`, sitemap, header, footer, Instagram and Telegram CTAs, branding, fonts, RTL layout, responsive behaviour. No redesign.

## CTA links

Every "انضمي الآن" button currently points to the storefront root `https://stan.store/malakarnous`. I'll point The Shift CTAs to the product link you gave: `https://stan.store/malakarnous/p/the-shiftmain-program`. Other programs (Heal & Receive, Heal & Transform, webinar) keep the storefront link until you send their product URLs — send them any time and it's a one-line change each.

## Technical notes

- Route files under `src/routes/_authenticated/` are deleted, along with `login.tsx`, `signup.tsx`, `forgot-password.tsx`, `reset-password.tsx`, `claim-access.tsx` and `src/routes/api/public/stan-purchase.ts`; `routeTree.gen.ts` regenerates itself.
- Deleted code: `src/lib/api/member.functions.ts`, `member.server.ts`, `admin.functions.ts`, `src/lib/upload.ts`, `src/components/admin/*`, `src/components/member/*`.
- `src/start.ts` keeps only `errorMiddleware`; the Supabase bearer attacher is dropped since no protected server function remains. Generated `src/integrations/supabase/*` files are left in place (auto-managed, harmless, unused).
- Database cleanup runs as one migration with `DROP TABLE ... CASCADE` in dependency order plus `DROP FUNCTION has_role/has_program_access/handle_new_user` and the `on_auth_user_created` trigger. Existing auth users are not deleted by this migration; tell me if you also want the member accounts wiped.
- Storage buckets are emptied and removed, and their `storage.objects` policies dropped in the same migration.
- After the cleanup I run a build and a quick pass over the public pages to confirm nothing broke, then give you the final report covering all 11 points you listed.
