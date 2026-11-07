# jasanchez.net

Personal portfolio site for Andy Sanchez, IT Technician. Plain HTML, CSS and JavaScript with no build step.

## Structure

- `index.html` – home page (about, projects, skills, credentials, FAQ, contact)
- `projects/` – one case study page per project
- `styles.css` – all styles; the accent color is `--sky` at the top
- `script.js` – mobile menu, homelab panel animation, contact form

## Deploy

Hosted on Cloudflare Workers (static assets), deployed automatically from the `main` branch. `wrangler.jsonc` serves the repo root; `.assetsignore` keeps repo-only files from being published.

## To do

- Add `resume.pdf`
- Add Formspree form ID and LinkedIn handle in `index.html`
- Add project screenshots
