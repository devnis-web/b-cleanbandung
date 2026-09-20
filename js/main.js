/**
 * B.Clean Bandung - Main JavaScript
 * Handles Mobile Navigation, WhatsApp Routing, Lightbox, Dynamic Testimonials, and Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    renderTestimonials();
    initScrollReveal();
    initLightboxKeyboard();
});

/* ==========================================
   1. MOBILE MENU TOGGLE
   ========================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
            menuBtn.setAttribute('aria-expanded', 'false');
        } else {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
            menuBtn.setAttribute('aria-expanded', 'true');
        }
    });

    // Close menu when clicking navigation links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ==========================================
   2. WHATSAPP ROUTER
   ========================================== */
function contactWhatsApp(service = '') {
    const message = service
        ? `Halo B.Clean Bandung, saya ingin bertanya mengenai layanan ${service}.`
        : `Halo B.Clean Bandung, saya ingin konsultasi mengenai jasa cleaning.`;

    const url = `https://wa.me/628977990105?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

/* ==========================================
   3. GALLERY LIGHTBOX
   ========================================== */
function openLightbox(imgSrc, caption = '') {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
}

function initLightboxKeyboard() {
    const lightbox = document.getElementById('lightbox');
    
    // Close on backdrop click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

/* ==========================================
   4. TESTIMONIALS DATA & RENDERER
   ========================================== */
const testimonials = [
    {
        name: "Arufa Putra",
        text: "Saya sangat puas dengan layanan B.Clean Bandung. Rumah saya terlihat bersih dan harum setelah dibersihkan. Timnya profesional dan ramah.",
        rating: 5
    },
    {
        name: "Siti Nurhaliza",
        text: "Pelayanan yang sangat baik dan hasilnya memuaskan. B.Clean Bandung benar-benar profesional dalam melakukan pekerjaan kebersihan.",
        rating: 5
    },
    {
        name: "Budi Santoso",
        text: "Layanan yang sangat memuaskan. B.Clean Bandung selalu menjaga kualitas dan profesionalisme dalam setiap pekerjaan.",
        rating: 5
    }
];

function renderTestimonials() {
    const container = document.getElementById('testimonial-container');
    if (!container) return;

    container.innerHTML = testimonials.map(item => {
        const stars = Array(item.rating).fill('<i class="fa-solid fa-star text-amber-400 text-sm"></i>').join(' ');
        
        return `
            <div class="reveal-element bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div class="space-y-3">
                    <div class="flex gap-1">
                        ${stars}
                    </div>
                    <p class="text-slate-600 text-sm italic leading-relaxed font-normal">
                        "${item.text}"
                    </p>
                </div>
                <div class="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full bg-accent text-secondary flex items-center justify-center font-bold text-sm">
                        ${item.name.charAt(0)}
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-900 text-sm">${item.name}</h4>
                        <span class="text-xs text-slate-400">Pelanggan B.Clean</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/* ==========================================
   5. SMOOTH SCROLLING
   ========================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ==========================================
   6. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================== */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-element');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        elements.forEach(el => el.classList.add('active'));
    }
}