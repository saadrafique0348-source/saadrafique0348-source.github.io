(() => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }));

  // Light / dark theme toggle (default light; saved choice wins, else device setting —
  // the head script already applied the starting theme before first paint).
  const rootEl = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  function applyTheme(mode) {
    rootEl.setAttribute('data-theme', mode);
    if (themeMeta) themeMeta.setAttribute('content', mode === 'dark' ? '#0d0f16' : '#faf6ef');
    if (themeBtn) {
      themeBtn.textContent = mode === 'dark' ? '☀' : '☾';
      themeBtn.setAttribute('aria-pressed', String(mode === 'dark'));
      themeBtn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      themeBtn.title = mode === 'dark' ? 'Light theme' : 'Dark theme';
    }
    try { localStorage.setItem('theme', mode); } catch (e) {}
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(rootEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    // Sync the button with the theme the head script already applied.
    applyTheme(rootEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  }

  // "The full edit bay" category tabs
  document.querySelectorAll('.tabs .tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tabs .tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('#editbay .creative-item').forEach(item => {
        item.style.display = (f === 'all' || item.dataset.cat === f) ? '' : 'none';
      });
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  const revealItems = document.querySelectorAll('.section-block, .work-card, .service-card, .education-entry, .creative-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => {
      item.classList.add('reveal');
      observer.observe(item);
    });
  }
})();