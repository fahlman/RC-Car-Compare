# Contributing

Thanks for helping keep this table accurate! All the data lives in **`cars.json`**. You never need to touch the HTML.

By contributing, you agree that your changes to `cars.json` are licensed under [CC BY 4.0](LICENSE-DATA) and your changes to everything else are licensed under the [MIT License](LICENSE).

## The easy way (no software needed)

1. Open `cars.json` on GitHub and click the pencil icon (**Edit this file**).
2. Make your change. To add a model, copy an existing entry, paste it after the last one and add a comma between them.
3. Click **Commit changes…**, choose **Create a new branch and start a pull request**, and fill in the template, including your source link.
4. An automatic check will catch common typos. If it fails, click **Details** to see what to fix.

## Rules

- **Manufacturer data only.** Every value must come from the manufacturer's own website, including product pages, parts lists and manuals. The allowed sites for each brand are listed in `MANUFACTURER_SITES` in `scripts/validate.js`; a maker's official US site (like CorallyUS or Kyosho America) counts. Retailer sites, forums and reviews aren't accepted, even if they're probably right. The automatic check rejects other links.
- **Don't guess.** If the manufacturer doesn't publish it, use `null`. The site shows it as "?".
- **Set `verified`** to the date you checked the source (`YYYY-MM-DD`).
- **Current scope:** Electric, ready-to-run, off-road 2WD and 4WD cars and trucks (bashers, buggies, short course, stadium, rally, desert trucks) from 1/5 scale down to 1/18, that the maker still sells. Skip discontinued models; a model on backorder or out of stock is fine, with a note. Gas and nitro models, crawlers, on-road, drag and dirt-oval cars aren't included; open an issue first if you'd like to add them.
- **New brand?** Add it to `MANUFACTURER_SITES` in `scripts/validate.js` in the same pull request.
- **Scale labels:** Use the scale from the maker's spec table, like `"1/8"`. If the spec table gives a name instead of a fraction, use the size in the product page's header when that's a fraction (Traxxas's Unlimited Desert Racer says "Pro-Scale" in its specs and 1/7 in its header) and put the name in `notes`. If the maker gives no fraction at all, use its name as written. The names allowed so far are in `SCALE_NAMES` in `scripts/validate.js`: Traxxas's `"Mini"` and `"X-Truck"`. A special label on a fraction-scale model (like Corally's "XL4S" or a "Mini 1:10") goes in `notes`, and the scale is the fraction the spec table gives.
- **Speeds in km/h:** Use the maker's own mph figure if they give one. If not, convert (km/h ÷ 1.609, rounded down) and put the original in `speedNote`.
- **Sale prices:** Use the regular price, not a sale price. Mention the sale in `notes` if you like.
- **Amazon item numbers:** `amazonAsin` is the one field that doesn't come from the maker's site, because it's a shopping link, not data. Use the exact model and version, from a listing sold by Amazon or by the maker's own Amazon store, not a third-party seller. Add only the item number; the site adds its own Associates tag.

## Field reference

| Field | Example | Notes |
|---|---|---|
| `brand` | `"Arrma"` | |
| `model` | `"Senton 223S DSC 4X4"` | Name as the maker writes it |
| `platform` | `"Arrma 223S 4X4"` | Required. The shared chassis/drivetrain family. Reuse an existing name when the maker's parts lists show the models share major parts (transmission, diffs, chassis); otherwise give the model its own name like `"Losi Baja Rey"` |
| `sku` | `"ARA4303V4"` | Optional. Base part number without the color suffix, if the maker publishes one |
| `scale` | `"1/8"` | A fraction, or a maker name from `SCALE_NAMES` (see **Scale labels**) |
| `type` | `"Short course truck"` | Monster truck, Stadium truck, Short course truck, Buggy, Truggy, On-road, etc. |
| `drive` | `"4WD"` | `4WD` or `2WD` |
| `motor` | `"Brushless"` | `Brushless` or `Brushed` |
| `motorDetail` | `"Spektrum Firma"` | Optional. The motor's name. Size and Kv go in their own fields. For a brushed motor, include the turns (e.g. `"Titan 12T"`) |
| `motorSize` | `"3660"` | Can size as the maker writes it, like `"3660"`, `"550"` or `"540XL"`. `null` if the maker doesn't publish it |
| `motorKv` | `3100` | Kv as a number. Brushed motors are usually rated in turns instead, so this is often `null` for them |
| `minCells` / `maxCells` | `2` / `3` | LiPo cell counts the stock ESC supports (3 = 3S) |
| `topSpeedMph` | `50` | The maker's claim as a number. Put conditions in `speedNote` |
| `speedNote` | `"50+ mph on 3S, per Arrma"` | Say if optional gearing is needed |
| `centerDiff` | `"yes"` | `yes`, `no`, `optional` (sold as an upgrade), `n/a` for 2WD models, or `null` if unknown. A slipper clutch or Traxxas "Torque-Biasing Center Drive" is **not** a center diff |
| `centerDiffGears` | `"metal"` | `metal`, `composite` or `null`. Only when `centerDiff` is `yes` |
| `frontRearDiffs` | `"Metal gear"` | Free text from the spec sheet. For 2WD, start with "Rear:" |
| `completion` | `"RTR"` | `RTR`, `Kit` or `Roller` |
| `priceUsd` | `339.99` | The regular US price shown on the manufacturer's site (not a sale price). For Team Associated, use the MAP price, or the online price if no MAP is shown, and say which in `notes`. Number only |
| `amazonAsin` | `"B0ABC12345"` | Optional. The 10-character Amazon item number (ASIN), found in the listing's link after `/dp/` or under "Product information". Leave it out if the car isn't sold on Amazon |
| `source` | `"https://traxxas.com/…"` | Required. Must be the manufacturer's own site. If a fact came from a parts list or manual, say which in `notes` |
| `verified` | `"2026-11-17"` | Required |
| `notes` | `""` | Anything a buyer should know |

To check your edit on your own computer: `node scripts/validate.js`
