/** DOM rendering: task list, empty states, filter tabs, reset note */
let currentFilter = 'active';
let currentDayFilter = new Date().getDay();

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString(currentLang || 'en', {month: 'short', day: 'numeric'});
}

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  renderTasks();
}

function setDayFilter(day, btn) {
  currentDayFilter = day;
  document.querySelectorAll('.day-filter-tab').forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  renderTasks();
}

function renderDayFilterBar() {
  const bar = document.getElementById('day-filter-bar');
  if (!bar) return;
  const today = new Date().getDay();
  const order = [1, 2, 3, 4, 5, 6, 0];
  const dayKeys = ['dayMon', 'dayTue', 'dayWed', 'dayThu', 'dayFri', 'daySat', 'daySun'];
  const todayButton = `<button class="filter-tab ${currentDayFilter === today ? 'active' : ''}" role="tab" aria-selected="${currentDayFilter === today}" onclick="setDayFilter(${today},this)">${t('dayToday')}</button>`;
  const dayButtons = order.map((dayIdx, i) => {
    const active = currentDayFilter === dayIdx && currentDayFilter !== today;
    return `<button class="filter-tab ${active ? 'active' : ''}" role="tab" aria-selected="${active}" onclick="setDayFilter(${dayIdx},this)">${t(dayKeys[i])}</button>`;
  }).join('');
  const allButton = `<button class="filter-tab ${currentDayFilter === -1 ? 'active' : ''}" role="tab" aria-selected="${currentDayFilter === -1}" onclick="setDayFilter(-1,this)">${t('dayAll')}</button>`;
  bar.innerHTML = todayButton + dayButtons + allButton;
}

function renderResetNote() {
  const note = document.getElementById('reset-note');
  if (!note) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diffH = Math.ceil((tomorrow - Date.now()) / 36e5);
  note.textContent = t('resetNote', diffH);
}

function renderEmptyState(list) {
  const labelKey = {
    all: 'emptyAllLabel',
    active: 'emptyActiveLabel',
    done: 'emptyDoneLabel',
    ignored: 'emptyIgnoredLabel'
  }[currentFilter];
  const descKey = {
    all: 'emptyAllDesc',
    active: 'emptyActiveDesc',
    done: 'emptyDoneDesc',
    ignored: 'emptyIgnoredDesc'
  }[currentFilter];
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

function statusBorderVar(status) {
  if (status === 'done') return 'var(--color-success)';
  if (status === 'ignored') return 'var(--color-warning)';
  return 'var(--color-border)';
}

// Toggle the detail section of a task card
function toggleDetail(id) {
  const el = document.getElementById('task-detail-' + id);
  const btn = document.getElementById('task-toggle-' + id);
  if (!el || !btn) return;
  const open = el.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.classList.toggle('expanded', open);
}

function buildTaskCardHTML(task) {
  const badgeClass = task.status === 'done' ? 'badge-done' : task.status === 'ignored' ? 'badge-ignored' : 'badge-active';
  const badgeText = task.status === 'done' ? t('badgeDone') : task.status === 'ignored' ? t('badgeIgnored') : t('badgeActive');
  const badge = `<span class="task-badge ${badgeClass}">${badgeText}</span>`;

  const ignoreLabel = task.status === 'ignored' ? t('unignoreTask') : t('ignoreTask');
  const ignoreTitle = task.status === 'ignored' ? t('unignore') : t('ignore');

  const order = [1, 2, 3, 4, 5, 6, 0];
  const dayKeys = ['dayMon', 'dayTue', 'dayWed', 'dayThu', 'dayFri', 'daySat', 'daySun'];
  const taskDays = task.days ?? [0, 1, 2, 3, 4, 5, 6];
  const allDays = taskDays.length === 7;

  const dayDots = allDays ? '' : `
        <div class="task-day-dots" aria-label="${t('taskDays')}">
            ${order.map((d, i) => `<span class="day-dot ${taskDays.includes(d) ? 'on' : 'off'}" title="${t(dayKeys[i])}">${t(dayKeys[i])}</span>`).join('')}
        </div>`;

  const hasDetail = task.detail && task.detail.trim().length > 0;
  const detailSection = hasDetail ? `
        <div class="task-detail-panel" id="task-detail-${task.id}">
          <div class="task-detail">${escapeHtml(task.detail)}</div>
        </div>` : '';

  const toggleBtn = hasDetail ? `
        <button class="task-toggle-btn" id="task-toggle-${task.id}"
                aria-expanded="false" aria-label="Toggle details"
                onclick="event.stopPropagation(); toggleDetail(${task.id})">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>` : `<span class="task-toggle-btn task-toggle-spacer"></span>`;

  const borderStyle = currentFilter === 'all'
    ? `style="border-color:${statusBorderVar(task.status)}"`
    : '';

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
    <div class="task-card-inner" id="inner-${task.id}" ${borderStyle}>
      <div class="task-card-top">
        <div class="task-checkbox ${task.checked ? 'checked' : ''}"
             role="checkbox" aria-checked="${task.checked}"
             aria-label="${t('markDone')}" tabindex="0"
             data-action="toggle" data-id="${task.id}">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        </div>
        <div class="task-content" data-action="edit" data-id="${task.id}">
          <div class="task-title">${escapeHtml(task.title)}</div>
        </div>
        <div class="task-actions">
          ${badge}
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
          </button>
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
  const list = document.getElementById('task-list');
  const filtered = getFilteredTasks(currentFilter, currentDayFilter);

  if ('ontouchstart' in window) {
    const hint = document.getElementById('swipe-hint');
    if (hint) hint.style.display = '';
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
    card.className = ['task-card', task.status === 'done' ? 'done' : '', task.status === 'ignored' ? 'ignored' : ''].join(' ').trim();
    card.setAttribute('data-task-id', task.id);
    card.setAttribute('role', 'listitem');
    card.innerHTML = buildTaskCardHTML(task);
    list.appendChild(card);
    setupSwipe(
      card, task.id,
      (id) => {
        deleteTask(id);
        renderTasks();
      },
      (id) => {
        ignoreTask(id);
        renderTasks();
      },
    );
  });
  renderResetNote();
}
