const fs = require('fs');

const CLASSES = [
  { id: 'x-ak-1', name: 'Kelas X AK 1', grade: 'X', major: 'AKL', homeroom: 'Dra. Hj. Siti Aminah, M.Pd', defaultRoom: 'R. Teori X AK 1' },
  { id: 'x-ak-2', name: 'Kelas X AK 2', grade: 'X', major: 'AKL', homeroom: 'Rahmat Hidayat, S.Pd', defaultRoom: 'R. Teori X AK 2' },
  { id: 'x-dkv',  name: 'Kelas X DKV',  grade: 'X', major: 'DKV', homeroom: 'Fajar Kurniawan, S.Sn', defaultRoom: 'Studio Gambar X DKV' },
  { id: 'x-tl-1', name: 'Kelas X TL 1', grade: 'X', major: 'TL',  homeroom: 'Ir. Bambang Sutrisno', defaultRoom: 'R. Teori X TL 1' },
  { id: 'x-tl-2', name: 'Kelas X TL 2', grade: 'X', major: 'TL',  homeroom: 'Agus Prasetyo, S.T', defaultRoom: 'R. Teori X TL 2' },

  { id: 'xi-ak-1', name: 'Kelas XI AK 1', grade: 'XI', major: 'AKL', homeroom: 'Sri Wahyuni, S.E', defaultRoom: 'R. Teori XI AK 1' },
  { id: 'xi-ak-2', name: 'Kelas XI AK 2', grade: 'XI', major: 'AKL', homeroom: 'Nurul Fadilah, S.Pd', defaultRoom: 'R. Teori XI AK 2' },
  { id: 'xi-dkv',  name: 'Kelas XI DKV',  grade: 'XI', major: 'DKV', homeroom: 'Reza Pratama, M.Ds', defaultRoom: 'Studio Grafis XI DKV' },
  { id: 'xi-tl-1', name: 'Kelas XI TL 1', grade: 'XI', major: 'TL',  homeroom: 'Hendra Gunawan, S.Pd.T', defaultRoom: 'R. Teori XI TL 1' },
  { id: 'xi-tl-2', name: 'Kelas XI TL 2', grade: 'XI', major: 'TL',  homeroom: 'Joko Susilo, S.T', defaultRoom: 'R. Teori XI TL 2' },

  { id: 'xii-ak-1', name: 'Kelas XII AK 1', grade: 'XII', major: 'AKL', homeroom: 'Dra. Endang Lestari', defaultRoom: 'R. Teori XII AK 1' },
  { id: 'xii-ak-2', name: 'Kelas XII AK 2', grade: 'XII', major: 'AKL', homeroom: 'Ahmad Fauzi, S.E', defaultRoom: 'R. Teori XII AK 2' },
  { id: 'xii-dkv',  name: 'Kelas XII DKV',  grade: 'XII', major: 'DKV', homeroom: 'Dimas Arya, S.Kom', defaultRoom: 'Studio Produksi XII DKV' },
  { id: 'xii-tl-1', name: 'Kelas XII TL 1', grade: 'XII', major: 'TL',  homeroom: 'Budi Santoso, S.T', defaultRoom: 'R. Teori XII TL 1' },
  { id: 'xii-tl-2', name: 'Kelas XII TL 2', grade: 'XII', major: 'TL',  homeroom: 'M. Taufik, S.Pd', defaultRoom: 'R. Teori XII TL 2' }
];

// 36 Teachers
const T = {
  // AKL Kejuruan (6)
  ak1: 'Dra. Hj. Siti Aminah, M.Pd',
  ak2: 'Rahmat Hidayat, S.Pd',
  ak3: 'Sri Wahyuni, S.E',
  ak4: 'Nurul Fadilah, S.Pd',
  ak5: 'Dra. Endang Lestari',
  ak6: 'Ahmad Fauzi, S.E',

  // DKV Kejuruan (5)
  dk1: 'Fajar Kurniawan, S.Sn',
  dk2: 'Reza Pratama, M.Ds',
  dk3: 'Dimas Arya, S.Kom',
  dk4: 'Putri Andini, S.Sn',
  dk5: 'Ilham Pratama, M.Kom',

  // TL Kejuruan (6)
  tl1: 'Ir. Bambang Sutrisno',
  tl2: 'Agus Prasetyo, S.T',
  tl3: 'Hendra Gunawan, S.Pd.T',
  tl4: 'Joko Susilo, S.T',
  tl5: 'Budi Santoso, S.T',
  tl6: 'M. Taufik, S.Pd',

  // Normatif & Adaptif (19)
  ag1: 'Ust. Mansyur, S.Pd.I',
  ag2: 'Hj. Maryam, S.Ag',
  pk1: 'Drs. Wahyu Hidayat',
  pk2: 'Bambang Irawan, S.Pd',
  bi1: 'Siti Rahmawati, M.Pd',
  bi2: 'Dewi Sartika, S.Pd',
  mt1: 'Irwan Setiawan, S.Pd',
  mt2: 'Arif Budiman, S.Pd',
  en1: 'Linda Kartika, M.Pd',
  en2: 'Rian Kusuma, S.Pd',
  or1: 'Erwin Pratama, S.Pd',
  or2: 'Farhan Ramadhan, S.Pd',
  kw1: 'H. Syamsuddin, S.E',
  kw2: 'Nurlina, S.E',
  sj1: 'Yuliana, S.Pd',
  sj2: 'Mulyadi, S.Pd',
  if1: 'Dedi Kusuma, S.Kom',
  if2: 'Rina Melati, S.Kom',
  bk1: 'Dra. Nurhayati'
};

// Labs / Special workshops
const LABS = {
  ak1: 'Lab Komputer Akuntansi 1',
  ak2: 'Lab Komputer Akuntansi 2',
  dkMul: 'Lab Multimedia DKV',
  dkStudio: 'Studio Foto & Video DKV',
  tlSmaw: 'Bengkel Pengelasan SMAW',
  tlGmaw: 'Bengkel Pengelasan GMAW',
  tlGtaw: 'Bengkel Pengelasan GTAW (TIG)',
  tlFab: 'Bengkel Fabrikasi Logam',
  tlBench: 'Bengkel Kerja Bangku',
  tlNdt: 'Lab Uji Cacat Las NDT',
  tlPipe: 'Bengkel Pengelasan Pipa',
  tlCad: 'R. Gambar Manufaktur'
};

// Structure: define daily slots for Days 1..6
// Day 1: Senin
// Day 2: Selasa
// Day 3: Rabu
// Day 4: Kamis
// Day 5: Jumat
// Day 6: Sabtu

