// ── SUPABASE CLIENT ─────────────────────────────────────────────────────────
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── STATE ────────────────────────────────────────────────────────────────────
let EVENTS = [];          // all events from DB: {id, year, month, day, en1, en2, ar, category}
let editMode = false;
let activeFilter = 'all';
let isMobile = window.matchMedia('(max-width: 760px)').matches;

const MONTH_DEFS = [
  { m:6,  y:2026, hijri:'Muharram 1448',                    theme:'New Beginnings — Summer Semester' },
  { m:7,  y:2026, hijri:'Muharram–Safar 1448',               theme:'Reflection & Growth — Mid Summer' },
  { m:8,  y:2026, hijri:'Safar–Rabi al-Awwal 1448',          theme:'Fall Welcome — New Academic Year' },
  { m:9,  y:2026, hijri:'Rabi al-Awwal–Rabi al-Thani 1448',  theme:'Launch — Fall Semester Kickoff' },
  { m:10, y:2026, hijri:'Rabi al-Thani–Jumada al-Ula 1448',  theme:'Intellectual & Spiritual Depth' },
  { m:11, y:2026, hijri:'Jumada al-Ula–Jumada al-Thani 1448', theme:'Community, Charity & Qiyam' },
  { m:12, y:2026, hijri:'Jumada al-Thani–Rajab 1448',        theme:'Finals, Reflection & Winter Break' },
  { m:1,  y:2027, hijri:'Rajab 1448',                        theme:'New Year — Spring Preparation' },
  { m:2,  y:2027, hijri:"Rajab–Sha'ban 1448",                theme:"Sha'ban — Prepare Your Heart for Ramadan" },
  { m:3,  y:2027, hijri:"Sha'ban–Ramadan 1448",              theme:'Ramadan Mubarak 🌙' },
  { m:4,  y:2027, hijri:'Shawwal–Dhul Qadah 1448',           theme:'Spring in Full Bloom' },
  { m:5,  y:2027, hijri:'Dhul Qadah–Dhul Hijjah 1448',       theme:'Finals, Farewell & Eid al-Adha' },
];

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
const DAY_NAMES_SHORT = ['M','T','W','T','F','S','S'];

const CATEGORY_META = {
  S:    { label: 'Spiritual',     icon: '🕌' },
  ATH:  { label: 'Athletic',      icon: '🏃' },
  INT:  { label: 'Intellectual',  icon: '💡' },
  HUGE: { label: 'Huge Event',    icon: '⭐' },
  SC:   { label: 'Social',        icon: '🤝' },
  OFF:  { label: 'No Classes',    icon: '🚫' },
  WED:  { label: 'Wed Series',    icon: '📅' },
};

// ── DATA LOADING ─────────────────────────────────────────────────────────────
async function loadEvents() {
  const { data, error } = await sb.from('events').select('*').order('year').order('month').order('day');
  if (error) {
    console.error('Load error:', error);
    showToast('Failed to load events. Check connection.', true);
    return;
  }
  EVENTS = data || [];

  // Auto-seed if empty (first ever load)
  if (EVENTS.length === 0 && typeof ALL_SEED_EVENTS !== 'undefined') {
    await seedDatabase();
  } else {
    renderAll();
  }
}

async function seedDatabase() {
  showToast('Setting up calendar for the first time…');
  const { error } = await sb.from('events').insert(ALL_SEED_EVENTS);
  if (error) {
    console.error('Seed error:', error);
    showToast('Setup failed — please refresh.', true);
    return;
  }
  await loadEvents();
}

// ── CRUD ─────────────────────────────────────────────────────────────────────
async function addEvent(ev) {
  const { data, error } = await sb.from('events').insert([ev]).select();
  if (error) { showToast('Failed to add event.', true); console.error(error); return null; }
  EVENTS.push(data[0]);
  renderAll();
  showToast('Event added ✓');
  return data[0];
}

