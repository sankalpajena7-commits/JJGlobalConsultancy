// ============================================================
// JJ GLOBAL CONSULTING — Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ---- Mobile menu toggle ----
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
      spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
      spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
  }

  // ---- Active nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Simple AOS-like scroll animation ----
  const animateEl = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  animateEl.forEach(el => observer.observe(el));

  // ---- Counter animation ----
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let count = 0;
    const speed = Math.ceil(target / 80);
    const update = () => {
      count = Math.min(count + speed, target);
      counter.textContent = count + (counter.getAttribute('data-suffix') || '');
      if (count < target) requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { update(); io.disconnect(); }
    });
    io.observe(counter);
  });

  // ---- Contact form submission ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#28a745';
        form.reset();
        setTimeout(() => { btn.textContent = 'Send Enquiry'; btn.disabled = false; btn.style.background = ''; }, 3000);
      }, 1500);
    });
  }

  // ---- Cookie banner ----
  const banner = document.getElementById('cookieBanner');
  const cookieBtn = document.getElementById('cookieAccept');
  if (banner && !localStorage.getItem('cookieAccepted')) {
    setTimeout(() => { banner.style.transform = 'translateY(0)'; }, 1500);
  }
  if (cookieBtn) {
    cookieBtn.addEventListener('click', () => {
      localStorage.setItem('cookieAccepted', '1');
      banner.style.transform = 'translateY(200%)';
    });
  }
});
