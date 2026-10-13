# Tideway – website improvement prototypes (V1)

Five clickable prototypes for improvements to tideway.london, prepared by ClerksWell following the phase 1 review (13 October 2026). This version is greyscale: it's for agreeing structure and behaviour. The Tideway design layer will live entirely in `src/css/theme.css`, which is empty for now.

## View
Live: https://hrhlescargotleo.github.io/Tideway-Roadmap/

Or open `docs/index.html` in a browser. No server or install needed.

GitHub Pages publishes from the `docs/` folder on `main` (Settings → Pages → Deploy from a branch → `main` / `/docs`).

## Prototypes
1. It's working – `pages/home.html`, plus `pages/who-does-what.html`
2. River health – `pages/river-health.html`, plus `pages/overflow.html` (opens any connection via `?site=<id>`)
3. What's happening near me – `pages/near-me.html`, `pages/site.html` (`?site=<id>`) and `pages/contact.html` (`?topic=&site=`)
4. Visit the new riverside – `pages/riverside.html`, plus `pages/space.html` (`?space=<id>`)
5. Find any document – `pages/documents.html` (`?q=` and `?type=`)

Module library: `modules/library.html`. Requirements: `requirements/requirements.md`, each R-number mapped to the phase 1 idea numbers.

## Build
```
node build-includes.js && node validate.js
```
Edit files in `src/`; `docs/` is generated (commit it, as GitHub Pages serves it). The prototype navigator (top bar with the Notes switch) and the previous/next footer live in `src/includes/`. Shared behaviour is in `src/js/wireframe.js`; prototype behaviour in `src/js/tideway.js`; sample data in `src/js/data.js`.

## Status
V1, greyscale prototypes for internal review. Tideway's own header and footer are replaced by a prototype navigator. Notes are off by default; switch "Notes on" in the top bar to show what each prototype proposes and why, plus in-page annotations and open questions.

Site names, boroughs, published figures and news titles are Tideway's. Statuses, notices, monthly and per-site figures, events, coordinates and file sizes are sample data.
