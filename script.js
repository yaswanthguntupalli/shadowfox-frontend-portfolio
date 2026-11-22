const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Highlight the navigation item for the section currently in view.
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

function setError(field, message) {
  document.getElementById(`${field}-error`).textContent = message;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  let valid = true;

  ['name', 'email', 'message'].forEach((field) => setError(field, ''));

  if (name.length < 2) {
    setError('name', 'Please enter a name with at least 2 characters.');
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('email', 'Please enter a valid email address.');
    valid = false;
  }
  if (message.length < 10) {
    setError('message', 'Your message should be at least 10 characters.');
    valid = false;
  }

  if (!valid) {
    status.textContent = 'Please correct the highlighted fields and try again.';
    return;
  }

  // Replace this address with your own. This opens the visitor's email app;
  // it does not send or store messages on a server.
  const recipient = 'yaswanthguntupalli10@gmail.com';
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  status.textContent = 'Your details look good. Opening your email app…';
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
