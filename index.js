/* ============================================
   Portfolio — Interactive JavaScript
   ============================================ */

(function () {
    'use strict';

    // ─── Scroll Reveal (Intersection Observer) ───
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ─── Navigation — Scroll Background ───
    const nav = document.getElementById('nav');

    function updateNav() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // ─── Navigation — Active Link ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function updateActiveLink() {
        const scrollY = window.scrollY + 120;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ─── Mobile Navigation Toggle ───
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });

        // Close on link click
        navMenu.querySelectorAll('.nav__link').forEach((link) => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ─── Smooth Scroll ───
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // ─── Typing Effect ───
    const typedElement = document.getElementById('heroTyped');
    const phrases = [
        '.NET 8 · Angular 18 · Cloud SaaS Architect',
        'Microservices · Scalable Backend Systems',
        'Enterprise Healthcare & Financial Platforms',
        'AI-Driven Engineering · Production Systems',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function typeEffect() {
        if (!typedElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 60;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2200; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // pause before next phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing after a brief delay
    setTimeout(typeEffect, 800);

    // ─── Contact Form Handler ───
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const subject = document.getElementById('formSubject').value || 'Portfolio Contact';
            const message = document.getElementById('formMessage').value;

            const body = `Hi Rahul,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ABest regards,%0D%0A${encodeURIComponent(name)}%0D%0A${encodeURIComponent(email)}`;
            const mailto = `mailto:rahul.kaushal@outlook.com?subject=${encodeURIComponent(subject)}&body=${body}`;

            window.location.href = mailto;

            // Show confirmation
            const btn = contactForm.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = '<span>Opening Mail Client…</span>';
            btn.style.background = '#30d158';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
            }, 3000);
        });
    }

    // ─── Parallax Orbs on Mouse Move ───
    const orbs = document.querySelectorAll('.hero__orb');

    if (orbs.length && window.matchMedia('(min-width: 768px)').matches) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 12;
                requestAnimationFrame(() => {
                    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                });
            });
        });
    }

    // ─── Stats Counter Animation ───
    const statNumbers = document.querySelectorAll('.hero__stat-number');

    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach((stat) => statsObserver.observe(stat));

    function animateCounter(el) {
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;

        const target = parseInt(match[1], 10);
        const suffix = text.replace(match[1], '');
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.round(eased * target);

            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ─── Skill group hover glow effect ───
    document.querySelectorAll('.skill-group').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(41, 151, 255, 0.04), rgba(255,255,255,0.03) 40%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // ─── Project card hover glow effect ───
    document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(41, 151, 255, 0.03), rgba(255,255,255,0.03) 40%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });
})();
