# Fix broken-looking Arabic in the small pink label text

## What you're seeing

The font is **Alexandria** (loaded from Google Fonts in the site head, set as the main font in the global stylesheet). Alexandria is not the problem.

The problem is the small pink label style used above/below headings (the "eyebrow" style, e.g. `برنامج 12 أسبوعًا لتحرير الجذور العاطفية...` on The Weight Shift page). That style adds wide letter-spacing (0.3em) and forces uppercase. Latin text tolerates that; Arabic does not — Arabic letters must stay joined, so spacing pushes them apart and the words look disconnected and unreadable, which is what your screenshot shows.

## The fix

1. In the global stylesheet, change the `eyebrow` label style so Arabic stays joined:
   - remove the 0.3em letter-spacing (use normal, or a tiny word-spacing instead)
   - remove `text-transform: uppercase` (it does nothing for Arabic and only affects mixed Latin words)
   - keep the size, weight and pink accent colour so the design look stays the same
2. Add a small variant that keeps the wide-spaced uppercase look **only** for Latin-only labels (e.g. "TAPPING SCRIPT", "HEAL AND RECEIVE" in the top navigation), so those menu items keep their current premium spaced style.
3. Sweep the site for any other place where letter-spacing is applied to Arabic text (headings, buttons, nav) and normalise it the same way.
4. Verify on the pages that use these labels (home, The Weight Shift, Heal and Receive, Tapping Script, testimonials) at mobile and desktop widths that Arabic renders joined and RTL alignment is unchanged.

## Scope

Presentation only — CSS/typography classes. No copy changes, no layout restructuring, no colour changes, no content or link changes.
