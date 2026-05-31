/** Core task state management: create, update, delete, filter */
let tasks = [];

function getTasks() { return tasks; }

function createTask(title, detail, days) {
  tasks.push({
    id: Date.now(),
    title,
    detail: detail || '',
    checked: false,
    checkedDays: {},
    status: 'active',
    statusDays: {},
    createdAt: Date.now(),
    days: days && days.length ? days : [0,1,2,3,4,5,6],
  });
  saveTasks(tasks);
}

function updateTaskTitle(id, title) {
  tasks = tasks.map(t => t.id === id ? {...t, title} : t);
  saveTasks(tasks);
}

function updateTaskDetail(id, detail) {
  tasks = tasks.map(t => t.id === id ? {...t, detail: detail||''} : t);
  saveTasks(tasks);
}

function updateTaskDays(id, days) {
  tasks = tasks.map(t => t.id === id ? {...t, days: days.length ? days : [0,1,2,3,4,5,6]} : t);
  saveTasks(tasks);
}

/** Toggle checked for today only. */
function toggleCheck(id) {
  const key = todayDateKey();
  tasks = tasks.map(t => {
    if (t.id !== id) return t;
    const checkedDays = {...(t.checkedDays||{})};
    const nowChecked = !checkedDays[key];
    if (nowChecked) checkedDays[key] = true; else delete checkedDays[key];
    const todayStatus = (t.statusDays||{})[key] || 'active';
    return {...t, checkedDays, checked: nowChecked,
      status: nowChecked ? 'done' : todayStatus};
  });
  saveTasks(tasks);
}

/** Toggle ignore for the VIEWED day. Blocked on past days. */
function ignoreTask(id, dateKey) {
  const key = dateKey || todayDateKey();
  if (isPastDateKey(key)) return;
  tasks = tasks.map(t => {
    if (t.id !== id) return t;
    const statusDays = {...(t.statusDays||{})};
    if (statusDays[key] === 'ignored') {
      delete statusDays[key];
    } else {
      statusDays[key] = 'ignored';
    }
    const todayKey     = todayDateKey();
    const todayChecked = !!(t.checkedDays||{})[todayKey];
    const todayStatus  = statusDays[todayKey] || 'active';
    return {...t, statusDays, status: todayChecked ? 'done' : todayStatus};
  });
  saveTasks(tasks);
}

/**
 * Mark task deleted for the VIEWED day only. Blocked on past days.
 * Does NOT remove the task from storage — other days are unaffected.
 */
function deleteTask(id, dateKey) {
  const key = dateKey || todayDateKey();
  if (isPastDateKey(key)) return;
  tasks = tasks.map(t => {
    if (t.id !== id) return t;
    const statusDays = {...(t.statusDays||{})};
    statusDays[key] = 'deleted';
    return {...t, statusDays};
  });
  saveTasks(tasks);
}

/** Effective status of a task on a given date. */
function statusOnDay(task, dateKey) {
  if (!dateKey) dateKey = todayDateKey();
  const sd = task.statusDays || {};
  if (sd[dateKey]) return sd[dateKey];
  if ((task.checkedDays||{})[dateKey]) return 'done';
  return 'active';
}

/** Checked state for a specific date. */
function isCheckedOnDay(task, dateKey) {
  return !!(task.checkedDays||{})[dateKey];
}

/**
 * Filter tasks for the given status-tab and day.
 * dayFilter === -1 means "all days" (no day filtering).
 * Uses explicit null check so Sunday (0) is never skipped due to being falsy.
 */
function getFilteredTasks(statusFilter, dayFilter, dateKey) {
  const dk = dateKey || todayDateKey();
  return tasks.filter(t => {
    const dayStatus = statusOnDay(t, dk);
    if (dayStatus === 'deleted') return false;
    if (statusFilter === 'active'  && dayStatus !== 'active')  return false;
    if (statusFilter === 'done'    && dayStatus !== 'done')    return false;
    if (statusFilter === 'ignored' && dayStatus !== 'ignored') return false;
    if (dayFilter !== -1 && dayFilter != null) {
      const taskDays = t.days ?? [0,1,2,3,4,5,6];
      if (!taskDays.includes(dayFilter)) return false;
    }
    return true;
  });
}

function initTasks() {
  tasks = applyDailyReset(loadTasks());
}