async function updateEvent(id, fields) {
  const { error } = await sb.from('events').update(fields).eq('id', id);
  if (error) { showToast('Failed to update event.', true); console.error(error); return; }
  const idx = EVENTS.findIndex(e => e.id === id);
  if (idx > -1) EVENTS[idx] = { ...EVENTS[idx], ...fields };
  renderAll();
  showToast('Event updated ✓');
}

async function deleteEvent(id) {
  const { error } = await sb.from('events').delete().eq('id', id);
  if (error) { showToast('Failed to delete event.', true); console.error(error); return; }
  EVENTS = EVENTS.filter(e => e.id !== id);
  renderAll();
  showToast('Event removed ✓');
}

// ── TOAST ────────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

// ── EDIT MODE / PASSCODE ─────────────────────────────────────────────────────
function openPasscodeModal() {
  document.getElementById('passcode-modal').classList.add('show');
  document.getElementById('passcode-input').value = '';
  document.getElementById('passcode-input').focus();
  document.getElementById('passcode-error').style.display = 'none';
}
function closePasscodeModal() {
  document.getElementById('passcode-modal').classList.remove('show');
}
function tryPasscode() {
  const val = document.getElementById('passcode-input').value;
  if (val === EDIT_PASSCODE) {
    editMode = true;
    closePasscodeModal();
    document.body.classList.add('edit-mode');
    document.getElementById('edit-toggle-btn').textContent = '✓ Editing — Click to Exit';
    document.getElementById('edit-toggle-btn').classList.add('active');
    renderAll();
    showToast('Edit mode unlocked ✓');
  } else {
    document.getElementById('passcode-error').style.display = 'block';
  }
}
function toggleEditMode() {
  if (editMode) {
    editMode = false;
    document.body.classList.remove('edit-mode');
    document.getElementById('edit-toggle-btn').textContent = '🔒 Edit Calendar';
    document.getElementById('edit-toggle-btn').classList.remove('active');
    renderAll();
  } else {
    openPasscodeModal();
  }
}

// ── EVENT FORM MODAL (Add / Edit) ────────────────────────────────────────────
let formContext = null; // {mode: 'add'|'edit', year, month, day, id}

function openEventForm(ctx) {
  formContext = ctx;
  const modal = document.getElementById('event-modal');
  const isEdit = ctx.mode === 'edit';
  document.getElementById('event-modal-title').textContent = isEdit ? 'Edit Event' : 'Add Event';
  document.getElementById('event-date-label').textContent =
    `${MONTH_NAMES[ctx.month-1]} ${ctx.day}, ${ctx.year}`;

  document.getElementById('event-en1').value = isEdit ? ctx.data.en1 : '';
  document.getElementById('event-en2').value = isEdit ? (ctx.data.en2 || '') : '';
  document.getElementById('event-ar').value  = isEdit ? (ctx.data.ar || '') : '';
  document.getElementById('event-cat').value = isEdit ? ctx.data.category : 'SC';

  document.getElementById('event-delete-btn').style.display = isEdit ? 'inline-flex' : 'none';
  modal.classList.add('show');
  document.getElementById('event-en1').focus();
}
function closeEventForm() {
  document.getElementById('event-modal').classList.remove('show');
  formContext = null;
}
async function submitEventForm() {
  const en1 = document.getElementById('event-en1').value.trim();
  const en2 = document.getElementById('event-en2').value.trim();
  const ar  = document.getElementById('event-ar').value.trim();
  const category = document.getElementById('event-cat').value;

  if (!en1) { showToast('Event title is required.', true); return; }

  if (formContext.mode === 'add') {
    await addEvent({ year: formContext.year, month: formContext.month, day: formContext.day, en1, en2, ar, category });
  } else {
    await updateEvent(formContext.id, { en1, en2, ar, category });
  }
  closeEventForm();
}
async function deleteFromForm() {
  if (!formContext || formContext.mode !== 'edit') return;
  if (!confirm('Remove this event?')) return;
  await deleteEvent(formContext.id);
  closeEventForm();
}

