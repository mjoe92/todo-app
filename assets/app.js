/**
 * Application bootstrap and global event listeners.
 * Loaded last — depends on all other JS modules.
 */
document.getElementById('task-list').addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) {
    return;
  }

  const id = Number(el.dataset.id);
  const act = el.dataset.action;
  if (act === 'toggle') {
    toggleCheck(id);
    renderTasks();
  }
  if (act === 'edit') {
    openModal(id);
  }
  if (act === 'ignore') {
    ignoreTask(id);
    renderTasks();
  }
  if (act === 'delete') {
    deleteTask(id);
    renderTasks();
  }
});

/** Keyboard on checkboxes */
document.getElementById('task-list').addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') {
    return;
  }

  const el = e.target.closest('[data-action="toggle"]');
  if (!el) {
    return;
  }

  e.preventDefault();
  toggleCheck(Number(el.dataset.id));
  renderTasks();
});

/** Modal events */
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) {
    closeModal();
  }
});
document.getElementById('task-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    submitTask();
  }
});

/** Keyboard shortcuts */
document.addEventListener('keydown', e => {
  const tag = document.activeElement.tagName;
  if (e.key === 'n' && !e.ctrlKey && !e.metaKey && tag !== 'TEXTAREA' && tag !== 'INPUT') {
    openModal();
  }

  if (e.key === 'Escape') {
    closeModal();
  }
});

/** Init */
initTheme();
initTasks();
initI18n();
renderTasks();