# Tideway website prototypes: requirements

Each requirement traces to an idea number on the phase 1 opportunities page (I01–I45). Sections in the HTML carry `<!-- … (Rnn) -->` comments so coverage can be checked with grep.

## Global

| ID | Requirement | Ideas |
|----|-------------|-------|
| R01 | Prototype navigator replaces Tideway's header: pack name, Overview, links 1–5, Notes switch | – |
| R02 | Previous / next pager replaces Tideway's footer | – |
| R03 | Notes switch, off by default, remembered for the session; shows the proposal panel and in-page annotations | – |
| R04 | One H1 per page, headings in order, skip link, visible focus, keyboard-operable controls | I38 |
| R05 | Real figures printed in the HTML; any count-up animation only when motion is allowed | I06 |
| R06 | Present-tense copy throughout; dates written as 12 Oct 2026 | I43, I44 |
| R07 | Context carried between pages with `?site=`, `?space=`, `?topic=` plus a sessionStorage fallback | – |
| R08 | Works at 390px and 1440px with no horizontal scroll | – |
| R09 | Two tabs, Big improvements and Quick wins, each with its own overview; the pager stays within the current tab; a Quick win jump list in the navigator | – |
| R10a | No version, date, phase, "prepared by" or status labels on any rendered page | – |

## Prototype 1: It's working (pages/home.html, pages/who-does-what.html)

| ID | Requirement | Ideas |
|----|-------------|-------|
| R10 | Proposed main navigation for the operating years, shown as a working flyout menu | I03 |
| R11 | Hero that states the outcome, with figures from the Benefits Report linking to the evidence | I01 |
| R12 | Counter with the current figure in the HTML, last-updated date and a "How we count this" link | I06, I12 |
| R13 | Task routes near the top: river results, visit, works near you, report a problem, documents, investors | I04 |
| R14 | Milestone strip giving one agreed sequence: connected, commissioning, fully operational, spaces open, handover | I07 |
| R15 | "Who does what" chooser: pick an issue, see whether Tideway or Thames Water handles it and how to reach them | I02 |
| R16 | Latest news cards with readable dates | I44 |
| R17 | Search snippet preview showing the proposed title and description | I05 |

## Prototype 2: River health (pages/river-health.html, pages/overflow.html)

| ID | Requirement | Ideas |
|----|-------------|-------|
| R20 | The four Benefits Report objectives with before-and-after figures and bar charts | I08 |
| R21 | Step-through of what happens when it rains, with a text alternative | I11 |
| R22 | List of overflow connection points, filterable by stretch of river and sortable, each linking to a detail page | I09 |
| R23 | Overflow detail page with captured volume by month (sample), what it used to discharge and a link to Thames Water's live status | I09 |
| R24 | Monthly update: month tabs with rainfall, storms captured, volume and a short note; email sign-up | I10 |
| R25 | "How we count this" caveats in plain English | I12 |
| R26 | Report download with format and size | I08, I29 |

## Prototype 3: What's happening near me (pages/near-me.html, pages/site.html, pages/contact.html)

| ID | Requirement | Ideas |
|----|-------------|-------|
| R30 | Postcode lookup returning sites sorted by distance, with status, and a "use my location" option | I14 |
| R31 | Map with pins that select the matching result, and a list/map toggle on mobile | I14 |
| R32 | Status filter (works continuing, public space open, operating) | I13, I14 |
| R33 | Site page status panel: status, last updated, what's next, contact | I13 |
| R34 | Dated works notices, filterable by type | I16 |
| R35 | Update alerts sign-up: choose sites and topics, validate, confirm | I15 |
| R36 | Liaison group meetings as a table with notes and slides | I17 |
| R37 | Site documents with readable titles, type, size and date | I29 |
| R38 | Contact flow that asks topic, site and postcode, routes to Tideway or Thames Water, shows who replies and when, and gives a reference | I18, I02 |
| R39 | Step-by-step help for complaints and compensation linked from the contact flow | I19 |

## Prototype 4: Visit the new riverside (pages/riverside.html, pages/space.html)

| ID | Requirement | Ideas |
|----|-------------|-------|
| R40 | Guide to the seven new riverside spaces with filters (step-free, floodable at high tide, art, play) and a map | I20 |
| R41 | Visitor-first page for each space: what's there, getting there, access, tides, art, events, then the engineering and construction record | I21 |
| R42 | Events list filterable by type and place, including Active Tideway sessions with links to the partner booking pages | I22, I23 |
| R43 | Art trail: artworks, poems and plaques with a stop-by-stop route | I24 |
| R44 | Tideway Prize panel: how to enter and a gallery placeholder | I25 |

## Prototype 5: Find any document (pages/documents.html)

| ID | Requirement | Ideas |
|----|-------------|-------|
| R50 | One search across pages, news, documents and video with summaries, type, date and site | I26 |
| R51 | Filters for type, site, topic and year; sort by relevance or date; result count; clear filters | I26, I27 |
| R52 | Documents shown with readable titles, format and size | I29 |
| R53 | Annual reports listed newest first, 2025-26 included | I28 |
| R54 | Investor panel with the latest report, contact and key documents | I34 |
| R55 | Learning legacy themes with summaries | I31 |
| R56 | Video results browsable by year and topic | I30 |

## Quick wins tab (R09)

Every phase 1 idea tagged quick win, plus the other small-effort ideas, each demonstrated on its own page. Generated by `tools/quick_wins.py`. "Also in" marks quick wins that are part of a big improvement and can also be bought alone.

| QW | Title | Idea | Also in | Page |
|----|-------|------|---------|------|
| QW1 | Who does what now | I02 | BI1 | pages/qw-01.html |
| QW2 | Task links on the homepage | I04 | BI1 | pages/qw-02.html |
| QW3 | Search snippets that describe today | I05 | BI1 | pages/qw-03.html |
| QW4 | One completion date, told the same way everywhere | I07 | BI1 | pages/qw-04.html |
| QW5 | The real number in the counter | I06 | BI1 | pages/qw-05.html |
| QW6 | How we count this, in plain English | I12 | BI2 | pages/qw-06.html |
| QW7 | Fix the server error on Chambers Wharf | I37 | – | pages/qw-07.html |
| QW8 | A liaison group record you can scan | I17 | BI3 | pages/qw-08.html |
| QW9 | Readable document names | I29 | BI3 | pages/qw-09.html |
| QW10 | A page for the Tideway Prize | I25 | BI4 | pages/qw-10.html |
| QW11 | Annual reports in order and up to date | I28 | BI5 | pages/qw-11.html |
| QW12 | Bring About Us up to date | I32 | – | pages/qw-12.html |
| QW13 | Corporate Info that agrees with About Us | I33 | – | pages/qw-13.html |
| QW14 | No more expired vacancies | I35 | – | pages/qw-14.html |
| QW15 | A main heading on every page | I38 | – | pages/qw-15.html |
| QW16 | A cookie banner with “Reject all” | I40 | – | pages/qw-16.html |
| QW17 | Teal text that passes contrast | I41 | – | pages/qw-17.html |
| QW18 | Share links that work | I42 | – | pages/qw-18.html |
| QW19 | A proofreading pass | I44 | – | pages/qw-19.html |
| QW20 | Clear the broken requests | I45 | – | pages/qw-20.html |

## Not prototyped

I36 press kit and I39 alt text (an audit rather than a design). Both are covered in the opportunities list and the findings report.