// ── RENDERING ────────────────────────────────────────────────────────────────
function daysInMonth(m, y) { return new Date(y, m, 0).getDate(); }
function firstDow(m, y) { let d = new Date(y, m-1, 1).getDay(); return d === 0 ? 6 : d - 1; }

function eventsFor(year, month, day) {
  return EVENTS.filter(e => e.year === year && e.month === month && e.day === day);
}

function buildChip(ev) {
  const div = document.createElement('div');
  div.className = `event-chip chip-${ev.category}`;
  div.dataset.cat = ev.category;
  div.innerHTML = `
    <span class="chip-en">${escapeHtml(ev.en1)}</span>
    ${ev.en2 ? `<span class="chip-sub">${escapeHtml(ev.en2)}</span>` : ''}
    ${ev.ar ? `<span class="chip-ar">${escapeHtml(ev.ar)}</span>` : ''}
    ${editMode ? '<span class="chip-edit-hint">✎</span>' : ''}
  `;
  if (editMode) {
    div.classList.add('editable');
    div.addEventListener('click', (e) => {
      e.stopPropagation();
      openEventForm({ mode: 'edit', id: ev.id, year: ev.year, month: ev.month, day: ev.day, data: ev });
    });
  }
  return div;
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

function buildDesktopMonth(md) {
  const section = document.createElement('section');
  section.className = 'month-section';

  const hdr = document.createElement('div');
  hdr.className = 'month-header';
  hdr.innerHTML = `
    <div class="month-name">${MONTH_NAMES[md.m-1]} ${md.y}</div>
    <div class="month-meta">
      <span class="month-hijri">${md.hijri}</span>
      <span class="month-theme">${md.theme}</span>
    </div>`;
  section.appendChild(hdr);

  const grid = document.createElement('div');
  grid.className = 'cal-grid';

  DAY_NAMES.forEach((d, i) => {
    const dh = document.createElement('div');
    dh.className = 'cal-day-header' + (i===2?' wed':'') + (i===4?' fri':'');
    dh.textContent = d + (i===2?' ✦':'');
    grid.appendChild(dh);
  });

  const fd = firstDow(md.m, md.y);
  const dim = daysInMonth(md.m, md.y);
  const totalCells = Math.ceil((fd + dim) / 7) * 7;

  for (let c = 0; c < totalCells; c++) {
    const dayNum = c - fd + 1;
    const cell = document.createElement('div');
    const isValid = dayNum >= 1 && dayNum <= dim;
    const evs = isValid ? eventsFor(md.y, md.m, dayNum) : [];
    const isOff = evs.some(e => e.category === 'OFF');
    const isWed = isValid && (c % 7 === 2);
    const isFri = isValid && (c % 7 === 4);

    cell.className = 'cal-cell' +
      (!isValid ? ' empty' : '') +
      (isOff ? ' is-off' : '') +
      (isWed && !isOff ? ' is-wed' : '') +
      (isFri && !isOff ? ' is-fri' : '');

    if (isValid) {
      const dn = document.createElement('div');
      dn.className = 'day-number';
      dn.textContent = dayNum;
      cell.appendChild(dn);

      evs.forEach(ev => cell.appendChild(buildChip(ev)));

      if (isFri && !isOff && evs.length === 0) {
        const fajr = document.createElement('div');
        fajr.className = 'fajr-tag';
        fajr.textContent = '🕌 Fajr Prayer';
        cell.appendChild(fajr);
      }

      if (editMode) {
        const addBtn = document.createElement('button');
        addBtn.className = 'add-event-btn';
        addBtn.textContent = '+ Add';
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openEventForm({ mode: 'add', year: md.y, month: md.m, day: dayNum });
        });
        cell.appendChild(addBtn);
      }
    }
    grid.appendChild(cell);
  }
  section.appendChild(grid);
  return section;
}

