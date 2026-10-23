#!/usr/bin/env python3
"""quick_wins.py: writes the Quick wins tab into src/.

    python3 tools/quick_wins.py && node build-includes.js && node validate.js

Generates src/quick-wins.html (the tab's overview), src/pages/qw-01.html to
qw-20.html (one demo per quick win) and src/includes/qw-links.html (the
navigator and pager sequence). Edit the content here, not in the generated
pages. Behaviour lives in src/js/quickwins.js; styling in components.css
(greyscale) and theme.css (design). Titles here are the ones the proposal uses.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

THEMES = [
    ("now", "Saying what's true now"),
    ("numbers", "The numbers"),
    ("sites", "Neighbours and site pages"),
    ("records", "Company facts and records"),
    ("fix", "Accessibility and housekeeping"),
]


def cmp(today, proposed, stack=False, labels=("Today", "Proposed")):
    cls = "qw-compare stack" if stack else "qw-compare"
    return (f'<div class="{cls}">'
            f'<section class="qw-pane qw-today" aria-label="{labels[0]}"><p class="qw-label">{labels[0]}</p>{today}</section>'
            f'<section class="qw-pane qw-proposed" aria-label="{labels[1]}"><p class="qw-label">{labels[1]}</p>{proposed}</section>'
            '</div>')


def note(n, text, query=False):
    kind = "Open question" if query else "Behaviour"
    cls = "wf-note query" if query else "wf-note"
    return f'<p class="{cls}" data-note="{n}"><span class="wf-note-label">{kind}</span>{text}</p>'


QWS = []


def qw(**k):
    QWS.append(k)


# --------------------------------------------------------------------------
# Saying what's true now
# --------------------------------------------------------------------------
qw(idea=2, concept=1, theme="now", nav="Who does what now", title="Who does what now",
   line="One page that says which enquiries now go to Thames Water and which stay with Tideway.",
   try_="Pick “There’s a smell near a shaft”, then “Noise from works near me”.",
   propose="A short page explaining the handover: what Tideway still does, what Thames Water now does, and who to contact for each kind of problem, with the right number shown as soon as someone picks their situation. Linked from Contact and the footer.",
   why="The Benefits Report story says operation of the tunnel “is transferred to Thames Water from Tideway”. About Us says Thames Water will operate the tunnel and Tideway will maintain it. Neither tells a resident who smells something near a shaft which number to ring, so the helpdesk will field calls it can no longer act on.",
   demo=cmp(
       """<div class="qw-site"><h3>Get in touch with us</h3><p>Whatever your query is about, we aim to find you the right answer or the right person to talk to as quickly and easily as possible.</p>
       <dl class="kv"><dt>24 hour helpdesk</dt><dd>08000 30 80 80</dd></dl>
       <div class="qw-faux-form"><span>Name *</span><span>Email Address *</span><span>Message *</span></div>
       <p class="qw-marker">No mention of Thames Water or the handover</p></div>""",
       """<div data-qw="who"><h3>Who looks after what now</h3><p>Thames Water now runs the tunnel day to day. Tideway still owns it, maintains it and is completing work at a few sites.</p>
       <div class="chooser"><div class="issue-list" data-issues></div><div class="route-card" data-route aria-live="polite"></div></div></div>"""),
   notes=[note(1, "Choosing a situation shows who handles it, how to reach them and how long a reply takes. Thames Water's number is a placeholder until it's agreed."),
          note(2, "Is this split right, in particular for odour from ventilation columns and for the new public spaces?", True)])

qw(idea=4, concept=1, theme="now", nav="Task links on the homepage", title="Task links on the homepage",
   line="Six links under the homepage hero for the jobs people come to do.",
   try_="Compare where “What’s happening near me?” sits on each homepage.",
   propose="A row of six task links straight under the hero: see the river results, visit a riverside space, check what's happening near me, report a problem, find a document and investors. Nothing else on the homepage needs to change.",
   why="The only task links on the homepage today are at the very foot, under the map and the modern slavery statement: Contact us, Find a document and What's happening near me?",
   demo=cmp(
       """<div class="qw-site"><div class="wf-placeholder qw-hero">Video: London's super sewer</div><div class="qw-text">Reconnecting London with the River Thames · counter · latest news · three feature tiles · map of sites · modern slavery statement</div>
       <div class="qw-footlinks"><b>Get in Touch</b><span>CONTACT US</span><span>FIND A DOCUMENT</span><span>WHAT'S HAPPENING NEAR ME?</span></div><p class="qw-marker">Task links only at the foot of the page</p></div>""",
       """<div class="qw-site"><div class="wf-placeholder qw-hero slim">Video: London's super sewer</div>
       <div class="tasks">
       <a class="task" href="river-health.html"><span class="wf-placeholder">Icon</span><span><strong>See how the river is doing</strong><span>Results and monthly updates</span></span></a>
       <a class="task" href="riverside.html"><span class="wf-placeholder">Icon</span><span><strong>Visit a riverside space</strong><span>Seven places along the Thames</span></span></a>
       <a class="task" href="near-me.html"><span class="wf-placeholder">Icon</span><span><strong>What's happening near me</strong><span>Sites and works by postcode</span></span></a>
       <a class="task" href="qw-01.html"><span class="wf-placeholder">Icon</span><span><strong>Report a problem</strong><span>Find out who to contact</span></span></a>
       <a class="task" href="documents.html"><span class="wf-placeholder">Icon</span><span><strong>Find a document</strong><span>Reports, plans and policies</span></span></a>
       <a class="task" href="documents.html?type=annual"><span class="wf-placeholder">Icon</span><span><strong>Investors</strong><span>Annual reports and contacts</span></span></a>
       </div><div class="qw-text">Counter · latest news · feature tiles · map of sites</div></div>""", stack=True),
   notes=[note(1, "The links point at existing pages, so this can go live before any of the bigger changes. Where a bigger change exists, the link points there instead.")])

