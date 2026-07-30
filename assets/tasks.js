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
    status: STATUS_ACTIVE,
    statusDays: {},
    createdAt: Date.now(),
    days: days && days.length ? days : [...ALL_DAYS],
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
  tasks = tasks.map(t => t.id === id ? {...t, days: days.length ? days : [...ALL_DAYS]} : t);
  saveTasks(tasks);
}

/** Toggle checked for today only. */
function toggleCheck(id) {
  const key = todayDateKey();
  tasks = tasks.map(t => {
    if (t.id !== id) { return t; }
    const checkedDays = {...(t.checkedDays||{})};
    const nowChecked = !checkedDays[key];
    if (nowChecked) { checkedDays[key] = true; } else { delete checkedDays[key]; }
    const todayStatus = (t.statusDays||{})[key] || STATUS_ACTIVE;
    return {...t, checkedDays, checked: nowChecked,
      status: nowChecked ? STATUS_DONE : todayStatus};
  });
  saveTasks(tasks);
}

/** Toggle ignore for the VIEWED day. Blocked on past days. */
function ignoreTask(id, dateKey) {
  const key = dateKey || todayDateKey();
  if (isPastDateKey(key)) { return; }
  tasks = tasks.map(t => {
    if (t.id !== id) { return t; }
    const statusDays = {...(t.statusDays||{})};
    if (statusDays[key] === STATUS_IGNORED) {
      delete statusDays[key];
    } else {
      statusDays[key] = STATUS_IGNORED;
    }
    const todayKey     = todayDateKey();
    const todayChecked = !!(t.checkedDays||{})[todayKey];
    const todayStatus  = statusDays[todayKey] || STATUS_ACTIVE;
    return {...t, statusDays, status: todayChecked ? STATUS_DONE : todayStatus};
  });
  saveTasks(tasks);
}

/**
 * Mark task deleted for the VIEWED day only. Blocked on past days.
 * Does NOT remove the task from storage — other days are unaffected.
 */
function deleteTask(id, dateKey) {
  const key = dateKey || todayDateKey();
  if (isPastDateKey(key)) { return; }
  tasks = tasks.map(t => {
    if (t.id !== id) { return t; }
    const statusDays = {...(t.statusDays||{})};
    statusDays[key] = STATUS_DELETED;
    return {...t, statusDays};
  });
  saveTasks(tasks);
}

/** Effective status of a task on a given date. */
function statusOnDay(task, dateKey) {
  if (!dateKey) { dateKey = todayDateKey(); }
  const sd = task.statusDays || {};
  if (sd[dateKey]) { return sd[dateKey]; }
  if ((task.checkedDays||{})[dateKey]) { return STATUS_DONE; }
  return STATUS_ACTIVE;
}

/** Checked state for a specific date. */
function isCheckedOnDay(task, dateKey) {
  return !!(task.checkedDays||{})[dateKey];
}

/**
 * Filter tasks for the given status-tab and day.
 * dayFilter === DAY_FILTER_ALL means "all days" (no day filtering).
 * Uses explicit null check so Sunday (0) is never skipped due to being falsy.
 */
function getFilteredTasks(statusFilter, dayFilter, dateKey) {
  const dk = dateKey || todayDateKey();
  return tasks.filter(t => {
    const dayStatus = statusOnDay(t, dk);
    if (dayStatus === STATUS_DELETED)  { return false; }
    if (statusFilter === STATUS_ACTIVE  && dayStatus !== STATUS_ACTIVE)  { return false; }
    if (statusFilter === STATUS_DONE    && dayStatus !== STATUS_DONE)    { return false; }
    if (statusFilter === STATUS_IGNORED && dayStatus !== STATUS_IGNORED) { return false; }
    if (dayFilter !== DAY_FILTER_ALL && dayFilter != null) {
      const taskDays = t.days ?? [...ALL_DAYS];
      if (!taskDays.includes(dayFilter)) { return false; }
    }
    return true;
  });
}

function initTasks() {
  tasks = applyDailyReset(loadTasks());
}
