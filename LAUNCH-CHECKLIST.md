# One-time launch checklist

- [ ] Replace `YOUR-GITHUB-USERNAME` in canonical URLs, Open Graph URLs, JSON-LD, sitemap.xml and robots.txt with the exact live site base URL.
- [ ] Replace `publisherName` and `contactEmail` in `js/site-config.js`.
- [ ] Add the real Google Search Console verification token to the homepage head after verification setup.
- [ ] Deploy all extracted files at the repository root (index.html must be at root).
- [ ] Open `/sitemap.xml` and `/robots.txt` on the live website.
- [ ] Verify the property in Search Console and submit sitemap.xml.
- [ ] Inspect the homepage and key tool pages with URL Inspection; request indexing where appropriate.
- [ ] Test live NHTSA API from your own browser/network, including a known sample VIN and an Australian-market VIN.
- [ ] Test mobile, tablet and desktop layouts on the live deployment.
- [ ] Run PageSpeed Insights and monitor Core Web Vitals after real-user data becomes available.
- [ ] Review the privacy policy if advertising, analytics, embedded media or cookies are added.