qw(idea=5, concept=1, theme="now", nav="Search snippets", title="Search snippets that describe today",
   line="Titles, descriptions and share images written for a tunnel that's working.",
   try_="Switch between “Search result” and “Link preview” on both sides.",
   propose="Rewrite page titles and meta descriptions for the operating years, and give each section a photographic share image served over https, so the site reads correctly in search results and when a link is shared.",
   why="The homepage description in search results is “Tideway is building a 25km Super Sewer under the Thames to intercept those nasty spills…”. The share image is the logo, served over http.",
   demo="""<div data-qw="snip"><div class="seg" role="group" aria-label="View"><button type="button" aria-pressed="true" data-view="serp">Search result</button><button type="button" aria-pressed="false" data-view="card">Link preview</button></div>"""
        + cmp(
            """<div data-v="serp" class="serp"><div class="url">www.tideway.london</div><div class="ttl">Tideway | Reconnecting London with the River Thames</div><p>Tideway is building a 25km Super Sewer under the Thames to intercept those nasty spills and clean up our river for the good of London, its wildlife and you.</p></div>
            <div data-v="card" class="qw-share" hidden><div class="wf-placeholder logo">Tideway logo (http://…/logo.png)</div><b>Tideway | Reconnecting London with the River Thames</b><span>tideway.london</span></div>""",
            """<div data-v="serp" class="serp"><div class="url">www.tideway.london</div><div class="ttl">Tideway | London's super sewer is protecting the Thames</div><p>The London Tideway Tunnel cut sewage overflows to the tidal Thames by about 86% in its first full year. See the results, visit the new riverside and find out who to contact.</p></div>
            <div data-v="card" class="qw-share" hidden><div class="wf-placeholder ratio-16-9">Photo: the new riverside at Wapping</div><b>London's super sewer is protecting the Thames</b><span>tideway.london</span></div>""")
        + "</div>",
   notes=[note(1, "Titles and descriptions become editable fields on every page template, with sensible defaults, so editors can keep them current.")])

qw(idea=7, concept=1, theme="now", nav="One completion date", title="One completion date, told the same way everywhere",
   line="The same milestones on the homepage, The Tunnel and the Timeline.",
   try_="Switch the page in the proposed version and check the milestones stay the same.",
   propose="Agree one sequence of milestones (connected, capturing, fully operational, last riverside space opens, handover) and show it as the same strip on every page that talks about completion.",
   why="Three pages give three answers. The homepage counter footnote says the tunnel was “fully connected and operational in February, 2025” and counts from August 2024. The Tunnel page says the network was completed in May 2024, and also that “the system commissioning phase has now started”.",
   demo=cmp(
       """<ul class="qw-quotes"><li><span class="badge">Homepage</span><q>The tunnel was fully connected and operational in February, 2025.</q></li>
       <li><span class="badge">Homepage counter</span><q>into the London Tideway Tunnel system since August 2024.</q></li>
       <li><span class="badge">The Tunnel</span><q>In May 2024, the new super sewer was connected to the Lee Tunnel … completing the full ‘London Tideway Tunnel’ network.</q></li>
       <li><span class="badge">The Tunnel</span><q>the system commissioning phase has now started.</q></li></ul>""",
       """<div data-qw="dates"><div class="field"><label for="qw-page">Shown on</label><select id="qw-page"><option>Homepage</option><option>The Tunnel</option><option>Timeline</option></select></div>
       <ol class="milestones"><li><time>May 2024</time><p>Connected to the Lee Tunnel</p></li><li><time>Aug 2024</time><p>Begins capturing sewage</p></li><li><time>Feb 2025</time><p>Fully operational</p></li><li><time>Jul 2026</time><p>Last new riverside space opens</p></li><li class="now"><time>Oct 2026</time><p>Operation passes to Thames Water</p></li></ol>
       <p class="small muted" data-page-note></p></div>""", stack=True),
   notes=[note(1, "The strip is one shared content block, so changing a date changes it everywhere."),
          note(2, "Which dates are right? The first three come from different pages on the live site and need checking.", True)])

