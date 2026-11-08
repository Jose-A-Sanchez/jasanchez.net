document.documentElement.classList.add('js');

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
const setMenu = (open) => {
  links.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'Close' : 'Menu';
  document.body.style.overflow = open ? 'hidden' : '';
};
toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
links.addEventListener('click', (e) => {
  if (e.target.closest('a') && links.classList.contains('open')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && links.classList.contains('open')) { setMenu(false); toggle.focus(); }
});

// Nav: the section on screen shows as the active link
const navLinks = [...document.querySelectorAll('.nav-center a[href^="#"]')];
if (navLinks.length && 'IntersectionObserver' in window) {
  const byId = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = byId.get(entry.target.id);
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
}

// Contact form: send via Formspree without leaving the page
const form = document.querySelector('.form');
const status = document.querySelector('.form-status');
if (form) form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.action.includes('YOUR_FORM_ID')) {
    status.textContent = 'Form not connected yet. Add your Formspree ID to index.html.';
    return;
  }
  status.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) throw new Error();
    form.reset();
    status.textContent = "Message sent. I'll get back to you within a day.";
  } catch {
    status.textContent = "Message didn't send. Check your connection or email me directly.";
  }
});
