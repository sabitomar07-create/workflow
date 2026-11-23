# Mister Fishing Gear

Bilingual (English / Arabic) website for Mister Fishing Gear, a fishing-tackle shop at
5 Ahmed Abd El-Latif, Sidi Beshr Bahri, Montaza 1, Alexandria Governorate 5517235, Egypt.

Plain HTML, CSS and JavaScript. No build step.

## Structure

```
index.html        page markup (all text in English and Arabic)
css/style.css     styles, colour tokens (light + dark), responsive rules
js/main.js        English / Arabic switch (sets lang + dir on <html>)
js/scene.js       3D hero scene (three.js)
favicon.svg
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000. Google Fonts and three.js (r128, cdnjs) load from their CDNs, so you need an internet connection.

## Editing content

- Every text exists twice: `<span lang="en">...</span><span lang="ar">...</span>`. Edit both.
- The language button toggles `lang` and `dir="rtl"` on `<html>`; CSS hides the other language. Layout uses logical properties, so right-to-left flips automatically.
- Colours and fonts are CSS variables at the top of `css/style.css` (with dark-mode values).
- The 3D scene falls back to the flat SVG artwork when WebGL is unavailable, and stays still when the visitor prefers reduced motion.

## Placeholder content to replace

- The six products in "Fresh on the shelf" (names, EGP prices, drawings) are fictional samples.
- Product categories and marketing copy are assumptions.
- Not yet included: phone / WhatsApp, opening hours, logo, real photos.

## Deploy

Any static host works. GitHub Pages: Settings > Pages > Deploy from a branch > `main` / `(root)`.
