/** Create / Edit task modal */
let editingId = null;
let selectedDays = [...ALL_DAYS];

function renderDayPicker(activeDays) {
  selectedDays = activeDays ? [...activeDays] : [...ALL_DAYS];
  const picker = document.getElementById('day-picker');
  if (!picker) {
    return;
  }
  picker.innerHTML = DAY_ORDER.map((dayIdx, i) =>
    `<button type="button"
                 class="day-btn ${selectedDays.includes(dayIdx) ? CSS_ACTIVE : ''}"
                 data-day="${dayIdx}"
                 onclick="toggleDayBtn(this,${dayIdx})"
                 aria-pressed="${selectedDays.includes(dayIdx)}"
                 aria-label="${t(DAY_KEYS[i])}">${t(DAY_KEYS[i])}</button>`
  ).join('');
}

function toggleDayBtn(btn, dayIdx) {
  if (selectedDays.includes(dayIdx)) {
    if (selectedDays.length === 1) {
      return;
    }
    selectedDays = selectedDays.filter(d => d !== dayIdx);
    btn.classList.remove(CSS_ACTIVE);
    btn.setAttribute(ATTR_ARIA_PRESSED, 'false');
  } else {
    selectedDays.push(dayIdx);
    btn.classList.add(CSS_ACTIVE);
    btn.setAttribute(ATTR_ARIA_PRESSED, 'true');
  }
}

function openModal(id = null) {
  editingId = id;
  const input = document.getElementById('task-input');
  const detailInput = document.getElementById('task-detail-input');
  const title = document.getElementById('modal-title');
  const submit = document.getElementById('modal-submit');
  const label = document.getElementById('day-picker-label');
  const detailLabel = document.getElementById('detail-label');
  if (label) {
    label.textContent = t('modalDays');
  }
  if (detailLabel) {
    detailLabel.textContent = t('modalDetailLabel');
  }
  if (detailInput) {
    detailInput.placeholder = t('modalDetailPlaceholder');
  }
  if (id !== null) {
    const task = tasks.find(tk => tk.id === id);
    input.value = task ? task.title : '';
    if (detailInput) {
      detailInput.value = task ? (task.detail || '') : '';
    }
    title.textContent = t('modalTitleEdit');
    submit.textContent = t('modalSave');
    renderDayPicker(task ? (task.days ?? [...ALL_DAYS]) : [...ALL_DAYS]);
  } else {
    input.value = '';
    if (detailInput) {
      detailInput.value = '';
    }
    title.textContent = t('modalTitleNew');
    submit.textContent = t('modalAdd');
    renderDayPicker([...ALL_DAYS]);
  }
  document.getElementById('modal').classList.add(CSS_OPEN);
  setTimeout(() => input.focus(), 80);
}

function closeModal() {
  document.getElementById('modal').classList.remove(CSS_OPEN);
  editingId = null;
}

function submitTask() {
  const val = document.getElementById('task-input').value.trim();
  const detail = (document.getElementById('task-detail-input')?.value || '').trim();
  if (!val) {
    return;
  }
  if (editingId !== null) {
    updateTaskTitle(editingId, val);
    updateTaskDetail(editingId, detail);
    updateTaskDays(editingId, selectedDays);
  } else {
    createTask(val, detail, selectedDays);
  }
  renderTasks();
  closeModal();
}
