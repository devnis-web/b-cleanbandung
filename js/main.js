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

/**
 * B.Clean Bandung - Order Form Script
 */

const PRICE_LIST = {
    // Daily Clean Rumah/kost/toilet dll.
    'Daily Clean (1 Jam)': 75000,
    'Daily Clean (2 Jam)': 140000,
    'Daily Clean (3 Jam)': 210000,
    'Daily Clean (4 Jam)': 275000,
    'Daily Clean (5 Jam)': 340000,
    'Daily Clean (6 Jam)': 400000,
    'Daily Clean (7 Jam)': 460000,
    'Daily Clean (8 Jam)': 522000,
    'Daily Clean (9 Jam)': 572000,
    'Daily Clean (10 Jam)': 622000,

    // Deep Clean & Per Jam
    'Deep Clean Rumah': 90000,
    'Deep Clean Kost': 80000,
    'Deep Clean Toilet': 110000,
    'Packing / Unpacking': 60000,
    'Strika / Lipat Baju': 50000,
    'Pembersihan Borongan': 35000,
    'Jasa Jaga Bayi / Anak': 30000,
    'Jasa Cari / Survai Kost': 25000,

    // Salon Toilet
    'Salon Toilet (Uk. 1m x 2m)': 350000,
    'Salon Toilet (Uk. 2m x 2m)': 450000,
    'Salon Toilet (Uk. 3m x 2m)': 550000,

    // Cuci Kasur / Sofa
    'Cuci Kasur Super King': 310000,
    'Cuci Kasur King': 250000,
    'Cuci Kasur Queen': 220000,
    'Cuci Kasur Single': 200000,
    'Cuci Sofa 1 Seat': 90000,
    'Cuci Sofa 2 Seat': 160000,
    'Dryer (Pengering Kasur/Sofa)': 50000,

    // Massage
    'Body Massage 90\'': 170000,
    'Body Massage 120\'': 215000,
    'Body Massage + Totok Wajah 90\'': 185000,
    'Body Massage + Totok Wajah 120\'': 235000,
    'Body Massage + Lulur 120\'': 240000,
    'Body Massage + Reflexy 90\'': 215000,
    'Body Massage + Reflexy 120\'': 250000,
    'Body Massage + Kerokan 120\'': 215000
};

let serviceRowCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    const tanggalInput = document.getElementById('tanggal');
    if (tanggalInput) {
        tanggalInput.value = new Date().toISOString().split('T')[0];
    }
    
    addServiceRow();
});

/**
 * Toggle Tampilan Input Detail Hewan Peliharaan
 */
function toggleHewanInput(show) {
    const container = document.getElementById('hewanDetailContainer');
    if (container) {
        if (show) {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
            document.getElementById('jenisHewan').value = '';
        }
    }
}

/**
 * Menambahkan Baris Layanan Baru ke Form
 */
