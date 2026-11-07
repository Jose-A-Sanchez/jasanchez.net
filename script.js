document.documentElement.classList.add('js');

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'Close' : 'Menu';
});
links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && links.classList.contains('open')) toggle.click();
});

// Homelab panel: services come online one at a time on load
const items = document.querySelectorAll('.services li');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
items.forEach((li, i) => {
  if (reduce) { li.classList.add('online'); return; }
  setTimeout(() => li.classList.add('online'), 400 + i * 220);
});

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
