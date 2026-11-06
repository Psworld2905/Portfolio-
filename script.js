// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Dark / light theme toggle (light is the default)
document.getElementById('themeToggle').addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Nav: background on scroll + mobile toggle
const nav = document.getElementById('nav');
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  nav.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', open);
});

links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.classList.remove('open');
  nav.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Highlight the nav link for the section in view
const navAnchors = [...links.querySelectorAll('a[href^="#"]:not(.btn)')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

// Reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated stat counters
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const decimals = (el.dataset.count.split('.')[1] || '').length;
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat .num').forEach(el => statObserver.observe(el));


// Expandable cards (experience accordion, project details on mobile)
document.querySelectorAll('.expandable').forEach(card => {
  const btn = card.querySelector('.toggle');
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;                                   // let links work normally
    if (card.classList.contains('p-exp') && window.innerWidth > 760) return; // projects only collapse on mobile
    const open = card.classList.toggle('open');
    if (btn) btn.setAttribute('aria-expanded', open);
  });
});

// On phones, start with every card collapsed so the page stays short
if (window.innerWidth <= 760) {
  document.querySelectorAll('.tl-card.open').forEach(c => {
    c.classList.remove('open');
    const b = c.querySelector('.toggle');
    if (b) b.setAttribute('aria-expanded', 'false');
  });
}
