/** Manages light / dark theme toggling and persistence */
let currentTheme = THEME_LIGHT;

function initTheme() {
  const stored = loadTheme();
  currentTheme = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT);
  applyTheme(currentTheme);
}

function toggleTheme() {
  currentTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
  applyTheme(currentTheme);
  saveTheme(currentTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-icon-sun').style.display  = theme === THEME_DARK ? 'none' : '';
  document.getElementById('theme-icon-moon').style.display = theme === THEME_DARK ? '' : 'none';
}
