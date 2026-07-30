/** DOM rendering: task list, empty states, filter tabs, reset note */
let currentFilter = STATUS_ACTIVE;
let currentDayFilter = new Date().getDay(); // always start on today's weekday (0=Sun … 6=Sat)
let dayFilterMode = currentDayFilter;

const DAY_ORDER = Object.freeze([1, 2, 3, 4, 5, 6, 0]);
const DAY_KEYS  = Object.freeze(['dayMon', 'dayTue', 'dayWed', 'dayThu', 'dayFri', 'daySat', 'daySun']);

function viewedDateKey() {
  if (dayFilterMode === 'all') { return todayDateKey(); }
  return dateKeyForWeekday(currentDayFilter);
}

function viewingPast() {
  return dayFilterMode !== 'all' && isPastDateKey(viewedDateKey());
}
function viewingToday() {
  return dayFilterMode === 'all' || viewedDateKey() === todayDateKey();
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString(currentLang || DEFAULT_LANG, {month:'short', day:'numeric'});
}

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove(CSS_ACTIVE);
    tab.setAttribute(ATTR_ARIA_SELECTED, 'false');
  });
  btn.classList.add(CSS_ACTIVE);
  btn.setAttribute(ATTR_ARIA_SELECTED, 'true');
  renderTasks();
}

function setDayFilter(mode, btn) {
  dayFilterMode = mode;
  if (mode === 'all') { currentDayFilter = DAY_FILTER_ALL; }
  else                { currentDayFilter = mode; }
  document.querySelectorAll('.day-filter-tab').forEach(tab => {
    tab.classList.remove(CSS_ACTIVE);
    tab.setAttribute(ATTR_ARIA_SELECTED, 'false');
  });
  if (btn) {
    btn.classList.add(CSS_ACTIVE);
    btn.setAttribute(ATTR_ARIA_SELECTED, 'true');
  }
  renderTasks();
}

function renderDayFilterBar() {
  const bar = document.getElementById('day-filter-bar');
  if (!bar) { return; }

  const allActive = dayFilterMode === 'all';

  const dayButtons = DAY_ORDER.map((dayIdx, i) => {
    const active  = dayFilterMode === dayIdx;
    const dateKey = dateKeyForWeekday(dayIdx);
    const past    = isPastDateKey(dateKey);
    return `<button class="filter-tab day-filter-tab ${active ? CSS_ACTIVE : ''} ${past ? 'day-past' : ''}" role="tab" aria-selected="${active}" onclick="setDayFilter(${dayIdx},this)" title="${past ? t('readOnly') : ''}">${t(DAY_KEYS[i])}</button>`;
  }).join('');
  const allButton = `<button class="filter-tab day-filter-tab ${allActive ? CSS_ACTIVE : ''}" role="tab" aria-selected="${allActive}" onclick="setDayFilter('all',this)">${t('dayAll')}</button>`;
  bar.innerHTML = dayButtons + allButton;
}

function renderResetNote() {
  const note = document.getElementById('reset-note');
  if (!note) { return; }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diffH = Math.ceil((tomorrow - Date.now()) / 36e5);
  note.textContent = t('resetNote', diffH);
}

function renderEmptyState(list) {
  const labelKey = {all:'emptyAllLabel', active:'emptyActiveLabel', done:'emptyDoneLabel', ignored:'emptyIgnoredLabel'}[currentFilter];
  const descKey  = {all:'emptyAllDesc',  active:'emptyActiveDesc',  done:'emptyDoneDesc',  ignored:'emptyIgnoredDesc'}[currentFilter];
  list.innerHTML = `
    <div class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
        <rect x="3" y="3" width="18" height="18" rx="4"/>
        <path d="M8 12h8M8 16h5" stroke-linecap="round"/>
      </svg>
      <h3>${t(labelKey)}</h3>
      <p>${t(descKey)}</p>
    </div>`;
}

function statusBorderVar(dayStatus) {
  if (dayStatus === STATUS_DONE)    { return 'var(--color-success)'; }
  if (dayStatus === STATUS_IGNORED) { return 'var(--color-warning)'; }
  return 'var(--color-border)';
}

function toggleDetail(id) {
  const el  = document.getElementById('task-detail-' + id);
  const btn = document.getElementById('task-toggle-' + id);
  if (!el || !btn) { return; }
  const open = el.classList.toggle(CSS_OPEN);
  btn.setAttribute('aria-expanded', open);
  btn.classList.toggle('expanded', open);
}

