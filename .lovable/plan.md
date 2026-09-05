# Unified discovery call for both programs

Update The Weight Shift (`/the-shift`) and Heal and Receive (`/heal-and-receive`) so every booking CTA points to the new shared Stan discovery-call link: `https://stan.store/MalakArnous/p/discovery-call-free-fpkbh17n`.

## What changes

1. **Single source of truth in `src/data/content.ts`**
   - Replace `STAN_CALL_URL` and `HEAL_CALL_URL` with one constant `DISCOVERY_CALL_URL` pointing to the new link.
   - Keep `STAN_CALL_URL` and `HEAL_CALL_URL` as re-exports of `DISCOVERY_CALL_URL` so existing imports do not break.

2. **Program pages**
   - `src/routes/the-shift.tsx`: `BookCallButton` already uses `STAN_CALL_URL` by default; no markup change needed.
   - `src/routes/heal-and-receive.tsx`: change the three `BookCallButton` instances to use `DISCOVERY_CALL_URL` (or keep `HEAL_CALL_URL`, which will now point to the same URL).

3. **Copy review**
   - Scan `theShift` and `healAndReceive` translations in `src/i18n/translations.ts` to ensure any FAQ/step text that mentions "after the call you get the program link" still reads correctly with a shared discovery call.

4. **Small cleanup**
   - Remove the stray `export const STAN_URL = "https://stan.store/malakarnous";` at the top of `src/i18n/translations.ts`; the canonical link already lives in `src/data/content.ts`.

5. **Verification**
   - Run typecheck/build and visually confirm both pages open the new discovery-call URL from every CTA.

## Out of scope

- Analytics event name stays `the_shift_book_call_click` unless you want a generic `discovery_call_click`.
- No redesign, copy rewrite, or navigation changes.
