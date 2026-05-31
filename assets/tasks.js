/** Core task state management: create, update, delete, filter */
let tasks = [];

function createTask(title, days) {
    tasks.push({
        id: Date.now(),
        title,
        checked: false,
        status: 'active',
        createdAt: Date.now(),
        days: days && days.length ? days : [0,1,2,3,4,5,6],
    });
    saveTasks(tasks);
}

function updateTaskTitle(id, title) {
    tasks = tasks.map(t => t.id === id ? { ...t, title } : t);
    saveTasks(tasks);
}

function updateTaskDays(id, days) {
    tasks = tasks.map(t => t.id === id ? { ...t, days: days.length ? days : [0,1,2,3,4,5,6] } : t);
    saveTasks(tasks);
}

function toggleCheck(id) {
    tasks = tasks.map(t => {
        if (t.id !== id) {
          return t;
        }

        const checked = !t.checked;
        return { ...t, checked, status: checked ? 'done' : 'active' };
    });
    saveTasks(tasks);
}

function ignoreTask(id) {
    tasks = tasks.map(t => {
        if (t.id !== id) {
          return t;
        }

        return { ...t, status: t.status === 'ignored' ? 'active' : 'ignored', checked: false };
    });
    saveTasks(tasks);
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
}

// dayFilter: -1 = all, 0-6 = JS day (0=Sun)
function getFilteredTasks(statusFilter, dayFilter) {
    return tasks.filter(t => {
        if (statusFilter === 'active'  && t.status !== 'active')  return false;
        if (statusFilter === 'done'    && t.status !== 'done')    return false;
        if (statusFilter === 'ignored' && t.status !== 'ignored') return false;
        if (statusFilter === 'all'     && t.status === 'ignored') return false;
        if (dayFilter !== undefined && dayFilter !== -1) {
            const taskDays = t.days ?? [0,1,2,3,4,5,6];
            if (!taskDays.includes(dayFilter)) {
              return false;
            }
        }

        return true;
    });
}

function initTasks() {
    tasks = applyDailyReset(loadTasks());
}
