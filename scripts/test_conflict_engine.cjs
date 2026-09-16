// Test generator and conflict validator
const fs = require('fs');

const MOILONG_CLASSES = {
  'x-ak-1': { name: 'Kelas X AK 1', grade: 'X', major: 'Akuntansi & Keuangan Lembaga (AKL)', teacher: 'Dra. Hj. Siti Aminah, M.Pd', room: 'R. Teori X AK 1' },
  'x-ak-2': { name: 'Kelas X AK 2', grade: 'X', major: 'Akuntansi & Keuangan Lembaga (AKL)', teacher: 'Rahmat Hidayat, S.Pd', room: 'R. Teori X AK 2' },
  'x-dkv': { name: 'Kelas X DKV', grade: 'X', major: 'Desain Komunikasi Visual (DKV)', teacher: 'Fajar Kurniawan, S.Sn', room: 'Studio Gambar X DKV' },
  'x-tl-1': { name: 'Kelas X TL 1', grade: 'X', major: 'Teknik Las (TL)', teacher: 'Ir. Bambang Sutrisno', room: 'R. Teori X TL 1' },
  'x-tl-2': { name: 'Kelas X TL 2', grade: 'X', major: 'Teknik Las (TL)', teacher: 'Agus Prasetyo, S.T', room: 'R. Teori X TL 2' },

  'xi-ak-1': { name: 'Kelas XI AK 1', grade: 'XI', major: 'Akuntansi & Keuangan Lembaga (AKL)', teacher: 'Sri Wahyuni, S.E', room: 'R. Teori XI AK 1' },
  'xi-ak-2': { name: 'Kelas XI AK 2', grade: 'XI', major: 'Akuntansi & Keuangan Lembaga (AKL)', teacher: 'Nurul Fadilah, S.Pd', room: 'R. Teori XI AK 2' },
  'xi-dkv': { name: 'Kelas XI DKV', grade: 'XI', major: 'Desain Komunikasi Visual (DKV)', teacher: 'Reza Pratama, M.Ds', room: 'Studio Grafis XI DKV' },
  'xi-tl-1': { name: 'Kelas XI TL 1', grade: 'XI', major: 'Teknik Las (TL)', teacher: 'Hendra Gunawan, S.Pd.T', room: 'R. Teori XI TL 1' },
  'xi-tl-2': { name: 'Kelas XI TL 2', grade: 'XI', major: 'Teknik Las (TL)', teacher: 'Joko Susilo, S.T', room: 'R. Teori XI TL 2' },

  'xii-ak-1': { name: 'Kelas XII AK 1', grade: 'XII', major: 'Akuntansi & Keuangan Lembaga (AKL)', teacher: 'Dra. Endang Lestari', room: 'R. Teori XII AK 1' },
  'xii-ak-2': { name: 'Kelas XII AK 2', grade: 'XII', major: 'Akuntansi & Keuangan Lembaga (AKL)', teacher: 'Ahmad Fauzi, S.E', room: 'R. Teori XII AK 2' },
  'xii-dkv': { name: 'Kelas XII DKV', grade: 'XII', major: 'Desain Komunikasi Visual (DKV)', teacher: 'Dimas Arya, S.Kom', room: 'Studio Produksi XII DKV' },
  'xii-tl-1': { name: 'Kelas XII TL 1', grade: 'XII', major: 'Teknik Las (TL)', teacher: 'Budi Santoso, S.T', room: 'R. Teori XII TL 1' },
  'xii-tl-2': { name: 'Kelas XII TL 2', grade: 'XII', major: 'Teknik Las (TL)', teacher: 'M. Taufik, S.Pd', room: 'R. Teori XII TL 2' }
};

// Collision detection function
function checkCollisions(allTimetables) {
  const conflicts = [];
  const classIds = Object.keys(allTimetables);

  for (let d = 1; d <= 6; d++) {
    for (let i = 0; i < classIds.length; i++) {
      const c1 = classIds[i];
      const list1 = allTimetables[c1].filter(it => it.day === d);

      // 1. Check internal overlap within same class
      for (let a = 0; a < list1.length; a++) {
        for (let b = a + 1; b < list1.length; b++) {
          const itemA = list1[a];
          const itemB = list1[b];
          if (!(itemA.timeEnd <= itemB.timeStart || itemA.timeStart >= itemB.timeEnd)) {
            conflicts.push({
              type: 'internal_class_conflict',
              day: d,
              classId: c1,
              time: `${itemA.timeStart}-${itemA.timeEnd} vs ${itemB.timeStart}-${itemB.timeEnd}`,
              itemA: itemA.name,
              itemB: itemB.name
            });
          }
        }
      }

      // 2. Check overlap against other classes
      for (let j = i + 1; j < classIds.length; j++) {
        const c2 = classIds[j];
        const list2 = allTimetables[c2].filter(it => it.day === d);

        for (const it1 of list1) {
          for (const it2 of list2) {
            // Overlap check
            const overlap = !(it1.timeEnd <= it2.timeStart || it1.timeStart >= it2.timeEnd);
            if (!overlap) continue;

            // Check teacher conflict
            const sharedAllowedTeachers = ['Pembina Upacara', 'Tim Kesiswaan SMKN 1', 'Tim Fasilitator P5', 'Pembina Ekstrakurikuler', 'Wali Kelas & OSIS'];
            if (it1.teacher && it2.teacher && it1.teacher === it2.teacher && !sharedAllowedTeachers.includes(it1.teacher)) {
              conflicts.push({
                type: 'teacher_conflict',
                day: d,
                teacher: it1.teacher,
                c1,
                c2,
                time: `${it1.timeStart}-${it1.timeEnd}`,
                subj1: it1.name,
                subj2: it2.name
              });
            }

            // Check specialized room conflict
            const sharedAllowedRooms = ['Lapangan Utama SMKN 1 Moilong', 'Lapangan Upacara', 'Lapangan Olahraga', 'Musholla / Ruang Ibadah SMKN 1 Moilong', 'Aula / Ruang Kelas', 'Lapangan & Lingkungan Sekolah', 'Lapangan & Aula SMKN 1'];
            if (it1.room && it2.room && it1.room === it2.room && !sharedAllowedRooms.includes(it1.room)) {
              conflicts.push({
                type: 'room_conflict',
                day: d,
                room: it1.room,
                c1,
                c2,
                time: `${it1.timeStart}-${it1.timeEnd}`,
                subj1: it1.name,
                subj2: it2.name
              });
            }
          }
        }
      }
    }
  }

  return conflicts;
}

console.log('Collision detector loaded.');
