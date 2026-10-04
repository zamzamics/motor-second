# GARASI MOTOR PRO - Web Brosur Jual Beli Motor Bekas Profesional & Terintegrasi WhatsApp

Web brosur digital modern, elegan, dan profesional untuk showroom jual beli motor bekas (*secondhand motorcycles*), dilengkapi dengan sistem katalog interaktif, inspeksi 50 titik, kalkulator simulasi kredit, formulir tukar tambah langsung ke WhatsApp, serta floating WhatsApp live assistance.

---

## 🌟 Fitur Utama

### 1. 🏍️ Katalog Interaktif & Filter Real-Time
- **Filter Cepat Merek**: Honda, Yamaha, Kawasaki, Vespa, Uwinfly, Gesits.
- **Filter Tipe / Kategori**: Sepeda Listrik & EV, Maxi Scooter, Sport & Fairing, Modern Retro, Adventure.
- **Filter Rentang Harga**: < 10 Juta (Sepeda Listrik), < 25 Juta, 25-35 Juta, 35-50 Juta, > 50 Juta.
- **Pengurutan (Sorting)**: Harga Termurah/Tertinggi, Tahun Terbaru, Kilometer Terendah.
- **Pencarian Langsung (Live Search)**: Pencarian cepat berdasarkan model/nama motor & sepeda listrik.

### 2. 📱 Integrasi WhatsApp Komprehensif (Otomatis & Terstruktur)
Semua aksi di website terhubung langsung dengan pesan WhatsApp yang rapi dan terformat otomatis:
- **Tanya Ketersediaan & Nego Motor**: Mengirimkan detail unit (Merek, Tipe, Tahun, Kode Unit, Harga Cash, KM, Plat) langsung ke sales.
- **Kalkulator Simulasi Kredit Leasing**: Menghitung DP & cicilan bulanan secara instan, lalu dapat dikirim langsung ke tim leasing via WA.
- **Formulir Jual / Tukar Tambah Motor**: Calon pembeli/penjual dapat memasukkan data motor lama mereka (Merek, Seri, Tahun, KM, Kelengkapan Dokumen STNK/BPKB, Ekspektasi Harga, Kondisi Fisik) yang otomatis di-format rapi ke WhatsApp admin penilai/appraisal.
- **Floating WhatsApp Sales Assistance**: Pop-up floating widget dengan pilihan 2 sales konsultan (*Mas Rizky* & *Mbak Cindy*) dan quick inquiry pills.

### 3. 🔍 Lembar Hasil Inspeksi 50+ Titik (Modal Detail)
- Setiap motor dilengkapi modal informasi lengkap dan checklist uji kelayakan 50+ titik (Rangka presisi bebas karat, mesin kering tanpa rembes, CVT halus anti-gredek, kelistrikan & ECU, serta keabsahan surat Samsat).

### 4. ⚙️ Pengaturan Nomor WhatsApp & Showroom Fleksibel (Tanpa Koding)
- Showroom owner dapat mengubah nomor WhatsApp admin, nama showroom, dan alamat secara langsung lewat tombol **"⚙️ Atur No. WhatsApp Showroom"** di pojok kanan atas.
- Pengaturan tersimpan otomatis di `localStorage` peramban.

---

## 🚀 Cara Menjalankan & Membuka Website

### Opsi 1: Melalui Local Server (Aktif di port 3000)
Server lokal Node.js telah berjalan:
```
http://localhost:3000/
```
Buka URL di atas melalui Google Chrome, Microsoft Edge, atau browser favorit Anda.

### Opsi 2: Buka Langsung File `index.html`
Anda juga dapat langsung mengklik dua kali file `index.html` di folder:
```
c:\Users\Administrator\Pictures\web brosur\index.html
```

---

## 📁 Struktur Berkas

```
web brosur/
├── assets/
│   └── images/
│       ├── hero_showroom.jpg        # Foto interior showroom mewah
│       ├── bike_pcx.jpg             # Honda PCX 160 ABS 2023
│       ├── bike_vespa.jpg           # Vespa Sprint 150 i-get 2022
│       ├── bike_ninja.jpg           # Kawasaki Ninja ZX-10R 2022
│       ├── bike_nmax.jpg            # Yamaha All New NMAX 155 2023
│       ├── bike_scoopy.jpg          # Honda Scoopy Prestige 2023
│       ├── bike_adv.jpg             # Honda ADV 160 CBS 2023
│       └── customer_handover.jpg    # Dokumentasi serah terima konsumen
├── index.html                       # Struktur HTML semantik & SEO-ready
├── styles.css                       # Desain sistem otomotif modern, glassmorphism, responsive
├── app.js                           # Logika katalog, kalkulator, modal, dan integrasi WhatsApp
├── server.js                        # HTTP Server Node.js zero-dependency
└── README.md                        # Panduan dokumentasi proyek
```
