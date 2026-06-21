// Seed data — run once in browser console on the live site, OR this is auto-run
// on first load if the events table is empty (see app.js: seedIfEmpty)

const SEED_EVENTS = [
  // ── JUNE 2026 ──
  {year:2026, month:6, day:5,  en1:'Graduation Ceremony', en2:'Graduate',           ar:'حفل تخرج — الدراسات العليا', category:'HUGE'},
  {year:2026, month:6, day:6,  en1:'Graduation Ceremony', en2:'Undergraduate',      ar:'حفل تخرج — البكالوريوس',     category:'HUGE'},
  {year:2026, month:6, day:17, en1:'HOLIDAY',             en2:'Hijra New Year 1448 🎉', ar:'رأس السنة الهجرية ١٤٤٨', category:'OFF'},
  {year:2026, month:6, day:20, en1:'What is Muharram?',   en2:'Islamic month series', ar:'ما هو شهر محرم؟',         category:'S'},
  {year:2026, month:6, day:25, en1:'Ashura Fasting',      en2:'Sunnah reminder',     ar:'تذكير: صيام عاشوراء',      category:'S'},
  {year:2026, month:6, day:26, en1:'HOLIDAY',             en2:'Ashura — No Classes', ar:'عطلة: عاشوراء',            category:'OFF'},
  {year:2026, month:6, day:28, en1:'Ashura Reflection',   en2:'+ Charity reminder',  ar:'تأمل عاشوراء + صدقة',      category:'S'},

  // ── JULY 2026 ──
  {year:2026, month:7, day:3,  en1:'Withdrawal Deadline', en2:'Summer courses',     ar:'آخر موعد لسحب المواد',      category:'INT'},
  {year:2026, month:7, day:10, en1:'Mon–Thu Fasting',     en2:'Sunnah reminder',    ar:'صيام الاثنين والخميس',      category:'S'},
  {year:2026, month:7, day:15, en1:'What is Safar?',      en2:'Islamic month intro', ar:'ما هو شهر صفر؟',           category:'S'},
  {year:2026, month:7, day:21, en1:'New Students',        en2:'Virtual Orientation', ar:'توجيه الطلاب الجدد',       category:'SC'},
  {year:2026, month:7, day:23, en1:'Last Day of Classes', en2:'Summer semester',    ar:'آخر يوم دراسة صيفي',        category:'INT'},
  {year:2026, month:7, day:27, en1:'Final Exams Begin',   en2:'Dua + study tips',   ar:'بداية الامتحانات + دعاء',   category:'INT'},

  // ── AUGUST 2026 ──
  {year:2026, month:8, day:3,  en1:'Summer Exams End',    en2:'Well done everyone!', ar:'نهاية امتحانات الصيف',     category:'INT'},
  {year:2026, month:8, day:15, en1:'HOLIDAY',             en2:'Assumption Day',     ar:'عطلة: عيد الانتقال',        category:'OFF'},
  {year:2026, month:8, day:15, en1:'Rabi al-Awwal',       en2:'Know Your Prophet ﷺ series', ar:'اعرف نبيك ﷺ',      category:'S'},
  {year:2026, month:8, day:19, en1:'Intl Student',        en2:'Welcome Day',        ar:'يوم استقبال الطلاب الدوليين', category:'HUGE'},
  {year:2026, month:8, day:20, en1:'New Student',         en2:'On-Campus Orientation', ar:'توجيه الطلاب الجدد',     category:'HUGE'},
  {year:2026, month:8, day:25, en1:'HOLIDAY',             en2:'Mawlid al-Nabi ﷺ 🌹', ar:'عطلة: المولد النبوي',      category:'OFF'},
  {year:2026, month:8, day:26, en1:'Mawlid Event',        en2:'Life of the Prophet ﷺ', ar:'احتفاء بالمولد النبوي', category:'S'},
  {year:2026, month:8, day:31, en1:'Fall Semester Begins!', en2:'Bismillah 🎉',     ar:'بداية الفصل الخريفي!',      category:'HUGE'},

  // ── SEPTEMBER 2026 ──
  {year:2026, month:9, day:1,  en1:'Classes Begin',       en2:'Drop & Add week',    ar:'بداية الدروس',              category:'INT'},
  {year:2026, month:9, day:4,  en1:'Fajr Prayer',         en2:'Friday gathering',   ar:'تجمع الفجر الجمعة',         category:'S'},
  {year:2026, month:9, day:7,  en1:'AUB Opening Ceremony', en2:'Fall 26-27',        ar:'حفل افتتاح الجامعة',        category:'HUGE'},
  {year:2026, month:9, day:10, en1:'Welcome Gathering',   en2:'Brothers & Sisters', ar:'تجمع الترحيب',              category:'SC'},
  {year:2026, month:9, day:14, en1:'Clubs Fair',          en2:'Visit our booth!',   ar:'معرض النوادي',              category:'HUGE'},
  {year:2026, month:9, day:18, en1:'Insight Randoms',     en2:'Meet your members',  ar:'إنسايت راندومز',            category:'SC'},
  {year:2026, month:9, day:25, en1:'General Assembly',    en2:'Fall 26-27',         ar:'الجمعية العامة',            category:'HUGE'},

  // ── OCTOBER 2026 ──
  {year:2026, month:10, day:2,  en1:'Fajr Prayer',        en2:'Weekly Friday reminder', ar:'صلاة الفجر',           category:'S'},
  {year:2026, month:10, day:9,  en1:'Quran Program',      en2:'Tasmee3 sessions',   ar:'برنامج القرآن — التسميع',   category:'S'},
  {year:2026, month:10, day:16, en1:'External Speaker',   en2:'Announcement teaser', ar:'إعلان: متحدث ضيف',         category:'INT'},
  {year:2026, month:10, day:22, en1:'External Speaker',   en2:'Lecture night',      ar:'ليلة المحاضرة',             category:'INT'},
  {year:2026, month:10, day:26, en1:'Solidarity Event',   en2:'With partner clubs', ar:'فعالية التضامن',            category:'HUGE'},
  {year:2026, month:10, day:29, en1:'FALL BREAK',         en2:'No Classes Oct 29–Nov 1', ar:'إجازة الخريف',         category:'OFF'},

  // ── NOVEMBER 2026 ──
  {year:2026, month:11, day:6,  en1:'Fajr Prayer',        en2:'+ Revision sessions start', ar:'صلاة الفجر + بداية المراجعة', category:'S'},
  {year:2026, month:11, day:13, en1:'Charity Drive',      en2:'Community giving campaign', ar:'حملة العطاء المجتمعية', category:'SC'},
  {year:2026, month:11, day:20, en1:'HOLIDAY',            en2:'Independence Day 🇱🇧', ar:'عطلة: عيد الاستقلال',     category:'OFF'},
  {year:2026, month:11, day:21, en1:'Qiyam al-Layl',      en2:'Spiritual revival night', ar:'ليلة القيام',          category:'S'},
  {year:2026, month:11, day:27, en1:'Informal Gathering', en2:'Sisters & Brothers', ar:'تجمع غير رسمي',             category:'SC'},

  // ── DECEMBER 2026 ──
  {year:2026, month:12, day:1,  en1:'Revision Sessions',  en2:'Finals schedule drop', ar:'جلسات المراجعة',          category:'INT'},
  {year:2026, month:12, day:4,  en1:'Classes End',        en2:'Fall 26-27',         ar:'نهاية الدروس الخريفية',     category:'INT'},
  {year:2026, month:12, day:7,  en1:'AUB Founders Day',   en2:'Proud to be AUBite', ar:'يوم المؤسسين',              category:'HUGE'},
  {year:2026, month:12, day:9,  en1:'Final Exams Begin',  en2:'Dua + tips',         ar:'بداية الامتحانات + دعاء',   category:'INT'},
  {year:2026, month:12, day:11, en1:'Rajab Begins',       en2:'Prepare for Ramadan ✨', ar:'بداية رجب',              category:'S'},
  {year:2026, month:12, day:18, en1:'Fall Semester Ends', en2:'Congrats everyone! 🎉', ar:'نهاية الفصل الخريفي',    category:'HUGE'},
  {year:2026, month:12, day:24, en1:'HOLIDAY',            en2:'Christmas & New Year Break', ar:'عطلة: الكريسماس والسنة الجديدة', category:'OFF'},
  {year:2026, month:12, day:27, en1:'Year-End Reflection', en2:'What did you achieve?', ar:'تأمل نهاية العام',      category:'S'},

  // ── JANUARY 2027 ──
  {year:2027, month:1, day:1,  en1:'New Year Reflection', en2:'Islamic view on time', ar:'تأمل إسلامي في الوقت',   category:'S'},
  {year:2027, month:1, day:4,  en1:'Classes Resume',      en2:'Back to AUB!',       ar:'عودة إلى الجامعة!',         category:'HUGE'},
  {year:2027, month:1, day:5,  en1:'Intl Student',        en2:'Welcome Day',        ar:'يوم استقبال الطلاب الدوليين', category:'SC'},
  {year:2027, month:1, day:6,  en1:'HOLIDAY',             en2:'Armenian Christmas', ar:'عطلة: عيد الميلاد الأرمني', category:'OFF'},
  {year:2027, month:1, day:13, en1:'Spring Semester Begins!', en2:'Bismillah 🌸',   ar:'بداية الفصل الربيعي!',      category:'HUGE'},
  {year:2027, month:1, day:16, en1:'Rajab Series',        en2:'Night Journey approaching 🌙', ar:'سلسلة رجب — الإسراء قريب', category:'S'},
  {year:2027, month:1, day:18, en1:'Welcome Gathering',   en2:'Spring edition',     ar:'تجمع الترحيب — الربيع',     category:'SC'},
  {year:2027, month:1, day:25, en1:'Halaqa',              en2:'Rajab special',      ar:'حلقة — خاص رجب',            category:'S'},

  // ── FEBRUARY 2027 ──
  {year:2027, month:2, day:1,  en1:"Sha'ban Begins",      en2:'Ramadan countdown 🌙', ar:'بداية شعبان',             category:'S'},
  {year:2027, month:2, day:3,  en1:'Shab-e-Barat',        en2:'Night of forgiveness', ar:'ليلة النصف من شعبان',     category:'S'},
  {year:2027, month:2, day:7,  en1:'Fajr Prayer',         en2:"Sha'ban fasting push", ar:'صلاة الفجر + صوم شعبان', category:'S'},
  {year:2027, month:2, day:9,  en1:'HOLIDAY',             en2:"St. Maroun's Day",   ar:'عطلة: عيد مار مارون',       category:'OFF'},
  {year:2027, month:2, day:14, en1:'Ramadan Prep #1',     en2:'Practical guide',    ar:'التحضير لرمضان #١',         category:'S'},
  {year:2027, month:2, day:21, en1:'Ramadan Prep #2',     en2:'Spiritual goals',    ar:'التحضير لرمضان #٢',         category:'S'},
  {year:2027, month:2, day:25, en1:'Sisters Gathering',   en2:'Ramadan prep activities', ar:'تجمع الأخوات — رمضان', category:'SC'},
  {year:2027, month:2, day:28, en1:'Ramadan Prep #3',     en2:'Charity & giving',   ar:'التحضير لرمضان #٣',         category:'S'},

  // ── MARCH 2027 ──
  {year:2027, month:3, day:1,  en1:'Ramadan Countdown',   en2:'10 days to go!',     ar:'العد التنازلي — ١٠ أيام!',  category:'S'},
  {year:2027, month:3, day:5,  en1:'Quran Program',       en2:'Ramadan edition',    ar:'برنامج القرآن — رمضان',     category:'S'},
  {year:2027, month:3, day:10, en1:'HOLIDAY',             en2:'Eid al-Fitr 🌙✨',   ar:'عطلة: عيد الفطر',           category:'OFF'},
  {year:2027, month:3, day:11, en1:'HOLIDAY',             en2:'Eid al-Fitr Day 2',  ar:'عطلة: عيد الفطر — اليوم الثاني', category:'OFF'},
  {year:2027, month:3, day:14, en1:'Post-Eid Reflection', en2:'Keep the spirit alive', ar:'تأمل ما بعد العيد',      category:'S'},
  {year:2027, month:3, day:22, en1:'Iftar with Seekers',  en2:'Interfaith gathering', ar:'إفطار مع السيكرز',        category:'HUGE'},
  {year:2027, month:3, day:25, en1:'HOLIDAY',             en2:'Annunciation Day',   ar:'عطلة: عيد البشارة',         category:'OFF'},
  {year:2027, month:3, day:29, en1:'Halaqa',              en2:'Shawwal series',     ar:'حلقة — سلسلة شوال',         category:'S'},

  // ── APRIL 2027 ──
  {year:2027, month:4, day:1,  en1:'Hijab Day',           en2:'Modesty & identity series', ar:'يوم الحجاب',         category:'S'},
  {year:2027, month:4, day:5,  en1:'General Assembly',    en2:'Spring 26-27',       ar:'الجمعية العامة — الربيع',   category:'HUGE'},
  {year:2027, month:4, day:9,  en1:'External Speaker',    en2:'Spring edition',     ar:'متحدث ضيف — الربيع',        category:'INT'},
  {year:2027, month:4, day:12, en1:'Formal Iftar',        en2:'Annual spring dinner 🍽️', ar:'إفطار رسمي — عشاء الربيع', category:'HUGE'},
  {year:2027, month:4, day:16, en1:'Sport Event',         en2:'Athletic tournament day', ar:'يوم الرياضة',           category:'ATH'},
  {year:2027, month:4, day:20, en1:'Online Career Panel', en2:'Software & Consulting', ar:'لجنة مسار مهني أونلاين', category:'INT'},
  {year:2027, month:4, day:25, en1:'Spring Gathering',    en2:'Brothers & Sisters', ar:'تجمع الربيع',               category:'SC'},
  {year:2027, month:4, day:28, en1:'Islamic Apologetics', en2:'Workshop',           ar:'ورشة الدفاع عن الإسلام',    category:'INT'},
  {year:2027, month:4, day:30, en1:'Brothers Trip',       en2:'Day trip announced!', ar:'إعلان رحلة الإخوة',        category:'ATH'},

  // ── MAY 2027 ──
  {year:2027, month:5, day:1,  en1:'HOLIDAY',             en2:'Labor Day',          ar:'عطلة: عيد العمال',          category:'OFF'},
  {year:2027, month:5, day:3,  en1:'Classes End',         en2:'Spring 26-27',       ar:'نهاية دروس الفصل الربيعي',  category:'INT'},
  {year:2027, month:5, day:4,  en1:'Final Exams Begin',   en2:'Dua + study tips',   ar:'بداية الامتحانات النهائية', category:'INT'},
  {year:2027, month:5, day:10, en1:'Revision Sessions',   en2:'Finals — all subjects', ar:'جلسات مراجعة النهائيات', category:'INT'},
  {year:2027, month:5, day:13, en1:'Dhul Hijjah Soon',    en2:'Best 10 days — prepare!', ar:'ذو الحجة قريب!',       category:'S'},
  {year:2027, month:5, day:17, en1:'HOLIDAY',             en2:'Eid al-Adha 🐑',     ar:'عطلة: عيد الأضحى',          category:'OFF'},
  {year:2027, month:5, day:18, en1:'HOLIDAY',             en2:'Eid al-Adha Day 2',  ar:'عطلة: عيد الأضحى — اليوم الثاني', category:'OFF'},
  {year:2027, month:5, day:20, en1:'End of Year Event',   en2:'Thank you Insight family! 🎓', ar:'احتفال نهاية العام', category:'HUGE'},
  {year:2027, month:5, day:25, en1:'Spring Semester Ends', en2:'See you next year! 🎓', ar:'نهاية الفصل الربيعي',   category:'HUGE'},
];

