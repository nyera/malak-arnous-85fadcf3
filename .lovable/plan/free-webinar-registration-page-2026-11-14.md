# Free Webinar Registration Page

A new Arabic RTL page at `/webinar` built from your brief. The page has one goal: get visitors to sign up for the free webinar through Zoho Webinar. It uses your exact copy.

## Page sections (in order)
1. **Hero**: the small top label, the main headline and the supporting text. Below them sit the date, time and timezone in a highlighted box, the button "احجزي مقعدك المجاني الآن", and the free-registration note.
2. **Problem**: "وجودكِ هنا ليس صدفة…" with its body and subheading.
3. **What you'll learn**: three cards, one per secret, then the button.
4. **About Malak**: your existing portrait, the bio, then the button.
5. **Is this for you?**: three checkmark cards and a note box styled differently from them.
6. **Why attend now**: the body text, the three costs as a soft list, then the button.
7. **Live bonus**: a short teaser. The gift itself is not named.
8. **Final signup**: the headline, the date and time, "Online Live Webinar", the button and the note.
- **Sticky button on mobile**: "احجزي مقعدك المجاني الآن".

## Thank-you page at `/webinar/thank-you`
- Shows "تم تسجيلك بنجاح ✨", the confirmation text, and a "الرجوع إلى الموقع" button.
- You can set Zoho to send people here after they sign up.

## Look and feel
- Warm cream, ivory, blush, dusty rose and muted gold, with deep plum for key text.
- An elegant editorial layout with lots of space, built for phones first.
- The site's logo and fonts stay the same. Both new pages are added to the sitemap.

## What the page won't include
- No fake reviews, attendee counts, countdowns or weight-loss promises.
- No join link anywhere on the page.
- No discovery-call button. That comes after the webinar.

## Assumptions (please correct)
- **Signup buttons**: they open your Zoho signup page (https://live.zoho.com/dngk-qol-hsz) in a new tab. Zoho's form usually doesn't embed cleanly, especially on phones. If you have Zoho embed code, send it and I'll put the form on the page.
- **Date, time and timezone**: until you send them, the page will show "سيتم الإعلان عن الموعد قريباً". All three are kept in one place, so updating them later is quick.
- **Menu link**: the webinar won't be added to the site menu unless you want it there.

## Technical details
- New routes `src/routes/webinar.tsx` and `src/routes/webinar.thank-you.tsx`, each with its own head() SEO metadata.
- Add `ZOHO_WEBINAR_URL` and `WEBINAR` (date, time, timezone) to `src/data/content.ts`.
- Store the copy as page constants, verbatim. Reuse Framer Motion reveals and the existing portrait asset.
- Add page-scoped palette tokens to `src/styles.css`.
