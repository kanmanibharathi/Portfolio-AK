/* ============================================
   AKASH KRISHNAMOORTHI — PORTFOLIO JS
   Particle System, Molecular Network, Animations
   ============================================ */

// ============================================
// 0. THEME HELPERS
// ============================================
function getThemeColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
        particle: isLight ? '0, 150, 136' : '0, 194, 168',
        particleAlt: isLight ? '0, 137, 123' : '91, 231, 196',
        particleOpacityMult: isLight ? 1.8 : 1,
        connectionOpacityMult: isLight ? 1.5 : 1
    };
}

// ============================================
// 1. PARTICLE CANVAS SYSTEM
// ============================================
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.particleCount = 60;
        this.connectionDistance = 150;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Adjust particle count for mobile
        this.particleCount = window.innerWidth < 768 ? 25 : 60;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((p, i) => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Boundary wrap
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Subtle mouse interaction
            const dx = this.mouseX - p.x;
            const dy = this.mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                p.vx += dx * 0.00003;
                p.vy += dy * 0.00003;
            }

            // Speed limit
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > 0.5) {
                p.vx *= 0.98;
                p.vy *= 0.98;
            }

            // Draw particle — theme-aware
            const tc = getThemeColors();
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${tc.particle}, ${p.opacity * tc.particleOpacityMult})`;
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const cdx = p.x - p2.x;
                const cdy = p.y - p2.y;
                const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

                if (cdist < this.connectionDistance) {
                    const opacity = (1 - cdist / this.connectionDistance) * 0.08 * tc.connectionOpacityMult;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(${tc.particle}, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// 2. MOLECULAR NETWORK (HERO)
// ============================================
class MolecularNetwork {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.resize();
        this.createNodes();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
    }

    createNodes() {
        const count = 18;
        const w = this.canvas.width;
        const h = this.canvas.height;

        for (let i = 0; i < count; i++) {
            this.nodes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                baseX: Math.random() * w,
                baseY: Math.random() * h,
                radius: Math.random() * 6 + 3,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.005 + 0.002,
                amplitude: Math.random() * 30 + 10,
                colorIdx: Math.random() > 0.5 ? 0 : 1,
                type: Math.random() > 0.7 ? 'large' : 'small'
            });
        }
    }

    animate() {
        const time = Date.now() * 0.001;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update nodes
        this.nodes.forEach(node => {
            node.x = node.baseX + Math.sin(time * node.speed * 100 + node.phase) * node.amplitude;
            node.y = node.baseY + Math.cos(time * node.speed * 80 + node.phase) * node.amplitude * 0.7;

            // Mouse influence
            const dx = this.mouseX - node.x;
            const dy = this.mouseY - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                node.x += dx * force * 0.02;
                node.y += dy * force * 0.02;
            }
        });

        // Theme-aware colors for molecular network
        const tc = getThemeColors();
        const colors = [`rgba(${tc.particle},`, `rgba(${tc.particleAlt},`];

        // Draw connections
        this.nodes.forEach((node, i) => {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const other = this.nodes[j];
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 180) {
                    const opacity = (1 - dist / 180) * 0.25 * tc.connectionOpacityMult;
                    this.ctx.beginPath();
                    this.ctx.moveTo(node.x, node.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(${tc.particle}, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        });

        // Draw nodes
        this.nodes.forEach(node => {
            const r = node.type === 'large' ? node.radius * 1.5 : node.radius;
            const col = colors[node.colorIdx];

            // Glow
            const gradient = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3);
            gradient.addColorStop(0, col + '0.15)');
            gradient.addColorStop(1, col + '0)');
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Core
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
            this.ctx.fillStyle = col + '0.6)';
            this.ctx.fill();

            // Inner bright spot
            this.ctx.beginPath();
            this.ctx.arc(node.x - r * 0.2, node.y - r * 0.2, r * 0.35, 0, Math.PI * 2);
            this.ctx.fillStyle = col + '0.8)';
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// 3. SCROLL-BASED REVEAL ANIMATIONS
// ============================================
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

// ============================================
// 4. NAVIGATION
// ============================================
function initNavigation() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}

// ============================================
// 5. SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// ============================================
// 6. COUNTING ANIMATION
// ============================================
function initCountingAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCount(entry.target, 0, target, 1500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCount(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const value = Math.floor(start + (end - start) * eased);
        element.textContent = value + '+';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// 7. PUBLICATION FILTERS & SEARCH
// ============================================
function initPublicationFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('pubSearch');
    const pubCards = document.querySelectorAll('.pub-card');
    const countDisplay = document.getElementById('pubCountDisplay');

    function filterPublications() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        pubCards.forEach(card => {
            const type = card.dataset.type;
            const text = card.textContent.toLowerCase();
            const matchesFilter = activeFilter === 'all' || type === activeFilter;
            const matchesSearch = !searchTerm || text.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        countDisplay.textContent = visibleCount;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterPublications();
        });
    });

    searchInput.addEventListener('input', filterPublications);
}

// ============================================
// 8. SMOOTH SCROLL FOR NAV LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// 9. CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Message Sent! ✓</span>';
        btn.style.background = 'linear-gradient(135deg, #1EF2D6, #00C2A8)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

// ============================================
// 10. ACTIVE NAV LINK HIGHLIGHT
// ============================================
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary)';
            }
        });
    });
}

// ============================================
// 11. THEME TOGGLE (Dark / Light)
// ============================================
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Load saved preference (default: dark)
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
    });
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Theme (run first to set colors before canvas init)
    initThemeToggle();

    // Core systems
    new ParticleSystem('particleCanvas');
    new MolecularNetwork('molecularNetwork');

    // UI Features
    initNavigation();
    initScrollProgress();
    initRevealAnimations();
    initCountingAnimation();
    initPublicationFilters();
    initSmoothScroll();
    initContactForm();
    initActiveNavHighlight();
});
