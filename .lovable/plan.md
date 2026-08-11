# Admin Course Management Area

Goal: a fast, practical admin area for managing The Shift (and future programs) without touching the public site, the Stan/Zapier webhook, or existing entitlements.

## What already exists (verified)

- Auth + roles (`user_roles`, `has_role`), admin-only server functions with role checks.
- Tables: `programs`, `modules`, `lessons`, `program_access`, `pending_entitlements`, `lesson_progress`.
- A basic single-page `/admin` (program picker, add module, add lesson, manual access grant, customer list).
- Student side already working: `/dashboard`, `/dashboard/the-shift` (modules, lessons, progress bar, "x من y"), lesson page with prev/next, complete button, and Zoom link fetched only after server-side access verification.
- A private storage bucket `program-resources` and a signed-URL server function for protected files.
- Lessons currently store resources as a JSON list, not a table.

## What will be added

### Database (extend only, no duplicates)
- `modules`: add `status` (draft/published, default published) so modules can be hidden from customers.
- New `lesson_resources` table: lesson reference, title, file path, file name, file type, file size, sort order, timestamps. Admin full access; enrolled students may read resources of published lessons they have access to.
- New private storage bucket `course-resources` with admin-only upload/manage policies (files never public; students get short-lived signed links).
- Test data: one module "Test Module" and one lesson "Test Session" for The Shift.

### Admin routes (protected, non-admins redirected to /dashboard)
- `/admin` — dashboard cards: programs, students, lessons/content, recent access grants + "Manage Programs" button.
- `/admin/programs` — table of all programs: name, slug, modules, lessons, enrolled students, published/draft, "Manage Program".
- `/admin/programs/$slug` — program workspace: stats (modules, lessons, published lessons, enrolled students), Add Module / Add Lesson, and the full module → lesson tree with per-item edit, delete (with confirmation), publish/unpublish, and move up/down ordering.
- `/admin/programs/$slug/lessons/new` and `/admin/programs/$slug/lessons/$lessonId/edit` — the lesson form: title, slug (auto-suggested from title), module, order, duration, description, video source (Zoom Recording default / Hosted), Zoom URL + optional passcode, status, and the resource manager (upload, rename, replace, reorder, delete, download preview). Saving returns to the program workspace.

Everything is keyed by program slug, so Heal & Receive, Heal & Transform, Webinar, etc. work with no code changes.

### Student side (small adjustments only)
- Hide lessons in unpublished modules from customers; keep the existing design untouched.
- Lesson page reads resources from the new table and downloads them via a temporary signed link after access verification (existing JSON resources keep working).
- Progress, prev/next ordering (module order then lesson order), and the dashboard percentage keep working as they do now.

### Security
- Every admin read/write goes through server functions that verify the caller's admin role; no client-side-only gating.
- Zoom URLs and passcodes are only ever returned by a server function that checks authentication + active program access; nothing is rendered on public pages.
- Resource files stay in a private bucket; only file paths are stored, and download links are generated on demand with short expiry.

## Not touched
`/api/public/stan-purchase`, webhook auth, existing `program_access` rows, the public `/the-shift` page, and the site design.

## Technical notes
- New admin server functions in `src/lib/api/admin.functions.ts` (resource upload handled through a server function using the service-role storage client, loaded inside the handler).
- Admin route subtree under `src/routes/_authenticated/admin/` with a shared layout that verifies the admin role in `beforeLoad` and redirects non-admins to `/dashboard`; the current single-file `/admin` page becomes that layout's index.
- Manual access granting stays available in the admin area (moved under Students).
- After implementation you get the report you asked for: schema changes, routes, how to add modules/lessons, upload PDFs, and how Zoom links, files, and progress are protected.
