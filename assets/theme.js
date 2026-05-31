/**
 * Manages light / dark theme toggling and persistence.
 */
let currentTheme = 'light';

function initTheme() {
    const stored = loadTheme();
    currentTheme = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(currentTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    saveTheme(currentTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('theme-icon-sun').style.display = theme === 'dark' ? 'none' : '';
    document.getElementById('theme-icon-moon').style.display = theme === 'dark' ? '' : 'none';
}