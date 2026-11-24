# Free VIN Check Australia

A lightweight, static VIN validation and information website built with HTML, CSS and vanilla JavaScript. It is designed for GitHub Pages and does not require a build step, package manager or server.

## Publish on GitHub Pages

1. Create a GitHub repository (for example, `free-vin-check-australia`).
2. Extract this ZIP.
3. Upload **the contents of this folder** to the repository root. The `index.html` file must be at the repository root, not inside another nested folder.
4. In GitHub, open **Settings → Pages**.
5. Under Build and deployment, choose **Deploy from a branch**, select your main branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site.

## Set your real website URL before launch

The HTML files, `sitemap.xml` and `robots.txt` contain the placeholder `https://YOUR-DOMAIN.com`.

Before submitting the site to search engines:
- Replace `https://YOUR-DOMAIN.com` in all files with your final canonical website URL, including the trailing slash where shown.
- If you use a custom domain, configure it in GitHub Pages and add the required DNS records.
- If you use a project URL such as `https://USERNAME.github.io/REPOSITORY/`, set canonical and sitemap URLs to that exact base path. Do not use the root `https://USERNAME.github.io/` unless that is where this repository is published.
- Check that the sitemap opens in a browser and every listed URL loads.

You can find remaining placeholders by searching the repository for `YOUR-DOMAIN.com`.

## What the VIN tool does

- Checks the VIN text format in the browser.
- Flags I, O and Q, as well as unsupported characters; spaces and hyphens are treated as visual separators.
- Shows available WMI/manufacturer, country, model-year code, plant and serial segments from the local reference data.
- Calculates the ISO 3779 check digit as an informational comparison. A mismatch is not proof that an Australian-market vehicle has an invalid VIN; check-digit requirements vary by market.
- Offers an optional lookup against the NHTSA vPIC public API when the visitor chooses **Check & Decode VIN**.

## Important limitations

This is **not** an official Australian vehicle-history service.

- The local decoder uses a limited, manually maintained WMI reference list. An unknown maker code means it is not in this tool's list, not that the VIN is invalid.
- NHTSA vPIC is a United States vehicle database. It may return limited or no details for Australian-market vehicles, older vehicles and some imports.
- When a visitor chooses the NHTSA lookup, their VIN is sent to the NHTSA vPIC public API. The local format check itself runs in the browser.
- This tool does not check finance owing, stolen status, written-off status, odometer history, registration status, accident history or ownership.
- For official Australian encumbrance, stolen and written-off information, use the Australian Government's PPSR CarCheck service: https://www.ppsr.gov.au/carcheck. Check its current fee and terms before use.
- The RAV public search is a Register of Approved Vehicles search; it is not a general vehicle-history report.

## Editing

- Styles: `css/style.css`
- VIN logic and API lookup: `js/app.js`
- Main page: `index.html`
- Supporting pages: each folder contains its own `index.html`.
- Site URLs: `sitemap.xml`, `robots.txt` and canonical/OG metadata in each HTML page.

## Performance and privacy

The site uses plain HTML, CSS and JavaScript without a front-end framework. No analytics or advertising scripts are included in this package. Browser-only validation does not send the VIN to a server. The optional NHTSA lookup sends it to the NHTSA public API as described above.

## Sources and independence

Reference resources:
- Australian Government vehicle identification number information: https://www.infrastructure.gov.au/infrastructure-transport-vehicles/vehicles/importing-vehicle/vin
- PPSR CarCheck: https://www.ppsr.gov.au/carcheck
- Register of Approved Vehicles public search: https://www.rover.infrastructure.gov.au/RAVPublicSearch/
- NHTSA vPIC API: https://vpic.nhtsa.dot.gov/api/

This is an independent informational website and is not affiliated with the Australian Government, PPSR, NHTSA or any state road authority.