# --------------------------------------------------------------------------
# The numbers
# --------------------------------------------------------------------------
qw(idea=6, concept=1, theme="numbers", nav="Real number in the counter", title="The real number in the counter",
   line="22.2 million tonnes in the page itself, animated only when motion is welcome.",
   try_="Press “What a search engine reads” on each side, then replay the animation.",
   propose="Print the current figure in the page HTML and count up only when the counter scrolls into view and the visitor hasn't asked for reduced motion.",
   why="The counter's HTML reads “0 million tonnes” until a script animates it to 22.2 when it scrolls into view. Link previews, search engines and some screen readers can be left with the zero.",
   demo=cmp(
       """<div data-qw="counter" data-mode="today"><div class="counter"><b><span data-num>0</span> million tonnes</b><p>of sewage diverted from the River Thames*</p></div>
       <div class="row"><button type="button" class="btn btn-secondary btn-sm" data-replay>Scroll it into view</button><button type="button" class="btn btn-secondary btn-sm" data-read>What a search engine reads</button></div><p class="qw-read" data-out aria-live="polite"></p></div>""",
       """<div data-qw="counter" data-mode="proposed"><div class="counter"><b><span data-num>22.2</span> million tonnes</b><p>of sewage diverted from the River Thames since it was connected</p></div>
       <div class="row"><button type="button" class="btn btn-secondary btn-sm" data-replay>Replay the count</button><button type="button" class="btn btn-secondary btn-sm" data-read>What a search engine reads</button><label class="check"><input type="checkbox" data-reduce> Reduce motion</label></div><p class="qw-read" data-out aria-live="polite"></p></div>"""),
   notes=[note(1, "With reduced motion on, the number simply appears. The figure comes from the same monthly update as today.")])

qw(idea=12, concept=2, theme="numbers", nav="How we count this", title="How we count this, in plain English",
   line="A short explanation beside the counter, instead of a 13px footnote.",
   try_="Open “How we count this” under the proposed counter.",
   propose="A “How we count this” note beside the counter: what's measured, how often it's updated, what it doesn't include and who checks it, in plain English and at a readable size.",
   why="The counter's only explanation is an asterisked footnote at 13px, white on the sea-green panel, which is 3.14:1 and below the contrast needed for small text.",
   demo=cmp(
       """<div class="counter qw-sea"><b>22.2 million tonnes</b><p>of sewage diverted from the River Thames*</p><p class="qw-tiny">*into the London Tideway Tunnel system since August 2024. The tunnel was fully connected and operational in February, 2025. Data last updated 1/10/2026.</p></div>""",
       """<div><div class="counter"><b>22.2 million tonnes</b><p>of sewage diverted from the River Thames since it was connected</p></div>
       <div class="accordion"><div class="accordion-item"><button type="button" class="accordion-title">How we count this<span class="accordion-icon">&#9662;</span></button><div class="accordion-content">
       <p><b>What it measures.</b> The volume of combined sewage and rainwater diverted into the tunnel system instead of spilling into the river. One tonne is about one cubic metre.</p>
       <p><b>How often.</b> Updated once a month, on the first working day.</p>
       <p><b>What it leaves out.</b> Overflows not connected to the tunnel, and the non-tidal river upstream.</p>
       <p><b>Who checks it.</b> [Method and validation to confirm with Tideway.]</p></div></div></div></div>"""),
   notes=[note(1, "Closed by default so the counter stays clean; the text is in the page for search engines either way.")])

# --------------------------------------------------------------------------
# Neighbours and site pages
# --------------------------------------------------------------------------
qw(idea=37, concept=None, theme="sites", nav="Fix the server error", title="Fix the server error on Chambers Wharf",
   line="The site page prints a .NET exception where its content should be.",
   try_="Compare the middle of the two Chambers Wharf pages.",
   propose="Fix the missing partial view, check every site page for the same fault, and set the site so exceptions are logged rather than printed on public pages.",
   why="Part way down the Chambers Wharf page, between the accordions and the list of partners, the page prints “Block Exception:System.InvalidOperationException: The partial view 'blocksFolder' was not found…” followed by the server's file paths.",
   demo=cmp(
       """<div class="qw-site"><h3>Chambers Wharf</h3><p class="small">Works update · Our working hours · Community Liaison Working Group · Our commitments</p>
       <pre class="qw-exception">Block Exception:System.InvalidOperationException: The partial view 'blocksFolder' was not found or no view engine supports the searched locations. The following locations were searched: ~/Views/BTSitePage/blocksFolder.aspx ~/Views/BTSitePage/blocksFolder.ascx ~/Views/Shared/blocksFolder.aspx … at System.Web.Mvc.HtmlHelper.FindPartialView(…)</pre>
       <p class="small">Thames River Watch · Active Row · Thames Discovery Programme</p></div>""",
       """<div class="qw-site"><h3>Chambers Wharf</h3><p class="small">Works update · Our working hours · Community Liaison Working Group · Our commitments</p>
       <div class="panel surface"><h4>Our partners on the river</h4><p class="small">Thames River Watch · Active Row · Thames Discovery Programme · Creekside Discovery Centre · Active Thames</p></div></div>"""),
   notes=[note(1, "We'd check all 24 site pages and the main templates for the same error as part of the fix.")])

