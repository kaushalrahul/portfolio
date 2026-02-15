/* ===========================
   DOM Ready
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initSkillBars();
  initContactForm();
  initBackToTop();
  initParticles();
});

/* ===========================
   Loading Overlay
   =========================== */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 400);
  });

  // Fallback: hide after 3s max
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 3000);
}

/* ===========================
   Navbar
   =========================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (navLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          links.forEach(l => l.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  });
}

/* ===========================
   Typing Effect
   =========================== */
function initTypingEffect() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  const phrases = [
    '.NET Core & ASP.NET',
    'Angular & TypeScript',
    'Microservices Architecture',
    'Cloud & DevOps (AWS / Azure)',
    'AI Integration & Automation',
    'Scalable SaaS Platforms',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeout;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 35 : 65;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }

    timeout = setTimeout(type, speed);
  }

  type();
}

/* ===========================
   Scroll Reveal (IntersectionObserver)
   =========================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* ===========================
   Animated Skill Bars
   =========================== */
function initSkillBars() {
  const categories = document.querySelectorAll('.skill-category');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Animate bars
          const bars = entry.target.querySelectorAll('.skill-bar-fill');
          bars.forEach(bar => {
            const target = bar.getAttribute('data-width');
            setTimeout(() => {
              bar.style.width = target;
            }, 200);
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  categories.forEach(cat => observer.observe(cat));
}

/* ===========================
   Contact Form
   =========================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple frontend-only handling
    const formData = new FormData(form);
    const name = formData.get('name');

    // Show success toast
    showToast(`Thanks ${name || ''}! Your message has been received. I'll get back to you soon.`);
    form.reset();
  });
}

function showToast(message) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ===========================
   Back to Top
   =========================== */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===========================
   Floating Particles (Hero)
   =========================== */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const count = 30;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
    particle.style.animationDelay = (Math.random() * 6) + 's';
    particle.style.width = particle.style.height = (Math.random() * 3 + 1) + 'px';

    // Random accent color
    const colors = ['#6c63ff', '#a855f7', '#3b82f6'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
  }
}
