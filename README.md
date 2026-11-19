# Vanthis

Website for **Vanthis**, a web design studio. A scroll-driven, playful site with an ancient Greek mythology look: five scenes, a living star field, spring-in headlines and a contact form.

Plain HTML, CSS and JavaScript. No build step and no dependencies (only Google Fonts).

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Structure

```
index.html            page markup (five scenes)
css/style.css         styles and design tokens (:root variables)
js/main.js            scroll scenes, star field, cursor, confetti, form
assets/               logos (original, and ivory version for dark backgrounds)
.github/workflows/    GitHub Pages deployment
```

## Edit the content

- Headlines and copy: `index.html`. Letters animate automatically through the `split` class.
- Colors and fonts: the `:root` block at the top of `css/style.css`.
- Contact email: replace `hello@vanthis.com` in `js/main.js` with your real address.

## Deploy on GitHub Pages

1. Push this repo to GitHub on the `main` branch.
2. Open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` publishes the site.

## License

All rights reserved. The Vanthis name and logo are the property of Vanthis.
