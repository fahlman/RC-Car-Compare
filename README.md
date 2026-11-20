# RC Car Spec Compare

A filterable, sortable table of hobby-grade electric ready-to-run off-road RC cars and trucks (2WD and 4WD), from 1/5 scale down to 1/18: Arrma, HPI Racing, Kyosho, Losi, Redcat, RLAARLO, Team Associated, Team Corally and Traxxas. Every spec comes from the manufacturer's own website.

- Filter by brand, scale, drive, motor, battery (LiPo cell count), center differential, price, type and platform. Click a filter choice once to show only those cars, again to hide them, and a third time to clear it
- Click a header to sort, or Shift+click to sort by more than one column
- Drag headers to reorder columns. Click the eye in a header to hide that column, or use the eyes in the sidebar to hide or show any column. Your layout is saved in your browser

## Set up GitHub Pages

1. Create a public repository and upload these files, keeping the `.github` and `scripts` folders.
2. Go to **Settings → Pages**, set **Source** to *Deploy from a branch*, and choose `main` / `(root)`.
3. Your site will be live at `https://<your-username>.github.io/<repo-name>/` in a minute or two.
4. Optional: in `index.html`, set `REPO_URL` near the top of the script to your repo URL so the footer shows an "Edit on GitHub" link.
5. Optional: under **Settings → Branches**, add a rule for `main` that requires the **Check car data** status check, so pull requests with bad data can't be merged.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). In short, edit `cars.json`, include a source link, and open a pull request.

## License

The code (`index.html`, `scripts/` and `.github/`) is under the [MIT License](LICENSE). The car data in `cars.json` is under [CC BY 4.0](LICENSE-DATA): you can reuse it if you credit this project.

## Previewing locally

The page loads `cars.json`, so open it through a local web server rather than by double-clicking it:

```
python3 -m http.server
```

Then visit http://localhost:8000.
