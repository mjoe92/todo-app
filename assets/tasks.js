/**
 * Core task state management: create, update, delete, filter.
 */
let tasks = [];

/* CRUD */
function createTask(title) {
    tasks.push({
        id: Date.now(),
        title,
        checked: false,
        status: 'active',
        createdAt: Date.now(),
    });
    saveTasks(tasks);
}

function updateTaskTitle(id, title) {
    tasks = tasks.map(t => t.id === id ? {...t, title} : t);
    saveTasks(tasks);
}

function toggleCheck(id) {
    tasks = tasks.map(t => {
        if (t.id !== id) return t;
        const checked = !t.checked;
        return {...t, checked, status: checked ? 'done' : 'active'};
    });
    saveTasks(tasks);
}

function ignoreTask(id) {
    tasks = tasks.map(t => {
        if (t.id !== id) return t;
        return {...t, status: t.status === 'ignored' ? 'active' : 'ignored', checked: false};
    });
    saveTasks(tasks);
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
}

/* Filtering */
function getFilteredTasks(filter) {
    switch (filter) {
        case 'active':
            return tasks.filter(t => t.status === 'active');
        case 'done':
            return tasks.filter(t => t.status === 'done');
        case 'ignored':
            return tasks.filter(t => t.status === 'ignored');
        default:
            return tasks.filter(t => t.status !== 'ignored'); // 'all' hides ignored
    }
}

/* Bootstrap */
function initTasks() {
    tasks = applyDailyReset(loadTasks());
}