/* ═══════════════════════════════════════════════════
   Kurikulum Teknik Biomedis 2026 — Interactive JS
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar scroll effect ───
  const navbar = document.getElementById('nav');
  const onScroll = () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── Mobile nav toggle ───
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // ─── Cohort tabs ───
  const cohortTabs = document.querySelectorAll('.tab');
  const cohortPanels = document.querySelectorAll('.tab-panel');

  cohortTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetYear = tab.dataset.tab;

      // Update active tab
      cohortTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active panel
      cohortPanels.forEach(p => {
        p.classList.remove('active');
        if (p.id === `panel-${targetYear}`) {
          p.classList.add('active');
        }
      });
    });
  });

  // ─── Specialization tabs filtering ───
  const specTabs = document.querySelectorAll('.spec-tab');
  const specCards = document.querySelectorAll('.klaster-card');

  specTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetSpec = tab.dataset.spec;

      // Update active tab styling
      specTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter cards
      specCards.forEach(card => {
        const category = card.dataset.category;
        if (targetSpec === 'all' || category === targetSpec) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ─── Scroll reveal animation ───
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
