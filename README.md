# 🔔 Sistem Bel Otomatis & Jadwal Pelajaran SMKN 1 MOILONG
### Terintegrasi 15 Rombongan Belajar (AKL, DKV, TL) • Jam KBM 07:00 – 15:30 WITA • 100% Offline Standalone

![SMKN 1 Moilong Logo](public/logo-smkn1-moilong.svg)

---

## 📌 Tentang Aplikasi

Aplikasi **Bel Otomatis & Jadwal Pelajaran SMKN 1 MOILONG** adalah sistem manajemen operasional sekolah terpadu yang dirancang khusus untuk memenuhi kebutuhan Kegiatan Belajar Mengajar (KBM) di **SMK Negeri 1 Moilong, Kabupaten Banggai, Sulawesi Tengah**.

Sistem ini beroperasi penuh secara **Offline (Standalone)** tanpa ketergantungan koneksi internet, mengombinasikan bel sekolah berbasis waktu presisi tinggi dengan pemantauan jadwal pelajaran 15 rombongan belajar secara *real-time*.

---

## ✨ Fitur Unggulan

### 1. 🔔 Bel Otomatis Presisi Tinggi
- Pemindaian waktu berbasis detik dengan transisi akurat sesuai jam kerja sekolah (07:00 - 15:30 WITA).
- Sintesis audio ganda: **Web Audio API Chime** (sintesis frekuensi mandiri tanpa file eksternal) dan pemutar nada lonceng (*Westminster Chimes*, nada standar, melodi ganda, hingga berkas audio kustom pengguna).
- Mode darurat dan uji coba suara bel manual kapan saja.

### 2. 🏫 Manajemen Jadwal 15 Rombongan Belajar (Rombel)
- Mendukung struktur kelas lengkap:
  - **Kelas X**: X AKL 1, X AKL 2, X DKV 1, X DKV 2, X TL
  - **Kelas XI**: XI AKL 1, XI AKL 2, XI DKV 1, XI DKV 2, XI TL
  - **Kelas XII**: XII AKL 1, XII AKL 2, XII DKV 1, XII DKV 2, XII TL
- Tampilan tabel mingguan per kelas (Senin s.d. Jumat).
- Mode cetak ramah kertas (*print-friendly*) untuk arsip tata usaha atau pengumuman di dinding kelas.

### 3. 🛡️ Mesin Pencegah & Audit Bentrok Jadwal (Anti-Collision Engine)
- Validasi otomatis saat input jadwal: mencegah guru yang sama mengajar di dua kelas berbeda pada hari dan jam yang sama.
- Tombol **Audit Bentrok 15 Kelas**: memindai seluruh basis data jadwal pelajaran dalam hitungan milidetik dan menampilkan laporan detail jika ada tumpang tindih.

### 4. 🗂️ Manajemen Master Data (Guru, Mapel & Rombel)
- Kelola master guru (NIP/Kode, Nama Lengkap, Status).
- Kelola master mata pelajaran (Kode, Nama Mapel, Kategori Umum/Kejuruan).
- Kelola rombel/kelas beserta penugasan wali kelas.
- Fitur Edit dan Hapus terproteksi yang membersihkan jadwal terkait secara konsisten.

### 5. 🖥️ Dashboard Live KBM & Slider 5 Foto Banner
- Panel pemantauan langsung: menampilkan guru dan mata pelajaran yang sedang aktif di ke-15 kelas pada jam berjalan saat ini.
- Banner Slideshow 5 Foto Sekolah dengan durasi otomatis dan navigasi manual.
- **Logo Resmi Permanen**: Identitas lambang resmi SMKN 1 Moilong Kabupaten Banggai tersemat di pojok kanan atas banner foto.
- Baris **Tulisan Berjalan (Marquee)**: teks pengumuman penting sekolah yang dapat diedit langsung.

### 6. ⚙️ Menu Auto-Hide Sebelah Kanan (Dock / Drawer)
- Tampilan utama bersih dan rapi: seluruh peralatan pendukung dikelompokkan ke dalam menu samping (*dock/drawer*) sebelah kanan.
- Akses cepat via tombol gear (`⚙️ Menu Alat`) di header atas atau tab pegangan samping kanan.
- Dilengkapi opsi preferensi tutup otomatis (*auto-hide on mouse leave*).

