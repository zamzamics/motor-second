/**
 * GARASI MOTOR PRO - Interactive Motorcycle Brochure & WhatsApp Integration
 * Features: Live Catalog Filtering, 50-Point Inspection Modal, Loan Calculator,
 * WhatsApp Lead Automation, Configurable Showroom Phone via LocalStorage.
 */

// =============================================================================
// 1. SHOWROOM CONFIGURATION & STORAGE
// =============================================================================
const DEFAULT_CONFIG = {
  showroomName: 'GARASI MOTOR PRO',
  phone: '6281288997700',
  displayPhone: '0812-8899-7700',
  address: 'Jl. Raya Otista No. 188, Jatinegara, Jakarta Timur, DKI Jakarta 13330',
  email: 'halo@garasimotorpro.com'
};

function getShowroomConfig() {
  const saved = localStorage.getItem('garasi_motor_config');
  if (saved) {
    try {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Error parsing config from localStorage', e);
    }
  }
  return DEFAULT_CONFIG;
}

function saveShowroomConfig(newConfig) {
  localStorage.setItem('garasi_motor_config', JSON.stringify(newConfig));
  applyConfigToUI();
}

function formatPhoneDisplay(raw) {
  let cleaned = raw.replace(/\D/g, '');
  if (cleaned.startsWith('62')) {
    cleaned = '0' + cleaned.slice(2);
  }
  if (cleaned.length >= 11) {
    return cleaned.slice(0, 4) + '-' + cleaned.slice(4, 8) + '-' + cleaned.slice(8);
  }
  return raw;
}

function applyConfigToUI() {
  const cfg = getShowroomConfig();

  // Top bar phone
  const displayPhoneText = document.getElementById('displayPhoneText');
  if (displayPhoneText) displayPhoneText.textContent = cfg.displayPhone || formatPhoneDisplay(cfg.phone);

  // Secondary phone in location
  const displayPhoneSecondary = document.getElementById('displayPhoneSecondary');
  if (displayPhoneSecondary) displayPhoneSecondary.textContent = cfg.displayPhone || formatPhoneDisplay(cfg.phone);

  // Footer phone
  const footerPhoneText = document.getElementById('footerPhoneText');
  if (footerPhoneText) footerPhoneText.textContent = cfg.displayPhone || formatPhoneDisplay(cfg.phone);

  // Address
  const displayAddress = document.getElementById('displayAddress');
  if (displayAddress && cfg.address) displayAddress.textContent = cfg.address;

  // Config Modal inputs
  const cfgShowroomName = document.getElementById('cfgShowroomName');
  if (cfgShowroomName) cfgShowroomName.value = cfg.showroomName;
  const cfgPhone = document.getElementById('cfgPhone');
  if (cfgPhone) cfgPhone.value = cfg.phone;
  const cfgAddress = document.getElementById('cfgAddress');
  if (cfgAddress) cfgAddress.value = cfg.address;
}

