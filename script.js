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

  // ─── Presentation Mode ───
  const slideElements = document.querySelectorAll('header.hero, section.section, footer.footer');
  slideElements.forEach((el) => {
    el.classList.add('slide');
  });

  // Create Controls
  const controls = document.createElement('div');
  controls.className = 'presentation-controls';
  controls.innerHTML = `
    <button id="prevSlide" class="btn-control" aria-label="Previous Slide">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button id="nextSlide" class="btn-control" aria-label="Next Slide">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  `;
  document.body.appendChild(controls);

  // Create Progress Bar
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);

  let currentSlide = 0;
  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= slideElements.length) index = slideElements.length - 1;
    
    slideElements.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        slide.scrollTop = 0; // reset scroll for long slides
      } else {
        slide.classList.remove('active');
      }
    });
    currentSlide = index;

    // Update progress bar
    const progress = ((index + 1) / slideElements.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Update Nav active state
    const activeId = slideElements[index].id;
    document.querySelectorAll('.nav-links a').forEach(a => {
      if (a.getAttribute('href') === '#' + activeId) {
        a.style.color = 'var(--blue-600)';
      } else {
        a.style.color = '';
      }
    });
  }

  document.getElementById('prevSlide').addEventListener('click', () => showSlide(currentSlide - 1));
  document.getElementById('nextSlide').addEventListener('click', () => showSlide(currentSlide + 1));

  document.addEventListener('keydown', (e) => {
    // Avoid triggering in inputs if any are added later
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      showSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showSlide(currentSlide - 1);
    }
  });

  // Nav link clicks
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target && target.classList.contains('slide')) {
        const index = Array.from(slideElements).indexOf(target);
        showSlide(index);
      }
      if(navLinks) navLinks.classList.remove('open');
    });
  });

  // Also hook up primary buttons in hero
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(anchor => {
    if (anchor.tagName === 'A' && anchor.getAttribute('href').startsWith('#')) {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target && target.classList.contains('slide')) {
          const index = Array.from(slideElements).indexOf(target);
          showSlide(index);
        }
      });
    }
  });

  // Initialize first slide
  showSlide(0);

});
