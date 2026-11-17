// Checks cars.json for mistakes before a pull request is merged.
// Run locally with: node scripts/validate.js
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "cars.json");
const errors = [];
let cars;
try {
  cars = JSON.parse(fs.readFileSync(file, "utf8"));
} catch (e) {
  console.error("cars.json is not valid JSON: " + e.message);
  process.exit(1);
}
if (!Array.isArray(cars)) { console.error("cars.json must be a list [ ... ] of cars."); process.exit(1); }

const ENUMS = {
  drive: ["4WD", "2WD"],
  motor: ["Brushless", "Brushed"],
  completion: ["RTR", "Kit", "Roller"],
  centerDiff: ["yes", "no", "optional", "n/a", null],
  centerDiffGears: ["metal", "composite", null],
};
const REQUIRED = ["brand", "model", "scale", "type", "drive", "motor", "completion", "source", "verified"];
const ALLOWED = new Set([...REQUIRED, "sku", "motorDetail", "minCells", "maxCells", "topSpeedMph", "speedNote",
  "centerDiff", "centerDiffGears", "frontRearDiffs", "priceUsd", "notes"]);

// Sources must be the manufacturer's own website. Add a brand here when it's added to the table.
const MANUFACTURER_SITES = {
  Traxxas: ["traxxas.com"],
  Arrma: ["arrma-rc.com"],
  "Team Associated": ["associatedelectrics.com", "teamassociated.com"],
  Losi: ["losi.com"],
  Redcat: ["redcatracing.com"],
  "Team Corally": ["corally.com", "corallyus.com"],
  RLAARLO: ["rlaarlo.com"],
  Kyosho: ["kyoshoamerica.com", "kyosho.com"],
  "HPI Racing": ["hpiracing.com"],
};

const seen = new Set();
cars.forEach((c, i) => {
  const where = `Entry ${i + 1} (${c.brand || "?"} ${c.model || "?"})`;
  for (const k of REQUIRED) if (c[k] == null || c[k] === "") errors.push(`${where}: "${k}" is required.`);
  for (const k of Object.keys(c)) if (!ALLOWED.has(k)) errors.push(`${where}: unknown field "${k}" (check spelling).`);
  for (const [k, vals] of Object.entries(ENUMS))
    if (k in c && !vals.includes(c[k])) errors.push(`${where}: "${k}" must be one of ${vals.map(v => JSON.stringify(v)).join(", ")} — got ${JSON.stringify(c[k])}.`);
  if (c.scale && !/^(1\/\d+|Mini)$/.test(c.scale)) errors.push(`${where}: "scale" should look like "1/10".`);
  for (const k of ["minCells", "maxCells"])
    if (c[k] != null && !(Number.isInteger(c[k]) && c[k] >= 1 && c[k] <= 12)) errors.push(`${where}: "${k}" must be a whole number of LiPo cells (e.g. 3), or null.`);
  if (c.minCells != null && c.maxCells != null && c.minCells > c.maxCells) errors.push(`${where}: minCells is larger than maxCells.`);
  for (const k of ["topSpeedMph", "priceUsd"])
    if (c[k] != null && !(typeof c[k] === "number" && c[k] > 0)) errors.push(`${where}: "${k}" must be a number without units or "$" (e.g. 369.99), or null if unknown.`);
  if (c.drive === "2WD" && c.centerDiff !== "n/a") errors.push(`${where}: 2WD models have no center diff — set "centerDiff" to "n/a".`);
  if (c.drive === "4WD" && c.centerDiff === "n/a") errors.push(`${where}: "n/a" is only for 2WD models.`);
  if (c.centerDiffGears && c.centerDiff !== "yes") errors.push(`${where}: centerDiffGears is set but centerDiff is not "yes".`);
  if (c.source && !/^https?:\/\//.test(c.source)) errors.push(`${where}: "source" must be a full link starting with https://`);
  if (c.brand && !MANUFACTURER_SITES[c.brand]) errors.push(`${where}: brand "${c.brand}" isn't in the table yet. Add it to MANUFACTURER_SITES in scripts/validate.js first.`);
  if (c.source && MANUFACTURER_SITES[c.brand]) {
    let host = "";
    try { host = new URL(c.source).hostname.toLowerCase(); } catch (e) {}
    const ok = MANUFACTURER_SITES[c.brand].some(d => host === d || host.endsWith("." + d));
    if (!ok) errors.push(`${where}: "source" must be on ${c.brand}'s own website (${MANUFACTURER_SITES[c.brand].join(", ")}). Retailer links aren't accepted.`);
  }
  if (c.verified && !/^\d{4}-\d{2}-\d{2}$/.test(c.verified)) errors.push(`${where}: "verified" must be a date like 2026-11-17.`);
  const id = `${c.brand}|${c.model}`.toLowerCase();
  if (seen.has(id)) errors.push(`${where}: duplicate brand + model.`);
  seen.add(id);
});

if (errors.length) {
  console.error(`Found ${errors.length} problem(s) in cars.json:\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log(`cars.json looks good: ${cars.length} entries.`);