qw(idea=17, concept=3, theme="sites", nav="Liaison group record", title="A liaison group record you can scan",
   line="Meetings as a table, newest first, with the next date or a note that the group has closed.",
   try_="Find the most recent meeting's notes on each side.",
   propose="Show each Community Liaison Working Group as a short table: meeting date, notes and slides, newest first, with the next meeting date (or a line saying the group has finished) at the top.",
   why="On Chambers Wharf the record is one long run of dates and links. It opens “The last meeting was on 16 December 2025” and then lists “15 December 2025 presentation and notes”.",
   demo=cmp(
       """<p class="qw-run">The last meeting was on 16 December 2025. Notes and presentations from recent meetings can be viewed below: 15 December 2025 presentation and notes 16 June 2025 presentation and notes 11 February 2025 presentation and notes 4 November 2024 presentation and notes 2 July 2024 presentation and notes 26 March 2024 presentation and notes 14 November 2023 presentation, notes and December 2023 archaeology update presentation 5 June 2023 presentation and notes 21 November 2022 presentation and notes …</p>""",
       """<div><p><b>Next meeting:</b> [date to confirm, or “The group has now closed”]</p><div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">Meeting</th><th scope="col">Notes</th><th scope="col">Slides</th></tr></thead><tbody>
       <tr><td>15 Dec 2025</td><td><a href="#">Notes (PDF)</a></td><td><a href="#">Presentation (PDF)</a></td></tr>
       <tr><td>16 Jun 2025</td><td><a href="#">Notes (PDF)</a></td><td><a href="#">Presentation (PDF)</a></td></tr>
       <tr><td>11 Feb 2025</td><td><a href="#">Notes (PDF)</a></td><td><a href="#">Presentation (PDF)</a></td></tr>
       <tr><td>4 Nov 2024</td><td><a href="#">Notes (PDF)</a></td><td><a href="#">Presentation (PDF)</a></td></tr>
       <tr><td>14 Nov 2023</td><td><a href="#">Notes (PDF)</a></td><td><a href="#">Presentation (PDF)</a> · <a href="#">Archaeology update</a></td></tr>
       </tbody></table></div></div>"""),
   notes=[note(1, "Dates are the ones on the live page. The table is a reusable block for every site with a liaison group."),
          note(2, "Was the last meeting on the 15th or the 16th of December 2025?", True)])

qw(idea=29, concept=3, theme="sites", nav="Readable document names", title="Readable document names",
   line="Plain titles with type, size and date, instead of file names in capitals.",
   try_="Compare the two document lists.",
   propose="List site documents by a plain title, with the document type, format, size and date, across all site pages.",
   why="Chambers Wharf lists its seven planning documents as file names in capitals, such as “CODE OF CONSTRUCTION PRACTICE-PART A_CHAMBERS WHARF.PDF”, with no size or date.",
   demo=cmp(
       """<p><b>Important Site Documents - Chambers Wharf</b></p><ul class="qw-caps"><li>CODE OF CONSTRUCTION PRACTICE-PART A_CHAMBERS WHARF.PDF</li><li>CODE OF CONSTRUCTION PRACTICE-PART B_CHAMBERS WHARF.PDF</li><li>DESIGN AND ACCESS STATEMENT_CHAMBERS WHARF.PDF</li><li>PLANNING STATEMENT_CHAMBERS WHARF.PDF</li><li>PLANS REFERRED TO IN THE ORDER AS MADE_CHAMBERS WHARF.PDF</li><li>SITE PLAN_CHAMBERS WHARF.PDF</li><li>TRANSPORT ASSESSMENT_CHAMBERS WHARF.PDF</li></ul>""",
       """<ul class="doc-list">
       <li class="doc-item"><h3><a href="#">Code of Construction Practice, Part A</a></h3><div class="doc-meta"><span class="badge">Planning document</span><span>PDF, 2.1 MB</span><span>12 Sep 2014</span></div></li>
       <li class="doc-item"><h3><a href="#">Code of Construction Practice, Part B</a></h3><div class="doc-meta"><span class="badge">Planning document</span><span>PDF, 1.4 MB</span><span>12 Sep 2014</span></div></li>
       <li class="doc-item"><h3><a href="#">Design and Access Statement</a></h3><div class="doc-meta"><span class="badge">Planning document</span><span>PDF, 12.6 MB</span><span>12 Sep 2014</span></div></li>
       <li class="doc-item"><h3><a href="#">Transport Assessment</a></h3><div class="doc-meta"><span class="badge">Planning document</span><span>PDF, 3.3 MB</span><span>12 Sep 2014</span></div></li></ul>"""),
   notes=[note(1, "Sizes and dates are sample values. Titles, type and date become fields on each document in the CMS media library.")])

qw(idea=25, concept=4, theme="sites", nav="Tideway Prize page", title="A page for the Tideway Prize",
   line="How to enter, the key dates and a gallery, instead of a single news story.",
   try_="Switch the gallery between “Shortlist” and “Winners”.",
   propose="A prize page with how to enter, the dates and the judges, then a gallery that fills with the shortlist and winners as the prize runs.",
   why="The Tideway Prize photography competition was announced on 27 September 2026 as a news story. There is nowhere for entrants to come back to.",
   demo=cmp(
       """<div class="news-card qw-one"><div class="wf-placeholder ratio-16-9">Tideway Prize artwork</div><div class="body"><time>27/09/26</time><h3>Tideway launches new photography prize celebrating a new chapter for the River Thames</h3></div></div>""",
       """<div data-qw="prize"><h3>The Tideway Prize</h3><dl class="kv"><dt>Closing date</dt><dd>[to confirm]</dd><dt>Who can enter</dt><dd>[to confirm]</dd><dt>Judges</dt><dd>[to confirm]</dd></dl><p><a class="btn btn-sm" href="#">How to enter</a></p>
       <div class="seg" role="group" aria-label="Gallery"><button type="button" aria-pressed="true" data-set="short">Shortlist</button><button type="button" aria-pressed="false" data-set="win">Winners</button></div>
       <div class="qw-gallery" data-gallery="short"><div class="wf-placeholder ratio-1-1">Shortlisted photo</div><div class="wf-placeholder ratio-1-1">Shortlisted photo</div><div class="wf-placeholder ratio-1-1">Shortlisted photo</div></div>
       <div class="qw-gallery" data-gallery="win" hidden><p class="qw-empty">Winners are announced at the end of the prize. [Date to confirm]</p></div></div>"""),
   notes=[note(1, "Galleries are filled by editors as the prize runs. The news story links to this page.")])