function buildTaskCardHTML(task, isPast, isToday, dateKey) {
  const dayStatus     = statusOnDay(task, dateKey);
  const checkedForDay = isCheckedOnDay(task, dateKey);

  const canAct = dayFilterMode !== 'all' && !isPast;

  const badgeClass = dayStatus === STATUS_DONE ? 'badge-done' : dayStatus === STATUS_IGNORED ? 'badge-ignored' : 'badge-active';
  const badgeText  = dayStatus === STATUS_DONE ? t('badgeDone') : dayStatus === STATUS_IGNORED ? t('badgeIgnored') : t('badgeActive');
  // Badge only on specific day tabs
  const badge = dayFilterMode !== 'all'
    ? `<span class="task-badge ${badgeClass}">${badgeText}</span>`
    : '';

  const ignoreLabel = dayStatus === STATUS_IGNORED ? t('unignoreTask') : t('ignoreTask');
  const ignoreTitle = dayStatus === STATUS_IGNORED ? t('unignore')     : t('ignore');

  const taskDays = task.days ?? [...ALL_DAYS];
  const allDays  = taskDays.length === ALL_DAYS.length;

  const dayDots = allDays ? '' : `
        <div class="task-day-dots" aria-label="${t('taskDays')}">
          ${DAY_ORDER.map((d, i) => `<span class="day-dot ${taskDays.includes(d) ? 'on' : 'off'}" title="${t(DAY_KEYS[i])}">${t(DAY_KEYS[i])}</span>`).join('')}
        </div>`;

  const hasDetail = task.detail && task.detail.trim().length > 0;
  const detailSection = hasDetail ? `
        <div class="task-detail-panel" id="task-detail-${task.id}">
          <div class="task-detail"${canAct ? ` data-action="edit" data-id="${task.id}" role="button" tabindex="0" aria-label="Edit task" style="cursor:pointer"` : ''}>${escapeHtml(task.detail)}</div>
        </div>` : '';

  const toggleBtn = hasDetail ? `
        <button class="task-toggle-btn" id="task-toggle-${task.id}"
                aria-expanded="false" aria-label="Toggle details"
                onclick="event.stopPropagation();toggleDetail(${task.id})">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>` : `<span class="task-toggle-spacer"></span>`;

  const borderStyle = currentFilter === 'all' ? `style="border-color:${statusBorderVar(dayStatus)}"` : '';

  const dragHandle = `
        <div class="drag-handle" aria-label="Drag to reorder" title="Drag to reorder">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="9" cy="5" r="1" fill="currentColor"/><circle cx="15" cy="5" r="1" fill="currentColor"/>
            <circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/>
            <circle cx="9" cy="19" r="1" fill="currentColor"/><circle cx="15" cy="19" r="1" fill="currentColor"/>
          </svg>
        </div>`;

  // Checkbox: only on today's specific-day tab, and only if task is not ignored
  const checkboxHTML = isToday && dayFilterMode !== 'all' && dayStatus !== STATUS_IGNORED ? `
        <div class="task-checkbox ${checkedForDay ? 'checked' : ''}"
             role="checkbox" aria-checked="${checkedForDay}"
             aria-label="${t('markDone')}" tabindex="0"
             data-action="toggle" data-id="${task.id}">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        </div>` : '';

  const actionButtons = canAct ? `
          <button class="task-action-btn"
                  aria-label="${ignoreLabel}" title="${ignoreTitle}"
                  data-action="ignore" data-id="${task.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="12" cy="12" r="9"/><path d="M9 12h6"/>
            </svg>
          </button>
          <button class="task-action-btn delete"
                  aria-label="${t('deleteTask')}" title="${t('delete')}"
                  data-action="delete" data-id="${task.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
            </svg>
          </button>` : '';

  return `
    <div class="task-card-bg task-card-bg-delete" id="bg-delete-${task.id}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
      </svg>
    </div>
    <div class="task-card-bg task-card-bg-ignore" id="bg-ignore-${task.id}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9l3 3-3 3"/>
      </svg>
    </div>
    <div class="task-card-inner ${isPast ? 'is-past' : ''}" id="inner-${task.id}" ${borderStyle}>
      <div class="task-card-top">
        ${dragHandle}
        ${checkboxHTML}
        <div class="task-content" ${canAct ? `data-action="edit" data-id="${task.id}"` : ''}>
          <div class="task-title ${checkedForDay ? 'checked-title' : ''}">${escapeHtml(task.title)}</div>
        </div>
        <div class="task-actions">
          ${badge}
          ${actionButtons}
        </div>
      </div>
      ${detailSection}
      <div class="task-card-bottom">
        <span class="task-meta">${t('addedOn')} ${formatDate(task.createdAt)}</span>
        ${dayDots}
        ${toggleBtn}
      </div>
    </div>`;
}

function renderTasks() {
  const list    = document.getElementById('task-list');
  const dateKey = viewedDateKey();
  const past    = viewingPast();
  const today   = viewingToday();
  const canAct  = dayFilterMode !== 'all' && !past;
  const filtered = getFilteredTasks(currentFilter, currentDayFilter, dateKey);

  if ('ontouchstart' in window) {
    const hint = document.getElementById('swipe-hint');
    if (hint) { hint.style.display = ''; }
  }

  renderDayFilterBar();

  if (filtered.length === 0) {
    renderEmptyState(list);
    renderResetNote();
    return;
  }

  list.innerHTML = '';
  filtered.forEach(task => {
    const card = document.createElement('div');
    const dayStatus     = statusOnDay(task, dateKey);
    const checkedForDay = isCheckedOnDay(task, dateKey);
    card.className = [
      'task-card',
      checkedForDay                  ? STATUS_DONE    : '',
      dayStatus === STATUS_IGNORED   ? STATUS_IGNORED : '',
      past                           ? 'past-day'     : ''
    ].join(' ').trim();
    card.setAttribute('data-task-id', task.id);
    card.setAttribute('role', 'listitem');
    card.innerHTML = buildTaskCardHTML(task, past, today, dateKey);
    list.appendChild(card);

    if (canAct) {
      setupSwipe(
        card, task.id,
        (id) => { deleteTask(id, dateKey); renderTasks(); },
        (id) => { ignoreTask(id, dateKey); renderTasks(); },
      );
    }
    if (typeof setupSort === 'function') { setupSort(card, task.id); }
  });
  renderResetNote();
}
