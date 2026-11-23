import { expect, test } from "bun:test";
import { WEBINAR } from "./content";

test("webinar starts on November 29, 2026 at 2 PM EST and 10 PM Saudi time", () => {
  const start = new Date(WEBINAR.startsAt);
  const parts = (timeZone: string) => Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23",
    }).formatToParts(start).map(({ type, value }) => [type, value]),
  );
  expect(parts("America/New_York")).toMatchObject({ year: "2026", month: "11", day: "29", hour: "14" });
  expect(parts("Asia/Riyadh")).toMatchObject({ year: "2026", month: "11", day: "29", hour: "22" });
});