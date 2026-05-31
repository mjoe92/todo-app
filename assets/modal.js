/** Create / Edit task modal */
let editingId = null;
let selectedDays = [0,1,2,3,4,5,6];

function renderDayPicker(activeDays) {
    selectedDays = activeDays ? [...activeDays] : [0,1,2,3,4,5,6];
    const picker = document.getElementById('day-picker');
    if (!picker) return;
    const order  = [1,2,3,4,5,6,0];
    const keys   = ['dayMon','dayTue','dayWed','dayThu','dayFri','daySat','daySun'];
    picker.innerHTML = order.map((dayIdx, i) =>
        `<button type="button"
                 class="day-btn ${selectedDays.includes(dayIdx) ? 'active' : ''}"
                 data-day="${dayIdx}"
                 onclick="toggleDayBtn(this,${dayIdx})"
                 aria-pressed="${selectedDays.includes(dayIdx)}"
                 aria-label="${t(keys[i])}">${t(keys[i])}</button>`
    ).join('');
}

function toggleDayBtn(btn, dayIdx) {
    if (selectedDays.includes(dayIdx)) {
        if (selectedDays.length === 1) {
          return;
        }

        selectedDays = selectedDays.filter(d => d !== dayIdx);
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed','false');
    } else {
        selectedDays.push(dayIdx);
        btn.classList.add('active');
        btn.setAttribute('aria-pressed','true');
    }
}

function openModal(id = null) {
    editingId = id;
    const input  = document.getElementById('task-input');
    const title  = document.getElementById('modal-title');
    const submit = document.getElementById('modal-submit');
    const label  = document.getElementById('day-picker-label');
    if (label) {
      label.textContent = t('modalDays');
    }

    if (id !== null) {
        const task = tasks.find(tk => tk.id === id);
        input.value        = task ? task.title : '';
        title.textContent  = t('modalTitleEdit');
        submit.textContent = t('modalSave');
        renderDayPicker(task ? (task.days ?? [0,1,2,3,4,5,6]) : [0,1,2,3,4,5,6]);
    } else {
        input.value        = '';
        title.textContent  = t('modalTitleNew');
        submit.textContent = t('modalAdd');
        renderDayPicker([0,1,2,3,4,5,6]);
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
    if (!val) {
      return;
    }

    if (editingId !== null) {
        updateTaskTitle(editingId, val);
        updateTaskDays(editingId, selectedDays);
    } else {
        createTask(val, selectedDays);
    }
    renderTasks();
    closeModal();
}
