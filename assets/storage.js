/**
 * Handles all localStorage read/write operations and the daily checkbox reset.
 */
const STORAGE_KEYS = {
    TASKS: 'todo_tasks',
    LAST_RESET: 'todo_last_reset',
    THEME: 'todo_theme',
};

function saveTasks(tasks) {
    try {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
    }
}

function loadTasks() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
    }
}

function loadTheme() {
    try {
        return localStorage.getItem(STORAGE_KEYS.THEME);
    } catch (e) {
        return null;
    }
}

/**
 * Checks whether the day has changed since the last visit.
 * If so, clears all task checkboxes and updates the reset date.
 * Returns the (possibly mutated) tasks array.
 */
function applyDailyReset(tasks) {
    const today = new Date().toDateString();
    try {
        const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET);
        if (lastReset !== today) {
            tasks = tasks.map(t => ({...t, checked: false}));
            localStorage.setItem(STORAGE_KEYS.LAST_RESET, today);
            saveTasks(tasks);
        }
    } catch (error) {}

    return tasks;
}