# --------------------------------------------------------------------------
# Company facts and records
# --------------------------------------------------------------------------
qw(idea=28, concept=5, theme="records", nav="Annual reports in order", title="Annual reports in order and up to date",
   line="Every year, newest first, including 2023-24 to 2025-26.",
   try_="Find the latest annual report on each side.",
   propose="List every annual report newest first, add the three missing years, and show the same list on the Investors page.",
   why="The Tideway Annual Reports page lists 2019-20 first, then 2018-19 back to 2015-16, then 2020-21 to 2022-23. Nothing later appears, although the 2025-26 report was announced on 11 June 2026.",
   demo=cmp(
       """<ul class="qw-caps"><li>TIDEWAY ANNUAL REPORT 2019-20</li><li>TIDEWAY ANNUAL REPORT 2018-19</li><li>TIDEWAY ANNUAL REPORT 2017-18</li><li>TIDEWAY ANNUAL REPORT 2016-17</li><li>TIDEWAY ANNUAL REPORT 2015-16</li><li>TIDEWAY ANNUAL REPORT 2020-21</li><li>TIDEWAY ANNUAL REPORT 2021-22</li><li>TIDEWAY ANNUAL REPORT 2022-23</li></ul><p class="qw-marker">Nothing after 2022-23</p>""",
       """<div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">Year</th><th scope="col">File</th></tr></thead><tbody>
       <tr><th scope="row"><a href="#">2025-26</a></th><td>PDF</td></tr><tr><th scope="row"><a href="#">2024-25</a></th><td>PDF</td></tr><tr><th scope="row"><a href="#">2023-24</a></th><td>PDF</td></tr>
       <tr><th scope="row"><a href="#">2022-23</a></th><td>PDF</td></tr><tr><th scope="row"><a href="#">2021-22</a></th><td>PDF</td></tr><tr><th scope="row"><a href="#">2020-21</a></th><td>PDF</td></tr>
       <tr><td colspan="2" class="muted">2015-16 to 2019-20 also available</td></tr></tbody></table></div><p class="small muted">The same list appears on the Investors page.</p>"""),
   notes=[note(1, "New reports are added once, as a document with a year, and sort themselves.")])

qw(idea=32, concept=None, theme="records", nav="About Us up to date", title="Bring About Us up to date",
   line="Present-tense copy and one set of checked figures.",
   try_="Press “Show what’s changed”.",
   propose="Rewrite About Us for the operating years and check every figure with Tideway. The facts then live in one place that About Us, Corporate Info and the press pages all use.",
   why="About Us still says “construction is now underway at each of our 24 sites” and that the project is “anticipated to be completed in 2025”. It says “more than two million pensioners” and later “Three million pensioners”, and that Thames Water supplies “around 2.6 million litres of tap water” a day, where Thames Water's own figure is 2.6 billion.",
   demo="""<div data-qw="diff"><button type="button" class="btn btn-secondary btn-sm" data-diff aria-pressed="false">Show what's changed</button>"""
        + cmp(
            """<p>Preparatory work on the project began in 2015 and <mark>construction is now underway at each of our 24 sites in London. The project is anticipated to be completed in 2025.</mark></p>
            <p>… and <mark>more than two million pensioners</mark> have an indirect investment in Tideway … <mark>Three million pensioners</mark> have an indirect investment in Tideway …</p>
            <p>Every day, it supplies <mark>around 2.6 million litres</mark> of tap water to nine million customers.</p>""",
            """<p>Construction began in 2015 and finished in [year]. <mark>The London Tideway Tunnel has been fully operational since [date], and Thames Water now operates it.</mark></p>
            <p><mark>[Two or three] million pensioners</mark> have an indirect investment in Tideway through UK pension funds managed by its investors.</p>
            <p>Every day, Thames Water supplies <mark>around 2.6 billion litres</mark> of tap water to [number] customers.</p>""")
        + "</div>",
   notes=[note(1, "Figures in brackets need Tideway to confirm before the page goes live."),
          note(2, "Two million or three million pensioners, and who are the current shareholders?", True)])

