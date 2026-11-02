import assert from "node:assert/strict";
import { test } from "node:test";
import { layout, stations, yearsOfExperience } from "../src/lib/transit";

test("years of experience counts whole years from the earliest role", () => {
  assert.equal(yearsOfExperience(new Date(2026, 10, 2)), 9);
  assert.equal(yearsOfExperience(new Date(2027, 0, 15)), 9, "a new calendar year alone does not add a year");
  assert.equal(yearsOfExperience(new Date(2027, 1, 1)), 10);
});

for (const orientation of ["horizontal", "vertical"] as const) {
  test(`${orientation} map: lines are solid only between consecutive roles that used them`, () => {
    const map = layout(orientation);
    for (const lane of map.lanes) {
      const served = stations.map((s, i) => (s.lanes.includes(lane.id) ? i : -1)).filter(i => i >= 0);
      const gaps = served.slice(1).filter((b, k) => b - served[k] > 1).length;
      assert.equal(lane.skipped.length, gaps, `${lane.id}: one dotted segment per skipped stretch`);
      assert.ok(lane.solid.length > 0, `${lane.id}: has at least one solid segment`);
    }
  });

  test(`${orientation} map: region move and labels come from the data`, () => {
    const map = layout(orientation);
    const moveAt = stations.findIndex((s, i) => i > 0 && s.region !== stations[i - 1].region);
    assert.ok(moveAt > 0);
    assert.equal(map.moveNote?.text, `Moved to ${stations[moveAt].region}, ${stations[moveAt].period.match(/\d{4}/)?.[0]}`);
    if (orientation === "horizontal") assert.deepEqual(map.regions.map(r => r.name).sort(), [...new Set(stations.map(s => s.region))].sort());
  });
}

test("lanes that no role uses are skipped instead of crashing the layout", () => {
  const map = layout("horizontal");
  for (const lane of map.lanes) assert.ok(stations.some(s => s.lanes.includes(lane.id)), lane.id);
});