// =============================================================================
// 2. MOTORCYCLE CATALOG DATA
// =============================================================================
const MOTORCYCLES = [
  {
    id: 1,
    name: 'Honda PCX 160 ABS',
    code: 'GMP-PCX01',
    brand: 'Honda',
    category: 'Maxi Scooter',
    year: 2023,
    price: 29800000,
    dpMin: 3500000,
    monthlyEst: 1150000,
    km: '8.400 KM',
    plate: 'Plat B (Jakarta Barat)',
    tax: 'Pajak Hidup (Nov 2026)',
    color: 'Putih Mutiara (Pearl White)',
    image: 'assets/images/bike_pcx.jpg',
    badgeType: 'bestseller',
    badgeLabel: '🔥 BEST SELLER',
    warrantyTag: 'Garansi 6 Bulan',
    specs: {
      engine: '156.9 cc, 4-Katup eSP+, PGM-FI Liquid Cooled',
      power: '16.0 PS @ 8.500 rpm',
      transmission: 'Otomatis V-Matic',
      brakes: 'Depan ABS Disc, Belakang Disc Brake',
      tires: 'Tubeless Michelin 90% Tebal',
      keys: 'Honda Smart Key (Keyless) 2 Remote + Barcode Lengkap'
    },
    inspection: [
      'Rangka sasis eSAF 100% presisi, bebas karat & bergaransi',
      'Mesin halus kering, suara senyap tanpa getar gredek',
      'CVT sudah servis tune up & ganti vanbelt orisinil',
      'Kelistrikan, speedometer LCD, lampu LED all normal',
      'Surat lengkap (BPKB, STNK, Faktur Asli) akur 100%'
    ],
    description: 'Unit tangan pertama dari baru pemakaian pribadi terawat. Seluruh bodi terlindungi lapisan coating, ban masih tebal berbulu. Buku pedoman dan buku servis berkala AHASS lengkap.'
  },
  {
    id: 2,
    name: 'Vespa Sprint 150 i-get ABS',
    code: 'GMP-VSP02',
    brand: 'Vespa',
    category: 'Modern Retro',
    year: 2022,
    price: 46500000,
    dpMin: 6000000,
    monthlyEst: 1650000,
    km: '9.200 KM',
    plate: 'Plat D (Bandung Kota)',
    tax: 'Pajak Panjang (Mei 2027)',
    color: 'Giallo Sole (Kuning Favorit)',
    image: 'assets/images/bike_vespa.jpg',
    badgeType: 'retro',
    badgeLabel: '✨ ICONIC RETRO',
    warrantyTag: 'Mulus Orisinil',
    specs: {
      engine: '154.8 cc, 3-Valves i-get Electronic Injection',
      power: '11.8 PS @ 7.500 rpm',
      transmission: 'CVT Otomatis dengan Torque Server',
      brakes: 'Depan 200mm Disc ABS, Belakang Drum 140mm',
      tires: 'Pirelli SL38 Tubeless 88%',
      keys: 'Kunci Cokelat Master + Biru Asli Lengkap'
    },
    inspection: [
      'Bodi plat baja orisinil 100%, bebas las/ketok/penyok',
      'CVT i-get telah di-upgrade anti gredek, tarikan sangat halus',
      'Blok mesin kering tanpa rembesan oli sedikitpun',
      'Headlamp LED heksagonal & stoplamp tajam menyala prima',
      'Dokumen impor faktur Piaggio Indonesia sah & verified'
    ],
    description: 'Warna kuning legendaris Giallo Sole yang sangat dicari. Cocok untuk nongkrong, koleksi, atau riding akhir pekan. Kondisi cat orisinil pabrik tanpa sol-solan.'
  },
  {
    id: 3,
    name: 'Kawasaki Ninja ZX-10R ABS SE',
    code: 'GMP-ZXR03',
    brand: 'Kawasaki',
    category: 'Sport & Fairing',
    year: 2022,
    price: 105000000,
    dpMin: 20000000,
    monthlyEst: 3200000,
    km: '6.100 KM (Low KM)',
    plate: 'Plat B (Jakarta Selatan)',
    tax: 'Pajak Hidup (Okt 2026)',
    color: 'Lime Green Metallic KRT Edition',
    image: 'assets/images/bike_ninja.jpg',
    badgeType: 'bestseller',
    badgeLabel: '⚡ SUPER SPORT',
    warrantyTag: 'Simpanan Low KM',
    specs: {
      engine: '998 cc, 4-Cylinder DOHC 16-Valves Liquid-cooled',
      power: '203 PS @ 13.200 rpm',
      transmission: '6-Speed Return with KQS Quickshifter',
      brakes: 'Dual Brembo M50 Monobloc with KIBS Cornering ABS',
      tires: 'Bridgestone Battlax Racing Street RS11 92%',
      keys: '2 Kunci Asli Immobilizer + Knalpot Akrapovic Carbon'
    },
    inspection: [
      'Rangka sasis alumunium Twin-Spar presisi pabrikan no rebah',
      'Mesin 4 silinder raungan bulat padat, kompresi prima',
      'Sistem suspensi Showa Balance Free Fork berfungsi optimal',
      'Elektronik IMU 6-axis, Traction Control & Launch Control 100% aktif',
      'Dokumen Form A, BPKB, STNK atas nama perorangan sah'
    ],
    description: 'Kondisi kolektor istimewa! Motor simpanan garasi indoor tidak pernah dipakai sirkuit apalagi jatuh. Suara knalpot gahar dan part orisinil tersimpan rapi.'
  },
  {
    id: 4,
    name: 'Yamaha All New NMAX 155 Connected',
    code: 'GMP-NMX04',
    brand: 'Yamaha',
    category: 'Maxi Scooter',
    year: 2023,
    price: 28500000,
    dpMin: 3000000,
    monthlyEst: 1080000,
    km: '12.300 KM',
    plate: 'Plat F (Bogor Kota)',
    tax: 'Pajak Hidup (Des 2026)',
    color: 'Matte Blue Elegance (Gold Velg)',
    image: 'assets/images/bike_nmax.jpg',
    badgeType: 'promo',
    badgeLabel: '🌟 FAVORIT KELUARGA',
    warrantyTag: 'DP Ringan',
    specs: {
      engine: '155 cc Liquid Cooled 4-Stroke SOHC VVA Blue Core',
      power: '15.4 PS @ 8.000 rpm',
      transmission: 'V-Belt Automatic',
      brakes: 'Dual Channel ABS Depan & Belakang',
      tires: 'Tubeless Michelin Pilot Street Baru',
      keys: 'Smart Key System (Keyless) + Y-Connect Bluetooth'
    },
    inspection: [
      'Modul Y-Connect aktif terhubung ke aplikasi smartphone',
      'VVA (Variable Valve Actuation) membuka responsif di 6000 rpm',
      'Suspensi belakang tabung sub-tank empuk & nyaman',
      'Piringan cakram tebal, oli mesin & oli gardan baru ganti',
      'Legalitas berkas Samsat aman bebas blokir'
    ],
    description: 'Skutik maxi primadona keluarga Indonesia. Ergonomi santai dengan pijakan kaki selonjoran. Kapasitas bagasi besar muat helm full-face plus jaket touring.'
  },
  {
    id: 5,
    name: 'Honda Scoopy Prestige Smart Key',
    code: 'GMP-SCP05',
    brand: 'Honda',
    category: 'Modern Retro',
    year: 2023,
    price: 20300000,
    dpMin: 2000000,
    monthlyEst: 790000,
    km: '7.800 KM',
    plate: 'Plat B (Bekasi)',
    tax: 'Pajak Hidup (Jan 2027)',
    color: 'Prestige Matte Beige & Brown',
    image: 'assets/images/bike_scoopy.jpg',
    badgeType: 'retro',
    badgeLabel: '🎯 IRIT & GESIT',
    warrantyTag: 'Tangan Pertama',
    specs: {
      engine: '109.5 cc SOHC eSP PGM-FI Generasi Terbaru',
      power: '9.0 PS @ 7.500 rpm',
      transmission: 'Otomatis V-Matic',
      brakes: 'Combi Brake System (CBS) dengan Hydraulic Disc',
      tires: 'Velg 12 Inch Tubeless Tebal 90%',
      keys: 'Honda Smart Key (Keyless) 2 Remote Asli'
    },
    inspection: [
      'Konsumsi BBM super irit tercatat hingga 59 km/liter',
      'Sistem starter ACG halus tanpa hentakan',
      'Bodi mulus terpasang stiker film pelindung antigores',
      'USB Power Charger di console box berfungsi normal',
      'Buku servis dan buku garansi resmi lengkap'
    ],
    description: 'Motor matic harian idaman yang sangat stylish. Jok cokelat kulit elegan, posisi riding ringan dan lincah bermanuver di jalanan kota. Siap langsung pakai.'
  },
  {
    id: 6,
    name: 'Honda ADV 160 CBS Tough',
    code: 'GMP-ADV06',
    brand: 'Honda',
    category: 'Adventure',
    year: 2023,
    price: 31900000,
    dpMin: 4000000,
    monthlyEst: 1250000,
    km: '10.500 KM',
    plate: 'Plat B (Tangerang Kota)',
    tax: 'Pajak Hidup (Sept 2026)',
    color: 'Tough Matte Black & Racing Red',
    image: 'assets/images/bike_adv.jpg',
    badgeType: 'promo',
    badgeLabel: '🏔️ ADVENTURE READY',
    warrantyTag: 'Bebas Banjir',
    specs: {
      engine: '156.9 cc 4-Katup eSP+ Liquid Cooled PGM-FI',
      power: '16.0 PS @ 8.500 rpm',
      transmission: 'Otomatis V-Matic',
      brakes: 'Wavy Disc Brake Depan Belakang with CBS',
      tires: 'Dual-Purpose Semi Trail 85%',
      keys: 'Smart Key System (Keyless) 2 Remote Lengkap'
    },
    inspection: [
      'Ground clearance tinggi 165mm aman dari polisi tidur & genangan',
      'Windscreen adjustable 2 posisi bekerja lancar',
      'Suspensi belakang twin sub-tank Showa sangat stabil',
      'Panel instrumen full digital lengkap informasi tachometer',
      'Faktur pembelian dan STNK/BPKB asli verified'
    ],
    description: 'Skutik petualang dengan desain garang dan macho. Tangguh di segala medan jalan berlubang. Siap untuk komuter harian maupun perjalanan touring jarak jauh.'
  }
];

