// ====================================
// Main Application - التطبيق الرئيسي
// ====================================

const App = {
    init() {
        this.hideLoadingScreen();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupContactForm();
        this.setupNewsletterForm();
        this.initAnimations();
    },

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 1000);
        }
    },

    setupNavigation() {
        const header = document.getElementById('main-header');
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');

        // Scroll effect on header
        window.addEventListener('scroll', Utils.throttle(() => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 100));

        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking a link
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                
                // Update active state
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Smooth scroll for navigation
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                Utils.scrollToSection(targetId);
            });
        });
    },

    setupScrollEffects() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all elements with data-aos attribute
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Update active navigation based on scroll position
        window.addEventListener('scroll', Utils.throttle(() => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, 100));
    },

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                phone: document.getElementById('contact-phone').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value
            };

            // Validate email
            if (!Utils.validateEmail(data.email)) {
                Utils.showToast('البريد الإلكتروني غير صحيح', 'error');
                return;
            }

            const loader = Utils.showLoading(form);

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                Utils.hideLoading(loader);
                Utils.showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
                form.reset();
            } catch (error) {
                Utils.hideLoading(loader);
                Utils.showToast('حدث خطأ أثناء إرسال الرسالة', 'error');
            }
        });
    },

    setupNewsletterForm() {
        const forms = document.querySelectorAll('.newsletter-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = form.querySelector('input[type="email"]').value;

                if (!Utils.validateEmail(email)) {
                    Utils.showToast('البريد الإلكتروني غير صحيح', 'error');
                    return;
                }

                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    Utils.showToast('تم الاشتراك في النشرة البريدية بنجاح!', 'success');
                    form.reset();
                } catch (error) {
                    Utils.showToast('حدث خطأ أثناء الاشتراك', 'error');
                }
            });
        });
    },

    initAnimations() {
        // Add subtle animations to various elements
        this.animateCounters();
        this.setupHoverEffects();
    },

    animateCounters() {
        const stats = document.querySelectorAll('.stat-item strong');
        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    stats.forEach(stat => {
                        const text = stat.textContent;
                        const number = parseInt(text.replace(/[^0-9]/g, ''));
                        if (!isNaN(number)) {
                            Utils.animateNumber(stat, 0, number, 2000);
                        }
                    });
                }
            });
        });

        stats.forEach(stat => observer.observe(stat));
    },

    setupHoverEffects() {
        // Add parallax effect to hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            document.addEventListener('mousemove', Utils.throttle((e) => {
                const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
                const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
                
                const pattern = hero.querySelector('.hero-pattern');
                if (pattern) {
                    pattern.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            }, 50));
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Handle offline/online events
window.addEventListener('online', () => {
    Utils.showToast('تم استعادة الاتصال بالإنترنت', 'success');
});

window.addEventListener('offline', () => {
    Utils.showToast('لا يوجد اتصال بالإنترنت', 'error');
});

// Log application info
console.log(`%c${CONFIG.APP_NAME}`, 'font-size: 20px; font-weight: bold; color: #8B4513;');
console.log(`%cالإصدار: ${CONFIG.APP_VERSION}`, 'color: #DAA520;');
console.log('%cتم التطوير بـ ❤️ في فلسطين', 'color: #2ecc71;');
