/* ==========================================================================
   tideway.js: behaviour for the five Tideway prototypes.
   Driven by ids and data attributes on the pages; data comes from data.js.
   Shared helpers (param, toast, validateForm) come from wireframe.js via WF.
   ========================================================================== */

(function () {
  'use strict';

  var WF = window.WF;
  var $ = WF.$, $all = WF.$all, param = WF.param, toast = WF.toast;
  var SITES = window.TW_SITES || [];
  var STATUS = window.TW_STATUS || {};
  var fmtDate = window.TW_DATE;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function siteById(id) { for (var i = 0; i < SITES.length; i++) { if (SITES[i].id === id) return SITES[i]; } return null; }
  function spaceById(id) { var s = window.TW_SPACES || []; for (var i = 0; i < s.length; i++) { if (s[i].id === id) return s[i]; } return null; }
  function reduceMotion() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

  /* Place a lat/lng inside a map placeholder, as percentages of its box. */
  var BOUNDS = { n: 51.545, s: 51.440, w: -0.285, e: 0.100 };
  function pos(lat, lng) {
    return { x: ((lng - BOUNDS.w) / (BOUNDS.e - BOUNDS.w)) * 100, y: ((BOUNDS.n - lat) / (BOUNDS.n - BOUNDS.s)) * 100 };
  }
  function km(a, b) {
    var R = 6371, toR = Math.PI / 180;
    var dLat = (b[0] - a[0]) * toR, dLng = (b[1] - a[1]) * toR;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[0] * toR) * Math.cos(b[0] * toR) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  /* Draw the river through the riverside sites, west to east, so pins and line agree. */
  function drawRiver(canvas) {
    var path = canvas && canvas.querySelector('.river-line path');
    if (!path) return;
    var skip = { 'acton-storm-tanks': 1, 'abbey-mills-pumping-station': 1, 'king-georges-park': 1, 'dormay-street': 1, 'bekesbourne-street': 1, 'deptford-church-street': 1 };
    var pts = SITES.filter(function (x) { return !skip[x.id]; }).map(function (x) { var p = pos(x.lat, x.lng); return p.x.toFixed(1) + ' ' + p.y.toFixed(1); });
    path.setAttribute('d', 'M' + pts.join(' L'));
  }

  /* --- Counter: real figure in the HTML, count up only if motion is OK (R05, R12) */
  function initCounter() {
    $all('[data-count-to]').forEach(function (el) {
      var to = parseFloat(el.getAttribute('data-count-to'));
      if (reduceMotion() || !('IntersectionObserver' in window)) return;
      var done = false;
      var io = new IntersectionObserver(function (entries) {
        if (done || !entries[0].isIntersecting) return;
        done = true;
        var start = null;
        function step(t) {
          if (!start) start = t;
          var p = Math.min(1, (t - start) / 1200);
          el.textContent = (to * p).toFixed(1);
          if (p < 1) window.requestAnimationFrame(step); else el.textContent = to.toFixed(1);
        }
        window.requestAnimationFrame(step);
      });
      io.observe(el);
    });
  }

  /* --- Prototype 1: who does what (R15) -------------------------------- */
  var ISSUES = [
    { id: 'odour', q: 'There’s a smell near a Tideway site or shaft', owner: 'tm', who: 'Thames Water', why: 'Thames Water now operates the tunnel and its ventilation, so odour reports go to them.', how: ['Thames Water: [number to confirm]', 'Online: thameswater.co.uk › Report a problem'], time: 'Thames Water’s published response times apply.' },
    { id: 'discharge', q: 'I’ve seen sewage going into the river', owner: 'tm', who: 'Thames Water and the Environment Agency', why: 'Overflows are part of Thames Water’s network. The Environment Agency regulates discharges and wants to hear about pollution.', how: ['Environment Agency incident hotline: 0800 80 70 60 (24 hours)', 'Thames Water: [number to confirm]', 'Check live status on Thames Water’s storm discharge map'], time: 'Report it straight away, with a photo and location if you can.' },
    { id: 'works', q: 'Noise, lorries or disruption from works near me', owner: 'tw', who: 'Tideway', why: 'A few sites still have finishing works and landscaping. Tideway manages these until each site is complete.', how: ['Tideway helpdesk: 08000 30 80 80 (24 hours)', 'helpdesk@tideway.london'], time: 'We aim to reply within five working days, and always within ten.', link: 'contact.html?topic=works', linkText: 'Report a problem with works' },
    { id: 'damage', q: 'Damage to my property from construction', owner: 'tw', who: 'Tideway', why: 'Claims arising from construction are handled through Tideway’s compensation programme and the Independent Compensation Panel.', how: ['Tideway helpdesk: 08000 30 80 80', 'Freepost TIDEWAY'], time: 'We’ll explain the process and the evidence needed when you contact us.', link: 'contact.html?topic=compensation', linkText: 'Start a compensation enquiry' },
    { id: 'space', q: 'Litter, damage or a problem in a new riverside space', owner: 'other', who: '[Landowner or council to confirm, by space]', why: 'The new public spaces are open and looked after day to day by the landowner or local council.', how: ['Contact details shown on each space’s page'], time: '', link: 'riverside.html', linkText: 'Find the space' },
    { id: 'media', q: 'I’m a journalist', owner: 'tw', who: 'Tideway press office', why: 'For interviews, images and figures about the tunnel and its results.', how: ['Media centre, Monday to Friday 9am to 5pm', 'Urgent media calls out of hours: 08000 30 80 80'], time: '' },
    { id: 'investor', q: 'I’m an investor or bondholder', owner: 'tw', who: 'Tideway investor relations', why: 'Tideway continues to finance and own the tunnel.', how: ['investor.relations@tideway.london'], time: '', link: 'documents.html?type=annual', linkText: 'Annual reports' }
  ];
  function ownerBadge(o) { return o === 'tw' ? '<span class="owner tw">Tideway</span>' : o === 'tm' ? '<span class="owner">Thames Water</span>' : '<span class="owner">Someone else</span>'; }
  function initWho() {
    var host = $('#issue-list');
    if (!host) return;
    var out = $('#route-card');
    var compact = host.hasAttribute('data-compact');
    var list = compact ? ISSUES.slice(0, 4) : ISSUES;
    host.innerHTML = list.map(function (i) { return '<button type="button" aria-pressed="false" data-issue="' + i.id + '">' + esc(i.q) + '</button>'; }).join('');
    function show(id) {
      var i = null; ISSUES.forEach(function (x) { if (x.id === id) i = x; });
      if (!i) return;
      $all('[data-issue]', host).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-issue') === id ? 'true' : 'false'); });
      out.innerHTML = '<div>' + ownerBadge(i.owner) + '</div><h3>' + esc(i.who) + '</h3><p>' + esc(i.why) + '</p>' +
        '<div class="contact-lines">' + i.how.map(function (h) { return '<span>' + esc(h) + '</span>'; }).join('') + '</div>' +
        (i.time ? '<p class="muted">' + esc(i.time) + '</p>' : '') +
        (i.link ? '<p><a class="btn btn-sm" href="' + i.link + '">' + esc(i.linkText) + '</a></p>' : '');
    }
    host.addEventListener('click', function (e) { var b = e.target.closest('[data-issue]'); if (b) show(b.getAttribute('data-issue')); });
    show(param('issue') || list[0].id);
  }

  /* --- Prototype 2: rain step-through (R21) ----------------------------- */
  function initRain() {
    var app = $('#rain-app');
    if (!app) return;
    var steps = $all('.rain-stage [data-rain-step]', app);
    var copies = $all('.rain-copy [data-rain-step]', app);
    var dots = $('.rain-dots', app);
    var i = 0;
    dots.innerHTML = steps.map(function (_, n) { return '<button type="button" aria-label="Step ' + (n + 1) + '">' + (n + 1) + '</button>'; }).join('');
    function go(n) {
      i = Math.max(0, Math.min(steps.length - 1, n));
      steps.forEach(function (s, k) { s.hidden = k !== i; });
      copies.forEach(function (s, k) { s.hidden = k !== i; });
      $all('button', dots).forEach(function (b, k) { if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      $('[data-rain="prev"]', app).disabled = i === 0;
      $('[data-rain="next"]', app).disabled = i === steps.length - 1;
      $('#rain-label').textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
    }
    $all('button', dots).forEach(function (b, k) { b.addEventListener('click', function () { go(k); }); });
    $('[data-rain="prev"]', app).addEventListener('click', function () { go(i - 1); });
    $('[data-rain="next"]', app).addEventListener('click', function () { go(i + 1); });
    app.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); });
    go(0);
  }

  /* --- Prototype 2: monthly update (R24) -------------------------------- */
  function initMonths() {
    var host = $('#months');
    if (!host) return;
    var months = window.TW_MONTHS || [];
    var tabs = $('#month-tabs');
    tabs.innerHTML = months.map(function (m, k) { return '<button type="button" class="tab' + (k === 0 ? ' active' : '') + '" data-month="' + m.id + '">' + esc(m.label) + '</button>'; }).join('');
    function show(id) {
      var m = null; months.forEach(function (x) { if (x.id === id) m = x; });
      $all('[data-month]', tabs).forEach(function (t) { t.classList.toggle('active', t.getAttribute('data-month') === id); t.setAttribute('aria-selected', t.getAttribute('data-month') === id ? 'true' : 'false'); });
      host.innerHTML = '<div class="key-strip"><div><b>' + m.rain + 'mm</b><span>Rainfall (sample)</span></div><div><b>' + m.storms + '</b><span>Storms the tunnel took</span></div><div><b>' + m.volume.toFixed(2) + 'm m³</b><span>Volume captured</span></div><div><b>' + m.spills + '</b><span>Discharges at connection points</span></div></div><p style="margin-top:1rem">' + esc(m.note) + '</p>';
    }
    tabs.addEventListener('click', function (e) { var b = e.target.closest('[data-month]'); if (b) show(b.getAttribute('data-month')); });
    show(months[0].id);
  }

  /* --- Prototype 2: overflow list (R22) --------------------------------- */
  function initOverflows() {
    var body = $('#overflow-body');
    if (!body) return;
    var cap = window.TW_CAPTURE || {};
    var rows = SITES.filter(function (s) { return cap[s.id]; }).map(function (s) { return { s: s, vol: cap[s.id][0], storms: cap[s.id][1], order: SITES.indexOf(s) }; });
    var state = { stretch: 'all', sort: 'route' };
    function render() {
      var list = rows.filter(function (r) { return state.stretch === 'all' || r.s.stretch === state.stretch; });
      list.sort(function (a, b) { return state.sort === 'volume' ? b.vol - a.vol : a.order - b.order; });
      body.innerHTML = list.map(function (r) {
        return '<tr><th scope="row"><a href="overflow.html?site=' + r.s.id + '">' + esc(r.s.name) + '</a></th><td>' + esc(r.s.borough.replace('London Borough of ', '').replace('Royal Borough of ', '')) + '</td><td class="num">' + r.storms + '</td><td class="num">' + r.vol.toFixed(1) + '</td></tr>';
      }).join('');
      $('#overflow-count').textContent = list.length + ' connection points';
    }
    $all('[data-stretch]').forEach(function (c) {
      c.addEventListener('click', function () {
        state.stretch = c.getAttribute('data-stretch');
        $all('[data-stretch]').forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        render();
      });
    });
    var sortSel = $('#overflow-sort');
    sortSel.addEventListener('change', function () { state.sort = sortSel.value; render(); });
    render();
  }

  /* --- Prototype 2: overflow detail (R23) ------------------------------- */
  function initOverflow() {
    var app = $('#overflow-app');
    if (!app) return;
    var cap = window.TW_CAPTURE || {};
    var s = siteById(param('site') || '') || siteById('chambers-wharf');
    var c = cap[s.id] || [0.5, 5];
    $all('[data-site-name]').forEach(function (el) { el.textContent = s.name; });
    $('#ov-borough').textContent = s.borough;
    $('#ov-vol').textContent = c[0].toFixed(1) + 'm m³';
    $('#ov-storms').textContent = c[1];
    $('#ov-site-link').setAttribute('href', 'site.html?site=' + s.id);
    /* Sample monthly split: the 12 months to September 2026. */
    var weights = [0.12, 0.10, 0.08, 0.05, 0.04, 0.06, 0.03, 0.02, 0.05, 0.11, 0.16, 0.18];
    var labels = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    var max = Math.max.apply(null, weights);
    $('#ov-chart').innerHTML = weights.map(function (w, k) {
      var v = c[0] * w * 1000;
      return '<div style="height:' + Math.round((w / max) * 100) + '%" title="' + labels[k] + ': ' + Math.round(v) + ' thousand m³"><span>' + Math.round(v) + '</span></div>';
    }).join('');
    $('#ov-axis').innerHTML = labels.map(function (l) { return '<span>' + l + '</span>'; }).join('');
  }

  /* --- Prototype 3: near me (R30–R32) ----------------------------------- */
  function initNearMe() {
    var app = $('#nearme-app');
    if (!app) return;
    var list = $('#nm-list'), map = $('#nm-map'), msg = $('#nm-msg');
    var state = { origin: null, label: '', status: 'all', selected: null };
    var canvas = $('.map-canvas', app);
    drawRiver(canvas);

    /* Pins */
    SITES.forEach(function (s) {
      var p = pos(s.lat, s.lng);
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'map-pin'; b.setAttribute('aria-pressed', 'false');
      b.setAttribute('data-pin', s.id);
      b.style.left = p.x + '%'; b.style.top = p.y + '%';
      b.textContent = (SITES.indexOf(s) + 1);
      b.setAttribute('aria-label', s.name);
      b.addEventListener('click', function () { select(s.id, true); });
      canvas.appendChild(b);
    });
    var you = document.createElement('span');
    you.className = 'poi home'; you.textContent = 'You'; you.hidden = true;
    canvas.appendChild(you);

    function select(id, scroll) {
      state.selected = id;
      $all('[data-pin]', canvas).forEach(function (p) { p.setAttribute('aria-pressed', p.getAttribute('data-pin') === id ? 'true' : 'false'); });
      $all('.site-result', list).forEach(function (r) { r.classList.toggle('selected', r.getAttribute('data-id') === id); });
      var row = $('.site-result[data-id="' + id + '"]', list);
      if (row && scroll) { row.scrollIntoView({ block: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' }); }
    }

    function render() {
      var rows = SITES.map(function (s) { return { s: s, d: state.origin ? km(state.origin, [s.lat, s.lng]) : null }; })
        .filter(function (r) { return state.status === 'all' || r.s.status === state.status; });
      if (state.origin) rows.sort(function (a, b) { return a.d - b.d; });
      list.innerHTML = rows.map(function (r) {
        var st = STATUS[r.s.status];
        var spaceLink = r.s.space ? ' <a class="btn btn-sm btn-secondary" href="space.html?space=' + r.s.space + '">Visit the space</a>' : '';
        return '<article class="site-result" data-id="' + r.s.id + '"><h3><a href="site.html?site=' + r.s.id + '">' + esc(r.s.name) + '</a></h3>' +
          '<span class="dist">' + (r.d !== null ? (r.d < 1 ? Math.round(r.d * 1000) + ' m' : r.d.toFixed(1) + ' km') : '') + '</span>' +
          '<p>' + esc(r.s.borough) + '</p><div class="row"><span class="badge' + (r.s.status === 'works' ? ' solid' : '') + '">' + st.label + '</span>' + spaceLink + '</div></article>';
      }).join('') || '<div class="empty-state"><p>No sites match this filter.</p></div>';
      $all('[data-pin]', canvas).forEach(function (p) {
        var s = siteById(p.getAttribute('data-pin'));
        p.classList.toggle('dim', state.status !== 'all' && s.status !== state.status);
      });
      $('#nm-count').textContent = rows.length + (rows.length === 1 ? ' site' : ' sites') + (state.origin ? ', nearest first from ' + state.label : ', west to east');
      if (state.origin && rows.length) select(rows[0].s.id, false);
    }

    function lookup(raw) {
      var pc = raw.toUpperCase().replace(/\s+/g, '');
      var out = pc.length > 4 ? pc.slice(0, -3) : pc;
      var c = window.TW_POSTCODES[out] || window.TW_POSTCODES[out.replace(/[A-Z]$/, '')];
      var field = $('#nm-postcode').closest('.field');
      if (!c) {
        field.classList.add('has-error');
        msg.hidden = false;
        msg.textContent = 'We couldn’t find “' + raw + '”. In this prototype, try a district near the river such as SE16, E1W, SW11, SW15, W6 or SE10.';
        return;
      }
      field.classList.remove('has-error');
      msg.hidden = true;
      state.origin = c; state.label = raw.toUpperCase();
      var p = pos(c[0], c[1]); you.style.left = p.x + '%'; you.style.top = p.y + '%'; you.hidden = false;
      render();
    }

    $('#nm-form').addEventListener('submit', function (e) { e.preventDefault(); lookup($('#nm-postcode').value.trim()); });
    $('#nm-locate').addEventListener('click', function () {
      $('#nm-postcode').value = 'SE1 9PX';
      toast('Using a sample location (SE1) in this prototype');
      lookup('SE1 9PX');
    });
    $all('[data-status]', app).forEach(function (c) {
      c.addEventListener('click', function () {
        state.status = c.getAttribute('data-status');
        $all('[data-status]', app).forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        render();
      });
    });
    $all('[data-view]', app).forEach(function (b) {
      b.addEventListener('click', function () {
        $('.map-view', app).setAttribute('data-view', b.getAttribute('data-view'));
        $all('[data-view]', app).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      });
    });
    var q = param('postcode');
    if (q) { $('#nm-postcode').value = q; lookup(q); } else render();
  }

  /* --- Prototype 3: site page (R33–R37) --------------------------------- */
  function initSite() {
    var app = $('#site-app');
    if (!app) return;
    var s = siteById(param('site') || '') || siteById('chambers-wharf');
    var st = STATUS[s.status];
    $all('[data-site-name]').forEach(function (el) { el.textContent = s.name; });
    $('#st-status').textContent = st.label;
    $('#st-borough').textContent = s.borough;
    $all('[data-site-link]').forEach(function (a) { a.setAttribute('href', a.getAttribute('href').split('?')[0] + '?topic=works&site=' + s.id); });
    $('#st-overflow').setAttribute('href', 'overflow.html?site=' + s.id);
    var spaceBox = $('#st-space');
    if (s.space) { spaceBox.hidden = false; $('a', spaceBox).setAttribute('href', 'space.html?space=' + s.space); }

    /* Notices: Chambers Wharf has sample notices; others show a short default. */
    var notices = (window.TW_NOTICES || {})[s.id] || [
      { date: '2026-09-30', type: 'works', title: 'Site complete', body: 'Tideway’s work here is finished. The shaft and structures below ground are now part of the operating tunnel.' }
    ];
    var types = window.TW_NOTICE_TYPES;
    var filter = 'all';
    var host = $('#notice-list');
    var chips = $('#notice-chips');
    var used = {}; notices.forEach(function (n) { used[n.type] = true; });
    chips.innerHTML = '<span class="wf-meta">Show</span><button type="button" class="chip" aria-pressed="true" data-ntype="all">All</button>' +
      Object.keys(types).filter(function (k) { return used[k]; }).map(function (k) { return '<button type="button" class="chip" aria-pressed="false" data-ntype="' + k + '">' + types[k] + '</button>'; }).join('');
    function render() {
      host.innerHTML = notices.filter(function (n) { return filter === 'all' || n.type === filter; }).map(function (n) {
        return '<li><div class="meta"><time datetime="' + n.date + '">' + fmtDate(n.date) + '</time><span class="badge">' + types[n.type] + '</span></div><h3>' + esc(n.title) + '</h3><p>' + esc(n.body) + '</p></li>';
      }).join('');
    }
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ntype]'); if (!b) return;
      filter = b.getAttribute('data-ntype');
      $all('[data-ntype]', chips).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      render();
    });
    render();
    $('#st-updated').textContent = fmtDate(notices[0].date);
    $('#st-next').textContent = s.status === 'works' ? 'Landscaping of the riverside space, then handover (sample)' : s.status === 'space' ? 'Nothing planned. The space is open.' : 'Nothing planned. The site is complete.';

    /* Liaison group table */
    var clwg = $('#clwg-body');
    if (s.id === 'chambers-wharf') {
      clwg.innerHTML = (window.TW_CLWG || []).map(function (m) {
        return '<tr><td>' + fmtDate(m.date) + '</td><td><a href="#">Notes (PDF)</a></td><td><a href="#">Presentation (PDF)</a>' + (m.extra ? '<br><a href="#">' + esc(m.extra) + '</a>' : '') + '</td></tr>';
      }).join('');
    } else {
      ['#clwg', '#hours'].forEach(function (sel) {
        $(sel).hidden = true;
        $all('[href="' + sel + '"]').forEach(function (a) { a.parentElement.hidden = true; });
      });
    }

    /* Documents for this site */
    var docs = (window.TW_DOCS || []).filter(function (d) { return d.site === s.id && d.type !== 'video' && d.type !== 'news'; });
    $('#site-docs').innerHTML = docs.length ? docs.map(function (d) {
      return '<li class="doc-item"><h3><a href="#">' + esc(d.t) + '</a></h3><div class="doc-meta"><span class="badge">' + window.TW_DOC_TYPES[d.type] + '</span><span>' + d.fmt + (d.size ? ', ' + d.size : '') + '</span><span>' + fmtDate(d.date) + '</span></div></li>';
    }).join('') : '<li class="doc-item"><p>No documents for this site in the prototype. <a href="documents.html">Search all documents</a></p></li>';
  }

  /* --- Alerts sign-up (R35), on the site page and the river health page */
  function initAlerts() {
    $all('[data-alerts-form]').forEach(function (f) {
      var preset = f.getAttribute('data-preset');
      if (preset === 'site') {
        var s = siteById(param('site') || '') || siteById('chambers-wharf');
        var box = $('[data-site-check]', f);
        if (box) { box.value = s.id; $('span', box.parentElement).textContent = s.name; }
      }
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!WF.validateForm(f)) return;
        var any = $all('input[type="checkbox"][name="topics"]:checked', f).length;
        var fs = $('[data-topics]', f);
        if (fs) { fs.classList.toggle('has-error', !any); $('.field-error', fs).hidden = !!any; if (!any) return; }
        f.hidden = true;
        var done = document.getElementById(f.getAttribute('data-done'));
        done.hidden = false;
        $('[data-email]', done).textContent = $('input[type="email"]', f).value;
        var h = $('h3', done); h.setAttribute('tabindex', '-1'); h.focus();
      });
    });
  }

  /* --- Prototype 3: contact flow (R38) ---------------------------------- */
  var TOPICS = {
    works: { label: 'Noise, traffic or disruption from works', owner: 'tw', team: 'Tideway helpdesk', reply: '5 working days, 10 at most' },
    compensation: { label: 'Damage or a compensation claim', owner: 'tw', team: 'Tideway compensation team', reply: '5 working days, 10 at most' },
    odour: { label: 'A smell, or sewage in the river', owner: 'tm', team: 'Thames Water', reply: 'Thames Water’s response times' },
    space: { label: 'A riverside space or visiting', owner: 'tw', team: 'Tideway community team', reply: '5 working days' },
    complaint: { label: 'A complaint about how we’ve handled something', owner: 'tw', team: 'Tideway complaints', reply: 'Acknowledged in 2 working days (sample)' },
    other: { label: 'Something else', owner: 'tw', team: 'Tideway helpdesk', reply: '5 working days, 10 at most' }
  };
  function initContact() {
    var app = $('#contact-app');
    if (!app) return;
    var steps = $all('.step-panel', app), dots = $all('.stepper li', app);
    var topicHost = $('#ct-topics');
    topicHost.innerHTML = Object.keys(TOPICS).map(function (k) {
      return '<label class="option-card"><input type="radio" name="topic" value="' + k + '" required><strong>' + esc(TOPICS[k].label) + '</strong><span>' + (TOPICS[k].owner === 'tm' ? 'Goes to Thames Water' : 'Goes to the ' + esc(TOPICS[k].team)) + '</span></label>';
    }).join('');
    var sel = $('#ct-site');
    sel.innerHTML = '<option value="">Not about a particular site</option>' + SITES.map(function (s) { return '<option value="' + s.id + '">' + esc(s.name) + '</option>'; }).join('');
    var t = param('topic'); if (t && TOPICS[t]) $('input[value="' + t + '"]', topicHost).checked = true;
    var sp = param('site'); if (sp && siteById(sp)) sel.value = sp;

    var i = 0;
    function go(n) {
      i = n;
      steps.forEach(function (s, k) { s.hidden = k !== i; });
      dots.forEach(function (d, k) { d.classList.toggle('current', k === i); d.classList.toggle('done', k < i); });
      var h = $('h2', steps[i]); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
    }
    function topic() { var r = $('input[name="topic"]:checked', app); return r ? r.value : null; }
    function showRoute() {
      var k = topic(); var tp = TOPICS[k];
      var tm = $('#ct-thames');
      tm.hidden = tp.owner !== 'tm';
      $('#ct-details').hidden = tp.owner === 'tm';
    }
    $('[data-ct="1"]', app).addEventListener('click', function () {
      var fs = $('#ct-topic-fs');
      var ok = !!topic();
      fs.classList.toggle('has-error', !ok); $('.field-error', fs).hidden = ok;
      if (!ok) return;
      showRoute(); go(1);
    });
    $all('[data-ct="back1"]', app).forEach(function (b) { b.addEventListener('click', function () { go(0); }); });
    $('[data-ct="2"]', app).addEventListener('click', function () {
      var pc = $('#ct-postcode');
      var ok = !pc.value.trim() || /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(pc.value.trim());
      var f = pc.closest('.field'); f.classList.toggle('has-error', !ok); $('.field-error', f).hidden = ok;
      if (!ok) { pc.focus(); return; }
      go(2);
    });
    $('[data-ct="back2"]', app).addEventListener('click', function () { go(1); });
    $('#ct-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!WF.validateForm($('#ct-form'))) return;
      var tp = TOPICS[topic()];
      var s = siteById(sel.value);
      var ref = 'TW-' + (260000 + Math.floor(Math.random() * 9000));
      $('#ct-ref').textContent = ref;
      $('#ct-team').textContent = tp.team;
      $('#ct-reply').textContent = tp.reply;
      $('#ct-about').textContent = tp.label + (s ? ', ' + s.name : '');
      $('#ct-done-email').textContent = $('#ct-email').value;
      $('.stepper', app).hidden = true;
      go(3);
    });
    go(0);
  }

  /* --- Prototype 4: riverside guide (R40, R42) -------------------------- */
  function initRiverside() {
    var app = $('#riverside-app');
    if (!app) return;
    var spaces = window.TW_SPACES, feats = window.TW_FEATURES;
    var on = {};
    var grid = $('#space-grid'), canvas = $('#rs-map');
    drawRiver(canvas);
    function card(sp) {
      return '<article class="space-card" data-space="' + sp.id + '"><div class="wf-placeholder ratio-4-3">Photo: ' + esc(sp.name) + '</div><div class="body"><h3><a href="space.html?space=' + sp.id + '">' + esc(sp.name) + '</a></h3><p class="muted">' + esc(sp.borough) + ' · nearest station ' + esc(sp.station) + '</p><div class="tags">' + sp.features.map(function (f) { return '<span class="tag">' + feats[f] + '</span>'; }).join('') + '</div><p class="wf-meta">' + esc(sp.opened) + '</p></div></article>';
    }
    spaces.forEach(function (sp) {
      var s = siteById(sp.site), p = pos(s.lat, s.lng);
      var a = document.createElement('a');
      a.className = 'map-pin'; a.href = 'space.html?space=' + sp.id; a.textContent = sp.name.replace(' & Isle of Effra', '').replace(' Pumping Station', '').replace(' Embankment Foreshore', '').replace('King Edward Memorial Park Foreshore', 'King Edward Memorial Park');
      a.style.left = p.x + '%'; a.style.top = p.y + '%'; a.setAttribute('data-space-pin', sp.id);
      if (['tyburn', 'effra', 'chelsea'].indexOf(sp.id) !== -1) a.classList.add('below');
      canvas.appendChild(a);
    });
    function render() {
      var keys = Object.keys(on).filter(function (k) { return on[k]; });
      var shown = spaces.filter(function (sp) { return keys.every(function (k) { return sp.features.indexOf(k) !== -1; }); });
      grid.innerHTML = shown.map(card).join('') || '<div class="empty-state"><p>No spaces have all of those. Remove a filter.</p></div>';
      $all('[data-space-pin]', canvas).forEach(function (p) { p.hidden = !shown.some(function (sp) { return sp.id === p.getAttribute('data-space-pin'); }); });
      $('#rs-count').textContent = shown.length + ' of ' + spaces.length + ' spaces';
    }
    $all('[data-feature]', app).forEach(function (c) {
      c.addEventListener('click', function () {
        var k = c.getAttribute('data-feature');
        on[k] = !on[k]; c.setAttribute('aria-pressed', on[k] ? 'true' : 'false');
        render();
      });
    });
    render();
  }

  function eventsHTML(list) {
    var types = window.TW_EVENT_TYPES;
    return list.map(function (ev) {
      var sp = spaceById(ev.place), d = ev.date.split('-');
      var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(d[1], 10) - 1];
      var book = ev.partner === 'Tideway' ? 'Register' : 'Book with ' + ev.partner;
      return '<li><span class="event-date">' + mon + '<b>' + parseInt(d[2], 10) + '</b></span><div><strong>' + esc(ev.title) + '</strong><br><span class="muted">' + ev.time + ' · <a href="space.html?space=' + sp.id + '">' + esc(sp.name) + '</a> · ' + types[ev.type] + ' · ' + ev.price + '</span></div><a class="btn btn-sm btn-secondary" href="#" data-book="' + esc(ev.partner) + '">' + book + '</a></li>';
    }).join('');
  }
  function initEvents() {
    $all('[data-events]').forEach(function (host) {
      var place = host.getAttribute('data-events');
      if (place === 'param') place = (spaceById(param('space') || '') || spaceById('kemp')).id;
      var list = (window.TW_EVENTS || []).filter(function (e) { return place === 'all' || e.place === place; });
      var chips = document.getElementById(host.getAttribute('data-chips') || '');
      var type = 'all', where = 'all';
      function render() {
        var shown = list.filter(function (e) { return (type === 'all' || e.type === type) && (where === 'all' || e.place === where); });
        host.innerHTML = eventsHTML(shown) || '<li><div></div><p>Nothing on that matches. Try another filter.</p></li>';
      }
      if (chips) {
        chips.addEventListener('click', function (e) {
          var b = e.target.closest('[data-etype]'); if (!b) return;
          type = b.getAttribute('data-etype');
          $all('[data-etype]', chips).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          render();
        });
        var whereSel = $('select', chips);
        if (whereSel) {
          whereSel.innerHTML = '<option value="all">All spaces</option>' + window.TW_SPACES.map(function (s) { return '<option value="' + s.id + '">' + esc(s.name) + '</option>'; }).join('');
          whereSel.addEventListener('change', function () { where = whereSel.value; render(); });
        }
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('[data-book]'); if (!b) return;
        e.preventDefault();
        toast(b.getAttribute('data-book') === 'Tideway' ? 'Registration opens here in the live site' : 'Opens ' + b.getAttribute('data-book') + '’s booking page in a new tab');
      });
      render();
    });
  }

  /* --- Prototype 4: a space (R41) --------------------------------------- */
  function initSpace() {
    var app = $('#space-app');
    if (!app) return;
    var sp = spaceById(param('space') || '') || spaceById('kemp');
    var s = siteById(sp.site), feats = window.TW_FEATURES;
    $all('[data-space-name]').forEach(function (el) { el.textContent = sp.name; });
    $('#sp-borough').textContent = sp.borough;
    $('#sp-station').textContent = sp.station;
    $('#sp-opened').textContent = sp.opened;
    $('#sp-area').textContent = sp.area || '[area to confirm]';
    $('#sp-features').innerHTML = sp.features.map(function (f) { return '<span class="tag">' + feats[f] + '</span>'; }).join('');
    $('#sp-tide').hidden = sp.features.indexOf('floodable') === -1;
    $('#sp-site-link').setAttribute('href', 'site.html?site=' + s.id);
    $('#sp-overflow-link').setAttribute('href', 'overflow.html?site=' + s.id);
    var others = window.TW_SPACES.filter(function (x) { return x.id !== sp.id; }).slice(0, 3);
    $('#sp-others').innerHTML = others.map(function (o) { return '<li><a href="space.html?space=' + o.id + '">' + esc(o.name) + '</a> <span class="muted">' + esc(o.borough) + '</span></li>'; }).join('');
    var kemp = sp.id === 'kemp';
    $all('[data-kemp-only]').forEach(function (el) { el.hidden = !kemp; });
    $all('[data-not-kemp]').forEach(function (el) { el.hidden = kemp; });
  }

  /* --- Prototype 5: documents (R50–R56) --------------------------------- */
  function initDocs() {
    var app = $('#docs-app');
    if (!app) return;
    var DOCS = window.TW_DOCS, TYPES = window.TW_DOC_TYPES, TOPICS_ = window.TW_TOPICS;
    var input = $('#q'), out = $('#doc-results'), count = $('#doc-count');
    var state = { q: '', type: {}, topic: {}, site: '', year: '', sort: 'relevance', limit: 10 };
    var t0 = param('type'); if (t0 && TYPES[t0]) state.type[t0] = true;
    var q0 = param('q'); if (q0) { state.q = q0; input.value = q0; }

    function words(q) { return q.toLowerCase().split(/\s+/).filter(Boolean); }
    function score(d, ws) {
      if (!ws.length) return 1;
      var hay = (d.t + ' ' + d.s + ' ' + (TYPES[d.type] || '') + ' ' + (TOPICS_[d.topic] || '')).toLowerCase();
      var sc = 0;
      for (var i = 0; i < ws.length; i++) { if (hay.indexOf(ws[i]) === -1) return 0; sc += d.t.toLowerCase().indexOf(ws[i]) !== -1 ? 3 : 1; }
      return sc;
    }
    function hi(text, ws) {
      var h = esc(text);
      ws.forEach(function (w) { if (w.length > 2) h = h.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
      return h;
    }
    function match(d, ws, skip) {
      if (score(d, ws) === 0) return false;
      var types = Object.keys(state.type).filter(function (k) { return state.type[k]; });
      var topics = Object.keys(state.topic).filter(function (k) { return state.topic[k]; });
      if (skip !== 'type' && types.length && types.indexOf(d.type) === -1) return false;
      if (skip !== 'topic' && topics.length && topics.indexOf(d.topic) === -1) return false;
      if (state.site && d.site !== state.site) return false;
      if (state.year && d.date.slice(0, 4) !== state.year) return false;
      return true;
    }
    function facet(host, map, key) {
      var ws = words(state.q);
      host.innerHTML = '<legend>' + host.getAttribute('data-legend') + '</legend>' + Object.keys(map).map(function (k) {
        var n = DOCS.filter(function (d) { return d[key] === k && match(d, ws, key); }).length;
        return '<label class="check"><input type="checkbox" data-f="' + key + '" value="' + k + '"' + (state[key][k] ? ' checked' : '') + '> ' + map[k] + '<span class="count">' + n + '</span></label>';
      }).join('');
    }
    function render() {
      var ws = words(state.q);
      var list = DOCS.filter(function (d) { return match(d, ws); });
      list.sort(function (a, b) { return state.sort === 'date' ? (a.date < b.date ? 1 : -1) : (score(b, ws) - score(a, ws)) || (a.date < b.date ? 1 : -1); });
      count.textContent = list.length + (list.length === 1 ? ' result' : ' results') + (state.q ? ' for “' + state.q + '”' : '');
      out.innerHTML = list.slice(0, state.limit).map(function (d) {
        var site = d.site ? siteById(d.site) : null;
        var action = d.type === 'video' ? 'Watch' : d.fmt === 'PDF' ? 'Download' : 'Read';
        return '<li class="doc-item"><div class="doc-meta"><span class="badge">' + TYPES[d.type] + '</span><time datetime="' + d.date + '">' + fmtDate(d.date) + '</time>' + (site ? '<span>' + esc(site.name) + '</span>' : '') + '</div><h3><a href="#">' + hi(d.t, ws) + '</a></h3><p>' + hi(d.s, ws) + '</p><div class="doc-meta"><span>' + action + (d.fmt ? ' · ' + d.fmt : '') + (d.size ? ', ' + d.size : '') + '</span></div></li>';
      }).join('') || '<li class="empty-state"><p>Nothing matches. Try fewer words, or <button type="button" class="btn-link" data-clear>clear the filters</button>.</p></li>';
      $('#doc-more').hidden = list.length <= state.limit;
      facet($('#f-type'), TYPES, 'type');
      facet($('#f-topic'), TOPICS_, 'topic');
      var active = Object.keys(state.type).filter(function (k) { return state.type[k]; }).length + Object.keys(state.topic).filter(function (k) { return state.topic[k]; }).length + (state.site ? 1 : 0) + (state.year ? 1 : 0);
      $('#doc-clear').hidden = !active && !state.q;
    }
    var siteSel = $('#f-site');
    siteSel.innerHTML = '<option value="">All sites</option>' + SITES.map(function (s) { return '<option value="' + s.id + '">' + esc(s.name) + '</option>'; }).join('');
    var years = {}; DOCS.forEach(function (d) { years[d.date.slice(0, 4)] = true; });
    var yearSel = $('#f-year');
    yearSel.innerHTML = '<option value="">Any year</option>' + Object.keys(years).sort().reverse().map(function (y) { return '<option>' + y + '</option>'; }).join('');

    var timer = null;
    input.addEventListener('input', function () { window.clearTimeout(timer); timer = window.setTimeout(function () { state.q = input.value.trim(); state.limit = 10; render(); }, 150); });
    $('#doc-form').addEventListener('submit', function (e) { e.preventDefault(); state.q = input.value.trim(); render(); });
    app.addEventListener('change', function (e) {
      var f = e.target.getAttribute('data-f');
      if (f) { state[f][e.target.value] = e.target.checked; state.limit = 10; render(); }
      if (e.target === siteSel) { state.site = siteSel.value; render(); }
      if (e.target === yearSel) { state.year = yearSel.value; render(); }
      if (e.target.id === 'doc-sort') { state.sort = e.target.value; render(); }
    });
    app.addEventListener('click', function (e) {
      if (e.target.closest('[data-clear]') || e.target.closest('#doc-clear')) {
        state.q = ''; input.value = ''; state.type = {}; state.topic = {}; state.site = ''; state.year = ''; siteSel.value = ''; yearSel.value = ''; render();
      }
      var qq = e.target.closest('[data-q]');
      if (qq) { e.preventDefault(); input.value = qq.getAttribute('data-q'); state.q = input.value; state.type = {}; render(); input.focus(); }
      var tq = e.target.closest('[data-type-only]');
      if (tq) { e.preventDefault(); state.type = {}; state.type[tq.getAttribute('data-type-only')] = true; state.q = ''; input.value = ''; render(); $('#results-title').scrollIntoView(); }
    });
    $('#doc-more').addEventListener('click', function () { state.limit += 10; render(); });
    var fb = $('#facets-toggle');
    if (fb) fb.addEventListener('click', function () { var f = $('#facets'); var open = f.classList.toggle('open'); fb.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    render();

    /* Annual reports list, newest first (R53) */
    var ann = $('#annual-list');
    if (ann) {
      ann.innerHTML = DOCS.filter(function (d) { return d.type === 'annual'; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; }).map(function (d) {
        return '<tr><th scope="row"><a href="#">' + esc(d.t.replace('Tideway Annual Report ', '')) + '</a></th><td>' + fmtDate(d.date) + '</td><td>' + d.fmt + ', ' + d.size + '</td></tr>';
      }).join('') + '<tr><td colspan="3" class="muted">2015-16 to 2019-20 also available</td></tr>';
    }
  }

  /* --- Search snippet preview toggle (R17) ------------------------------ */
  function initSerp() {
    var b = $('[data-serp-toggle]');
    if (!b) return;
    b.addEventListener('click', function () {
      var showOld = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', showOld ? 'true' : 'false');
      b.textContent = showOld ? 'Show proposed' : 'Show today’s';
      $('#serp-new').hidden = showOld; $('#serp-old').hidden = !showOld;
    });
  }

  /* --- Simple email sign-ups (monthly update) --------------------------- */
  function initSignups() {
    $all('[data-signup]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!WF.validateForm(f)) return;
        f.hidden = true;
        var d = document.getElementById(f.getAttribute('data-signup')); d.hidden = false; d.setAttribute('tabindex', '-1'); d.focus();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCounter();
    initWho();
    initSerp();
    initRain();
    initMonths();
    initOverflows();
    initOverflow();
    initNearMe();
    initSite();
    initAlerts();
    initContact();
    initRiverside();
    initEvents();
    initSpace();
    initDocs();
    initSignups();
  });
})();