// =============================================================================
// 3. WHATSAPP LINK GENERATOR HELPER
// =============================================================================
function openDirectWhatsApp(messageText) {
  const cfg = getShowroomConfig();
  let cleanPhone = cfg.phone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  }
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
  window.open(url, '_blank');
}

function chatWithAgent(agentName, defaultMsg) {
  const msg = `${defaultMsg} (Ditujukan ke: ${agentName})`;
  openDirectWhatsApp(msg);
  // Close chat popup
  const popup = document.getElementById('waChatPopup');
  if (popup) popup.classList.add('hidden');
}

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

// =============================================================================
// 4. CATALOG FILTERING & RENDERING
// =============================================================================
let currentFilters = {
  brand: 'all',
  category: 'all',
  priceRange: 'all',
  searchQuery: '',
  sortBy: 'recommended'
};

function renderMotorGrid() {
  const grid = document.getElementById('motorGrid');
  const countEl = document.getElementById('resultsCount');
  const noResultsState = document.getElementById('noResultsState');
  if (!grid) return;

  // Filter items
  let filtered = MOTORCYCLES.filter(item => {
    // Brand
    if (currentFilters.brand !== 'all' && item.brand.toLowerCase() !== currentFilters.brand.toLowerCase()) {
      return false;
    }
    // Category
    if (currentFilters.category !== 'all' && item.category !== currentFilters.category) {
      return false;
    }
    // Search query
    if (currentFilters.searchQuery.trim() !== '') {
      const q = currentFilters.searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchBrand = item.brand.toLowerCase().includes(q);
      const matchColor = item.color.toLowerCase().includes(q);
      const matchCode = item.code.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchColor && !matchCode) {
        return false;
      }
    }
    // Price range
    if (currentFilters.priceRange === 'under25' && item.price >= 25000000) return false;
    if (currentFilters.priceRange === '25to35' && (item.price < 25000000 || item.price > 35000000)) return false;
    if (currentFilters.priceRange === '35to50' && (item.price < 35000000 || item.price > 50000000)) return false;
    if (currentFilters.priceRange === 'above50' && item.price <= 50000000) return false;

    return true;
  });

  // Sort items
  if (currentFilters.sortBy === 'priceLow') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sortBy === 'priceHigh') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sortBy === 'yearNew') {
    filtered.sort((a, b) => b.year - a.year);
  } else if (currentFilters.sortBy === 'kmLow') {
    filtered.sort((a, b) => parseInt(a.km.replace(/\D/g, '')) - parseInt(b.km.replace(/\D/g, '')));
  }

  // Update counter
  if (countEl) {
    countEl.innerHTML = `Menampilkan <strong>${filtered.length}</strong> unit motor siap bawa pulang`;
  }

  // Show or hide empty state
  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noResultsState) noResultsState.classList.remove('hidden');
    return;
  } else {
    if (noResultsState) noResultsState.classList.add('hidden');
  }

  // Render cards
  grid.innerHTML = filtered.map(item => {
    return `
      <article class="motor-card" data-id="${item.id}">
        <div class="motor-card-media">
          <img src="${item.image}" alt="${item.name}" class="motor-card-img" loading="lazy">
          <div class="card-badge-top-left">
            <span class="unit-tag tag-${item.badgeType}">${item.badgeLabel}</span>
            <span class="unit-tag tag-warranty"><i class="fa-solid fa-shield-check"></i> ${item.warrantyTag}</span>
          </div>
          <span class="unit-code-badge">${item.code}</span>
        </div>

        <div class="motor-card-body">
          <div class="card-title-group">
            <span class="card-category-brand">${item.brand} • ${item.category}</span>
            <h3 class="motor-card-title">${item.name}</h3>
          </div>

          <!-- 4-Grid Key Specs -->
          <div class="card-spec-grid">
            <div class="spec-chip">
              <i class="fa-regular fa-calendar"></i>
              <span>Tahun ${item.year}</span>
            </div>
            <div class="spec-chip">
              <i class="fa-solid fa-gauge-high"></i>
              <span>${item.km}</span>
            </div>
            <div class="spec-chip green-tax">
              <i class="fa-solid fa-shield-halved"></i>
              <span>${item.tax}</span>
            </div>
            <div class="spec-chip">
              <i class="fa-solid fa-id-card"></i>
              <span>${item.plate}</span>
            </div>
          </div>

          <!-- Pricing -->
          <div class="card-pricing-box">
            <div class="price-row">
              <span class="price-cash-label">Harga OTR Cash:</span>
              <span class="price-cash-val">${formatRupiah(item.price)}</span>
            </div>
            <div class="price-credit-est">
              <span>DP mulai ${formatRupiah(item.dpMin)}</span>
              <span>Cicilan <strong>${formatRupiah(item.monthlyEst)}/bln</strong></span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions">
            <button class="btn-detail" onclick="openUnitModal(${item.id})">
              <i class="fa-solid fa-circle-info"></i> Detail & Cek
            </button>
            <button class="btn-wa-card" onclick="inquireMotorViaWA(${item.id})">
              <i class="fa-brands fa-whatsapp"></i> Chat WA
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function inquireMotorViaWA(motorId) {
  const motor = MOTORCYCLES.find(m => m.id === motorId);
  if (!motor) return;
  const msg = `Halo Garasi Motor Pro, saya tertarik dengan unit motor second:\n\n*Unit:* ${motor.name} (${motor.year})\n*Kode Unit:* ${motor.code}\n*Harga Cash:* ${formatRupiah(motor.price)}\n*Plat:* ${motor.plate}\n*KM:* ${motor.km}\n\nApakah unit ini masih tersedia? Bisa tolong kirimkan video kondisi mesin dan apakah harganya masih bisa nego tipis? Terima kasih!`;
  openDirectWhatsApp(msg);
}

function filterByQuick(brand, category) {
  currentFilters.brand = brand;
  currentFilters.category = category;

  // Sync active pills
  document.querySelectorAll('#brandPills .filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.val === brand);
  });
  document.querySelectorAll('#categoryPills .filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.val === category);
  });

  renderMotorGrid();
}

// =============================================================================
// 5. MOTORCYCLE DETAIL & INSPECTION MODAL
// =============================================================================
function openUnitModal(motorId) {
  const motor = MOTORCYCLES.find(m => m.id === motorId);
  if (!motor) return;

  const modalBody = document.getElementById('unitModalBody');
  const overlay = document.getElementById('unitModalOverlay');
  if (!modalBody || !overlay) return;

  modalBody.innerHTML = `
    <div class="modal-hero-split">
      <div class="modal-img-wrapper">
        <img src="${motor.image}" alt="${motor.name}">
      </div>
      <div class="modal-quick-info">
        <span class="card-category-brand">${motor.brand} • ${motor.category} • Kode: ${motor.code}</span>
        <h2>${motor.name} (${motor.year})</h2>
        <p style="color: #94a3b8; font-size: 0.9rem;">Warna: <strong style="color:#ffffff;">${motor.color}</strong> | ${motor.km}</p>

        <div class="modal-price-box">
          <div style="font-size: 0.8rem; color: #94a3b8;">Harga Tunai (Nego Halus):</div>
          <div class="modal-price-val">${formatRupiah(motor.price)}</div>
          <div class="modal-dp-text">
            <i class="fa-solid fa-check"></i> Estimasi DP: ${formatRupiah(motor.dpMin)} • Cicilan: ${formatRupiah(motor.monthlyEst)}/bln
          </div>
        </div>

        <p style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 1rem;">
          ${motor.description}
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.8rem; background: rgba(0,0,0,0.25); padding: 0.75rem; border-radius: 8px;">
          <div><span style="color:#94a3b8;">Plat Nomor:</span> <br><strong>${motor.plate}</strong></div>
          <div><span style="color:#94a3b8;">Status Pajak:</span> <br><strong style="color:var(--wa-green);">${motor.tax}</strong></div>
          <div><span style="color:#94a3b8;">Kunci Cadangan:</span> <br><strong>${motor.specs.keys}</strong></div>
          <div><span style="color:#94a3b8;">Kondisi Ban:</span> <br><strong>${motor.specs.tires}</strong></div>
        </div>
      </div>
    </div>

    <!-- 50-Point Inspection Section -->
    <div class="inspection-box">
      <div class="inspection-header">
        <h3><i class="fa-solid fa-clipboard-check text-success"></i> Lembar Hasil Inspeksi Profesional (50+ Titik)</h3>
        <span class="badge-approved"><i class="fa-solid fa-circle-check"></i> 100% Lulus Uji</span>
      </div>

      <div class="checklist-grid">
        ${motor.inspection.map(item => `
          <div class="check-item">
            <i class="fa-solid fa-circle-check"></i>
            <span>${item}</span>
          </div>
        `).join('')}
        <div class="check-item">
          <i class="fa-solid fa-circle-check"></i>
          <span>Nomor Rangka & Nomor Mesin Akur 100% dengan Faktur BPKB</span>
        </div>
        <div class="check-item">
          <i class="fa-solid fa-circle-check"></i>
          <span>Sistem Pengereman & Minyak Rem telah dikuras & diuji pakem</span>
        </div>
        <div class="check-item">
          <i class="fa-solid fa-circle-check"></i>
          <span>Jaminan 100% Bebas Tabrak Fatal & Bebas Rendam Banjir</span>
        </div>
      </div>
    </div>

    <!-- Modal Action Buttons -->
    <div class="modal-cta-buttons">
      <button class="btn btn-wa-full btn-large" onclick="inquireMotorViaWA(${motor.id})">
        <i class="fa-brands fa-whatsapp"></i> Tanya Unit & Nego via WhatsApp
      </button>
      <button class="btn btn-outline btn-large" onclick="prefillCreditCalculator(${motor.id})">
        <i class="fa-solid fa-calculator"></i> Hitung Simulasi Kredit
      </button>
    </div>
  `;

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeUnitModal() {
  const overlay = document.getElementById('unitModalOverlay');
  if (overlay) overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

function prefillCreditCalculator(motorId) {
  closeUnitModal();
  const motor = MOTORCYCLES.find(m => m.id === motorId);
  if (!motor) return;

  const select = document.getElementById('calcMotorSelect');
  const priceInput = document.getElementById('calcPrice');
  if (select) select.value = motor.id;
  if (priceInput) priceInput.value = motor.price;

  calculateCreditSimulation();

  // Scroll smoothly to calculator
  const calcSection = document.getElementById('simulasi-kredit');
  if (calcSection) {
    calcSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// =============================================================================
// 6. CREDIT / LOAN CALCULATOR LOGIC
// =============================================================================
let activeTenorMonths = 23;

function populateCalculatorDropdown() {
  const select = document.getElementById('calcMotorSelect');
  if (!select) return;

  select.innerHTML = MOTORCYCLES.map(m => {
    return `<option value="${m.id}">${m.name} (${m.year}) - ${formatRupiah(m.price)}</option>`;
  }).join('');

  select.addEventListener('change', (e) => {
    const selected = MOTORCYCLES.find(m => m.id == e.target.value);
    if (selected) {
      const priceInput = document.getElementById('calcPrice');
      if (priceInput) priceInput.value = selected.price;
      calculateCreditSimulation();
    }
  });
}

function calculateCreditSimulation() {
  const priceInput = document.getElementById('calcPrice');
  const dpSlider = document.getElementById('calcDpSlider');
  const dpPercentLabel = document.getElementById('dpPercentLabel');
  const dpAmountFormatted = document.getElementById('dpAmountFormatted');
  const calcResultMotorName = document.getElementById('calcResultMotorName');
  const calcResultPrice = document.getElementById('calcResultPrice');
  const calcResultDp = document.getElementById('calcResultDp');
  const calcResultTenor = document.getElementById('calcResultTenor');
  const calcMonthlyResult = document.getElementById('calcMonthlyResult');
  const select = document.getElementById('calcMotorSelect');

  if (!priceInput || !dpSlider) return;

  const price = parseFloat(priceInput.value) || 0;
  const dpPercent = parseInt(dpSlider.value, 10) || 20;

  // Calculate DP in Rupiah
  const dpAmount = Math.round(price * (dpPercent / 100));
  const loanPrincipal = Math.max(0, price - dpAmount);

  // Typical motorcycle leasing flat interest rate ~ 9% per annum
  const annualRate = 0.09;
  const tenorYears = activeTenorMonths / 12;
  const totalInterest = loanPrincipal * annualRate * tenorYears;
  const totalLoanWithInterest = loanPrincipal + totalInterest;
  const monthlyInstallment = Math.round(totalLoanWithInterest / activeTenorMonths);

  // Update slider badges
  if (dpPercentLabel) dpPercentLabel.textContent = `${dpPercent}%`;
  if (dpAmountFormatted) dpAmountFormatted.textContent = formatRupiah(dpAmount);

  // Selected motor info
  let selectedMotor = MOTORCYCLES.find(m => m.id == select.value);
  const motorName = selectedMotor ? `${selectedMotor.name} (${selectedMotor.year})` : 'Unit Motor Pilihan';

  if (calcResultMotorName) calcResultMotorName.textContent = motorName;
  if (calcResultPrice) calcResultPrice.textContent = formatRupiah(price);
  if (calcResultDp) calcResultDp.textContent = `${formatRupiah(dpAmount)} (${dpPercent}%)`;
  if (calcResultTenor) calcResultTenor.textContent = `${activeTenorMonths} Bulan`;

  if (calcMonthlyResult) {
    calcMonthlyResult.innerHTML = `${formatRupiah(monthlyInstallment)}<span class="per-month">/bulan</span>`;
  }
}

function setupCalculatorEvents() {
  const priceInput = document.getElementById('calcPrice');
  const dpSlider = document.getElementById('calcDpSlider');
  const tenorButtons = document.querySelectorAll('#tenorSelector .tenor-btn');
  const btnSendCalcWa = document.getElementById('btnSendCalcWa');

  if (priceInput) {
    priceInput.addEventListener('input', calculateCreditSimulation);
  }

  if (dpSlider) {
    dpSlider.addEventListener('input', calculateCreditSimulation);
  }

  tenorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tenorButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTenorMonths = parseInt(btn.dataset.months, 10);
      calculateCreditSimulation();
    });
  });

  if (btnSendCalcWa) {
    btnSendCalcWa.addEventListener('click', () => {
      const select = document.getElementById('calcMotorSelect');
      const selected = MOTORCYCLES.find(m => m.id == select.value);
      const motorName = selected ? `${selected.name} (${selected.year})` : 'Motor Bekas';
      const price = parseFloat(document.getElementById('calcPrice').value) || 0;
      const dpPercent = document.getElementById('calcDpSlider').value;
      const dpAmount = Math.round(price * (dpPercent / 100));

      const monthlyText = document.getElementById('calcMonthlyResult').innerText.replace('/bulan', '').trim();

      const msg = `Halo Garasi Motor Pro, saya ingin mengajukan simulasi kredit leasing:\n\n*Unit Motor:* ${motorName}\n*Harga OTR Cash:* ${formatRupiah(price)}\n*DP Diajukan:* ${formatRupiah(dpAmount)} (${dpPercent}%)\n*Tenor:* ${activeTenorMonths} Bulan\n*Estimasi Cicilan:* ${monthlyText} / bulan\n\nMohon informasi persyaratan data (KTP, KK, Bukti Penghasilan) dan leasing yang paling cepat proses surveynya. Terima kasih!`;

      openDirectWhatsApp(msg);
    });
  }
}

// =============================================================================
// 7. SELL / TRADE-IN FORM AUTOMATION TO WHATSAPP
// =============================================================================
function setupTradeInForm() {
  const form = document.getElementById('tradeInForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('ownerName').value.trim();
    const city = document.getElementById('ownerCity').value.trim();
    const brand = document.getElementById('motorBrand').value;
    const model = document.getElementById('motorModel').value.trim();
    const year = document.getElementById('motorYear').value.trim();
    const km = document.getElementById('motorKm').value.trim() || 'Tidak disebutkan';
    const docStatus = document.getElementById('motorDocStatus').value;
    const tradeType = document.getElementById('tradeType').value;
    const expectedPrice = document.getElementById('expectedPrice').value.trim() || 'Sesuai Pasaran';
    const notes = document.getElementById('motorConditionNotes').value.trim() || 'Kondisi standar wajar pemakaian.';

    const msg = `Halo Admin Appraisal Garasi Motor Pro,\n\nSaya ingin menanyakan taksiran harga untuk ${tradeType}:\n\n` +
      `*Nama Pemilik:* ${name}\n` +
      `*Lokasi Motor:* ${city}\n` +
      `*Merek & Model:* ${brand} ${model} (${year})\n` +
      `*Kilometer Odo:* ${km}\n` +
      `*Kelengkapan Dokumen:* ${docStatus}\n` +
      `*Harga Diharapkan:* ${expectedPrice}\n` +
      `*Catatan Kondisi:* ${notes}\n\n` +
      `Saya siap kirimkan foto detail motor (depan, samping, speedometer, dan mesin). Mohon taksiran penawarannya. Terima kasih!`;

    openDirectWhatsApp(msg);
    showToast('Membuka WhatsApp Admin Penilai...');
  });
}

// =============================================================================
// 8. CONFIG MODAL & LOCALSTORAGE MANAGEMENT
// =============================================================================
function setupConfigModal() {
  const btnOpen = document.getElementById('btnOpenConfig');
  const btnClose = document.getElementById('configModalClose');
  const overlay = document.getElementById('configModalOverlay');
  const form = document.getElementById('configForm');
  const btnReset = document.getElementById('btnResetConfig');

  if (btnOpen && overlay) {
    btnOpen.addEventListener('click', () => {
      applyConfigToUI();
      overlay.classList.remove('hidden');
    });
  }

  if (btnClose && overlay) {
    btnClose.addEventListener('click', () => {
      overlay.classList.add('hidden');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.add('hidden');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const showroomName = document.getElementById('cfgShowroomName').value.trim();
      let phone = document.getElementById('cfgPhone').value.trim();
      const address = document.getElementById('cfgAddress').value.trim();

      // Clean phone number
      phone = phone.replace(/\D/g, '');
      if (phone.startsWith('0')) {
        phone = '62' + phone.slice(1);
      }

      saveShowroomConfig({
        showroomName,
        phone,
        displayPhone: formatPhoneDisplay(phone),
        address
      });

      overlay.classList.add('hidden');
      showToast('Pengaturan Showroom & No. WhatsApp berhasil disimpan!');
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      localStorage.removeItem('garasi_motor_config');
      applyConfigToUI();
      overlay.classList.add('hidden');
      showToast('Pengaturan dikembalikan ke setelan pabrik.');
    });
  }
}

// =============================================================================
// 9. FLOATING WHATSAPP & MOBILE DRAWER
// =============================================================================
function setupFloatingWA() {
  const btn = document.getElementById('floatingWaBtn');
  const popup = document.getElementById('waChatPopup');
  const closeBtn = document.getElementById('waPopupClose');

  if (btn && popup) {
    btn.addEventListener('click', () => {
      popup.classList.toggle('hidden');
    });
  }

  if (closeBtn && popup) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.add('hidden');
    });
  }

  // Close popup if clicking outside
  document.addEventListener('click', (e) => {
    if (popup && !popup.classList.contains('hidden')) {
      const wrapper = document.getElementById('floatingWaWrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        popup.classList.add('hidden');
      }
    }
  });
}

function setupMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('closeDrawerBtn');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }
}

function closeDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.remove('open');
}

// =============================================================================
// 10. FAQ ACCORDION
// =============================================================================
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// =============================================================================
// 11. TOAST NOTIFICATIONS
// =============================================================================
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// =============================================================================
// 12. FILTER CONTROLS WIRING
// =============================================================================
function setupFilterControls() {
  const brandPills = document.querySelectorAll('#brandPills .filter-pill');
  const categoryPills = document.querySelectorAll('#categoryPills .filter-pill');
  const priceFilter = document.getElementById('priceFilter');
  const sortBy = document.getElementById('sortBy');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const btnResetFilter = document.getElementById('btnResetFilter');

  // Brand filter
  brandPills.forEach(pill => {
    pill.addEventListener('click', () => {
      brandPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilters.brand = pill.dataset.val;
      renderMotorGrid();
    });
  });

  // Category filter
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilters.category = pill.dataset.val;
      renderMotorGrid();
    });
  });

  // Price range dropdown
  if (priceFilter) {
    priceFilter.addEventListener('change', (e) => {
      currentFilters.priceRange = e.target.value;
      renderMotorGrid();
    });
  }

  // Sort by dropdown
  if (sortBy) {
    sortBy.addEventListener('change', (e) => {
      currentFilters.sortBy = e.target.value;
      renderMotorGrid();
    });
  }

  // Live search with debounce
  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      const val = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('show', val.length > 0);
      }
      timeout = setTimeout(() => {
        currentFilters.searchQuery = val;
        renderMotorGrid();
      }, 200);
    });
  }

  // Clear search
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearSearchBtn.classList.remove('show');
      currentFilters.searchQuery = '';
      renderMotorGrid();
      searchInput.focus();
    });
  }

  // Reset filters
  if (btnResetFilter) {
    btnResetFilter.addEventListener('click', () => {
      currentFilters = {
        brand: 'all',
        category: 'all',
        priceRange: 'all',
        searchQuery: '',
        sortBy: 'recommended'
      };

      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.classList.remove('show');
      if (priceFilter) priceFilter.value = 'all';
      if (sortBy) sortBy.value = 'recommended';

      brandPills.forEach(p => p.classList.toggle('active', p.dataset.val === 'all'));
      categoryPills.forEach(p => p.classList.toggle('active', p.dataset.val === 'all'));

      renderMotorGrid();
      showToast('Filter telah direset ke setelan awal.');
    });
  }
}

// Unit Modal Close Listener
const unitModalOverlay = document.getElementById('unitModalOverlay');
const unitModalClose = document.getElementById('unitModalClose');
if (unitModalClose) {
  unitModalClose.addEventListener('click', closeUnitModal);
}
if (unitModalOverlay) {
  unitModalOverlay.addEventListener('click', (e) => {
    if (e.target === unitModalOverlay) closeUnitModal();
  });
}

// Escape key closes modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeUnitModal();
    const configOverlay = document.getElementById('configModalOverlay');
    if (configOverlay) configOverlay.classList.add('hidden');
    const waPopup = document.getElementById('waChatPopup');
    if (waPopup) waPopup.classList.add('hidden');
  }
});

// =============================================================================
// 13. INITIALIZATION ON DOM READY
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  applyConfigToUI();
  populateCalculatorDropdown();
  calculateCreditSimulation();
  setupCalculatorEvents();
  setupTradeInForm();
  setupConfigModal();
  setupFloatingWA();
  setupMobileDrawer();
  setupFaqAccordion();
  setupFilterControls();
  renderMotorGrid();
});