qw(idea=33, concept=None, theme="records", nav="Corporate Info", title="Corporate Info that agrees with About Us",
   line="One company summary used on both pages.",
   try_="Switch between the two pages in the proposed version.",
   propose="One company summary block, written once in the past tense for construction and the present tense for operation, used on both About Us and Corporate Info.",
   why="Corporate Info repeats About Us almost word for word but ends “Work is anticipated to be completed by 2024”, where About Us says 2025. Both still describe the delivery partners as “being delivered”.",
   demo=cmp(
       """<div class="qw-two"><div class="panel surface"><h4>About Us</h4><p>… The project is anticipated to be completed in <mark>2025</mark>.</p></div><div class="panel surface"><h4>Corporate Info</h4><p>… Work is anticipated to be completed by <mark>2024</mark>.</p></div></div>""",
       """<div data-qw="shared"><div class="seg" role="group" aria-label="Page"><button type="button" aria-pressed="true" data-page="About Us">About Us</button><button type="button" aria-pressed="false" data-page="Corporate Info">Corporate Info</button></div>
       <div class="panel"><h4 data-page-title>About Us</h4><p class="qw-shared">The tunnel was built between 2015 and [year] by three joint ventures, Tideway West, Central and East, with Amey providing systems integration. It has been fully operational since [date]. Thames Water now runs it; Tideway owns and maintains it.</p><p class="small muted">Shared company summary · edited in one place</p></div></div>"""),
   notes=[note(1, "The summary is one shared content block; each page can add its own material around it.")])

qw(idea=35, concept=None, theme="records", nav="Expired vacancies", title="No more expired vacancies",
   line="Closed roles come down by themselves, with a job alert in their place.",
   try_="Sign up for job alerts in the proposed version.",
   propose="Give each vacancy a closing date that takes it off the page automatically. When there are none, say so and offer a job alert.",
   why="Our People lists a Senior Asset Manager role with “Applications won't be taken after 05/09/2025”. The award cited above it is from 2021.",
   demo=cmp(
       """<div><h4>Current jobs and opportunities</h4><p>Please submit your CV and statement of interest to resourceteam@tideway.london</p><p><mark>Applications won't be taken after 05/09/2025</mark></p><p><b>Senior Asset Manager</b></p></div>""",
       """<div data-qw="alert"><h4>Current jobs and opportunities</h4><p>There are no vacancies at the moment. Get an email when we advertise one.</p>
       <form novalidate class="lookup" data-alert-form><div class="field"><label for="qw-job-email">Email address</label><input type="email" id="qw-job-email" required autocomplete="email"><span class="field-error" hidden>Enter an email address, like name@example.com</span></div><button class="btn" type="submit">Get job alerts</button></form>
       <p data-alert-done hidden><b>Done.</b> We'll email you when a role is advertised. You can unsubscribe from any message.</p></div>"""),
   notes=[note(1, "The alert can be a simple list in the CMS or the recruitment system Tideway already uses.")])

# --------------------------------------------------------------------------
# Accessibility and housekeeping
# --------------------------------------------------------------------------
qw(idea=38, concept=None, theme="fix", nav="Main headings", title="A main heading on every page",
   line="One H1 per page, so screen readers and search engines know what the page is.",
   try_="Compare the two heading outlines.",
   propose="Give every page template one H1, with the headings below it in order.",
   why="The homepage and the Chambers Wharf page have no H1. Their first headings are H2s, or text set in the hero.",
   demo=cmp(
       """<ol class="qw-outline"><li class="h2">H2 Reconnecting London with the River Thames</li><li class="h2">H2 London's super sewer is now protecting the river from pollution.</li><li class="h3">H3 Latest News</li><li class="h3">H3 Tideway's commitment on modern slavery</li></ol><p class="qw-marker">No H1 on the page</p>""",
       """<ol class="qw-outline"><li class="h1">H1 London's super sewer is protecting the Thames</li><li class="h2">H2 2025, the first full year</li><li class="h2">H2 What would you like to do?</li><li class="h2">H2 Latest news</li><li class="h3">H3 New report reveals positive impact…</li></ol>"""),
   notes=[note(1, "A template change rather than a content change, so it fixes every page that uses the template.")])

qw(idea=40, concept=None, theme="fix", nav="Reject all cookies", title="A cookie banner with “Reject all”",
   line="Rejecting non-essential cookies as easy as accepting them.",
   try_="Press “Reject all” on the proposed banner.",
   propose="Add “Reject all” to the first layer of the cookie banner, at the same size and weight as “Accept all”.",
   why="The banner's first layer offers “Cookies Settings” and “Accept All Cookies”. The ICO expects rejecting to be as easy as accepting.",
   demo=cmp(
       """<div class="qw-cookie"><p>By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.</p><div class="row"><button type="button" class="btn btn-secondary btn-sm" disabled>Cookies Settings</button><button type="button" class="btn btn-sm" disabled>Accept All Cookies</button></div></div>""",
       """<div class="qw-cookie" data-qw="cookie"><p>We use essential cookies to make the site work. With your agreement we'd also use analytics cookies to see how the site is used. <a href="#">Cookie policy</a></p><div class="row"><button type="button" class="btn btn-secondary btn-sm" data-c="custom">Customise</button><button type="button" class="btn btn-sm" data-c="reject">Reject all</button><button type="button" class="btn btn-sm" data-c="accept">Accept all</button></div><p data-c-out aria-live="polite" class="small"></p></div>"""),
   notes=[note(1, "A setting in OneTrust rather than a build, plus a review of the banner wording.")])

