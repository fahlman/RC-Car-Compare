# RC Car Compare — Repository Instructions

Project-specific rules for agents. The shared rules are in [AGENTS.md](AGENTS.md).

## How the shared rules apply here

Ryan, 2026-11-17: this is just a website hosted on GitHub, and the shared
rules can be bent or broken here. Many of them are written for his Mac apps.
Use judgment rather than the full process. It's fine to commit straight to
`main` without an issue, branch, worktree, or second-agent review. Every push to
`main` goes live (see Release), so preview changes before pushing.

## Purpose

A static web page with a filterable, sortable table of hobby-grade electric
ready-to-run off-road RC cars and trucks (2WD and 4WD), from 1/5 scale down to
1/18. Every spec comes from
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

- GitHub Pages publishes `main` / `(root)` at
  https://code.fahlsing.com/RC-Car-Compare/, the custom domain of
  `fahlman.github.io`. Every push to `main` updates the live site within a few
  minutes. There are no versions or tags.
- Pages builds the repository with Jekyll. A symlink that points outside the
  repository makes the build fail, so `AGENTS.md` is a regular file here.
- `AMAZON_TAG` in `index.html` is empty until Ryan has an Amazon Associates
  tracking ID. While it's empty, the Amazon column and the Associates
  disclosure above the table stay hidden. Setting it turns both on. Amazon
  requires the disclosure wherever its affiliate links appear, so don't show
  the links without it. Cars link to Amazon through the optional `amazonAsin`
  field in `cars.json`.
- `REPO_URL` in `index.html` points to this repository, so the footer links
  to `cars.json` on GitHub and to `CONTRIBUTING.md`. Update it if the
  repository is renamed or moved.
