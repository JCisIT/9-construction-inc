const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

// Contact form: builds a pre-filled email (no third-party form service needed)
const form = document.querySelector('#contact-form');
const note = document.querySelector('#form-note');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  if (!d.name.trim() || !d.message.trim()) {
    note.textContent = 'Please add your name and a short description of the project.';
    note.classList.add('error');
    return;
  }
  note.classList.remove('error');
  const body = [
    `Name: ${d.name}`,
    d.phone ? `Phone: ${d.phone}` : null,
    d.email ? `Email: ${d.email}` : null,
    `Project type: ${d.type}`,
    '',
    d.message,
  ].filter(v => v !== null).join('\n');
  const subject = `Project inquiry: ${d.type} (${d.name})`;
  window.location.href = `mailto:9constructioninc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = 'Your email app should open with your details. Just hit send.';
});
