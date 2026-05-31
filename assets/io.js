/**
 * Export / Import tasks as a JSON file.
 *
 * Export  → downloads my.tasks.json
 * Import  → reads a .tasks.json file (picked via button or drag-dropped onto the page)
 *           and MERGES tasks by id (new tasks added, existing ones untouched)
 *
 * Double-click a .tasks.json file in the OS will trigger the browser's file-open dialog
 * if the user has associated the extension with the browser, or they can simply drag the
 * file onto the app window — the drop overlay handles both.
 */

const IO_EXTENSION = '.tasks.json';
const IO_MIME = 'application/json';

/** Export **/
function exportTasks() {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    tasks: getTasks()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: IO_MIME});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my' + IO_EXTENSION;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 1000);
}

/** Import (core) **/
function importFromFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      const incoming = Array.isArray(data) ? data
        : Array.isArray(data.tasks) ? data.tasks
          : null;
      if (!incoming) {
        throw new Error('Unrecognised format');
      }

      const existing = getTasks();
      const existingIds = new Set(existing.map(t => t.id));
      let added = 0;

      incoming.forEach(task => {
        if (!task.id || !task.title) return;   // skip malformed entries
        if (!existingIds.has(task.id)) {
          existing.push(task);
          existingIds.add(task.id);
          added++;
        }
      });

      saveTasks(existing);
      renderTasks();
      showImportToast(added, incoming.length - added);
    } catch (err) {
      alert('Import failed: ' + err.message);
    }
  };
  reader.readAsText(file);
}

/** Import via <input type=file> button **/
function triggerImport() {
  document.getElementById('import-file-input').click();
}

function onImportFileChange(input) {
  const file = input.files[0];
  if (file) importFromFile(file);
  input.value = '';   // reset so the same file can be picked again
}

/** Drag-and-drop import **/
(function setupDrop() {
  const overlay = document.getElementById('drop-overlay');
  let dragCounter = 0;

  document.addEventListener('dragenter', (e) => {
    if (!hasJsonFile(e.dataTransfer)) return;
    e.preventDefault();
    dragCounter++;
    overlay.classList.add('active');
  });

  document.addEventListener('dragleave', () => {
    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      overlay.classList.remove('active');
    }
  });

  document.addEventListener('dragover', (e) => {
    if (!hasJsonFile(e.dataTransfer)) return;
    e.preventDefault();
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    dragCounter = 0;
    overlay.classList.remove('active');
    const file = e.dataTransfer.files[0];
    if (file) importFromFile(file);
  });

  function hasJsonFile(dt) {
    if (!dt) return false;
    return Array.from(dt.items || []).some(item =>
      item.kind === 'file' && (item.type === IO_MIME || item.type === '')
    );
  }
})();

/** Toast notification **/
function showImportToast(added, skipped) {
  const existing = document.getElementById('import-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'import-toast';
  toast.style.cssText = [
    'position:fixed', 'bottom:calc(var(--bottom-bar-h) + 0.75rem)', 'left:50%',
    'transform:translateX(-50%)', 'z-index:600',
    'background:var(--color-surface-2)', 'border:1px solid var(--color-border)',
    'border-radius:var(--radius-lg)', 'box-shadow:var(--color-shadow-md)',
    'padding:0.6rem 1.1rem', 'font-family:var(--font-body)',
    'font-size:0.8125rem', 'color:var(--color-text)',
    'white-space:nowrap', 'pointer-events:none',
    'animation:slideUp 0.2s cubic-bezier(0.16,1,0.3,1)'
  ].join(';');
  toast.textContent = added > 0
    ? `✓ Imported ${added} task${added !== 1 ? 's' : ''}` + (skipped > 0 ? ` · ${skipped} already existed` : '')
    : `No new tasks — all ${skipped} already existed`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