// Wednesday alternating series — generated then included in seed
function generateWednesdaySeeds() {
  const WED_SERIES = [
    { cat:'WED', en1:'Halaqa 🕌', en2:'Weekly circle', ar:'حلقة أسبوعية' },
    { cat:'WED', en1:'Intellectual Disc. 💡', en2:'Discussion night', ar:'نقاش فكري' },
    { cat:'WED', en1:'Career & Self-Dev 🚀', en2:'Growth session', ar:'تطوير مهني وذاتي' },
  ];
  const offDates = new Set(SEED_EVENTS.filter(e=>e.category==='OFF').map(e=>`${e.year}-${e.month}-${e.day}`));
  const out = [];

  let d = new Date(2026, 8, 1); // Sep 1 2026
  const endFall = new Date(2026, 10, 28);
  let i = 0;
  while (d <= endFall) {
    if (d.getDay() === 3) {
      const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
      if (!offDates.has(key)) {
        const s = WED_SERIES[i % 3];
        out.push({year:d.getFullYear(), month:d.getMonth()+1, day:d.getDate(), en1:s.en1, en2:s.en2, ar:s.ar, category:'WED'});
      }
      i++;
    }
    d.setDate(d.getDate()+1);
  }
  d = new Date(2027, 0, 13);
  const endSpring = new Date(2027, 3, 27);
  i = 0;
  while (d <= endSpring) {
    if (d.getDay() === 3) {
      const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
      if (!offDates.has(key)) {
        const s = WED_SERIES[i % 3];
        out.push({year:d.getFullYear(), month:d.getMonth()+1, day:d.getDate(), en1:s.en1, en2:s.en2, ar:s.ar, category:'WED'});
      }
      i++;
    }
    d.setDate(d.getDate()+1);
  }
  return out;
}

const ALL_SEED_EVENTS = SEED_EVENTS.concat(generateWednesdaySeeds());

if (typeof module !== 'undefined') module.exports = { ALL_SEED_EVENTS };
