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

  const words = ['digital experiences.', 'websites that connect.', 'visual stories that move.'];
  const word = document.getElementById('changingWord');
  let wordIndex = 0;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      word.textContent = words[wordIndex];
    }, 2600);
  }

  document.getElementById('year').textContent = new Date().getFullYear();
  const revealItems = document.querySelectorAll('.section-block, .skill-card, .work-card, .service-row, .education-entry');
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