function buildAllSchedules() {
  const S = {};
  CLASSES.forEach(c => { S[c.id] = []; });

  const setSlot = (day, slotName, start, end, assignments) => {
    // assignments is array of 15 items: { classId, name, teacher, room }
    assignments.forEach(item => {
      const cls = CLASSES.find(c => c.id === item.classId);
      const room = item.room || cls.defaultRoom;
      S[item.classId].push({
        id: `subj-${item.classId}-${day}-${start.replace(':', '')}`,
        day,
        slot: slotName,
        timeStart: start,
        timeEnd: end,
        name: item.name,
        teacher: item.teacher,
        room
      });
    });
  };

  // ==========================================
  // HARI 1: SENIN
  // ==========================================
  CLASSES.forEach(c => {
    S[c.id].push({
      id: `subj-${c.id}-1-0700`,
      day: 1,
      slot: 'Upacara Bendera',
      timeStart: '07:00',
      timeEnd: '07:45',
      name: 'Upacara Bendera & Apel Pagi Terpadu',
      teacher: 'Pembina Upacara',
      room: 'Lapangan Utama SMKN 1 Moilong'
    });
  });

  // Slot 1 (07:45 - 09:15)
  setSlot(1, 'Jam 1 - 2', '07:45', '09:15', [
    { classId: 'x-ak-1', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag1 },
    { classId: 'x-ak-2', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag2 },
    { classId: 'x-dkv',  name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'x-tl-1', name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'x-tl-2', name: 'Matematika Terapan SMK', teacher: T.mt2 },
    { classId: 'xi-ak-1', name: 'Bahasa Inggris Kejuruan', teacher: T.en1 },
    { classId: 'xi-ak-2', name: 'Bahasa Inggris Kejuruan', teacher: T.en2 },
    { classId: 'xi-dkv',  name: 'Perangkat Lunak Desain Grafis', teacher: T.dk2, room: LABS.dkMul },
    { classId: 'xi-tl-1', name: 'Teknik Pengelasan Busur SMAW 2G', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Fabrikasi Konstruksi Logam Baja', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Praktikum Akuntansi Manufaktur', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Administrasi Perpajakan & e-SPT', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Desain Percetakan Digital Offset', teacher: T.dk3 },
    { classId: 'xii-tl-1', name: 'Teknik Pengelasan GTAW / TIG Presisi', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Pengelasan Pipa SMAW & GTAW 5G', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  // Slot 2 (09:15 - 10:00)
  setSlot(1, 'Jam 3 - 4', '09:15', '10:00', [
    { classId: 'x-ak-1', name: 'Pendidikan Pancasila', teacher: T.pk1 },
    { classId: 'x-ak-2', name: 'Pendidikan Pancasila', teacher: T.pk2 },
    { classId: 'x-dkv',  name: 'Dasar Sketsa & Nirmana', teacher: T.dk1 },
    { classId: 'x-tl-1', name: 'Gambar Teknik & Simbol Las WPS', teacher: T.tl1, room: LABS.tlCad },
    { classId: 'x-tl-2', name: 'Kerja Bangku & Pemotongan Logam', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xi-ak-1', name: 'Praktikum Akuntansi Perusahaan Dagang', teacher: T.ak3 },
    { classId: 'xi-ak-2', name: 'Komputer Akuntansi Spreadsheet', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xi-dkv',  name: 'Tipografi Artistik Publikasi', teacher: T.dk4 },
    { classId: 'xi-tl-1', name: 'Pemeriksaan Visual Cacat Las', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'K3LH & Ergonomi Pengelasan', teacher: T.tl4 },
    { classId: 'xii-ak-1', name: 'Audit Keuangan & Neraca', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Simulasi Uji Kompetensi UKK AKL', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Videografi & Editing Sinematik', teacher: T.dk2, room: LABS.dkStudio },
    { classId: 'xii-tl-1', name: 'Fabrikasi Konstruksi Baja Berat', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Pengujian Cacat Las NDT Penetrant', teacher: T.tl6, room: LABS.tlNdt }
  ]);

  // Slot 3 (10:20 - 11:50)
  setSlot(1, 'Jam 5 - 6', '10:20', '11:50', [
    { classId: 'x-ak-1', name: 'Dasar-dasar Akuntansi Lembaga', teacher: T.ak1 },
    { classId: 'x-ak-2', name: 'Etika Profesi Akuntansi', teacher: T.ak2 },
    { classId: 'x-dkv',  name: 'Pendidikan Pancasila', teacher: T.pk1 },
    { classId: 'x-tl-1', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'x-tl-2', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi2 },
    { classId: 'xi-ak-1', name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'xi-ak-2', name: 'Matematika Terapan SMK', teacher: T.mt2 },
    { classId: 'xi-dkv',  name: 'Fotografi Komersial & Tata Cahaya', teacher: T.dk3, room: LABS.dkStudio },
    { classId: 'xi-tl-1', name: 'Teknik Pengelasan GMAW / MIG', teacher: T.tl3, room: LABS.tlGmaw },
    { classId: 'xi-tl-2', name: 'Dasar Fabrikasi Plat Logam', teacher: T.tl1 },
    { classId: 'xii-ak-1', name: 'Bahasa Inggris Kejuruan', teacher: T.en1 },
    { classId: 'xii-ak-2', name: 'Bahasa Inggris Kejuruan', teacher: T.en2 },
    { classId: 'xii-dkv',  name: 'Portofolio Akhir & Branding', teacher: T.dk1 },
    { classId: 'xii-tl-1', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag1 },
    { classId: 'xii-tl-2', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag2 }
  ]);

  // Slot 4 (12:35 - 14:05)
  setSlot(1, 'Jam 7 - 8', '12:35', '14:05', [
    { classId: 'x-ak-1', name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'x-ak-2', name: 'Matematika Terapan SMK', teacher: T.mt2 },
    { classId: 'x-dkv',  name: 'Dasar DKV Komputer Grafis', teacher: T.dk1 },
    { classId: 'x-tl-1', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag1 },
    { classId: 'x-tl-2', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag2 },
    { classId: 'xi-ak-1', name: 'Komputer Akuntansi MYOB', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xi-ak-2', name: 'Praktikum Akuntansi Dagang', teacher: T.ak3 },
    { classId: 'xi-dkv',  name: 'Desain Antarmuka UI/UX', teacher: T.dk2, room: LABS.dkMul },
    { classId: 'xi-tl-1', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'xi-tl-2', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi2 },
    { classId: 'xii-ak-1', name: 'Akuntansi Sektor Publik', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'e-Faktur & Perpajakan Lanjutan', teacher: T.ak6 },
    { classId: 'xii-dkv',  name: 'Pendidikan Pancasila', teacher: T.pk2 },
    { classId: 'xii-tl-1', name: 'Standarisasi WPS & Uji Tarik', teacher: T.tl5 },
    { classId: 'xii-tl-2', name: 'Pengelasan Pipa Posisi 6G', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  // Slot 5 (14:05 - 15:30)
  setSlot(1, 'Jam 9 - 10', '14:05', '15:30', [
    { classId: 'x-ak-1', name: 'Informatika & Literasi Digital', teacher: T.if1 },
    { classId: 'x-ak-2', name: 'Informatika & Literasi Digital', teacher: T.if2 },
    { classId: 'x-dkv',  name: 'Karakter & Etika Industri DKV', teacher: T.dk4 },
    { classId: 'x-tl-1', name: 'Pendidikan Pancasila', teacher: T.pk1 },
    { classId: 'x-tl-2', name: 'Pendidikan Pancasila', teacher: T.pk2 },
    { classId: 'xi-ak-1', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag1 },
    { classId: 'xi-ak-2', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag2 },
    { classId: 'xi-dkv',  name: 'Bahasa Inggris Kejuruan', teacher: T.en1 },
    { classId: 'xi-tl-1', name: 'Bahasa Inggris Kejuruan', teacher: T.en2 },
    { classId: 'xi-tl-2', name: 'Teknik Pemotongan Plasma Arc', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Projek Kewirausahaan PKK Akuntansi', teacher: T.kw1 },
    { classId: 'xii-ak-2', name: 'Projek Kewirausahaan PKK Akuntansi', teacher: T.kw2 },
    { classId: 'xii-dkv',  name: 'Digital Imaging & Efek Visual', teacher: T.dk3 },
    { classId: 'xii-tl-1', name: 'Simulasi Sertifikasi Las BNSP', teacher: T.tl5 },
    { classId: 'xii-tl-2', name: 'Metalurgi Fisik & Perlakuan Panas', teacher: T.tl1 }
  ]);

  // ==========================================
  // HARI 2: SELASA
  // ==========================================
  setSlot(2, 'Jam 1 - 2', '07:00', '08:30', [
    { classId: 'x-ak-1', name: 'Praktik Siklus Akuntansi Jasa', teacher: T.ak1 },
    { classId: 'x-ak-2', name: 'Etika Profesi & K3LH Akuntansi', teacher: T.ak2 },
    { classId: 'x-dkv',  name: 'Gambar Sketsa & Ilustrasi Pensil', teacher: T.dk1 },
    { classId: 'x-tl-1', name: 'Gambar Manufaktur & Simbol WPS', teacher: T.tl1, room: LABS.tlCad },
    { classId: 'x-tl-2', name: 'Dasar Pengelasan Logam OAW', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xi-ak-1', name: 'Akuntansi Dagang Kartu Persediaan', teacher: T.ak3 },
    { classId: 'xi-ak-2', name: 'Komputer Akuntansi Keuangan', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xi-dkv',  name: 'Desain Vektor Adobe Illustrator', teacher: T.dk2, room: LABS.dkMul },
    { classId: 'xi-tl-1', name: 'Pengelasan Busur Manual SMAW 3G', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Perakitan Konstruksi Rangka Baja', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Akuntansi Manufaktur Biaya Produksi', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Simulasi e-Billing & e-Filing Pajak', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Fotografi Model & Tata Cahaya', teacher: T.dk3, room: LABS.dkStudio },
    { classId: 'xii-tl-1', name: 'Pengelasan Argon GTAW Stainless', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Pengelasan Pipa Sambungan 6G', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  setSlot(2, 'Jam 3 - 4', '08:30', '10:00', [
    { classId: 'x-ak-1', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'x-ak-2', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi2 },
    { classId: 'x-dkv',  name: 'Komposisi Bentuk Nirmana Ruang', teacher: T.dk1 },
    { classId: 'x-tl-1', name: 'Keselamatan Kerja K3LH Las Listrik', teacher: T.tl2 },
    { classId: 'x-tl-2', name: 'Pekerjaan Kikir & Gergaji Logam', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xi-ak-1', name: 'Administrasi Kas & Perbankan', teacher: T.ak3 },
    { classId: 'xi-ak-2', name: 'Spreadsheet Neraca Lajur', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xi-dkv',  name: 'Layout Buku & Tipografi Visual', teacher: T.dk4 },
    { classId: 'xi-tl-1', name: 'Pengelasan SMAW Sambungan T-Joint', teacher: T.tl1, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Pengelasan GMAW Besi Hollow', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Audit Laporan Arus Kas Manufaktur', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Penyusunan SPT Tahunan Badan', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Editing Sinematik Premiere Pro', teacher: T.dk2, room: LABS.dkStudio },
    { classId: 'xii-tl-1', name: 'Pengelasan GTAW Aluminium Presisi', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Uji Ultrasonik & Radiografi Las', teacher: T.tl6, room: LABS.tlNdt }
  ]);

  setSlot(2, 'Jam 5 - 6', '10:20', '11:50', [
    { classId: 'x-ak-1', name: 'Spreadsheet Tabel Akuntansi', teacher: T.ak1, room: LABS.ak1 },
    { classId: 'x-ak-2', name: 'Jurnal Umum & Buku Besar', teacher: T.ak2 },
    { classId: 'x-dkv',  name: 'Informatika & Literasi Digital', teacher: T.if1 },
    { classId: 'x-tl-1', name: 'Kerja Bangku Alat Ukur Presisi', teacher: T.tl1, room: LABS.tlBench },
    { classId: 'x-tl-2', name: 'Gambar Proyeksi Orthogonal Mesin', teacher: T.tl3, room: LABS.tlCad },
    { classId: 'xi-ak-1', name: 'Pendidikan Pancasila', teacher: T.pk1 },
    { classId: 'xi-ak-2', name: 'Pendidikan Pancasila', teacher: T.pk2 },
    { classId: 'xi-dkv',  name: 'Motion Graphic & Animasi 2D', teacher: T.dk4, room: LABS.dkMul },
    { classId: 'xi-tl-1', name: 'Teknik Pengelasan GMAW CO2', teacher: T.tl2, room: LABS.tlGmaw },
    { classId: 'xi-tl-2', name: 'Pengelasan Titik (Spot Welding)', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Praktik Siklus Akuntansi UKK', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Akuntansi Pajak Penghasilan Pasal 22', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Desain Kemasan 3D Mockup', teacher: T.dk3 },
    { classId: 'xii-tl-1', name: 'Inspeksi Visual & Pengujian Tekuk', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Pengelasan Sambungan Bevel Pipa', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  setSlot(2, 'Jam 7 - 8', '12:35', '14:05', [
    { classId: 'x-ak-1', name: 'Bahasa Inggris Kejuruan', teacher: T.en1 },
    { classId: 'x-ak-2', name: 'Bahasa Inggris Kejuruan', teacher: T.en2 },
    { classId: 'x-dkv',  name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'x-tl-1', name: 'Dasar Mesin Bor & Bubut Kayu', teacher: T.tl1, room: LABS.tlBench },
    { classId: 'x-tl-2', name: 'Informatika & Literasi Digital', teacher: T.if2 },
    { classId: 'xi-ak-1', name: 'Akuntansi Lembaga Pemerintah', teacher: T.ak3 },
    { classId: 'xi-ak-2', name: 'Etika Profesi Akuntan Publik', teacher: T.ak2 },
    { classId: 'xi-dkv',  name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag1 },
    { classId: 'xi-tl-1', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag2 },
    { classId: 'xi-tl-2', name: 'Teknik Las Busur Rendam (SAW)', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Simulasi Komputer Akuntansi MYOB', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xii-ak-2', name: 'Studi Kasus Pajak Daerah', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Produksi Konten Iklan Televisi', teacher: T.dk2, room: LABS.dkStudio },
    { classId: 'xii-tl-1', name: 'Konstruksi Tangki Tekan Baja', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Laporan Uji Mutu Sambungan Las', teacher: T.tl6, room: LABS.tlNdt }
  ]);

  setSlot(2, 'Jam 9 - 10', '14:05', '15:30', [
    { classId: 'x-ak-1', name: 'Projek IPAS (Sains Terapan Akuntansi)', teacher: T.ip1 },
    { classId: 'x-ak-2', name: 'Projek Kewirausahaan PKK', teacher: T.kw1 },
    { classId: 'x-dkv',  name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag1 },
    { classId: 'x-tl-1', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag2 },
    { classId: 'x-tl-2', name: 'Projek IPAS (Fisika Logam Las)', teacher: T.tl3 },
    { classId: 'xi-ak-1', name: 'Projek Kewirausahaan PKK Akuntansi', teacher: T.kw2 },
    { classId: 'xi-ak-2', name: 'Penyusunan Anggaran Kas Keuangan', teacher: T.ak3 },
    { classId: 'xi-dkv',  name: 'Fotografi Eksplorasi Luar Ruang', teacher: T.dk3 },
    { classId: 'xi-tl-1', name: 'Distorsi Pengelasan & Pencegahannya', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Pengujian Sambungan Las Bending', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Persiapan Portofolio Magang PKL', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Konsultasi Pajak Mandiri', teacher: T.ak6 },
    { classId: 'xii-dkv',  name: 'Kurasi Portofolio Pameran Karya', teacher: T.dk1 },
    { classId: 'xii-tl-1', name: 'Kajian Gambar Proyek Konstruksi Las', teacher: T.tl1 },
    { classId: 'xii-tl-2', name: 'Simulasi Tes Sertifikasi Las Migas', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  // ==========================================
  // HARI 3: RABU
  // ==========================================
  setSlot(3, 'Jam 1 - 2', '07:00', '08:30', [
    { classId: 'x-ak-1', name: 'Bahasa Inggris Kejuruan', teacher: T.en1 },
    { classId: 'x-ak-2', name: 'Bahasa Inggris Kejuruan', teacher: T.en2 },
    { classId: 'x-dkv',  name: 'Perangkat Lunak Desain Dasar', teacher: T.dk2, room: LABS.dkMul },
    { classId: 'x-tl-1', name: 'Teknik Pemotongan OAW Logam', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'x-tl-2', name: 'Simbol WPS & Sambungan Las', teacher: T.tl1, room: LABS.tlCad },
    { classId: 'xi-ak-1', name: 'Praktikum Akuntansi Jasa & Dagang', teacher: T.ak3 },
    { classId: 'xi-ak-2', name: 'Komputer Akuntansi Spreadsheet', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xi-dkv',  name: 'Fotografi Studio & Still Life', teacher: T.dk3, room: LABS.dkStudio },
    { classId: 'xi-tl-1', name: 'Pengelasan Busur Listrik SMAW 1G', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Fabrikasi Struktur Baja Ringan', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag1 },
    { classId: 'xii-ak-2', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag2 },
    { classId: 'xii-dkv',  name: 'Animasi 2D & Motion Graphics', teacher: T.dk4 },
    { classId: 'xii-tl-1', name: 'Pengelasan TIG Paduan Nikel', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Pengujian Cacat Las NDT Ultrasonic', teacher: T.tl6, room: LABS.tlNdt }
  ]);

  setSlot(3, 'Jam 3 - 4', '08:30', '10:00', [
    { classId: 'x-ak-1', name: 'Etika Profesi & Komunikasi Bisnis', teacher: T.ak2 },
    { classId: 'x-ak-2', name: 'Dasar Keuangan & Akuntansi Lembaga', teacher: T.ak1 },
    { classId: 'x-dkv',  name: 'Prinsip Desain & Tata Letak Dasar', teacher: T.dk1 },
    { classId: 'x-tl-1', name: 'Kerja Bangku Pembentukan Plat', teacher: T.tl2, room: LABS.tlBench },
    { classId: 'x-tl-2', name: 'Keselamatan Kerja Bengkel Las K3LH', teacher: T.tl4 },
    { classId: 'xi-ak-1', name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'xi-ak-2', name: 'Matematika Terapan SMK', teacher: T.mt2 },
    { classId: 'xi-dkv',  name: 'Perangkat Lunak Desain Vector', teacher: T.dk2, room: LABS.dkMul },
    { classId: 'xi-tl-1', name: 'Pengelasan GMAW Gas Argon/CO2', teacher: T.tl3, room: LABS.tlGmaw },
    { classId: 'xi-tl-2', name: 'Perakitan Konstruksi Tralis Baja', teacher: T.tl1, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Praktikum Akuntansi Manufaktur', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Administrasi Pajak Pertambahan Nilai (PPN)', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Desain Kemasan Packaging Kreatif', teacher: T.dk3 },
    { classId: 'xii-tl-1', name: 'Inspeksi & Pengujian Sambungan Las', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Pengelasan Pipa Sambungan 2G & 5G', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  setSlot(3, 'Jam 5 - 6', '10:20', '11:50', [
    { classId: 'x-ak-1', name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'x-ak-2', name: 'Matematika Terapan SMK', teacher: T.mt2 },
    { classId: 'x-dkv',  name: 'Sejarah Seni Rupa & Visual', teacher: T.sj1 },
    { classId: 'x-tl-1', name: 'Dasar Pengelasan Busur SMAW', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'x-tl-2', name: 'Peralatan Kerja Bangku Logam', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xi-ak-1', name: 'Komputer Akuntansi MYOB Dagang', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xi-ak-2', name: 'Praktik Transaksi Kas Bank', teacher: T.ak3 },
    { classId: 'xi-dkv',  name: 'Pendidikan Pancasila', teacher: T.pk1 },
    { classId: 'xi-tl-1', name: 'Pendidikan Pancasila', teacher: T.pk2 },
    { classId: 'xi-tl-2', name: 'Fabrikasi Plat Besi Konstruksi', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Simulasi Ujian Kompetensi UKK', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Akuntansi Pajak Badan Usaha', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Videografi Dokumenter Sekolah', teacher: T.dk2, room: LABS.dkStudio },
    { classId: 'xii-tl-1', name: 'Pengelasan GTAW Paduan Aluminium', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Pengelasan Root Run & Hot Pass Pipa', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  setSlot(3, 'Jam 7 - 8', '12:35', '14:05', [
    { classId: 'x-ak-1', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag1 },
    { classId: 'x-ak-2', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag2 },
    { classId: 'x-dkv',  name: 'Bahasa Inggris Komunikasi Visual', teacher: T.en1 },
    { classId: 'x-tl-1', name: 'Bahasa Inggris Kejuruan Manufaktur', teacher: T.en2 },
    { classId: 'x-tl-2', name: 'Bimbingan Konseling & Karir Vokasi', teacher: T.bk1 },
    { classId: 'xi-ak-1', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'xi-ak-2', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi2 },
    { classId: 'xi-dkv',  name: 'Fotografi Editing Lightroom & Photoshop', teacher: T.dk3, room: LABS.dkMul },
    { classId: 'xi-tl-1', name: 'Pengelasan Busur SMAW Posisi 4G', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Fabrikasi Baja Canai Dingin', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Projek Kewirausahaan PKK Akuntansi', teacher: T.kw1 },
    { classId: 'xii-ak-2', name: 'Projek Kewirausahaan PKK Akuntansi', teacher: T.kw2 },
    { classId: 'xii-dkv',  name: 'Portofolio Digital & Showreel', teacher: T.dk1 },
    { classId: 'xii-tl-1', name: 'Kaji Cacat Las Macrograph & Bending', teacher: T.tl5, room: LABS.tlNdt },
    { classId: 'xii-tl-2', name: 'Pengelasan Sambungan Flange Pipa', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  setSlot(3, 'Jam 9 - 10', '14:05', '15:30', [
    { classId: 'x-ak-1', name: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: T.or1, room: 'Lapangan Olahraga SMKN 1' },
    { classId: 'x-ak-2', name: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: T.or2, room: 'GOR Indoor SMKN 1 Moilong' },
    { classId: 'x-dkv',  name: 'Dasar Animasi Tradisional & Stopmotion', teacher: T.dk4 },
    { classId: 'x-tl-1', name: 'Sejarah Indonesia & Kebangsaan', teacher: T.sj1 },
    { classId: 'x-tl-2', name: 'Seni Rupa & Kriya Terapan', teacher: T.sj2 },
    { classId: 'xi-ak-1', name: 'Etika Profesi Akuntansi Finansial', teacher: T.ak3 },
    { classId: 'xi-ak-2', name: 'Administrasi Piutang & Utang Dagang', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xi-dkv',  name: 'Desain Sablon & Cetak Saring', teacher: T.dk2 },
    { classId: 'xi-tl-1', name: 'Metalurgi Las & Pengaruh Suhu', teacher: T.tl1 },
    { classId: 'xi-tl-2', name: 'Pengelasan GMAW Plat Sambungan Sudut', teacher: T.tl3, room: LABS.tlGmaw },
    { classId: 'xii-ak-1', name: 'Akuntansi Lembaga Non-Profit', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Praktikum Pajak Internasional Dasar', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Karya Tugas Akhir DKV Mandiri', teacher: T.dk3 },
    { classId: 'xii-tl-1', name: 'Perencanaan WPS Pengelasan Bejana', teacher: T.tl5 },
    { classId: 'xii-tl-2', name: 'Simulasi Sertifikasi Las Migas 6G', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  // ==========================================
  // HARI 4: KAMIS
  // ==========================================
  setSlot(4, 'Jam 1 - 2', '07:00', '08:30', [
    { classId: 'x-ak-1', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'x-ak-2', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi2 },
    { classId: 'x-dkv',  name: 'Dasar Fotografi Komposisi Rule of Thirds', teacher: T.dk3, room: LABS.dkStudio },
    { classId: 'x-tl-1', name: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: T.or1, room: 'Lapangan Olahraga SMKN 1' },
    { classId: 'x-tl-2', name: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: T.or2, room: 'GOR Indoor SMKN 1 Moilong' },
    { classId: 'xi-ak-1', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag1 },
    { classId: 'xi-ak-2', name: 'Pendidikan Agama & Budi Pekerti', teacher: T.ag2 },
    { classId: 'xi-dkv',  name: 'Tipografi & Identitas Visual Logo', teacher: T.dk4 },
    { classId: 'xi-tl-1', name: 'Pengelasan Busur Listrik Plat Baja Karbon', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Fabrikasi Tangki Air & Pipa Baja', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Praktikum Akuntansi Lembaga Perbankan', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Administrasi e-Faktur Pajak Keluaran', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Periklanan Komersial & Copywriting', teacher: T.dk1 },
    { classId: 'xii-tl-1', name: 'Pengelasan Sambungan Sudut GTAW 3F', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Pengelasan Pipa Gas Bertekanan Tinggi', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  setSlot(4, 'Jam 3 - 4', '08:30', '10:00', [
    { classId: 'x-ak-1', name: 'Dasar Perbankan Syariah & Konvensional', teacher: T.ak1 },
    { classId: 'x-ak-2', name: 'Akuntansi Transaksi Keuangan Dasar', teacher: T.ak2 },
    { classId: 'x-dkv',  name: 'Ilustrasi Karakter Kartun & Manga', teacher: T.dk1 },
    { classId: 'x-tl-1', name: 'Dasar Pemeliharaan Mesin Las Listrik', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'x-tl-2', name: 'Kerja Bangku Pembentukan Ulir & Tap', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xi-ak-1', name: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: T.or1, room: 'Lapangan Olahraga SMKN 1' },
    { classId: 'xi-ak-2', name: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: T.or2, room: 'GOR Indoor SMKN 1 Moilong' },
    { classId: 'xi-dkv',  name: 'Desain Infografis & Data Visual', teacher: T.dk2, room: LABS.dkMul },
    { classId: 'xi-tl-1', name: 'Pendidikan Pancasila', teacher: T.pk1 },
    { classId: 'xi-tl-2', name: 'Pendidikan Pancasila', teacher: T.pk2 },
    { classId: 'xii-ak-1', name: 'Audit Kas Kecil & Rekonsiliasi Bank', teacher: T.ak3 },
    { classId: 'xii-ak-2', name: 'Simulasi Sistem Akuntansi Terpadu', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xii-dkv',  name: 'Teknik Tata Suara & Audio Video', teacher: T.dk3, room: LABS.dkStudio },
    { classId: 'xii-tl-1', name: 'Inspeksi Visual Mutu Sambungan Las', teacher: T.tl1 },
    { classId: 'xii-tl-2', name: 'Uji Radiografi Sinar X Sambungan Las', teacher: T.tl5, room: LABS.tlNdt }
  ]);

  setSlot(4, 'Jam 5 - 6', '10:20', '11:50', [
    { classId: 'x-ak-1', name: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: T.or1, room: 'Lapangan Olahraga SMKN 1' },
    { classId: 'x-ak-2', name: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: T.or2, room: 'GOR Indoor SMKN 1 Moilong' },
    { classId: 'x-dkv',  name: 'Tipografi Anatomi Huruf Huruf Latin', teacher: T.dk4 },
    { classId: 'x-tl-1', name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'x-tl-2', name: 'Matematika Terapan SMK', teacher: T.mt2 },
    { classId: 'xi-ak-1', name: 'Praktikum Akuntansi Biaya Standar', teacher: T.ak5 },
    { classId: 'xi-ak-2', name: 'Perpajakan PPh Pasal 21 Karyawan', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xi-dkv',  name: 'Teknik Cetak Offset & Screen Printing', teacher: T.dk1 },
    { classId: 'xi-tl-1', name: 'Pengelasan Busur Listrik Sambungan Lap', teacher: T.tl3, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Fabrikasi Tangga & Railing Besi Hollow', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'xii-ak-2', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi2 },
    { classId: 'xii-dkv',  name: 'Manajemen Produksi Studio Desain', teacher: T.dk2 },
    { classId: 'xii-tl-1', name: 'Pengelasan Busur Terendam Otomatis', teacher: T.tl2, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Kualifikasi Juru Las Standar ASME IX', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  setSlot(4, 'Jam 7 - 8', '12:35', '14:05', [
    { classId: 'x-ak-1', name: 'Sejarah Indonesia', teacher: T.sj1 },
    { classId: 'x-ak-2', name: 'Seni Budaya & Kearifan Lokal', teacher: T.sj2 },
    { classId: 'x-dkv',  name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'x-tl-1', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi2 },
    { classId: 'x-tl-2', name: 'Gambar Konstruksi Rangka Las CAD', teacher: T.tl1, room: LABS.tlCad },
    { classId: 'xi-ak-1', name: 'Informatika Bisnis & E-Commerce', teacher: T.if1 },
    { classId: 'xi-ak-2', name: 'Aplikasi Komputer Keuangan Terpadu', teacher: T.if2, room: LABS.ak1 },
    { classId: 'xi-dkv',  name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'xi-tl-1', name: 'Matematika Terapan SMK', teacher: T.mt2 },
    { classId: 'xi-tl-2', name: 'Pengelasan Busur Manual SMAW 4G', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xii-ak-1', name: 'Simulasi Sidang Laporan UKK Akuntansi', teacher: T.ak3 },
    { classId: 'xii-ak-2', name: 'Penyusunan Anggaran Investasi Bisnis', teacher: T.ak4, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Kewirausahaan Sablon Digital & Merchandise', teacher: T.kw1 },
    { classId: 'xii-tl-1', name: 'Kewirausahaan Fabrikasi Bengkel Las', teacher: T.kw2 },
    { classId: 'xii-tl-2', name: 'Evaluasi Mutu Hasil Las Standar AWS D1.1', teacher: T.tl5, room: LABS.tlNdt }
  ]);

  setSlot(4, 'Jam 9 - 10', '14:05', '15:30', [
    { classId: 'x-ak-1', name: 'Bimbingan Konseling & Minat Karir', teacher: T.bk1 },
    { classId: 'x-ak-2', name: 'Projek IPAS (Ekologi & Bisnis)', teacher: T.ip1 },
    { classId: 'x-dkv',  name: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: T.or1, room: 'Lapangan Olahraga SMKN 1' },
    { classId: 'x-tl-1', name: 'Informatika & Komputer Industri', teacher: T.if1 },
    { classId: 'x-tl-2', name: 'Informatika & Komputer Industri', teacher: T.if2 },
    { classId: 'xi-ak-1', name: 'Bahasa Inggris Lanjutan Perbankan', teacher: T.en1 },
    { classId: 'xi-ak-2', name: 'Bahasa Inggris Lanjutan Perbankan', teacher: T.en2 },
    { classId: 'xi-dkv',  name: 'Pendidikan Jasmani, Olahraga & Kesehatan', teacher: T.or2, room: 'GOR Indoor SMKN 1 Moilong' },
    { classId: 'xi-tl-1', name: 'Dasar-dasar Fabrikasi & Distorsi Logam', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Dasar Perlakuan Panas Sambungan Las', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xii-ak-1', name: 'Pendidikan Pancasila', teacher: T.pk1 },
    { classId: 'xii-ak-2', name: 'Pendidikan Pancasila', teacher: T.pk2 },
    { classId: 'xii-dkv',  name: 'Desain Merchandise & Packaging Event', teacher: T.dk3 },
    { classId: 'xii-tl-1', name: 'Pengujian Metalurgi Makro Sambungan', teacher: T.tl1, room: LABS.tlNdt },
    { classId: 'xii-tl-2', name: 'Praktik Fabrikasi Tangki Stainless Steel', teacher: T.tl4, room: LABS.tlFab }
  ]);

  // ==========================================
  // HARI 5: JUMAT
  // ==========================================
  // 06:45 - 07:15 (Senam Pagi & Pembinaan Rohani)
  CLASSES.forEach(c => {
    S[c.id].push({
      id: `subj-${c.id}-5-0645`,
      day: 5,
      slot: 'Senam / Rohani',
      timeStart: '06:45',
      timeEnd: '07:15',
      name: 'Senam Pagi Kebugaran & Pembinaan Karakter Siswa',
      teacher: 'Tim Kesiswaan SMKN 1',
      room: 'Lapangan Utama SMKN 1 Moilong'
    });
  });

  // Slot 1 (07:15 - 08:35)
  setSlot(5, 'Jam 1 - 2', '07:15', '08:35', [
    { classId: 'x-ak-1', name: 'Etika Keuangan & Literasi Finansial', teacher: T.ak1 },
    { classId: 'x-ak-2', name: 'Akuntansi Transaksi Keuangan Digital', teacher: T.ak2 },
    { classId: 'x-dkv',  name: 'Eksplorasi Warna Nirmana Dwimatra', teacher: T.dk1 },
    { classId: 'x-tl-1', name: 'Pengantar Bahan & Metalurgi Pengelasan', teacher: T.tl1 },
    { classId: 'x-tl-2', name: 'Pemeliharaan Alat Las & K3 Bengkel', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xi-ak-1', name: 'Akuntansi Keuangan Perusahaan Jasa', teacher: T.ak3 },
    { classId: 'xi-ak-2', name: 'Spreadsheet Pengolahan Gaji Karyawan', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xi-dkv',  name: 'Desain Banner & Media Sosial Kreatif', teacher: T.dk2, room: LABS.dkMul },
    { classId: 'xi-tl-1', name: 'Pengelasan Busur Manual SMAW Posisi 1F', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Fabrikasi Rangka Meja & Kursi Sekolah', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Penyusunan Laporan Keuangan Neraca', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Simulasi Ujian UKK Mandiri Akuntansi', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Review Portofolio Video Iklan Sekolah', teacher: T.dk3, room: LABS.dkStudio },
    { classId: 'xii-tl-1', name: 'Pengelasan Sambungan Pipa TIG 1G', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Pengelasan Sambungan Pipa SMAW 2G', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  // Slot 2 (08:35 - 09:55)
  setSlot(5, 'Jam 3 - 4', '08:35', '09:55', [
    { classId: 'x-ak-1', name: 'Pendidikan Agama & Budi Pekerti Islam/Kristen', teacher: T.ag1 },
    { classId: 'x-ak-2', name: 'Pendidikan Agama & Budi Pekerti Islam/Kristen', teacher: T.ag2 },
    { classId: 'x-dkv',  name: 'Bimbingan Konseling & Karir Kreatif', teacher: T.bk1 },
    { classId: 'x-tl-1', name: 'Sejarah Indonesia & Peradaban Logam', teacher: T.sj1 },
    { classId: 'x-tl-2', name: 'Seni Rupa & Kriya Ornamen Terapan', teacher: T.sj2 },
    { classId: 'xi-ak-1', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'xi-ak-2', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi2 },
    { classId: 'xi-dkv',  name: 'Bahasa Inggris Komunikasi Industri Kreatif', teacher: T.en1 },
    { classId: 'xi-tl-1', name: 'Bahasa Inggris Kejuruan Manufaktur', teacher: T.en2 },
    { classId: 'xi-tl-2', name: 'Pengelasan GMAW Posisi 2G Plat', teacher: T.tl3, room: LABS.tlGmaw },
    { classId: 'xii-ak-1', name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'xii-ak-2', name: 'Matematika Terapan SMK', teacher: T.mt2 },
    { classId: 'xii-dkv',  name: 'Kewirausahaan Merchandise DKV', teacher: T.kw1 },
    { classId: 'xii-tl-1', name: 'Kewirausahaan Jasa Bengkel Las', teacher: T.kw2 },
    { classId: 'xii-tl-2', name: 'Inspeksi Sambungan Las Fluorescent Penetrant', teacher: T.tl1, room: LABS.tlNdt }
  ]);

  // Slot 3 (10:15 - 11:15)
  setSlot(5, 'Jam 5', '10:15', '11:15', [
    { classId: 'x-ak-1', name: 'Literasi Keuangan & Tabungan Syariah', teacher: T.ak1 },
    { classId: 'x-ak-2', name: 'Etika Komunikasi Surat Bisnis', teacher: T.ak2 },
    { classId: 'x-dkv',  name: 'Apresiasi Seni & Desain Indonesia', teacher: T.dk1 },
    { classId: 'x-tl-1', name: 'K3 Kebisingan & Radiasi Sinar Las', teacher: T.tl2 },
    { classId: 'x-tl-2', name: 'Pengenalan Alat Potong Plasma Torch', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xi-ak-1', name: 'Bimbingan Konseling & Kesiapan Magang', teacher: T.bk1 },
    { classId: 'xi-ak-2', name: 'Perpajakan Badan Usaha Koperasi', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xi-dkv',  name: 'Fotografi Jurnalistik Lingkungan', teacher: T.dk3 },
    { classId: 'xi-tl-1', name: 'Dasar Pemilihan Kawat Las Elektroda', teacher: T.tl1 },
    { classId: 'xi-tl-2', name: 'Fabrikasi Rak Alat Bengkel Mandiri', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Konsultasi Karir Lulusan SMK Akuntansi', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Penyusunan Bukti Transaksi Digital', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xii-dkv',  name: 'Evaluasi Portofolio Visual DKV', teacher: T.dk2 },
    { classId: 'xii-tl-1', name: 'Review Standar WPS Pengelasan AWS', teacher: T.tl5 },
    { classId: 'xii-tl-2', name: 'Persiapan Uji Kompetensi BNSP Pengelasan', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  // Slot 4 (13:00 - 14:15) - Projek P5 (Projek Penguatan Profil Pelajar Pancasila)
  // Each class has its own class homeroom facilitator
  CLASSES.forEach(c => {
    S[c.id].push({
      id: `subj-${c.id}-5-1300`,
      day: 5,
      slot: 'Projek P5',
      timeStart: '13:00',
      timeEnd: '14:15',
      name: 'Projek Penguatan Profil Pelajar Pancasila (P5: Kebekerjaan & Gaya Hidup Berkelanjutan)',
      teacher: c.homeroom,
      room: c.defaultRoom
    });
  });

  // Slot 5 (14:15 - 15:30) - Ekstrakurikuler Wajib & Minat Bakat
  // Distinct Pembina for each major/grade cohort
  setSlot(5, 'Ekstrakurikuler', '14:15', '15:30', [
    { classId: 'x-ak-1', name: 'Pramuka Penegak Gugus Depan SMKN 1', teacher: 'Pembina Pramuka Putera' },
    { classId: 'x-ak-2', name: 'Pramuka Penegak Gugus Depan SMKN 1', teacher: 'Pembina Pramuka Puteri' },
    { classId: 'x-dkv',  name: 'Klub Fotografi & Seni Visual Moilong', teacher: T.dk4 },
    { classId: 'x-tl-1', name: 'Klub Robotika & Mekatronika Pengelasan', teacher: T.tl3 },
    { classId: 'x-tl-2', name: 'Klub Olahraga Bola Voli & Futsal', teacher: T.or1 },
    { classId: 'xi-ak-1', name: 'Palang Merah Remaja (PMR Wira)', teacher: 'Pembina PMR Unit SMKN 1' },
    { classId: 'xi-ak-2', name: 'Klub Debat & Literasi Finansial', teacher: T.ak2 },
    { classId: 'xi-dkv',  name: 'Klub Sinematografi Moilong Creative', teacher: T.dk2 },
    { classId: 'xi-tl-1', name: 'Klub Inovasi Teknologi Tepat Guna Logam', teacher: T.tl4 },
    { classId: 'xi-tl-2', name: 'Klub Bulutangkis & Tenis Meja', teacher: T.or2 },
    { classId: 'xii-ak-1', name: 'Klub Akuntansi & Persiapan Karir BUMN', teacher: T.ak1 },
    { classId: 'xii-ak-2', name: 'Klub Pajak Sahabat UMKM Moilong', teacher: T.ak3 },
    { classId: 'xii-dkv',  name: 'Klub Pameran Kreatif & Kurasi Galeri', teacher: T.dk1 },
    { classId: 'xii-tl-1', name: 'Klub Juru Las Profesional Moilong Welding', teacher: T.tl2 },
    { classId: 'xii-tl-2', name: 'Klub Otomotif & Fabrikasi Kustom', teacher: T.tl1 }
  ]);

  // ==========================================
  // HARI 6: SABTU
  // ==========================================
  setSlot(6, 'Jam 1 - 2', '07:00', '08:30', [
    { classId: 'x-ak-1', name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'x-ak-2', name: 'Matematika Terapan SMK', teacher: T.mt2 },
    { classId: 'x-dkv',  name: 'Pendidikan Pancasila', teacher: T.pk1 },
    { classId: 'x-tl-1', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'x-tl-2', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi2 },
    { classId: 'xi-ak-1', name: 'Praktikum Komputer Akuntansi MYOB', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xi-ak-2', name: 'Administrasi Piutang Dagang Kejuruan', teacher: T.ak3 },
    { classId: 'xi-dkv',  name: 'Fotografi Produk Komersial DKV', teacher: T.dk3, room: LABS.dkStudio },
    { classId: 'xi-tl-1', name: 'Pengelasan GMAW Besi Hollow 1F', teacher: T.tl3, room: LABS.tlGmaw },
    { classId: 'xi-tl-2', name: 'Fabrikasi Tangga & Tralis Baja', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Bahasa Inggris Kejuruan Akuntansi', teacher: T.en1 },
    { classId: 'xii-ak-2', name: 'Bahasa Inggris Kejuruan Akuntansi', teacher: T.en2 },
    { classId: 'xii-dkv',  name: 'Portofolio Branding Kampanye Visual', teacher: T.dk1 },
    { classId: 'xii-tl-1', name: 'Pengelasan GTAW Pipa Posisi 2G', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Pengelasan Pipa Sambungan 5G SMAW', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  setSlot(6, 'Jam 3 - 4', '08:30', '10:00', [
    { classId: 'x-ak-1', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi1 },
    { classId: 'x-ak-2', name: 'Bahasa Indonesia Kejuruan', teacher: T.bi2 },
    { classId: 'x-dkv',  name: 'Dasar Animasi Tradisional Flipbook', teacher: T.dk4 },
    { classId: 'x-tl-1', name: 'Keselamatan Kerja Lingkungan Hidup K3LH', teacher: T.tl2 },
    { classId: 'x-tl-2', name: 'Kerja Bangku Pembuatan Pola Logam', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xi-ak-1', name: 'Matematika Terapan SMK', teacher: T.mt1 },
    { classId: 'xi-ak-2', name: 'Matematika Terapan SMK', teacher: T.mt2 },
    { classId: 'xi-dkv',  name: 'Pengantar Sinematografi & Kamera', teacher: T.dk2, room: LABS.dkStudio },
    { classId: 'xi-tl-1', name: 'Pengelasan SMAW Sambungan Plat Sudut 2F', teacher: T.tl1, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Perakitan Rangka Pintu Pagar Besi', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Praktikum Akuntansi Manufaktur', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Administrasi Pajak Ekspor Impor PPh 22', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Kurasi Display Galeri Pameran DKV', teacher: T.dk3 },
    { classId: 'xii-tl-1', name: 'Pengujian Mutu Sambungan Las Bending', teacher: T.tl5, room: LABS.tlNdt },
    { classId: 'xii-tl-2', name: 'Pengelasan Pipa Sambungan Posisi 6G', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  setSlot(6, 'Jam 5 - 6', '10:20', '11:50', [
    { classId: 'x-ak-1', name: 'Etika Profesi & Komunikasi Bisnis', teacher: T.ak2 },
    { classId: 'x-ak-2', name: 'Dasar-dasar Keuangan & Akuntansi', teacher: T.ak1 },
    { classId: 'x-dkv',  name: 'Informatika & Literasi Digital Grafis', teacher: T.if1 },
    { classId: 'x-tl-1', name: 'Gambar Proyeksi Benda Manufaktur CAD', teacher: T.tl1, room: LABS.tlCad },
    { classId: 'x-tl-2', name: 'Peralatan Tangan Bengkel Kerja Bangku', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xi-ak-1', name: 'Pendidikan Pancasila', teacher: T.pk1 },
    { classId: 'xi-ak-2', name: 'Pendidikan Pancasila', teacher: T.pk2 },
    { classId: 'xi-dkv',  name: 'Desain Merchandise Promosi Kreatif', teacher: T.dk4 },
    { classId: 'xi-tl-1', name: 'Teknik Pengelasan Busur Listrik 3F', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'xi-tl-2', name: 'Fabrikasi Dudukan Motor Listrik Baja', teacher: T.tl4, room: LABS.tlFab },
    { classId: 'xii-ak-1', name: 'Akuntansi Keuangan Daerah & Desa', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Simulasi Perhitungan Pajak Restoran & Hotel', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Pengarahan Seni (Art Directing)', teacher: T.dk2 },
    { classId: 'xii-tl-1', name: 'Fabrikasi Konstruksi Baja Berat IWF', teacher: T.tl5, room: LABS.tlGtaw },
    { classId: 'xii-tl-2', name: 'Laporan Analisis Cacat Las Radiografi', teacher: T.tl6, room: LABS.tlNdt }
  ]);

  setSlot(6, 'Jam 7 - 8', '12:35', '14:05', [
    { classId: 'x-ak-1', name: 'Bahasa Inggris Kejuruan', teacher: T.en1 },
    { classId: 'x-ak-2', name: 'Bahasa Inggris Kejuruan', teacher: T.en2 },
    { classId: 'x-dkv',  name: 'Ilustrasi Komik & Visual Storytelling', teacher: T.dk1 },
    { classId: 'x-tl-1', name: 'Pengenalan Mesin Las SMAW Inverter', teacher: T.tl2, room: LABS.tlSmaw },
    { classId: 'x-tl-2', name: 'Pengukuran Benda Kerja Menggunakan Micrometer', teacher: T.tl3, room: LABS.tlBench },
    { classId: 'xi-ak-1', name: 'Praktikum Akuntansi Jasa Konsultasi', teacher: T.ak3 },
    { classId: 'xi-ak-2', name: 'Spreadsheet Pengolahan Pajak Karyawan', teacher: T.ak4, room: LABS.ak1 },
    { classId: 'xi-dkv',  name: 'Desain Kemasan Makanan Ramah Lingkungan', teacher: T.dk4 },
    { classId: 'xi-tl-1', name: 'Pengelasan GMAW Sambungan Plat T-Joint', teacher: T.tl1, room: LABS.tlGmaw },
    { classId: 'xi-tl-2', name: 'Peralatan Keselamatan Gas Bertekanan K3', teacher: T.tl4 },
    { classId: 'xii-ak-1', name: 'Projek Kreatif PKK: Jasa Pembukuan UMKM', teacher: T.kw1 },
    { classId: 'xii-ak-2', name: 'Projek Kreatif PKK: Layanan Pelaporan Pajak', teacher: T.kw2 },
    { classId: 'xii-dkv',  name: 'Desain Portofolio Behance & Dribbble', teacher: T.dk3 },
    { classId: 'xii-tl-1', name: 'Projek Kreatif PKK: Fabrikasi Pagar Ornamen', teacher: T.tl5, room: LABS.tlFab },
    { classId: 'xii-tl-2', name: 'Projek Kreatif PKK: Fabrikasi Tangki Stainless', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  setSlot(6, 'Jam 9 - 10', '14:05', '15:30', [
    { classId: 'x-ak-1', name: 'Projek IPAS (Energi Terbarukan Bisnis)', teacher: T.ip1 },
    { classId: 'x-ak-2', name: 'Bimbingan Konseling & Karir Vokasi', teacher: T.bk1 },
    { classId: 'x-dkv',  name: 'Apresiasi Budaya Visual Sulawesi Tengah', teacher: T.sj1 },
    { classId: 'x-tl-1', name: 'Seni Budaya & Desain Ornamen Logam', teacher: T.sj2 },
    { classId: 'x-tl-2', name: 'Projek IPAS (Reaksi Oksidasi Logam Las)', teacher: T.tl3 },
    { classId: 'xi-ak-1', name: 'Etika Penagihan Piutang & Surat Teguran', teacher: T.ak1 },
    { classId: 'xi-ak-2', name: 'Analisis Kelayakan Usaha UMKM Moilong', teacher: T.ak2 },
    { classId: 'xi-dkv',  name: 'Fotografi Konseptual & Eksperimental', teacher: T.dk2, room: LABS.dkStudio },
    { classId: 'xi-tl-1', name: 'Projek Fabrikasi Dudukan Mesin Gerinda', teacher: T.tl2, room: LABS.tlFab },
    { classId: 'xi-tl-2', name: 'Teknik Pemotongan Plat Gas Oksigen-Asetilin', teacher: T.tl4, room: LABS.tlBench },
    { classId: 'xii-ak-1', name: 'Uji Coba Try Out Teori Kejuruan UKK', teacher: T.ak5 },
    { classId: 'xii-ak-2', name: 'Evaluasi Pembukuan Badan Usaha Milik Desa', teacher: T.ak6, room: LABS.ak2 },
    { classId: 'xii-dkv',  name: 'Penyusunan Anggaran Biaya Desain (RAB)', teacher: T.dk1 },
    { classId: 'xii-tl-1', name: 'Analisis Biaya Material Pengelasan Fabrikasi', teacher: T.tl5 },
    { classId: 'xii-tl-2', name: 'Sertifikasi BNSP Pengelasan Pipa Final', teacher: T.tl6, room: LABS.tlPipe }
  ]);

  return S;
}

const schedules = buildAllSchedules();

function checkConflicts(S) {
  const issues = [];
  const cIds = Object.keys(S);
  for (let d = 1; d <= 6; d++) {
    for (let i = 0; i < cIds.length; i++) {
      for (let j = i + 1; j < cIds.length; j++) {
        const listA = S[cIds[i]].filter(x => x.day === d);
        const listB = S[cIds[j]].filter(x => x.day === d);
        for (const a of listA) {
          for (const b of listB) {
            if (!(a.timeEnd <= b.timeStart || a.timeStart >= b.timeEnd)) {
              // Same teacher overlap
              const ignoreTeachers = ['Pembina Upacara', 'Tim Kesiswaan SMKN 1'];
              if (a.teacher === b.teacher && !ignoreTeachers.includes(a.teacher)) {
                issues.push(`[GURU BENTROK] Hari ${d} (${a.timeStart}-${a.timeEnd}): Guru "${a.teacher}" di ${cIds[i]} ("${a.name}") dan ${cIds[j]} ("${b.name}")`);
              }
              // Same room overlap
              const ignoreRooms = ['Lapangan Utama SMKN 1 Moilong', 'Lapangan Olahraga SMKN 1', 'GOR Indoor SMKN 1 Moilong'];
              if (a.room === b.room && !ignoreRooms.includes(a.room)) {
                issues.push(`[RUANG BENTROK] Hari ${d} (${a.timeStart}-${a.timeEnd}): Ruang "${a.room}" dipakai ${cIds[i]} dan ${cIds[j]}`);
              }
            }
          }
        }
      }
    }
  }
  return issues;
}

const issues = checkConflicts(schedules);
console.log('Total issues found:', issues.length);
if (issues.length > 0) {
  issues.forEach(iss => console.log(iss));
} else {
  console.log('>>> SUCCESS! ALL 6 DAYS HAVE 0 CONFLICTS ACROSS ALL 15 CLASSES! <<<');
}

module.exports = { buildAllSchedules, checkConflicts };