qw(idea=41, concept=None, theme="fix", nav="Teal that passes contrast", title="Teal text that passes contrast",
   line="A deeper teal for small text and links; the brand teal stays for headings and fills.",
   try_="Compare the small labels and links on white and on grey.",
   propose="Use a deeper teal, #00796A (5.33:1 on white), for teal text below 19px bold and anywhere on grey. Keep Tideway teal for large headings, buttons and fills, where it already passes.",
   why="Tideway teal, #00A88F, is 3.0:1 on white and 2.75:1 on the light grey. That is fine for the 22px Cubano headings but fails for smaller teal labels and links.",
   demo=cmp(
       """<div class="qw-swatch"><p class="qw-teal-old">Read the Benefits Report <span class="badge">3.0:1</span></p><p class="qw-teal-old on-grey">More news <span class="badge">2.75:1</span></p></div>""",
       """<div class="qw-swatch"><p class="qw-teal-new">Read the Benefits Report <span class="badge">5.33:1</span></p><p class="qw-teal-new on-grey">More news <span class="badge">4.89:1</span></p></div>"""),
   notes=[note(1, "A stylesheet change. Large headings and buttons keep the brand teal.")])

qw(idea=42, concept=None, theme="fix", nav="Share links", title="Share links that work",
   line="https addresses, and no old agency account in the X share.",
   try_="Copy the proposed share link.",
   propose="Build share links from the page's https address, drop the “via=researchIP” account from the X share (or replace it with Tideway's), and confirm which channels Tideway still uses.",
   why="Share links on the document library pages use http:// addresses, and the X/Twitter share adds “via=researchIP”, which looks like an old agency account.",
   demo=cmp(
       """<div class="qw-code"><p class="small">X share link</p><pre>twitter.com/intent/tweet?text=Document Library http://www.tideway.london/contact-us/document-library/&amp;via=researchIP</pre></div>""",
       """<div class="qw-code" data-qw="copy"><p class="small">X share link</p><pre data-copy-text>https://x.com/intent/post?text=Document%20Library&amp;url=https://www.tideway.london/contact-us/document-library/</pre><button type="button" class="btn btn-secondary btn-sm" data-copy>Copy link</button><p class="small" data-copy-out aria-live="polite"></p></div>"""),
   notes=[note(1, "Is X still a channel Tideway uses? The footer and site pages link to it.", True)])

qw(idea=44, concept=None, theme="fix", nav="Proofreading pass", title="A proofreading pass",
   line="Typos, “click here” links, run-together tags and numeric dates.",
   try_="Press “Show what’s changed”.",
   propose="Correct the errors we found, write link text that says where it goes, separate tags, and write dates as 12 Oct 2026. Then run one spelling and style check across the site.",
   why="The Tunnel says “protecting the river and it's wildlife”. The homepage says “Click here for our full statement.” News cards run tags together (“EnvironmentPlacePeopleLegacyWestCentralEast”) and use dates like 12/10/26.",
   demo="""<div data-qw="diff"><button type="button" class="btn btn-secondary btn-sm" data-diff aria-pressed="false">Show what's changed</button>"""
        + cmp(
            """<ul class="qw-list"><li>protecting the river and <mark>it's</mark> wildlife</li><li><mark>Click here</mark> for our full statement.</li><li><mark>EnvironmentPlacePeopleLegacyWestCentralEast</mark></li><li><mark>12/10/26</mark></li></ul>""",
            """<ul class="qw-list"><li>protecting the river and <mark>its</mark> wildlife</li><li><mark>Read our modern slavery statement 2025 (PDF)</mark></li><li><mark><span class="tag">Environment</span> <span class="tag">Place</span> <span class="tag">People</span></mark></li><li><mark>12 Oct 2026</mark></li></ul>""")
        + "</div>",
   notes=[note(1, "These are the ones we noticed. A full pass would cover every page.")])

qw(idea=45, concept=None, theme="fix", nav="Broken requests", title="Clear the broken requests",
   line="No more requests for missing files, and a monthly check that catches new ones.",
   try_="Compare the two lists of failed requests.",
   propose="Remove the reference to the missing file and set up a monthly broken-link and missing-file check across the site.",
   why="Every homepage load asks the server for an image at /nothing.jpg, which doesn't exist.",
   demo=cmp(
       """<table class="data-table"><thead><tr><th scope="col">Request</th><th scope="col">Result</th></tr></thead><tbody><tr><td>/dist/css/style.css</td><td>200</td></tr><tr><td><mark>/nothing.jpg</mark></td><td><mark>Not found</mark></td></tr><tr><td>/dist/images/logo.svg</td><td>200</td></tr></tbody></table>""",
       """<div><table class="data-table"><thead><tr><th scope="col">Request</th><th scope="col">Result</th></tr></thead><tbody><tr><td>/dist/css/style.css</td><td>200</td></tr><tr><td>/dist/images/logo.svg</td><td>200</td></tr></tbody></table>
       <p class="small muted">Monthly check: 0 broken links, 0 missing files (sample report)</p></div>"""),
   notes=[note(1, "A small fix in the homepage template, plus a scheduled crawl.")])


