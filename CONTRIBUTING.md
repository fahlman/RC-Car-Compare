# Contributing

Thanks for helping keep this table accurate! All the data lives in **`cars.json`**. You never need to touch the HTML.

## The easy way (no software needed)

1. Open `cars.json` on GitHub and click the pencil icon (**Edit this file**).
2. Make your change. To add a model, copy an existing entry, paste it after the last one and add a comma between them.
3. Click **Commit changes…**, choose **Create a new branch and start a pull request**, and fill in the template, including your source link.
4. An automatic check will catch common typos. If it fails, click **Details** to see what to fix.

## Rules

- **Manufacturer data only.** Every value must come from the manufacturer's own website, including product pages, parts lists and manuals. The allowed sites for each brand are listed in `MANUFACTURER_SITES` in `scripts/validate.js`; a maker's official US site (like CorallyUS or Kyosho America) counts. Retailer sites, forums and reviews aren't accepted, even if they're probably right. The automatic check rejects other links.
- **Don't guess.** If the manufacturer doesn't publish it, use `null`. The site shows it as "?".
- **Set `verified`** to the date you checked the source (`YYYY-MM-DD`).
- **Current scope:** 1/10-scale, ready-to-run, off-road 2WD and 4WD cars and trucks (bashers, buggies, short course, stadium, rally, desert trucks) that the maker still sells. Skip discontinued models; a model on backorder or out of stock is fine, with a note. Crawlers, on-road, drag and dirt-oval cars aren't included; open an issue first if you'd like to add them.
- **New brand?** Add it to `MANUFACTURER_SITES` in `scripts/validate.js` in the same pull request.
- **Scale labels:** If the maker calls it 1/10 but uses a special label (like Corally's "XL4S" or a "Mini 1:10"), use `"1/10"` only if the maker's own spec table says 1/10, and put the label in `notes`. Otherwise use the maker's wording.
- **Speeds in km/h:** Use the maker's own mph figure if they give one. If not, convert (km/h ÷ 1.609, rounded down) and put the original in `speedNote`.
- **Sale prices:** Use the regular price, not a sale price. Mention the sale in `notes` if you like.

## Field reference

| Field | Example | Notes |
|---|---|---|
| `brand` | `"Arrma"` | |
| `model` | `"Senton 223S DSC 4X4"` | Name as the maker writes it |
| `sku` | `"ARA4303V4"` | Optional. Base part number without the color suffix, if the maker publishes one |
| `scale` | `"1/10"` | |
| `type` | `"Short course truck"` | Monster truck, Stadium truck, Short course truck, Buggy, Truggy, On-road, etc. |
| `drive` | `"4WD"` | `4WD` or `2WD` |
| `motor` | `"Brushless"` | `Brushless` or `Brushed` |
| `motorDetail` | `"Spektrum 3100Kv"` | Optional |
| `minCells` / `maxCells` | `2` / `3` | LiPo cell counts the stock ESC supports (3 = 3S) |
| `topSpeedMph` | `50` | The maker's claim as a number. Put conditions in `speedNote` |
| `speedNote` | `"50+ mph on 3S, per Arrma"` | Say if optional gearing is needed |
| `centerDiff` | `"yes"` | `yes`, `no`, `optional` (sold as an upgrade), `n/a` for 2WD models, or `null` if unknown. A slipper clutch or Traxxas "Torque-Biasing Center Drive" is **not** a center diff |
| `centerDiffGears` | `"metal"` | `metal`, `composite` or `null`. Only when `centerDiff` is `yes` |
| `frontRearDiffs` | `"Metal gear"` | Free text from the spec sheet. For 2WD, start with "Rear:" |
| `completion` | `"RTR"` | `RTR`, `Kit` or `Roller` |
| `priceUsd` | `339.99` | The regular US price shown on the manufacturer's site (not a sale price). For Team Associated, use the MAP price, or the online price if no MAP is shown, and say which in `notes`. Number only |
| `source` | `"https://traxxas.com/…"` | Required. Must be the manufacturer's own site. If a fact came from a parts list or manual, say which in `notes` |
| `verified` | `"2026-11-17"` | Required |
| `notes` | `""` | Anything a buyer should know |

To check your edit on your own computer: `node scripts/validate.js`
