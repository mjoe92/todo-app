/**
 * Create / Edit task modal: open, close, submit.
 */
let editingId = null;

function openModal(id = null) {
    editingId = id;
    const input = document.getElementById('task-input');
    const title = document.getElementById('modal-title');
    const submit = document.getElementById('modal-submit');

    if (id !== null) {
        const task = tasks.find(tk => tk.id === id);
        input.value = task ? task.title : '';
        title.textContent = t('modalTitleEdit');
        submit.textContent = t('modalSave');
    } else {
        input.value = '';
        title.textContent = t('modalTitleNew');
        submit.textContent = t('modalAdd');
    }

    document.getElementById('modal').classList.add('open');
    setTimeout(() => input.focus(), 80);
}

function closeModal() {
    document.getElementById('modal').classList.remove('open');
    editingId = null;
}

function submitTask() {
    const val = document.getElementById('task-input').value.trim();
    if (!val) return;
    if (editingId !== null) {
        updateTaskTitle(editingId, val);
    } else {
        createTask(val);
    }
    renderTasks();
    closeModal();
}
