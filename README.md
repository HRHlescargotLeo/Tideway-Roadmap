# Tideway – website improvement prototypes (V2)

Five clickable prototypes for improvements to tideway.london, prepared by ClerksWell following the phase 1 review (13 October 2026). The Tideway design layer (colours, type, buttons, wave edges, imagery treatment) lives entirely in `src/css/theme.css`; remove that file to get the greyscale prototypes back.

Photography is Tideway's own, loaded directly from tideway.london by `src/js/photos.js` (the mapping of images to sites, spaces and sections lives there). Where the images can't load, illustrated river scenes in the brand palette show instead. Photography © Tideway; the repository and site are public, so treat them accordingly. Cubano and urw-din-semi-condensed are licensed, so Passion One and Barlow Semi Condensed stand in until we have Tideway's font files.

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
Edit files in `src/`; `docs/` is generated (commit it, as GitHub Pages serves it). The prototype navigator (top bar with the Notes switch) and the previous/next footer live in `src/includes/`. Shared behaviour is in `src/js/wireframe.js`; prototype behaviour in `src/js/tideway.js`; sample data in `src/js/data.js`; photography in `src/js/photos.js`.

## Status
V2, designed prototypes for internal review (V1 was greyscale). Tideway's own header and footer are replaced by a prototype navigator. Notes are off by default; switch "Notes on" in the top bar to show what each prototype proposes and why, plus in-page annotations and open questions.

Site names, boroughs, published figures and news titles are Tideway's. Statuses, notices, monthly and per-site figures, events, coordinates and file sizes are sample data.