### 7. 🚀 Autorun Startup Windows & Standalone HTML
- Panduan terintegrasi untuk menyetel aplikasi agar terbuka otomatis saat komputer operator/TU sekolah dinyalakan (*Windows Startup Shell*).
- Fitur **Unduh Berkas HTML Mandiri**: hasil ekspor satu berkas (`.html`) yang dapat langsung disalin ke flashdisk dan dijalankan di laptop manapun tanpa perlu instalasi aplikasi tambahan.

### 8. 💾 Pencadangan & Pemulihan (Backup & Restore)
- Ekspor seluruh basis data konfigurasi, jadwal 15 kelas, master data, dan log bel ke format `.json`.
- Impor data instan untuk pemulihan atau sinkronisasi antar perangkat.

---

## 💻 Spesifikasi Sistem

| Komponen | Spesifikasi Minimum / Rekomendasi |
|---|---|
| **Arsitektur** | Single Page Application (SPA), Client-side Standalone |
| **Teknologi Frontend** | HTML5, Modern CSS3 (Tailwind CSS compatible), JavaScript ES6+ / TypeScript |
| **Audio Engine** | Web Audio API (Synthesizer Chimes) & HTML5 Audio Element |
| **Penyimpanan Data** | Web Storage API (`localStorage`) – data tersimpan aman di peramban lokal |
| **Konektivitas** | **100% Offline** (Tidak memerlukan kuota/jaringan internet) |
| **Peramban Didukung** | Google Chrome 80+, Microsoft Edge 80+, Mozilla Firefox 75+, Opera 65+, Safari 14+ |
| **Sistem Operasi** | Windows 7 / 8 / 10 / 11, Linux, macOS, ChromeOS |
| **Perangkat Tambahan** | Speaker aktif / amplifier pengeras suara sekolah (terhubung ke jack 3.5mm PC/laptop) |

---

## 📦 Panduan Instalasi

Anda dapat menjalankan aplikasi ini melalui dua metode:

### Metode 1: Mode Berkas Mandiri (Paling Mudah untuk Operator Sekolah)
Metode ini **tidak membutuhkan instalasi software Node.js atau coding apapun**.

1. Unduh atau salin berkas `index.html` dari repositori ini.
2. Klik ganda (*double click*) berkas `index.html` untuk membukanya langsung di peramban (Google Chrome atau Microsoft Edge disarankan).
3. Klik tombol **"Aktifkan Suara Bel"** saat pertama kali dibuka untuk memberikan izin audio kepada browser.
4. Selesai! Aplikasi siap digunakan secara penuh.

---

### Metode 2: Menggunakan Node.js & Vite (Development / Build)
Cocok bagi pengembang atau administrator yang ingin mengompilasi ulang atau mengembangkan fitur aplikasi.

