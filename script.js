/* ============================================================
   Shahad Rabea — site interactions (vanilla JS, no dependencies)
   ------------------------------------------------------------
   What this file does:
     0. Bilingual support: Arabic (default) / English switcher
     1. Mobile navigation toggle (hamburger menu)
     2. Sticky header background on scroll
     3. Highlights the nav link of the section you're viewing
     4. Subtle fade-up reveal as sections scroll into view
     5. 3D tilt effect on .tilt cards (Reels + value cards)
     6. Count-up animation for the hero stats
     7. Fills the current year into the footer
     8. Hides the reel skeleton loaders once each embed is ready
   ============================================================ */

/* ----------------------------------------------------------
   0. TRANSLATIONS (Arabic default, English optional)
   Keys in the HTML use data-i18n (text), data-i18n-html,
   data-i18n-aria, data-i18n-title and data-i18n-meta.
   ---------------------------------------------------------- */
const translations = {
  ar: {
    'meta.title': 'شهد ربيعة | معلّمة رياضيات وصانعة محتوى',
    'meta.description': 'مرحباً، أنا شهد ربيعة — معلّمة رياضيات أشارك مقاطع قصيرة تجعل الرياضيات بسيطة ومرئية وممتعة. تابعوني على إنستغرام @shahad.rabea11.',
    'meta.ogTitle': 'شهد ربيعة — معلّمة رياضيات وصانعة محتوى',
    'meta.ogDesc': 'نجعل الرياضيات بسيطة ومرئية وممتعة. مقاطع رياضيات قصيرة على إنستغرام. تابعوني @shahad.rabea11.',
    'nav.about': 'من أنا',
    'nav.reels': 'الريلز',
    'nav.why': 'لماذا أتابع؟',
    'nav.contact': 'تواصل معي',
    'nav.follow': 'تابعني',
    'navToggle': 'فتح القائمة',
    'hero.badge': 'معلمة رياضيات · صانعة محتوى',
    'hero.tagline': 'نجعل الرياضيات <span class="grad-text">بسيطة، مرئية وممتعة.</span>',
    'hero.lead': 'أنا معلمة أحوّل المسائل الرياضية الصعبة إلى مقاطع قصيرة — واضحة وودودة وسهلة المتابعة، متغيراً <em>x</em> في كل مرة.',
    'hero.ctaFollow': 'تابعني على إنستغرام',
    'hero.ctaExplore': 'استكشف المقاطع',
    'hero.statReels': 'مقطع رياضي',
    'hero.statTopics': 'موضوعاً مشروحاً',
    'hero.statLearners': 'متعلّماً وصل إليها',
    'about.eyebrow': 'نبذة عني',
    'about.title': 'مرحباً، أنا شهد',
    'about.p1': 'أنا معلمة رياضيات أؤمن بأن الأرقام يجب ألا تكون مخيفة أبداً. لذلك أحوّل المفاهيم المربكة إلى مقاطع قصيرة ومرئية — ليتحول الفهم الصعب إلى لحظة <em>«أوه، هذا سهل!»</em>',
    'about.p2': 'سواء كان الجبر أو الهندسة أو مجرد التعوّد على الرياضيات، أحرص على أن يكون كل درس واضحاً وودوداً ومفيداً حقاً. أنا سعيدة جداً بوجودك هنا — لنحلّ المسائل معاً.',
    'about.favLabel': 'الصيغة المفضلة',
    'about.teachLabel': 'أُدرّس:',
    'about.teachValue': 'الرياضيات',
    'about.goalLabel': 'هدفي:',
    'about.goalValue': 'أن أجعل الرياضيات سهلة وممتعة',
    'about.findLabel': 'أين تجدني:',
    'about.findValue': 'إنستغرام، كل أسبوع',
    'reels.eyebrow': 'مقاطع ودروس',
    'reels.title': 'رياضيات جديدة كل أسبوع',
    'reels.lede': 'دروس قصيرة تشاهدها في دقيقة — مرّر المؤشر على البطاقات لتراها تميل.',
    'reels.loading': 'جارٍ تحميل المقطع…',
    'reels.cta': 'شاهد كل المقاطع على إنستغرام',
    'why.eyebrow': 'لماذا تتابعين؟',
    'why.title': 'ما الذي ستحصلين عليه عند المتابعة',
    'why.c1title': 'دروس صغيرة الحجم',
    'why.c1text': 'صيغ كبيرة، مقسّمة إلى مقاطع تشاهدها في حوالي دقيقة.',
    'why.c2title': 'شروحات واضحة',
    'why.c2text': 'بدون مصطلحات معقّدة ولا اختصارات مربكة — الشرح خطوة بخطوة.',
    'why.c3title': 'فوائد عملية',
    'why.c3text': 'تخرجين من كل مقطع بحيلة تستخدمينها في الصف أو الامتحانات.',
    'why.c4title': 'مصنوع بعناية',
    'why.c4text': 'كل درس مبني لطلاب حقيقيين — وليس فقط لزيادة المشاهدات.',
    'contact.eyebrow': 'قل مرحباً',
    'contact.title': 'لنحلّ المسائل معاً',
    'contact.text': 'مقاطع رياضيات جديدة كل أسبوع. اطرحي سؤالاً، اطلبي موضوعاً، أو فقط قولي مرحباً — أسرع طريقة للتواصل معي هي إنستغرام.',
    'contact.cta': 'تابعيني على @shahad.rabea11',
    'social.insta': 'شهد ربيعة على إنستغرام',
    'social.instaTitle': 'إنستغرام',
    'social.tiktok': 'شهد ربيعة على تيك توك',
    'social.tiktokTitle': 'تيك توك',
    'social.youtube': 'شهد ربيعة على يوتيوب',
    'social.youtubeTitle': 'يوتيوب',
    'social.email': 'راسل شهد ربيعة',
    'social.emailTitle': 'البريد الإلكتروني',
    'footer.developedBy': 'طُوّر بواسطة',
    'footer.rights': 'جميع الحقوق محفوظة.'
  },
  en: {
    'meta.title': 'Shahad Rabea | Mathematics Educator & Content Creator',
    'meta.description': "Hi, I'm Shahad Rabea — a mathematics teacher sharing bite-sized Reels that make maths simple, visual and fun. Follow @shahad.rabea11 on Instagram.",
    'meta.ogTitle': 'Shahad Rabea — Mathematics Educator & Content Creator',
    'meta.ogDesc': 'Making maths simple, visual and fun. Bite-sized math Reels on Instagram. Follow @shahad.rabea11.',
    'nav.about': 'About',
    'nav.reels': 'Reels',
    'nav.why': 'Why follow',
    'nav.contact': 'Contact',
    'nav.follow': 'Follow me',
    'navToggle': 'Toggle menu',
    'hero.badge': 'Mathematics Educator · Content Creator',
    'hero.tagline': 'Making maths <span class="grad-text">simple, visual &amp; fun.</span>',
    'hero.lead': "I'm a teacher who turns tricky math into bite-sized Reels — clear, friendly and easy to follow, one <em>x</em> at a time.",
    'hero.ctaFollow': 'Follow on Instagram',
    'hero.ctaExplore': 'Explore the Reels',
    'hero.statReels': 'Math Reels',
    'hero.statTopics': 'Topics explained',
    'hero.statLearners': 'Learners reached',
    'about.eyebrow': 'About me',
    'about.title': "Hi, I'm Shahad",
    'about.p1': 'I\'m a mathematics teacher who believes numbers should never feel scary. That\'s why I turn confusing concepts into short, visual Reels — so a tricky idea becomes a moment of <em>"oh, that\'s easy!"</em>',
    'about.p2': "Whether it's algebra, geometry or just getting comfortable with maths, I keep every lesson clear, friendly and genuinely useful. I'm so glad you're here — let's solve this together.",
    'about.favLabel': 'Favourite formula',
    'about.teachLabel': 'I teach:',
    'about.teachValue': 'Mathematics',
    'about.goalLabel': 'My goal:',
    'about.goalValue': 'make maths feel easy and enjoyable',
    'about.findLabel': 'Where to find me:',
    'about.findValue': 'Instagram, every week',
    'reels.eyebrow': 'Reels & lessons',
    'reels.title': 'Fresh math, every week',
    'reels.lede': 'Short, scrollable lessons you can watch in a minute — hover the cards, they tilt.',
    'reels.loading': 'Loading reel…',
    'reels.cta': 'See all Reels on Instagram',
    'why.eyebrow': 'Why follow along?',
    'why.title': "What you'll get when you hit follow",
    'why.c1title': 'Bite-sized lessons',
    'why.c1text': 'Big formulas, broken into Reels you can watch in about a minute.',
    'why.c2title': 'Clear explanations',
    'why.c2text': 'No jargon, no shortcuts that confuse — taught step by step.',
    'why.c3title': 'Practical takeaways',
    'why.c3text': 'Leave every Reel with a trick you can use in class or exams.',
    'why.c4title': 'Made with care',
    'why.c4text': 'Every lesson is built for real students — not just for views.',
    'contact.eyebrow': 'Say hello',
    'contact.title': "Let's solve problems together",
    'contact.text': 'New math Reels drop every week. Ask a question, request a topic, or just say hi — the fastest way to reach me is Instagram.',
    'contact.cta': 'Follow @shahad.rabea11',
    'social.insta': 'Shahad Rabea on Instagram',
    'social.instaTitle': 'Instagram',
    'social.tiktok': 'Shahad Rabea on TikTok',
    'social.tiktokTitle': 'TikTok',
    'social.youtube': 'Shahad Rabea on YouTube',
    'social.youtubeTitle': 'YouTube',
    'social.email': 'Email Shahad Rabea',
    'social.emailTitle': 'Email',
    'footer.developedBy': 'Developed by',
    'footer.rights': 'All rights reserved.'
  }
};

