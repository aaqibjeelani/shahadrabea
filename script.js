/* ============================================================
   Shahad Rabea — site interactions (vanilla JS, no dependencies)
   ------------------------------------------------------------
   What this file does:
     1. Mobile navigation toggle (hamburger menu)
     2. Sticky header background on scroll
     3. Highlights the nav link of the section you're viewing
     4. Subtle fade-up reveal as sections scroll into view
     5. 3D tilt effect on .tilt cards (Reels + value cards)
     6. Count-up animation for the hero stats
     7. Fills the current year into the footer
     8. Hides the reel skeleton loaders once each embed is ready
   Nothing here needs editing unless you want to tweak effects.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     1. MOBILE NAVIGATION
     ---------------------------------------------------------- */
  function closeNav() {
    navMenu.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('nav-open');
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 960) closeNav();
  });

  /* ----------------------------------------------------------
     2. STICKY HEADER
     ---------------------------------------------------------- */
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ----------------------------------------------------------
     3. ACTIVE NAV LINK
     ---------------------------------------------------------- */
  function updateActiveLink() {
    const position = window.scrollY + 140;
    let currentId = sections.length ? sections[0].id : '';
    sections.forEach(function (section) {
      if (position >= section.offsetTop) currentId = section.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ----------------------------------------------------------
     5. 3D TILT — applied to every .tilt element on mouse move.
        Adds a slight rotateX / rotateY toward the cursor, plus a
        moving glare highlight (via --gx / --gy CSS variables).
     ---------------------------------------------------------- */
  const tiltEls = document.querySelectorAll('.tilt');
  if (!reduceMotion && tiltEls.length && window.matchMedia('(hover: hover)').matches) {
    tiltEls.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * 9;
        const ry = (px - 0.5) * 9;
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-6px)';
        card.style.setProperty('--gx', (px * 100) + '%');
        card.style.setProperty('--gy', (py * 100) + '%');
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------
     4 & 6. SCROLL REVEAL + COUNT-UP
        One IntersectionObserver that:
          - adds .in-view to .reveal elements (fade-up)
          - starts the number count-up once a .count reaches view
     ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const countEls = document.querySelectorAll('.count');

  function animateCount(el) {
    const target = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in-view');
          if (entry.target.classList.contains('count')) animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
    countEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback for old browsers: show everything instantly
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
    countEls.forEach(function (el) {
      el.textContent = (parseFloat(el.dataset.count) || 0).toLocaleString() + (el.dataset.suffix || '');
    });
  }

  /* ----------------------------------------------------------
     7. FOOTER YEAR
     ---------------------------------------------------------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
     8. REEL SKELETON LOADERS
        Each reel card has a skeleton (shimmer + play button) that
        should fade out once its Instagram embed iframe is ready.
        - If the iframe already exists, hide on its load event.
        - Otherwise watch for Instagram's embed.js to inject it.
        - Fallback timer guarantees the skeleton never stays
          forever even if the embed fails.
     ---------------------------------------------------------- */
  document.querySelectorAll('.reel-media').forEach(function (media) {
    const skeleton = media.querySelector('.reel-skeleton');
    if (!skeleton) return;

    let hidden = false;

    function hideSkeleton() {
      if (hidden) return;
      hidden = true;
      skeleton.classList.add('is-loaded');
    }

    // The embed iframe (injected by Instagram) fills the card. When it
    // loads, the skeleton is no longer needed.
    function watchIframe(iframe) {
      if (iframe.readyState === 'complete' || iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
        hideSkeleton();
      } else {
        iframe.addEventListener('load', hideSkeleton, { once: true });
      }
    }

    // Case 1: embed.js already injected the iframe before this script ran.
    const existingIframe = media.querySelector('iframe');
    if (existingIframe) {
      watchIframe(existingIframe);
    }

    // Case 2: embed.js injects the iframe after page load — watch for it.
    if ('MutationObserver' in window) {
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeName === 'IFRAME') watchIframe(node);
          });
        });
      });
      observer.observe(media, { childList: true, subtree: true });
    }

    // Safety net: never leave a skeleton stuck on screen.
    window.setTimeout(hideSkeleton, 12000);
  });
});