# --------------------------------------------------------------------------
# Writers
# --------------------------------------------------------------------------
PAGE = """<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QW{n} {title} – Tideway quick win</title>
  <link rel="stylesheet" href="~/css/base.css">
  <link rel="stylesheet" href="~/css/components.css">
  <link rel="stylesheet" href="~/css/theme.css">
</head>
<body class="qw-page">
  <!-- @@include header.html -->

  <main id="main" class="flush">
    <aside class="proposal" aria-label="About this quick win">
      <div class="container">
        <p class="proposal-eyebrow">Quick win {n} of {total} · {title}</p>
        <div class="proposal-grid">
          <div><h2>What we're proposing</h2><p>{propose}</p></div>
          <div><h2>Why</h2><p>{why}</p></div>
        </div>{foot}
      </div>
    </aside>

    <!-- QW{n}, idea I{idea:02d} -->
    <div class="page-head qw-head">
      <div class="container"><span class="eyebrow">Quick win {n}</span><h1>{title}</h1><p class="lead">{line}</p></div>
    </div>
    <div class="container qw-body">
      <p class="qw-try"><strong>Try:</strong> {try_}</p>
      {demo}
      {notes}
    </div>
  </main>

  <!-- @@include footer.html -->
  <script src="~/js/data.js"></script>
  <script src="~/js/wireframe.js"></script>
  <script src="~/js/quickwins.js"></script>
  <script src="~/js/photos.js"></script>
</body>
</html>
"""


def main():
    total = len(QWS)
    links = []
    for i, q in enumerate(QWS, 1):
        q["n"] = i
        f = f"qw-{i:02d}"
        q["file"] = f
        foot = ""
        if q.get("concept"):
            foot = f'\n        <p class="proposal-foot">Also part of big improvement {q["concept"]}. It can be made on its own, without the rest of that improvement.</p>'
        html = PAGE.format(n=i, total=total, title=q["title"], idea=q["idea"], line=q["line"], try_=q["try_"],
                           propose=q["propose"], why=q["why"], demo=q["demo"],
                           notes="\n      ".join(q.get("notes", [])), foot=foot)
        (SRC / "pages" / f"{f}.html").write_text(html, encoding="utf-8")
        links.append(f'          <li><a href="~/pages/{f}.html" data-proto="{f}">QW{i} {q["nav"]}</a></li>')
    (SRC / "includes" / "qw-links.html").write_text("\n".join(links) + "\n", encoding="utf-8")

    groups = []
    for key, label in THEMES:
        cards = []
        for q in [x for x in QWS if x["theme"] == key]:
            cards.append(
                f'<li class="qw-card"><span class="qw-num">QW{q["n"]}</span>'
                f'<h3><a href="~/pages/{q["file"]}.html">{q["title"]}</a></h3><p>{q["line"]}</p>'
                f'<p class="proto-try"><strong>Try:</strong> {q["try_"]}</p>'
                f'<a class="btn btn-secondary btn-sm" href="~/pages/{q["file"]}.html">Open</a></li>')
        groups.append(f'<section class="qw-theme" aria-labelledby="t-{key}"><h2 class="hub-h2" id="t-{key}">{label}</h2><ol class="qw-cards">{"".join(cards)}</ol></section>')
    overview = f"""<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tideway prototypes – quick wins</title>
  <link rel="stylesheet" href="~/css/base.css">
  <link rel="stylesheet" href="~/css/components.css">
  <link rel="stylesheet" href="~/css/theme.css">
</head>
<body class="hub">
  <!-- @@include header.html -->

  <!-- Quick wins overview (R09) -->
  <div class="hub-hero">
    <div class="container">
      <div class="hub-brand"><span class="wf-placeholder logo">Tideway logo</span></div>
      <h1>{total} quick wins for tideway.london</h1>
      <p class="lead">Smaller changes that can each be made on their own, without any of the five big improvements. Each one has its own page showing just that change, with today's version beside the proposed one.</p>
    </div>
  </div>

  <main id="main">
    <div class="container">
      {"".join(groups)}
      <section class="hub-notes" aria-labelledby="review-title">
        <div>
          <h2 class="hub-h2" id="review-title">How to review</h2>
          <ul>
            <li>"Today" is rebuilt from what we saw on the live site; "Proposed" is the change. Everything else is kept the same, so the difference is the change itself.</li>
            <li>Use <strong>Quick win</strong> in the bar at the top to jump to any of them, or the previous and next links at the foot of each page.</li>
            <li>Switch <strong>Notes on</strong> to see what each quick win proposes and why, with notes on behaviour and open questions for Tideway.</li>
            <li>{sum(1 for x in QWS if x.get("concept"))} of these also appear inside the five <a href="~/index.html">big improvements</a>. Here each one stands alone, so they can be chosen separately.</li>
          </ul>
        </div>
      </section>
    </div>
  </main>

  <!-- @@include footer.html -->
  <script src="~/js/data.js"></script>
  <script src="~/js/wireframe.js"></script>
  <script src="~/js/photos.js"></script>
</body>
</html>
"""
    (SRC / "quick-wins.html").write_text(overview, encoding="utf-8")
    # Titles for the proposal, so names stay identical
    data = [{"qw": q["n"], "idea": q["idea"], "concept": q.get("concept"), "theme": dict(THEMES)[q["theme"]],
             "title": q["title"], "line": q["line"], "file": q["file"]} for q in QWS]
    (ROOT / "tools" / "quick_wins.json").write_text(json.dumps(data, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {total} quick wins")


if __name__ == "__main__":
    main()