/* Default language = Arabic; user's choice is remembered. */
const DEFAULT_LANG = 'ar';
const STORAGE_KEY = 'shahadrabea_lang';

function getSavedLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'ar' ? saved : DEFAULT_LANG;
  } catch (e) {
    return DEFAULT_LANG;
  }
}

function applyLang(lang) {
  const dict = translations[lang] || translations.ar;
  const root = document.documentElement;

  root.setAttribute('lang', lang);
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  /* text content */
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  /* rich HTML content (keeps inner markup like <em>, <span>) */
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  /* attribute translations */
  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
    const key = el.getAttribute('data-i18n-aria');
    if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] !== undefined) el.setAttribute('title', dict[key]);
  });
  document.querySelectorAll('[data-i18n-meta]').forEach(function (el) {
    const key = el.getAttribute('data-i18n-meta');
    if (dict[key] !== undefined) el.setAttribute('content', dict[key]);
  });

  /* header toggle aria-label */
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle && dict.navToggle) navToggle.setAttribute('aria-label', dict.navToggle);

  /* active option + label in the language switcher */
  document.querySelectorAll('.lang-option').forEach(function (btn) {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
  const langCurrent = document.getElementById('lang-current');
  if (langCurrent) langCurrent.textContent = lang === 'ar' ? 'العربية' : 'English';

  /* update <title> from the translated title element */
  const titleEl = document.querySelector('title[data-i18n="meta.title"]');
  if (titleEl && titleEl.textContent) document.title = titleEl.textContent;

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) { /* storage may be unavailable; ignore */ }
}

document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     0. LANGUAGE SWITCHER
     ---------------------------------------------------------- */
  const langSwitch = document.getElementById('lang-switch');
  const langBtn = document.getElementById('lang-switch-btn');
  const langMenu = document.getElementById('lang-menu');

  applyLang(getSavedLang());

  langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = langSwitch.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(isOpen));
  });

  langMenu.querySelectorAll('.lang-option').forEach(function (opt) {
    opt.addEventListener('click', function () {
      applyLang(opt.getAttribute('data-lang'));
      langSwitch.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', function (e) {
    if (!langSwitch.contains(e.target)) {
      langSwitch.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      langSwitch.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });

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
