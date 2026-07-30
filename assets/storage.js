/**
 * Handles all localStorage read/write operations.
 *
 * Data model per task:
 *   checkedDays : { "YYYY-MM-DD": true }          – days the task was checked
 *   statusDays  : { "YYYY-MM-DD": "ignored" }      – per-day overrides (ignored / deleted)
 *                 absence of a key means "active" for that day
 *   status      : kept for legacy badge reads, synced to today on load
 */

function todayDateKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

/**
 * Returns the ISO date string for the weekday tab currently selected,
 * always within the current week (Mon–Sun).
 * current Mon–Sun week — never in the past relative to Mon–Sat.
 */
function dateKeyForWeekday(targetWeekday) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayDay = today.getDay();
  // Normalise both sides: Sun=0 → 7, so the week runs Mon(1)…Sat(6)…Sun(7)
  const normTarget = targetWeekday === 0 ? 7 : targetWeekday;
  const normToday  = todayDay  === 0 ? 7 : todayDay;
  const diff = normTarget - normToday;
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function isPastDateKey(dateKey) { return dateKey < todayDateKey(); }
function isFutureDateKey(dateKey) { return dateKey > todayDateKey(); }

function saveTasks(tasks) {
  try { localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks)); } catch(e){}
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TASKS);
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

function saveTheme(theme) {
  try { localStorage.setItem(STORAGE_KEY_THEME, theme); } catch(e){}
}

function loadTheme() {
  try { return localStorage.getItem(STORAGE_KEY_THEME); } catch(e){ return null; }
}

/** Migrate old tasks and sync today's derived fields on every load. */
function applyDailyReset(tasks) {
  const todayKey = todayDateKey();
  tasks = tasks.map(t => {
    const checkedDays = t.checkedDays || (t.checked ? { [todayKey]: true } : {});
    const statusDays  = t.statusDays  || (t.status && t.status !== STATUS_ACTIVE ? { [todayKey]: t.status } : {});
    const todayStatus  = statusDays[todayKey] || STATUS_ACTIVE;
    const todayChecked = !!checkedDays[todayKey];
    return { ...t, checkedDays, statusDays, checked: todayChecked,
      status: todayChecked ? STATUS_DONE : todayStatus };
  });
  saveTasks(tasks);
  return tasks;
}
