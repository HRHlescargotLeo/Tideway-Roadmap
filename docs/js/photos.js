/* ==========================================================================
   photos.js: Tideway photography for the design layer

   Swaps the illustrated placeholders for Tideway's own photography, loaded
   directly from tideway.london. Each image is applied only once it has
   loaded, so wherever the images can't be reached the illustration stays.
   Photography © Tideway, used here to show how the proposals would look on
   the live site. Diagrams, charts and maps stay drawn.
   ========================================================================== */

(function () {
  'use strict';

  var BASE = 'https://www.tideway.london/media/';
  function u(path, w) { return BASE + path + '?width=' + (w || 1400); }

  var LOGO = 'https://www.tideway.london/dist/images/logo.svg';

  /* One photo per site, as used in the Open Spaces menu on tideway.london. */
  var SITE = {
    'bazalgette-embankment': u('7508/bazalgette-embankment-2-chris-hopkinson.jpg'),
    'carnwath-road-riverside': u('7514/2dlp3504.jpg'),
    'chelsea-quay': u('7509/chelsea-quay-6-rob-parrish.jpg'),
    'deptford-church-street': u('7516/25025_0267.jpg'),
    'effra-quay': u('7510/effra-quay-4-tim-crocker.jpg'),
    'falconbrook-pumping-station': u('7517/falconbrook-pumping-station_009-1.png'),
    'heathwall-pumping-station': u('7515/dlp60410.jpg'),
    'king-edward-memorial-park-foreshore': u('7744/tideway-king-edward-park_026.jpg'),
    'king-georges-park': u('7518/2dlp0177.jpg'),
    'putney-embankment-foreshore': u('7513/tideway-putney-15092023_026.jpg'),
    'tyburn-quay': u('7329/mayor-visit-sep-24-6.png'),
    'chambers-wharf': u('5575/aerials_21158_189.jpg'),
    'barn-elms': u('6892/tideway-barn-elms_121-1-extended.jpg')
  };
  var SPACE = { bazalgette: 'bazalgette-embankment', tyburn: 'tyburn-quay', effra: 'effra-quay', heathwall: 'heathwall-pumping-station', chelsea: 'chelsea-quay', putney: 'putney-embankment-foreshore', kemp: 'king-edward-memorial-park-foreshore' };

  /* Galleries for a space page: King Edward Memorial Park Foreshore has its own set. */
  var GALLERY = {
    kemp: [u('7744/tideway-king-edward-park_026.jpg'), u('7746/tideway-king-edward-park_037.jpg'), u('7512/dlp60213.jpg')]
  };
  var RIVER = [u('3806/barges-on-river-thames.jpg'), u('1622/legacy_hero-image.jpg')];

  var NEWS = [u('7770/final-tunnel-shots-3.png', 900), u('7765/ttp-thumbnail.jpg', 900), u('7750/screenshot-2026-08-06-at-182304.png', 900)];

  /* Static placeholders, matched on their label text (lower case). */
  var LABEL = {
    "it's working": u('7508/bazalgette-embankment-2-chris-hopkinson.jpg', 900),
    'river health': u('6769/final-tunnel-shots-2-3.png', 900),
    'near me': u('5575/aerials_21158_189.jpg', 900),
    'visit the riverside': u('7744/tideway-king-edward-park_026.jpg', 900),
    'find a document': u('1622/legacy_hero-image.jpg', 900),
    'video · 1:38': u('6769/final-tunnel-shots-2-3.png', 900),
    'video · 2:22': u('3646/chambers.jpg', 900),
    'video · 4:12': u('6895/ttt_mjp_8305_chl_apprentice.jpg', 900),
    'photo': u('7744/tideway-king-edward-park_026.jpg', 900),
    "video: london's super sewer": u('7746/tideway-king-edward-park_037.jpg', 1200),
    'photo: the new riverside at wapping': u('7744/tideway-king-edward-park_026.jpg', 900),
    'tideway prize artwork': u('7765/ttp-thumbnail.jpg', 700)
  };

  function apply(el, src, cls) {
    if (!el || !src || el.getAttribute('data-photo') === src) return;
    el.setAttribute('data-photo', src);
    var img = new Image();
    img.onload = function () {
      el.style.backgroundImage = 'url("' + src + '")';
      el.classList.add('has-photo');
      if (cls) el.classList.add(cls);
      if (!el.hasAttribute('role')) {
        el.setAttribute('role', 'img');
        el.setAttribute('aria-label', (el.textContent || 'Photo').trim());
      }
    };
    img.src = src;
  }
  function label(el) { return (el.textContent || '').trim().toLowerCase(); }
  function param(name) { return window.WF && window.WF.param ? window.WF.param(name) : null; }

  function applyAll() {
    // Logos
    document.querySelectorAll('.wf-placeholder.logo').forEach(function (el) { apply(el, LOGO); });

    // Homepage hero video: a photo of the new riverside with a play button
    document.querySelectorAll('.tw-hero > .wf-placeholder').forEach(function (el) {
      if (label(el).indexOf('video') === 0) apply(el, u('7746/tideway-king-edward-park_037.jpg'), 'has-photo-video');
    });

    // News cards, in order
    document.querySelectorAll('.news-card .wf-placeholder').forEach(function (el, i) {
      var l = label(el);
      if (l.indexOf('image') === 0) apply(el, NEWS[i % NEWS.length]);
    });

    // Space cards and pins
    document.querySelectorAll('.space-card').forEach(function (card) {
      var id = card.getAttribute('data-space') || 'kemp';
      apply(card.querySelector('.wf-placeholder'), SITE[SPACE[id]]);
    });

    // Space page gallery
    var gal = document.querySelectorAll('#space-app .carousel-item .wf-placeholder');
    if (gal.length) {
      var sp = param('space') || 'kemp';
      if (!SPACE[sp]) sp = 'kemp';
      var set = GALLERY[sp] || [SITE[SPACE[sp]]].concat(RIVER);
      gal.forEach(function (el, i) { apply(el, set[i % set.length]); });
    }

    // Prize: the Tideway Prize artwork in the first frame
    var prize = document.querySelector('#prize .wf-placeholder');
    if (prize) apply(prize, u('7765/ttp-thumbnail.jpg', 700));

    // Everything else matched on its label
    document.querySelectorAll('.wf-placeholder').forEach(function (el) {
      var src = LABEL[label(el)];
      if (src) apply(el, src);
    });

    // Site and overflow page heads: the site's photo behind the slate band
    var head = document.querySelector('#site-app.page-head, #overflow-app.page-head');
    if (head && !head.getAttribute('data-photo')) {
      var site = param('site') || 'chambers-wharf';
      var src = SITE[site];
      if (src) {
        head.setAttribute('data-photo', src);
        var img = new Image();
        img.onload = function () {
          head.style.backgroundImage = 'linear-gradient(90deg, rgba(59,61,68,0.92) 0%, rgba(59,61,68,0.78) 45%, rgba(59,61,68,0.25) 100%), url("' + src + '")';
          head.classList.add('has-photo-head');
        };
        img.src = src;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyAll();
    if ('MutationObserver' in window) {
      var pending = false;
      new MutationObserver(function () {
        if (pending) return;
        pending = true;
        window.requestAnimationFrame(function () { pending = false; applyAll(); });
      }).observe(document.body, { childList: true, subtree: true });
    }
  });
})();
