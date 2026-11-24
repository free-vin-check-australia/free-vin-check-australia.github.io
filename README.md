# Free VIN Check Australia

A lightweight, static VIN validation and information website built with HTML, CSS and vanilla JavaScript. It is designed for GitHub Pages and does not require a build step, package manager or server.

## Publish on GitHub Pages

1. Create a GitHub repository (for example, `free-vin-check-australia`).
2. Extract this ZIP.
3. Upload **the contents of this folder** to the repository root. The `index.html` file must be at the repository root, not inside another nested folder.
4. In GitHub, open **Settings → Pages**.
5. Under Build and deployment, choose **Deploy from a branch**, select your main branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site.

## One-time launch settings (complete before search submission or AdSense)

The canonical URL is currently set to the GitHub Pages project path template `https://YOUR-GITHUB-USERNAME.github.io/free-vin-check-australia/`. Replace `YOUR-GITHUB-USERNAME` in every canonical URL, Open Graph URL, JSON-LD URL, `sitemap.xml` and `robots.txt` with your real GitHub username. If you use a custom domain, replace the entire base URL with that domain instead. Keep the repository path when using a project Pages URL.

Also edit `js/site-config.js`:
- `publisherName`: your real name or registered business name.
- `contactEmail`: an email address that you actively monitor.
- `editorName`: the actual editor or editorial team name you want displayed.

The Contact page uses an email link; this static site has no server-side contact form. Do not leave the placeholder owner or email details on the public site.

For Google Search Console, create and verify the property using the method Google provides. If you choose HTML meta verification, paste the exact token into the marked location in the homepage `<head>`. Then open the published `/sitemap.xml` in a browser and submit `sitemap.xml` in Search Console. Submission is a discovery signal, not a guarantee of indexing.

## Additional tools and official Australian links

- `/vin-compare/` compares a VIN read from the vehicle with a VIN on paperwork locally in the browser. It does not establish authenticity.
- `/rego-check-australia/` links to official rego lookup services for all eight Australian states and territories. These are external government services, not an embedded or scraped database.
- `/vehicle-recall-check/` links to the Australian Government vehicle recall search and explains how to confirm VIN applicability with the manufacturer.
- `/tools/` is a central directory for the available checks.

These tools are static and do not need a database, account, paid API or scheduled content updates. Government service URLs can change, so verify the official links occasionally if you make a future release.

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

## One-time deployment configuration

The actual site URL is not known at build time. Before submitting to search engines, replace `https://YOUR-GITHUB-USERNAME.github.io/free-vin-check-australia/` in all canonical tags, Open Graph URLs, structured data, `sitemap.xml` and `robots.txt` with your exact live GitHub Pages URL or custom domain. For a project repository, include `/REPOSITORY/` in the base URL. This is a one-time deployment setting, not a recurring content update.

The internal navigation uses relative paths so it works on GitHub Pages project URLs as well as custom domains.

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


## One-time launch configuration (must complete before promotion / AdSense)

1. In every HTML canonical, Open Graph URL, JSON-LD URL, `sitemap.xml` and `robots.txt`, replace `https://YOUR-GITHUB-USERNAME.github.io/free-vin-check-australia` with the exact live GitHub Pages base URL. For a project site, retain the repository path `/free-vin-check-australia/`; for a custom domain, use the custom domain root instead.
2. Open `js/site-config.js` and replace `publisherName` with your real name or registered business name, and `contactEmail` with a working public contact mailbox. The About and Contact pages read these settings. Do not leave the placeholders in the live website.
3. In `index.html`, add the Google Search Console HTML meta verification token inside `<head>` after creating a URL-prefix property. Do not guess or invent the token. Alternatively, use another verification method shown by Search Console.
4. After GitHub Pages publishes the site, open `https://YOUR-LIVE-BASE/sitemap.xml` and `https://YOUR-LIVE-BASE/robots.txt` to make sure both are publicly accessible. Verify the property in Google Search Console and submit `sitemap.xml` in the Sitemaps report. Sitemap submission is a discovery hint, not an indexing guarantee.
5. Use Search Console URL Inspection to test key pages and request indexing after deployment. Indexing is not instant or guaranteed.

## Pages added in this release

- Contact page (`/contact/`) with an email link activated from `js/site-config.js`; no pretend server-side form is used.
- ACT, Tasmania and Northern Territory VIN/rego information pages.
- Toyota, Ford, Holden and Mazda VIN interpretation guides.
- VIN vs rego explainer and Australian vehicle theft check guide.
- Original lightweight SVG diagrams for common VIN locations, with descriptive ALT text.

## API behaviour and testing notes

- Local VIN format checks run in the browser. They do not prove authenticity or history.
- Optional NHTSA vPIC lookup occurs only after the visitor presses the decode button. The VIN is sent directly to NHTSA in the United States.
- The UI handles no-data results, invalid entries, timeouts, network errors, HTTP errors and HTTP 429 rate limiting. A retry button appears for failed lookups; it does not automatically loop requests.
- NHTSA vPIC may not contain all Australian-market variants. A no-data response is not proof of an invalid VIN.
- This environment can test the API integration with mocked success, timeout, HTTP 429 and failure responses. It cannot guarantee live NHTSA availability from every visitor network; verify the live endpoint after deployment.

## SEO, structured data and FAQ notes

- Each indexable page has its own title, description, canonical, Open Graph URL and breadcrumb markup. The homepage has Organization, WebSite and WebApplication data.
- FAQ text remains useful on pages, but FAQ rich results are generally limited by Google to well-known authoritative government and health sites. This independent site should not expect FAQ rich-result display.
- Do not add fake reviews, ratings, author identities, business addresses, telephone numbers or Search Console tokens.
- Breadcrumb and Organization structured data helps search engines interpret the site but does not guarantee rich results or rankings.

## Performance and launch testing

- The site uses static HTML, CSS and JavaScript, a system font stack, no framework, no analytics tracker, and original local SVG illustrations.
- After deploying, test the live site in PageSpeed Insights for mobile and desktop field/lab data. Core Web Vitals are not something a local code inspection can certify; use Search Console's Core Web Vitals report after real-user data accumulates.
- Confirm HTTPS is active on the GitHub Pages URL. Check desktop, tablet and mobile navigation, and the VIN checker in at least one current Chromium-based browser and one Safari/Firefox browser if available.
- Before AdSense application, publish your real publisher identity and working contact email, then review the Privacy Policy again if you add ads, analytics, cookies or any third-party scripts.
