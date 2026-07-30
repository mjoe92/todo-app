// Language
const DEFAULT_LANG = 'en';
const SUPPORTED_LANG_LIST = ['en', 'hu', 'de', 'ru', 'fr', 'es'];

// Task statuses
const STATUS_ACTIVE  = 'active';
const STATUS_DONE    = 'done';
const STATUS_IGNORED = 'ignored';
const STATUS_DELETED = 'deleted';

// Day filter sentinel: -1 means "all days"
const DAY_FILTER_ALL = -1;

// All 7 days (0 = Sunday … 6 = Saturday, matching JS Date.getDay())
const ALL_DAYS = Object.freeze([0, 1, 2, 3, 4, 5, 6]);

// localStorage keys
const STORAGE_KEY_TASKS = 'todo-tasks';
const STORAGE_KEY_LANG  = 'todo-lang';
const STORAGE_KEY_THEME = 'todo-theme';

// Theme names
const THEME_LIGHT = 'light';
const THEME_DARK  = 'dark';

// CSS class names
const CSS_OPEN      = 'open';
const CSS_ACTIVE    = 'active';
const CSS_DRAGGING  = 'dragging';
const CSS_DRAG_OVER = 'drag-over';

// ARIA attribute names
const ATTR_ARIA_SELECTED = 'aria-selected';
const ATTR_ARIA_PRESSED  = 'aria-pressed';
