/**
 * DOM rendering: task list, empty states, filter tabs, reset note.
 */
let currentFilter = 'all';

function escapeHtml(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
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

function renderResetNote() {
    const note = document.getElementById('reset-note');
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

function buildTaskCardHTML(task) {
    const badge = task.status === 'done'
        ? `<span class="task-badge badge-done">${t('badgeDone')}</span>`
        : task.status === 'ignored'
            ? `<span class="task-badge badge-ignored">${t('badgeIgnored')}</span>`
            : '';

    const ignoreLabel = task.status === 'ignored' ? t('unignoreTask') : t('ignoreTask');
    const ignoreTitle = task.status === 'ignored' ? t('unignore') : t('ignore');

    return `
    <div class="task-card-bg task-card-bg-delete" id="bg-delete-${task.id}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
      </svg>
    </div>
    <div class="task-card-bg task-card-bg-ignore" id="bg-ignore-${task.id}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9l3 3-3 3"/>
      </svg>
    </div>
    <div class="task-card-inner" id="inner-${task.id}">
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
        <div class="task-meta">${t('addedOn')} ${formatDate(task.createdAt)}</div>
      </div>
      ${badge}
      <div class="task-actions">
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
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
          </svg>
        </button>
      </div>
    </div>`;
}

function renderTasks() {
    const list = document.getElementById('task-list');
    const filtered = getFilteredTasks(currentFilter);

    if ('ontouchstart' in window) {
        document.getElementById('swipe-hint').style.display = '';
    }

    if (filtered.length === 0) {
        renderEmptyState(list);
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
