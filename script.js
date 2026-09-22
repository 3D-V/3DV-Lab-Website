/* HDU-3DV Lab — interactions
   Loader control, hero particles/parallax, reveal animations,
   counters, navigation. All motion respects prefers-reduced-motion. */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --------------------------------------------------------
       Loading screen: hide on window load (min display time),
       with a safety timeout in case a CDN resource hangs.
    -------------------------------------------------------- */
    const loader = document.getElementById('loader');
    const MIN_DISPLAY_MS = 1400;
    const loaderStart = performance.now();
    let loaderHidden = false;

    function hideLoader() {
        if (loaderHidden) return;
        loaderHidden = true;
        const wait = Math.max(0, MIN_DISPLAY_MS - (performance.now() - loaderStart));
        setTimeout(function () {
            if (loader) {
                loader.classList.add('done');
                setTimeout(function () { loader.remove(); }, 800);
            }
            document.body.classList.add('is-ready');
        }, wait);
    }

    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 5000); // safety net

    /* --------------------------------------------------------
       Mobile navigation
    -------------------------------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* --------------------------------------------------------
       Team member details — dialog overlay
       The member's .detail-content node is adopted into the modal
       while open, then returned to its card on close.
    -------------------------------------------------------- */
    const detailModal = document.getElementById('detailModal');
    const modalBody = document.getElementById('detailModalBody');
    const modalTitle = document.getElementById('detailModalTitle');
    const modalSub = document.getElementById('detailModalSub');
    let activeToggle = null;
    let activeContent = null;
    let contentHome = null;

    function openDetailModal(btn) {
        if (!detailModal || !modalBody) return;
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        const content = panel && panel.querySelector('.detail-content');
        if (!content) return;
        const member = btn.closest('.team-member');
        const nameEl = member ? member.querySelector('h3') : null;
        const posEl = member ? member.querySelector('.position') : null;
        modalTitle.textContent = nameEl ? nameEl.textContent : '详细介绍';
        modalSub.textContent = posEl ? posEl.textContent : '';
        activeToggle = btn;
        activeContent = content;
        contentHome = content.parentNode;
        modalBody.appendChild(content);
        detailModal.classList.add('open');
        detailModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        const closeBtn = detailModal.querySelector('.detail-modal-close');
        if (closeBtn) closeBtn.focus();
    }

    function closeDetailModal() {
        if (!detailModal || !detailModal.classList.contains('open')) return;
        detailModal.classList.remove('open');
        detailModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (activeContent && contentHome) contentHome.appendChild(activeContent);
        if (activeToggle) activeToggle.focus();
        activeToggle = activeContent = contentHome = null;
    }

    document.querySelectorAll('.member-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () { openDetailModal(btn); });
    });

    if (detailModal) {
        detailModal.querySelectorAll('[data-close]').forEach(function (el) {
            el.addEventListener('click', closeDetailModal);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeDetailModal();
        });
    }

    /* --------------------------------------------------------
       Publication figures — async, scroll-paced loading.
       Native lazy-loading prefetches a large radius, so a whole
       wave of figures fetches and pops in at once. Take over:
       park pending figures on a transparent pixel (aborting the
       wave), fetch each as it approaches the viewport, and reveal
       finished figures with a slight stagger so even a finishing
       wave fades in one after another.
    -------------------------------------------------------- */
    document.body.classList.add('js');

    const TINY_IMG = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    const pubFigures = document.querySelectorAll('.pub-figure img');
    let revealSlot = 0;
    let lastReveal = 0;

    function reveal(img) {
        const now = performance.now();
        if (now - lastReveal > 400) revealSlot = 0; // queue drained — no artificial wait
        lastReveal = now;
        window.setTimeout(function () { img.classList.add('is-loaded'); },
            Math.min(revealSlot++, 8) * 90);
    }

    function arm(img) {
        if (img.complete && img.naturalWidth > 0) { reveal(img); return; }
        img.addEventListener('load', function () { reveal(img); });
        img.addEventListener('error', function () {
            window.setTimeout(function () { img.classList.add('is-loaded'); }, 80);
        });
    }

    if ('IntersectionObserver' in window) {
        const figureObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                const img = entry.target;
                figureObserver.unobserve(img);
                const real = img.getAttribute('data-src');
                if (real) img.src = real; // start this fetch now
                arm(img);
            });
        }, { rootMargin: '320px 0px' });

        pubFigures.forEach(function (img) {
            if (img.complete && img.naturalWidth > 0) { arm(img); return; }
            img.setAttribute('data-src', img.currentSrc || img.src);
            img.src = TINY_IMG; // cancel the prefetch wave; fetch on approach instead
            figureObserver.observe(img);
        });
    } else {
        pubFigures.forEach(arm);
    }

    /* --------------------------------------------------------
       Figure lightbox — click a framework figure to zoom in;
       the paper title link handles navigation instead.
    -------------------------------------------------------- */
    const lightbox = document.getElementById('figureLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    function closeLightbox() {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        lightboxImg.src = '';
    }

    if (lightbox && lightboxImg) {
        document.querySelectorAll('[data-zoom]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const img = btn.querySelector('img');
                if (!img) return;
                const src = img.currentSrc || img.getAttribute('src') || '';
                if (src.indexOf('placeholder') !== -1) return; // nothing real to zoom
                lightboxImg.src = src;
                lightboxImg.alt = img.alt || '';
                lightboxCaption.textContent = img.alt || '';
                lightbox.classList.add('open');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');
            });
        });

        lightbox.querySelectorAll('[data-lb-close]').forEach(function (el) {
            el.addEventListener('click', closeLightbox);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    /* --------------------------------------------------------
       Smooth scrolling for anchor links
    -------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (!hash || hash.length < 2) return;
            const target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* --------------------------------------------------------
       Unified scroll handler: navbar state, hero parallax,
       scroll-to-top visibility, active nav link.
    -------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    const heroBg = document.getElementById('heroBg');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll-to-top button
    const toTopBtn = document.createElement('button');
    toTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    toTopBtn.className = 'scroll-to-top';
    toTopBtn.setAttribute('aria-label', '回到顶部');
    document.body.appendChild(toTopBtn);

    toTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    let scrollTicking = false;

    function onScroll() {
        const y = window.scrollY || window.pageYOffset;

        if (navbar) {
            navbar.classList.toggle('scrolled', y > 40);
        }

        toTopBtn.classList.toggle('visible', y > 480);

        // Hero background parallax (image is pre-scaled by 1.06 in CSS)
        if (heroBg && !prefersReducedMotion && y < window.innerHeight) {
            heroBg.style.transform = 'scale(1.06) translateY(' + (y * 0.22) + 'px)';
        }

        // Active navigation link
        let current = '';
        sections.forEach(function (section) {
            if (y >= section.offsetTop - 220) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            const href = link.getAttribute('href') || '';
            if (href.charAt(0) !== '#') return; // cross-page links keep their markup state
            link.classList.toggle('active', href === '#' + current);
        });

        scrollTicking = false;
    }

    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            scrollTicking = true;
            window.requestAnimationFrame(onScroll);
        }
    }, { passive: true });

    onScroll();

    /* --------------------------------------------------------
       Reveal-on-scroll animations
    -------------------------------------------------------- */
    const revealTargets = document.querySelectorAll(
        '.team-member, .achievement-category, .collab-item, .life-photo, .stat-card'
    );

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        revealTargets.forEach(function (el, i) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.7s cubic-bezier(0.2,0.7,0.2,1) ' + (i % 4) * 0.08 + 's, transform 0.7s cubic-bezier(0.2,0.7,0.2,1) ' + (i % 4) * 0.08 + 's';
        });

        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach(function (el) { revealObserver.observe(el); });
    }

    /* --------------------------------------------------------
       Animated counters (hero stats + achievement stats)
    -------------------------------------------------------- */
    function animateCounter(el, target, suffix) {
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
            if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    const counterGroups = document.querySelectorAll('.hero-stats, .achievement-stats');

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                entry.target.querySelectorAll('.counter').forEach(function (el) {
                    const target = parseInt(el.dataset.target, 10);
                    if (!isNaN(target)) animateCounter(el, target, '+');
                });

                entry.target.querySelectorAll('.stat-item h4').forEach(function (el) {
                    if (el.querySelector('.counter')) return;
                    const target = parseInt(el.textContent, 10);
                    if (!isNaN(target)) animateCounter(el, target, '+');
                });

                counterObserver.unobserve(entry.target);
            });
        }, { threshold: 0.4 });

        counterGroups.forEach(function (group) { counterObserver.observe(group); });
    }

    /* --------------------------------------------------------
       Hero particle field — drifting gold dust (3D vision vibes)
    -------------------------------------------------------- */
    const canvas = document.getElementById('heroParticles');
    const hero = document.getElementById('home');

    if (canvas && hero && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let rafId = null;
        let mouseX = 0.5, mouseY = 0.5;

        function resizeCanvas() {
            const rect = hero.getBoundingClientRect();
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function makeParticles() {
            const rect = hero.getBoundingClientRect();
            const count = Math.min(90, Math.round(rect.width / 16));
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * rect.width,
                    y: Math.random() * rect.height,
                    z: 0.3 + Math.random() * 0.7, // depth
                    r: 0,
                    vx: (Math.random() - 0.5) * 0.22,
                    vy: -(0.08 + Math.random() * 0.3),
                    tw: Math.random() * Math.PI * 2, // twinkle phase
                    tws: 0.008 + Math.random() * 0.02
                });
            }
        }

        function drawParticles() {
            const rect = hero.getBoundingClientRect();
            const scrolled = Math.min(1, (window.scrollY || 0) / rect.height);
            if (scrolled >= 1) {
                rafId = null;
                return; // hero fully out of view — stop the loop
            }

            ctx.clearRect(0, 0, rect.width, rect.height);

            particles.forEach(function (p) {
                p.x += p.vx + (mouseX - 0.5) * p.z * 0.35;
                p.y += p.vy * p.z + (mouseY - 0.5) * p.z * 0.22;
                p.tw += p.tws;

                if (p.y < -8) { p.y = rect.height + 8; p.x = Math.random() * rect.width; }
                if (p.x < -8) p.x = rect.width + 8;
                if (p.x > rect.width + 8) p.x = -8;

                const alpha = (0.14 + 0.4 * p.z) * (0.55 + 0.45 * Math.sin(p.tw)) * (1 - scrolled);
                const radius = (0.5 + p.z * 1.5);

                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(226, 196, 140, ' + alpha.toFixed(3) + ')';
                ctx.fill();
            });

            rafId = requestAnimationFrame(drawParticles);
        }

        function startParticles() {
            resizeCanvas();
            makeParticles();
            if (!rafId) rafId = requestAnimationFrame(drawParticles);
        }

        window.addEventListener('resize', function () {
            resizeCanvas();
            makeParticles();
        });

        hero.addEventListener('mousemove', function (e) {
            const rect = hero.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width;
            mouseY = (e.clientY - rect.top) / rect.height;
        });

        // Resume the loop when the hero scrolls back into view
        window.addEventListener('scroll', function () {
            if (!rafId && (window.scrollY || 0) < hero.offsetHeight) {
                rafId = requestAnimationFrame(drawParticles);
            }
        }, { passive: true });

        startParticles();
    }
})();
