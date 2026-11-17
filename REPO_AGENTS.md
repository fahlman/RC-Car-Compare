# RC Car Compare — Repository Instructions

Project-specific rules for agents. The shared rules are in [AGENTS.md](AGENTS.md).

## Purpose

A static web page with a filterable, sortable table of hobby-grade 1/10-scale
ready-to-run off-road RC cars and trucks (2WD and 4WD). Every spec comes from
the manufacturer's own website. Outside contributors update the data through
pull requests. Scope and data rules for contributors are in
[CONTRIBUTING.md](CONTRIBUTING.md).

## Project type and platform

- A static website: plain HTML, CSS and JavaScript with a JSON data file. It is
  not a Mac app or a Swift project, so the Xcode, Swift and macOS SDK settings
  in the shared rules don't apply. There is no build step and no package
  manager.
- Repository: `fahlman/RC-Car-Compare` (public).

## Files and ownership

- `cars.json` holds the official copy of the car data. Edit it by hand, never
  through generated output.
- `scripts/validate.js` owns the data rules: required and allowed fields, the
  allowed values, and `MANUFACTURER_SITES`, the list of acceptable source
  sites for each brand. When a rule changes here, `CONTRIBUTING.md` and the PR
  template must be updated to match.
- `index.html` only displays `cars.json`. It doesn't hold its own data or
  rules. Filters, sorting and the column layout run in the visitor's browser,
  and the layout is saved in that browser's local storage.
- `.github/workflows/validate.yml` runs the validator in CI.
  `.github/pull_request_template.md` is the contributor checklist.

## Licensing

- `cars.json` is under CC BY 4.0 (`LICENSE-DATA`). Everything else is under
  MIT (`LICENSE`). Keep `LICENSE` as the unmodified MIT text so GitHub detects
  it. Any new data file needs a decision about which license covers it, and
  `LICENSE-DATA`, the README and `CONTRIBUTING.md` must name it.

## Commands

- Check the data: `node scripts/validate.js` (CI uses Node 20). It exits
  non-zero and lists each problem when `cars.json` is invalid. Node is not
  installed on Ryan's Mac as of 2026-11-17, so rely on the CI run for now.
- Preview locally: from the repository root, `python3 -m http.server`, then
  open http://localhost:8000. Opening `index.html` directly from disk doesn't
  work because the page fetches `cars.json`.

## Automated checks

- **Check car data** (`.github/workflows/validate.yml`) runs
  `node scripts/validate.js` on pull requests and on pushes to `main` that
  change `cars.json` or `scripts/validate.js`.
- Pending: the README suggests making this check required on `main` through
  branch protection. That hasn't been approved or set up.

## Release

- Pending: no release or deploy process is approved yet. The README describes
  publishing through GitHub Pages from `main` / `(root)` and then setting
  `REPO_URL` in `index.html`. Neither has been done yet.
