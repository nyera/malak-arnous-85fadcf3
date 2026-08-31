# Navigation: group programs into a dropdown

## Goal
Reduce the stretched look of the header by replacing the three separate program-related links (Programs / The Shift / Heal and Receive) with a single "البرامج" dropdown. Keep Tapping Script as a standalone top-level link.

## What we will do

1. **Refactor `src/components/site/Header.tsx`**
   - Replace the current top-level links: `/programs`, `/the-shift`, `/heal-and-receive` with one dropdown labeled **"البرامج"**.
   - Dropdown items (exactly the two programs):
     - The Weight Shift → `/the-shift`
     - Heal and Receive → `/heal-and-receive`
   - Keep the parent label itself clickable to `/programs` so the services overview page remains reachable.
   - On desktop: hover reveals the dropdown; clicking the label text navigates to `/programs`.
   - On mobile: use the accordion style the user asked for — a chevron expands the dropdown, the label text navigates to `/programs`.
   - Update active-state logic so `/programs`, `/the-shift`, and `/heal-and-receive` all highlight the **البرامج** parent.
   - Keep Tapping Script, Testimonials, and Survey as standalone top-level links.

2. **Styling & UX**
   - Use existing design tokens: `bg-surface`, `border-border`, `text-ember`, rounded corners, and the existing shadow utilities.
   - Add a small chevron icon that rotates when the dropdown is open.
   - Use Framer Motion for the dropdown open/close animation (consistent with the existing mobile menu).
   - Ensure full RTL alignment and keyboard accessibility (hover intent delay to avoid accidental opens, focus-visible ring, ESC to close).

3. **Translations**
   - Add `nav.programs: "البرامج"` in `src/i18n/translations.ts` Arabic object (it already exists as "الخدمservices", we will update it to "البرامج" for the dropdown label).
   - Keep English translations in sync (low priority since site is Arabic-only).

4. **Routes preserved**
   - `/programs` remains accessible as the services overview page.
   - `/the-shift`, `/heal-and-receive`, `/tapping-script` routes are unchanged.

## What we will NOT change
- No color changes.
- No layout changes beyond the header nav.
- No route deletion or creation.
- No content edits on the program pages.

## Verification
- Screenshot the header on desktop and mobile to confirm the dropdown is compact and RTL-aligned.
- Click each dropdown link to confirm navigation works.
- Confirm `/programs` is still reachable by clicking the parent label.