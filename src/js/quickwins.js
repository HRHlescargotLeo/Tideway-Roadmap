/* ==========================================================================
   quickwins.js: behaviour for the Quick wins tab (R09, QW1–QW20)

   Each quick-win page carries one or more [data-qw="name"] blocks; the
   matching function below runs once the shared wireframe.js has loaded.
   ========================================================================== */

(function () {
  'use strict';

  var WF = window.WF;
  var $ = WF.$, $all = WF.$all;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function press(group, btn) { $all('button', group).forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); }); }
  function reduceMotion() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

  var DEMOS = {};

  /* QW1 Who does what now */
  var ISSUES = [
    { q: 'There’s a smell near a shaft', owner: 'Thames Water', tw: false, how: ['Thames Water: [number to confirm]'], why: 'Thames Water now runs the tunnel and its ventilation.' },
    { q: 'I’ve seen sewage going into the river', owner: 'Thames Water and the Environment Agency', tw: false, how: ['Environment Agency incident hotline: 0800 80 70 60 (24 hours)', 'Thames Water: [number to confirm]'], why: 'Overflows are part of Thames Water’s network; the Environment Agency wants to hear about pollution.' },
    { q: 'Noise from works near me', owner: 'Tideway', tw: true, how: ['Tideway helpdesk: 08000 30 80 80 (24 hours)', 'helpdesk@tideway.london'], why: 'Tideway manages the finishing works at the last few sites.' },
    { q: 'Damage to my property from construction', owner: 'Tideway', tw: true, how: ['Tideway helpdesk: 08000 30 80 80', 'Freepost TIDEWAY'], why: 'Claims from construction go through Tideway’s compensation programme.' }
  ];
  DEMOS.who = function (el) {
    var list = $('[data-issues]', el), out = $('[data-route]', el);
    list.innerHTML = ISSUES.map(function (x, i) { return '<button type="button" aria-pressed="false" data-i="' + i + '">' + esc(x.q) + '</button>'; }).join('');
    function show(i) {
      var x = ISSUES[i];
      press(list, $('[data-i="' + i + '"]', list));
      out.innerHTML = '<div><span class="owner' + (x.tw ? ' tw' : '') + '">' + esc(x.tw ? 'Tideway' : 'Thames Water') + '</span></div><h3>' + esc(x.owner) + '</h3><p>' + esc(x.why) + '</p><div class="contact-lines">' + x.how.map(function (h) { return '<span>' + esc(h) + '</span>'; }).join('') + '</div>';
    }
    list.addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (b) show(+b.getAttribute('data-i')); });
    show(0);
  };

  /* QW3 Search snippets: switch between search result and link preview */
  DEMOS.snip = function (el) {
    var seg = $('.seg', el);
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('[data-view]'); if (!b) return;
      press(seg, b);
      $all('[data-v]', el).forEach(function (v) { v.hidden = v.getAttribute('data-v') !== b.getAttribute('data-view'); });
    });
  };

  /* QW4 One completion date */
  DEMOS.dates = function (el) {
    var sel = $('#qw-page', el), out = $('[data-page-note]', el);
    var where = { 'Homepage': 'Under the counter.', 'The Tunnel': 'At the top of the page, in place of the two dates in the text.', 'Timeline': 'As the last five points on the interactive timeline.' };
    function set() { out.textContent = 'On ' + sel.value + ': ' + where[sel.value] + ' Same strip, same dates.'; }
    sel.addEventListener('change', set); set();
  };

  /* QW5 The real number in the counter */
  DEMOS.counter = function (el) {
    var num = $('[data-num]', el), out = $('[data-out]', el), today = el.getAttribute('data-mode') === 'today';
    var reduce = $('[data-reduce]', el);
    function animate() {
      if (!today && (reduceMotion() || (reduce && reduce.checked))) { num.textContent = '22.2'; return; }
      var start = null;
      function step(t) {
        if (!start) start = t;
        var p = Math.min(1, (t - start) / 1200);
        num.textContent = (22.2 * p).toFixed(1);
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }
    $('[data-replay]', el).addEventListener('click', animate);
    $('[data-read]', el).addEventListener('click', function () {
      out.textContent = today ? 'The page source says: “0 million tonnes of sewage diverted”.' : 'The page source says: “22.2 million tonnes of sewage diverted”.';
    });
    if (reduce) reduce.addEventListener('change', function () { if (reduce.checked) num.textContent = '22.2'; });
  };

  /* QW10 Prize gallery tabs */
  DEMOS.prize = function (el) {
    var seg = $('.seg', el);
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('[data-set]'); if (!b) return;
      press(seg, b);
      $all('[data-gallery]', el).forEach(function (g) { g.hidden = g.getAttribute('data-gallery') !== b.getAttribute('data-set'); });
    });
  };

  /* QW12, QW19 Show what's changed */
  DEMOS.diff = function (el) {
    var b = $('[data-diff]', el);
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.textContent = on ? 'Hide changes' : 'Show what’s changed';
      el.classList.toggle('qw-diff-on', on);
    });
  };

  /* QW13 One shared summary on two pages */
  DEMOS.shared = function (el) {
    var seg = $('.seg', el);
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('[data-page]'); if (!b) return;
      press(seg, b);
      $('[data-page-title]', el).textContent = b.getAttribute('data-page');
    });
  };

  /* QW14 Job alert sign-up */
  DEMOS.alert = function (el) {
    var f = $('[data-alert-form]', el);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!WF.validateForm(f)) return;
      f.hidden = true; var d = $('[data-alert-done]', el); d.hidden = false; d.setAttribute('tabindex', '-1'); d.focus();
    });
  };

  /* QW16 Cookie banner */
  DEMOS.cookie = function (el) {
    var out = $('[data-c-out]', el);
    var msg = { reject: 'Only essential cookies are set. You can change this any time from the footer.', accept: 'Essential and analytics cookies are set.', custom: 'Opens the settings panel, with analytics off until switched on.' };
    el.addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (b) out.textContent = msg[b.getAttribute('data-c')]; });
  };

  /* QW18 Copy share link */
  DEMOS.copy = function (el) {
    var out = $('[data-copy-out]', el);
    $('[data-copy]', el).addEventListener('click', function () {
      var t = $('[data-copy-text]', el).textContent;
      try {
        navigator.clipboard.writeText(t).then(function () { out.textContent = 'Copied.'; }, function () { out.textContent = 'Select the link above and copy it.'; });
      } catch (err) { out.textContent = 'Select the link above and copy it.'; }
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    $all('[data-qw]').forEach(function (el) {
      var fn = DEMOS[el.getAttribute('data-qw')];
      if (fn) fn(el);
    });
  });
})();
