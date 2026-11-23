import { test } from "node:test";
import { strict as assert } from "node:assert";
import { WEBINAR } from "./content";

test("webinar starts on November 29, 2026 at 2 PM EST and 10 PM Saudi time", () => {
  const start = new Date(WEBINAR.startsAt);
  const parts = (timeZone: string) => Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23",
    }).formatToParts(start).map(({ type, value }) => [type, value]),
  );
  for (const [zone, hour] of [["America/New_York", "14"], ["Asia/Riyadh", "22"]] as const) {
    const value = parts(zone);
    assert.equal(value["year"], "2026");
    assert.equal(value["month"], "11");
    assert.equal(value["day"], "29");
    assert.equal(value["hour"], hour);
  }
});