#### 1. Prasyarat
- Pastikan [Node.js](https://nodejs.org/) versi 18.x atau lebih baru telah terinstal di komputer.
- Git terpasang di sistem Anda.

#### 2. Kloning Repositori
```bash
git clone https://github.com/username/bel-otomatis-smkn1-moilong.git
cd bel-otomatis-smkn1-moilong
```

#### 3. Instal Dependensi
```bash
npm install
```

#### 4. Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Aplikasi akan aktif dan dapat diakses di peramban pada alamat:
```
http://localhost:3000
```

#### 5. Membangun Berkas Produksi
```bash
npm run build
```
Hasil build produksi siap saji akan dibuat di dalam direktori `dist/`.

#### 6. Pemeriksaan Tipe & Linting
```bash
npm run lint
```

---

## 📖 Panduan Penggunaan

### 1. Inisialisasi Audio Pertama Kali
Karena kebijakan keamanan peramban modern (*browser autoplay policy*), audio tidak dapat berbunyi otomatis sebelum ada interaksi klik pertama dari pengguna.
- Buka tab **🔔 Bel Otomatis Sekolah**.
- Klik tombol **"Aktifkan Suara Bel"** (hanya perlu dilakukan satu kali tiap membuka browser).
- Lakukan pengujian dengan mengklik **"🔔 Tes Suara Bel"** untuk memastikan suara terdengar jelas melalui speaker sekolah.

### 2. Membuka Menu Alat & Master Data
- Klik tombol ikon gear **`⚙️ Menu Alat`** di pojok kanan atas, atau sentuh pegangan menu di sebelah kanan layar.
- Melalui menu ini Anda dapat:
  - Mengelola **Data Guru** (tambah guru baru, ubah NIP, atau hapus).
  - Mengelola **Data Mata Pelajaran** (edit nama mapel, tambah baru).
  - Mengelola **Data Kelas** (atur wali kelas dan daftar 15 rombel).
  - Menjalankan **Audit Bentrok Jadwal**.
  - Mengatur **Tulisan Berjalan** dan **Foto Banner**.
  - Mengunduh cadangan JSON atau berkas HTML mandiri.

### 3. Menginput & Mengatur Jadwal Pelajaran
1. Buka tab **"📅 15 Rombel Jadwal Pelajaran"** atau klik **"➕ Tambah Jadwal Guru & Mapel"** dari Menu Alat.
2. Pilih Hari, Rombel/Kelas, Jam Mulai, Jam Selesai, Mata Pelajaran, dan Guru Pengampu.
3. Klik **"Simpan Jadwal"**.
4. Sistem akan secara otomatis memverifikasi bahwa guru yang dipilih tidak sedang bertugas di kelas lain pada jam tersebut.

### 4. Konfigurasi Autorun Saat Komputer Dinyalakan (Windows Startup)
Agar bel sekolah langsung menyala otomatis saat komputer dinyalakan di pagi hari:
1. Buka Menu Alat (ikon gear di kanan atas) ➡️ pilih **"🚀 Autorun Windows"**.
2. Ikuti petunjuk: tekan tombol `Windows + R` pada keyboard, ketik `shell:startup`, lalu tekan Enter.
3. Buat shortcut berkas `index.html` (atau berkas `.vbs` yang disediakan di panduan modal) ke dalam folder Startup tersebut.
4. Komputer sekolah kini akan otomatis membuka aplikasi bel setiap kali dinyalakan.

---

## 🗂️ Struktur Direktori Proyek

```
bel-otomatis-smkn1-moilong/
├── index.html                   # Berkas utama aplikasi web standalone & UI lengkap
├── metadata.json                # Konfigurasi metadata AI Studio
├── package.json                 # Konfigurasi dependensi dan skrip proyek
├── tsconfig.json                # Konfigurasi TypeScript
├── vite.config.ts               # Konfigurasi Vite bundler
├── public/                      # Aset publik statis
│   ├── icon.svg                 # Ikon vektor aplikasi
│   ├── logo-smkn1-moilong.svg   # Logo resmi vektor SMKN 1 Moilong
│   ├── logo-smkn1-moilong.jpg   # Logo raster cadangan
│   └── manifest.json            # Web App Manifest untuk PWA
├── scripts/                     # Skrip utilitas verifikasi dan pemeliharaan jadwal
│   ├── generate_official_svg.cjs
│   ├── solve_schedule.cjs
│   ├── test_conflict_engine.cjs
│   └── verify_index_html.cjs
└── README.md                    # Dokumentasi lengkap proyek
```

---

## 🏫 Identitas Sekolah

- **Nama Sekolah**: SMK Negeri 1 Moilong
- **NPSN**: 69947098
- **Wilayah**: Kecamatan Moilong, Kabupaten Banggai, Provinsi Sulawesi Tengah
- **Program Keahlian**:
  1. Akuntansi dan Keuangan Lembaga (AKL)
  2. Desain Komunikasi Visual (DKV)
  3. Teknik Ketenagalistrikan (TL)

---

## 📄 Lisensi

Proyek ini dikembangkan dan didedikasikan untuk peningkatan efisiensi operasional dan kedisiplinan belajar di **SMKN 1 Moilong**. Bebas digunakan, didistribusikan, dan dimodifikasi untuk keperluan institusi pendidikan.