function addServiceRow() {
    serviceRowCount++;
    const rowId = `service-row-${serviceRowCount}`;
    const container = document.getElementById('servicesContainer');

    const optionsHtml = Object.keys(PRICE_LIST)
        .map(key => `<option value="${key}">${key} - Rp ${PRICE_LIST[key].toLocaleString('id-ID')}</option>`)
        .join('');

    const rowElement = document.createElement('div');
    rowElement.id = rowId;
    rowElement.className = "bg-[#164e80]/60 p-4 rounded-xl border border-slate-600/50 space-y-3 relative transition-all";
    
    rowElement.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Layanan #${serviceRowCount}</span>
            ${serviceRowCount > 1 ? `
                <button type="button" onclick="removeServiceRow('${rowId}')" class="text-rose-400 hover:text-rose-300 text-xs font-bold flex items-center gap-1">
                    <i class="fa-solid fa-trash-can"></i> Hapus
                </button>
            ` : ''}
        </div>

        <div>
            <select class="service-select w-full bg-white text-slate-900 px-3 py-2.5 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none" onchange="calculateOrder()">
                <option value="">-- Pilih Layanan --</option>
                ${optionsHtml}
            </select>
        </div>

        <div class="grid grid-cols-2 gap-3">
            <div>
                <label class="block text-[11px] font-semibold text-slate-300 mb-1">Durasi / Qty</label>
                <input type="number" min="1" max="10" value="1" class="service-qty w-full bg-white text-slate-900 px-3 py-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none" onchange="calculateOrder()" oninput="calculateOrder()">
            </div>
            <div>
                <label class="block text-[11px] font-semibold text-slate-300 mb-1">Jumlah Mitra</label>
                <input type="number" min="1" max="5" value="1" class="service-mitra w-full bg-white text-slate-900 px-3 py-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none" onchange="calculateOrder()" oninput="calculateOrder()">
            </div>
        </div>
    `;

    container.appendChild(rowElement);
    calculateOrder();
}

/**
 * Menghapus Baris Layanan
 */
function removeServiceRow(rowId) {
    const element = document.getElementById(rowId);
    if (element) {
        element.remove();
        calculateOrder();
    }
}

/**
 * Kalkulasi Real-time Estimasi Total
 */
function calculateOrder() {
    const rows = document.querySelectorAll('#servicesContainer > div');
    const receiptContainer = document.getElementById('receiptItems');
    const areaTransportSelect = document.getElementById('areaTransport');
    
    let subtotal = 0;
    let selectedItems = [];

    const transportFee = areaTransportSelect ? parseInt(areaTransportSelect.value) || 0 : 15000;

    rows.forEach((row) => {
        const select = row.querySelector('.service-select');
        const qtyInput = row.querySelector('.service-qty');
        const mitraInput = row.querySelector('.service-mitra');

        const serviceName = select ? select.value : '';
        const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
        const mitra = mitraInput ? parseInt(mitraInput.value) || 1 : 1;

        if (serviceName && PRICE_LIST[serviceName]) {
            let basePrice = PRICE_LIST[serviceName];
            const itemTotal = basePrice * qty * mitra;
            subtotal += itemTotal;

            selectedItems.push({
                name: serviceName,
                qty: qty,
                mitra: mitra,
                total: itemTotal
            });
        }
    });

    if (selectedItems.length === 0) {
        receiptContainer.innerHTML = `<p class="text-slate-400 italic text-center py-2">Pilih layanan dulu untuk melihat estimasi.</p>`;
    } else {
        receiptContainer.innerHTML = selectedItems.map(item => `
            <div class="flex justify-between items-start gap-2">
                <div>
                    <p class="font-bold text-slate-800">${item.name}</p>
                    <p class="text-xs text-slate-500">${item.qty}x | ${item.mitra} Mitra</p>
                </div>
                <span class="font-bold text-slate-900 shrink-0">Rp ${item.total.toLocaleString('id-ID')}</span>
            </div>
        `).join('');
    }

    const grandTotal = subtotal + transportFee;

    document.getElementById('receiptSubtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('receiptTransport').textContent = `Rp ${transportFee.toLocaleString('id-ID')}`;
    document.getElementById('receiptTotal').textContent = `Rp ${grandTotal.toLocaleString('id-ID')}`;
}

/**
 * Format & Kirim Data Pesanan ke WhatsApp
 */
function sendToWhatsApp() {
    const nama = document.getElementById('nama').value.trim();
    const alamat = document.getElementById('alamat').value.trim();
    const tanggal = document.getElementById('tanggal').value;
    const jam = document.getElementById('jam').value;
    const areaSelect = document.getElementById('areaTransport');
    const areaText = areaSelect.options[areaSelect.selectedIndex].text;
    const transportFee = parseInt(areaSelect.value) || 0;

    // Ambil info hewan peliharaan
    const hewanRadio = document.querySelector('input[name="hewan"]:checked').value;
    const jenisHewanInput = document.getElementById('jenisHewan').value.trim();
    let hewanInfo = hewanRadio;
    if (hewanRadio === 'Ada' && jenisHewanInput !== '') {
        hewanInfo = `Ada (${jenisHewanInput})`;
    }

    const rows = document.querySelectorAll('#servicesContainer > div');
    let servicesText = '';
    let subtotal = 0;
    let count = 0;

    rows.forEach((row) => {
        const select = row.querySelector('.service-select');
        const qty = row.querySelector('.service-qty').value || 1;
        const mitra = row.querySelector('.service-mitra').value || 1;

        const serviceName = select ? select.value : '';
        if (serviceName && PRICE_LIST[serviceName]) {
            count++;
            const basePrice = PRICE_LIST[serviceName];
            const itemTotal = basePrice * qty * mitra;

            subtotal += itemTotal;
            
            servicesText += `${count}. *${serviceName}*\n   - Durasi/Qty: ${qty}\n   - Jumlah Mitra: ${mitra} Orang\n   - Subtotal: Rp ${itemTotal.toLocaleString('id-ID')}\n`;
        }
    });

    if (count === 0) {
        alert('Silakan pilih minimal satu layanan terlebih dahulu.');
        return;
    }

    const total = subtotal + transportFee;

    const message = `Halo *B_cleanbandung*, saya ingin memesan layanan cleaning:

*Data Pelanggan:*
• Nama: ${nama}
• Alamat: ${alamat}
• Area Ongkir: ${areaText}
• Jadwal: ${tanggal} (Jam ${jam} WIB)
• Hewan Peliharaan: ${hewanInfo}

*Layanan yang Dipilih:*
${servicesText}
*Rincian Biaya:*
• Subtotal Layanan: Rp ${subtotal.toLocaleString('id-ID')}
• Transport/Ongkir: Rp ${transportFee.toLocaleString('id-ID')}
• *Estimasi Total: Rp ${total.toLocaleString('id-ID')}*

Mohon informasi ketersediaan jadwalnya. Terima kasih!`;

    const waUrl = `https://wa.me/628977990105?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
}