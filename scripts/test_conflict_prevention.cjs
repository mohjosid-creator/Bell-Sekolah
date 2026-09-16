const fs = require('fs');
const vm = require('vm');

const indexHtml = fs.readFileSync('index.html', 'utf-8');
const scriptStart = indexHtml.indexOf('<script>');
const scriptEnd = indexHtml.lastIndexOf('</script>');
const jsCode = indexHtml.substring(scriptStart + '<script>'.length, scriptEnd);

const sandbox = {
  window: { addEventListener: () => {} },
  document: {
    addEventListener: () => {},
    querySelectorAll: () => [],
    getElementById: () => null,
    querySelector: () => null
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  console,
  setTimeout: () => {},
  clearTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {}
};

vm.createContext(sandbox);
vm.runInContext(jsCode, sandbox);

// Seed schedules via app function
sandbox.initClassTimetables();

// Scenario 1: Teacher conflict
// Let's create an empty slot in a new mock class or remove a slot from x-ak-2 so class is free
// On Tuesday (Day 2) 07:00-09:15, Ir. Bambang Sutrisno (T.tl1) is teaching X TL 1
// Try to schedule Ir. Bambang Sutrisno at a non-clashing class time
// Let's see if teacher conflict is detected:
const teacherConflict = sandbox.validateScheduleConflict('mock-free-class', 'Ir. Bambang Sutrisno', 'R. Teori Bebas', 2, '07:30', '08:30');
console.log('Scenario 1 (Teacher conflict detected):', !!teacherConflict, teacherConflict && teacherConflict.type, teacherConflict && teacherConflict.message);

// Scenario 2: Room conflict
// 'Bengkel Pengelasan GMAW' is used on Day 2 10:20-11:50 by XI TL 1
const roomConflict = sandbox.validateScheduleConflict('mock-free-class', 'Guru Lain', 'Bengkel Pengelasan GMAW', 2, '10:30', '11:30');
console.log('Scenario 2 (Room conflict detected):', !!roomConflict, roomConflict && roomConflict.type, roomConflict && roomConflict.message);

// Scenario 3: Double booking same class
// In X AK 1 on Monday 07:15 - 07:30 (during Upacara 07:00-07:45)
const classConflict = sandbox.validateScheduleConflict('x-ak-1', 'Guru Lain', 'Ruang Lain', 1, '07:15', '07:40');
console.log('Scenario 3 (Same class double booking detected):', !!classConflict, classConflict && classConflict.type, classConflict && classConflict.message);

// Scenario 4: Non-conflicting time after school hours
const noConflict = sandbox.validateScheduleConflict('x-ak-1', 'Guru Bebas', 'Ruang Bebas', 1, '16:00', '17:00');
console.log('Scenario 4 (Valid slot allowed):', noConflict === null);

if (teacherConflict && roomConflict && classConflict && noConflict === null) {
  console.log('>>> ALL 4 CONFLICT TESTS PASSED PERFECTLY! <<<');
} else {
  console.error('Some conflict checks failed!');
  process.exit(1);
}