function buildMobileMonth(md) {
  const section = document.createElement('section');
  section.className = 'month-section mobile';

  const hdr = document.createElement('div');
  hdr.className = 'month-header';
  hdr.innerHTML = `
    <div class="month-name">${MONTH_NAMES[md.m-1]} ${md.y}</div>
    <div class="month-meta">
      <span class="month-hijri">${md.hijri}</span>
      <span class="month-theme">${md.theme}</span>
    </div>`;
  section.appendChild(hdr);

  const list = document.createElement('div');
  list.className = 'mobile-day-list';

  const dim = daysInMonth(md.m, md.y);
  const fd = firstDow(md.m, md.y);

  for (let day = 1; day <= dim; day++) {
    const col = (fd + day - 1) % 7;
    const evs = eventsFor(md.y, md.m, day);
    const isOff = evs.some(e => e.category === 'OFF');
    const isFri = col === 4;
    const isWed = col === 2;

    // Skip days with nothing, unless in edit mode (so you can add)
    if (evs.length === 0 && !editMode && !(isFri)) continue;

    const row = document.createElement('div');
    row.className = 'mobile-day-row' + (isOff ? ' is-off' : '') + (isWed && !isOff ? ' is-wed' : '') + (isFri && !isOff ? ' is-fri' : '');

    const dateCol = document.createElement('div');
    dateCol.className = 'mobile-date-col';
    dateCol.innerHTML = `<span class="mobile-daynum">${day}</span><span class="mobile-dayname">${DAY_NAMES_SHORT[col]}</span>`;
    row.appendChild(dateCol);

    const contentCol = document.createElement('div');
    contentCol.className = 'mobile-content-col';

    evs.forEach(ev => contentCol.appendChild(buildChip(ev)));

    if (isFri && !isOff && evs.length === 0) {
      const fajr = document.createElement('div');
      fajr.className = 'fajr-tag';
      fajr.textContent = '🕌 Fajr Prayer';
      contentCol.appendChild(fajr);
    }

    if (editMode) {
      const addBtn = document.createElement('button');
      addBtn.className = 'add-event-btn mobile';
      addBtn.textContent = '+ Add event';
      addBtn.addEventListener('click', () => openEventForm({ mode: 'add', year: md.y, month: md.m, day }));
      contentCol.appendChild(addBtn);
    }

    row.appendChild(contentCol);
    list.appendChild(row);
  }

  section.appendChild(list);
  return section;
}

function applyFilter() {
  document.querySelectorAll('.event-chip').forEach(chip => {
    if (activeFilter === 'all') {
      chip.classList.remove('dimmed');
    } else {
      const cat = chip.dataset.cat;
      const matches = cat === activeFilter || (activeFilter === 'INT' && cat === 'WED');
      chip.classList.toggle('dimmed', !matches);
    }
  });
}

function renderAll() {
  isMobile = window.matchMedia('(max-width: 760px)').matches;
  const cal = document.getElementById('calendar');
  cal.innerHTML = '';
  MONTH_DEFS.forEach(md => {
    cal.appendChild(isMobile ? buildMobileMonth(md) : buildDesktopMonth(md));
  });
  applyFilter();
}

// ── FILTER PILLS ─────────────────────────────────────────────────────────────
function initFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.cat;
      applyFilter();
    });
  });
}

// ── INIT ─────────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  const nowMobile = window.matchMedia('(max-width: 760px)').matches;
  if (nowMobile !== isMobile) renderAll();
});

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  loadEvents();

  document.getElementById('edit-toggle-btn').addEventListener('click', toggleEditMode);
  document.getElementById('passcode-submit').addEventListener('click', tryPasscode);
  document.getElementById('passcode-cancel').addEventListener('click', closePasscodeModal);
  document.getElementById('passcode-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') tryPasscode(); });

  document.getElementById('event-cancel-btn').addEventListener('click', closeEventForm);
  document.getElementById('event-save-btn').addEventListener('click', submitEventForm);
  document.getElementById('event-delete-btn').addEventListener('click', deleteFromForm);

  // Close modals on backdrop click
  document.getElementById('passcode-modal').addEventListener('click', (e) => { if (e.target.id === 'passcode-modal') closePasscodeModal(); });
  document.getElementById('event-modal').addEventListener('click', (e) => { if (e.target.id === 'event-modal') closeEventForm(); });
});
