/**
 * i18n.js — translations & language management
 * Supported: en, hu, de, ru, fr, es
 */
const TRANSLATIONS = {
  en: {
    appTitle: 'My Tasks', newTask: 'New task',
    filterActive: 'Active', filterDone: 'Done', filterIgnored: 'Ignored', filterAll: 'All',
    swipeHint: '← Swipe left to delete · Swipe right to ignore →',
    modalTitleNew: 'New Task', modalTitleEdit: 'Edit Task',
    modalLabel: 'Task title', modalPlaceholder: 'What needs to be done?',
    modalDetailLabel: 'Details (optional)', modalDetailPlaceholder: 'Add more context…',
    modalCancel: 'Cancel', modalAdd: 'Add task', modalSave: 'Save',
    badgeDone: 'Done', badgeIgnored: 'Ignored', badgeActive: 'Active',
    ignoreTask: 'Ignore task', unignoreTask: 'Unignore task', ignore: 'Ignore', unignore: 'Unignore',
    deleteTask: 'Delete task', delete: 'Delete', markDone: 'Mark task as done', addedOn: 'Added',
    emptyAllLabel: 'No tasks yet', emptyActiveLabel: 'No active tasks',
    emptyDoneLabel: 'No completed tasks', emptyIgnoredLabel: 'No ignored tasks',
    emptyAllDesc: 'Tap "New task" to get started.', emptyActiveDesc: 'Everything is done!',
    emptyDoneDesc: 'Mark tasks as done by tapping the circle.',
    emptyIgnoredDesc: 'Swipe right on a task to ignore it.',
    resetNote: (h) => `Checkboxes reset daily. Next reset in ~${h}h.`,
    dayToday: 'Today', dayAll: 'All',
    dayMon: 'Mo', dayTue: 'Tu', dayWed: 'We', dayThu: 'Th', dayFri: 'Fr', daySat: 'Sa', daySun: 'Su',
    modalDays: 'Visible on days', taskDays: 'Scheduled days',
    copyright: '© 2026 mJoe. All rights reserved.',
  },
  hu: {
    appTitle: 'Feladataim', newTask: 'Új feladat',
    filterActive: 'Aktív', filterDone: 'Kész', filterIgnored: 'Kihagyott', filterAll: 'Mind',
    swipeHint: '← Balra húzva törlés · Jobbra húzva kihagyás →',
    modalTitleNew: 'Új feladat', modalTitleEdit: 'Feladat szerkesztése',
    modalLabel: 'Feladat neve', modalPlaceholder: 'Mit kell elvégezni?',
    modalDetailLabel: 'Részletek (opcionális)', modalDetailPlaceholder: 'Adj meg további információt…',
    modalCancel: 'Mégsem', modalAdd: 'Hozzáadás', modalSave: 'Mentés',
    badgeDone: 'Kész', badgeIgnored: 'Kihagyott', badgeActive: 'Aktív',
    ignoreTask: 'Feladat kihagyása', unignoreTask: 'Kihagyás visszavonása', ignore: 'Kihagyás', unignore: 'Visszavonás',
    deleteTask: 'Feladat törlése', delete: 'Törlés', markDone: 'Feladat megjelölése készként', addedOn: 'Hozzáadva',
    emptyAllLabel: 'Még nincsenek feladatok', emptyActiveLabel: 'Nincs aktív feladat',
    emptyDoneLabel: 'Nincs befejezett feladat', emptyIgnoredLabel: 'Nincs kihagyott feladat',
    emptyAllDesc: 'Nyomd meg az „Új feladat" gombot a kezdéshez.', emptyActiveDesc: 'Minden feladat elkészült!',
    emptyDoneDesc: 'Jelölj meg feladatokat készként a körre koppintva.',
    emptyIgnoredDesc: 'Húzd jobbra a feladatot a kihagyáshoz.',
    resetNote: (h) => `A jelölőnégyzetek naponta törlődnek. Következő törlés ~${h} óra múlva.`,
    dayToday: 'Ma', dayAll: 'Összes',
    dayMon: 'H', dayTue: 'K', dayWed: 'Sze', dayThu: 'Cs', dayFri: 'P', daySat: 'Szo', daySun: 'V',
    modalDays: 'Látható napokon', taskDays: 'Ütemezett napok',
    copyright: '© 2026 mJoe. Minden jog fenntartva.',
  },
  de: {
    appTitle: 'Meine Aufgaben',
    newTask: 'Neue Aufgabe',
    filterActive: 'Aktiv',
    filterDone: 'Erledigt',
    filterIgnored: 'Ignoriert',
    filterAll: 'Alle',
    swipeHint: '← Links wischen zum Löschen · Rechts wischen zum Ignorieren →',
    modalTitleNew: 'Neue Aufgabe',
    modalTitleEdit: 'Aufgabe bearbeiten',
    modalLabel: 'Aufgabentitel',
    modalPlaceholder: 'Was muss erledigt werden?',
    modalDetailLabel: 'Details (optional)',
    modalDetailPlaceholder: 'Weitere Informationen hinzufügen…',
    modalCancel: 'Abbrechen',
    modalAdd: 'Hinzufügen',
    modalSave: 'Speichern',
    badgeDone: 'Erledigt',
    badgeIgnored: 'Ignoriert',
    badgeActive: 'Aktiv',
    ignoreTask: 'Aufgabe ignorieren',
    unignoreTask: 'Ignorieren rückgängig machen',
    ignore: 'Ignorieren',
    unignore: 'Wiederherstellen',
    deleteTask: 'Aufgabe löschen',
    delete: 'Löschen',
    markDone: 'Aufgabe als erledigt markieren',
    addedOn: 'Hinzugefügt',
    emptyAllLabel: 'Noch keine Aufgaben',
    emptyActiveLabel: 'Keine aktiven Aufgaben',
    emptyDoneLabel: 'Keine erledigten Aufgaben',
    emptyIgnoredLabel: 'Keine ignorierten Aufgaben',
    emptyAllDesc: 'Tippe auf „Neue Aufgabe", um zu beginnen.',
    emptyActiveDesc: 'Alles erledigt!',
    emptyDoneDesc: 'Markiere Aufgaben als erledigt, indem du den Kreis antippst.',
    emptyIgnoredDesc: 'Wische eine Aufgabe nach rechts, um sie zu ignorieren.',
    resetNote: (h) => `Checkboxen werden täglich zurückgesetzt. Nächste Zurücksetzung in ~${h} Std.`,
    dayToday: 'Heute',
    dayAll: 'Alle',
    dayMon: 'Mo',
    dayTue: 'Di',
    dayWed: 'Mi',
    dayThu: 'Do',
    dayFri: 'Fr',
    daySat: 'Sa',
    daySun: 'So',
    modalDays: 'Sichtbar an Tagen',
    taskDays: 'Geplante Tage',
    copyright: '© 2026 mJoe. Alle Rechte vorbehalten.',
  },
  ru: {
    appTitle: 'Мои задачи',
    newTask: 'Новая задача',
    filterActive: 'Активные',
    filterDone: 'Готово',
    filterIgnored: 'Игнорируемые',
    filterAll: 'Все',
    swipeHint: '← Влево — удалить · Вправо — игнорировать →',
    modalTitleNew: 'Новая задача',
    modalTitleEdit: 'Редактировать задачу',
    modalLabel: 'Название задачи',
    modalPlaceholder: 'Что нужно сделать?',
    modalDetailLabel: 'Детали (необязательно)',
    modalDetailPlaceholder: 'Добавить подробности…',
    modalCancel: 'Отмена',
    modalAdd: 'Добавить',
    modalSave: 'Сохранить',
    badgeDone: 'Готово',
    badgeIgnored: 'Игнорируется',
    badgeActive: 'Активно',
    ignoreTask: 'Игнорировать задачу',
    unignoreTask: 'Отменить игнорирование',
    ignore: 'Игнорировать',
    unignore: 'Восстановить',
    deleteTask: 'Удалить задачу',
    delete: 'Удалить',
    markDone: 'Отметить задачу как выполненную',
    addedOn: 'Добавлено',
    emptyAllLabel: 'Задач пока нет',
    emptyActiveLabel: 'Нет активных задач',
    emptyDoneLabel: 'Нет выполненных задач',
    emptyIgnoredLabel: 'Нет игнорируемых задач',
    emptyAllDesc: 'Нажмите «Новая задача», чтобы начать.',
    emptyActiveDesc: 'Все задачи выполнены!',
    emptyDoneDesc: 'Отметьте задачи как выполненные, нажав на круг.',
    emptyIgnoredDesc: 'Проведите по задаче вправо, чтобы игнорировать её.',
    resetNote: (h) => `Чекбоксы сбрасываются ежедневно. Следующий сброс через ~${h} ч.`,
    dayToday: 'Сегодня',
    dayAll: 'Все',
    dayMon: 'Пн',
    dayTue: 'Вт',
    dayWed: 'Ср',
    dayThu: 'Чт',
    dayFri: 'Пт',
    daySat: 'Сб',
    daySun: 'Вс',
    modalDays: 'Показывать в дни',
    taskDays: 'Запланированные дни',
    copyright: '© 2026 mJoe. Все права защищены.',
  },
  fr: {
    appTitle: 'Mes tâches',
    newTask: 'Nouvelle tâche',
    filterActive: 'Actives',
    filterDone: 'Terminées',
    filterIgnored: 'Ignorées',
    filterAll: 'Toutes',
    swipeHint: '← Glisser à gauche pour supprimer · à droite pour ignorer →',
    modalTitleNew: 'Nouvelle tâche',
    modalTitleEdit: 'Modifier la tâche',
    modalLabel: 'Titre de la tâche',
    modalPlaceholder: 'Que faut-il faire ?',
    modalDetailLabel: 'Détails (optionnel)',
    modalDetailPlaceholder: 'Ajouter des informations…',
    modalCancel: 'Annuler',
    modalAdd: 'Ajouter',
    modalSave: 'Enregistrer',
    badgeDone: 'Terminé',
    badgeIgnored: 'Ignoré',
    badgeActive: 'Actif',
    ignoreTask: 'Ignorer la tâche',
    unignoreTask: 'Ne plus ignorer',
    ignore: 'Ignorer',
    unignore: 'Restaurer',
    deleteTask: 'Supprimer la tâche',
    delete: 'Supprimer',
    markDone: 'Marquer la tâche comme terminée',
    addedOn: 'Ajouté le',
    emptyAllLabel: 'Aucune tâche pour l\'instant',
    emptyActiveLabel: 'Aucune tâche active',
    emptyDoneLabel: 'Aucune tâche terminée',
    emptyIgnoredLabel: 'Aucune tâche ignorée',
    emptyAllDesc: 'Appuyez sur « Nouvelle tâche » pour commencer.',
    emptyActiveDesc: 'Tout est fait !',
    emptyDoneDesc: 'Marquez des tâches comme terminées en appuyant sur le cercle.',
    emptyIgnoredDesc: 'Glissez une tâche vers la droite pour l\'ignorer.',
    resetNote: (h) => `Les cases sont réinitialisées chaque jour. Prochaine réinitialisation dans ~${h} h.`,
    dayToday: 'Aujourd\'hui',
    dayAll: 'Tous',
    dayMon: 'Lu',
    dayTue: 'Ma',
    dayWed: 'Me',
    dayThu: 'Je',
    dayFri: 'Ve',
    daySat: 'Sa',
    daySun: 'Di',
    modalDays: 'Visible les jours',
    taskDays: 'Jours planifiés',
    copyright: '© 2026 mJoe. Tous droits réservés.',
  },
  es: {
    appTitle: 'Mis tareas', newTask: 'Nueva tarea',
    filterActive: 'Activas', filterDone: 'Hechas', filterIgnored: 'Ignoradas', filterAll: 'Todas',
    swipeHint: '← Deslizar izquierda para eliminar · derecha para ignorar →',
    modalTitleNew: 'Nueva tarea', modalTitleEdit: 'Editar tarea',
    modalLabel: 'Título de la tarea', modalPlaceholder: '¿Qué hay que hacer?',
    modalDetailLabel: 'Detalles (opcional)', modalDetailPlaceholder: 'Añadir más contexto…',
    modalCancel: 'Cancelar', modalAdd: 'Añadir', modalSave: 'Guardar',
    badgeDone: 'Hecha', badgeIgnored: 'Ignorada', badgeActive: 'Activa',
    ignoreTask: 'Ignorar tarea', unignoreTask: 'Dejar de ignorar', ignore: 'Ignorar', unignore: 'Restaurar',
    deleteTask: 'Eliminar tarea', delete: 'Eliminar', markDone: 'Marcar tarea como hecha', addedOn: 'Añadido',
    emptyAllLabel: 'Aún no hay tareas', emptyActiveLabel: 'No hay tareas activas',
    emptyDoneLabel: 'No hay tareas completadas', emptyIgnoredLabel: 'No hay tareas ignoradas',
    emptyAllDesc: 'Pulsa «Nueva tarea» para empezar.', emptyActiveDesc: '¡Todo está hecho!',
    emptyDoneDesc: 'Marca tareas como hechas pulsando el círculo.',
    emptyIgnoredDesc: 'Desliza una tarea a la derecha para ignorarla.',
    resetNote: (h) => `Las casillas se reinician a diario. Próximo reinicio en ~${h} h.`,
    dayToday: 'Hoy', dayAll: 'Todos',
    dayMon: 'Lu', dayTue: 'Ma', dayWed: 'Mi', dayThu: 'Ju', dayFri: 'Vi', daySat: 'Sá', daySun: 'Do',
    modalDays: 'Visible los días', taskDays: 'Días programados',
    copyright: '© 2026 mJoe. Todos los derechos reservados.',
  },
};

const SUPPORTED_LANGUAGES = ['en', 'hu', 'de', 'ru', 'fr', 'es'];
const PAGE_SIZE = 3;
let currentLang = 'en';
let langOffset = 0;

function detectLang() {
  const saved = localStorage.getItem('todo-lang');
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
    return saved;
  }

  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return SUPPORTED_LANGUAGES.includes(browser) ? browser : 'en';
}

function t(key, ...args) {
  const val = (TRANSLATIONS[currentLang] || TRANSLATIONS.en)[key];
  return typeof val === 'function' ? val(...args) : (val ?? key);
}

function renderLangSwitcher() {
  const container = document.getElementById('lang-pages');
  const prevBtn = document.getElementById('lang-prev');
  const nextBtn = document.getElementById('lang-next');
  if (!container || !prevBtn || !nextBtn) {
    return;
  }

  const visible = SUPPORTED_LANGUAGES.slice(langOffset, langOffset + PAGE_SIZE);
  container.innerHTML = visible.map(lang =>
    `<button class="lang-btn ${lang === currentLang ? 'active' : ''}" data-lang="${lang}" type="button" onclick="setLang('${lang}')">${lang.toUpperCase()}</button>`
  ).join('');
  prevBtn.disabled = langOffset === 0;
  nextBtn.disabled = langOffset + PAGE_SIZE >= SUPPORTED_LANGUAGES.length;
}

function shiftLang(dir) {
  const max = Math.max(0, SUPPORTED_LANGUAGES.length - PAGE_SIZE);
  langOffset = Math.min(max, Math.max(0, langOffset + dir));
  renderLangSwitcher();
}

function setLang(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return;
  }

  currentLang = lang;
  localStorage.setItem('todo-lang', lang);
  document.documentElement.lang = lang;
  const idx = SUPPORTED_LANGUAGES.indexOf(currentLang);
  langOffset = Math.min(Math.max(0, Math.floor(idx / PAGE_SIZE) * PAGE_SIZE), Math.max(0, SUPPORTED_LANGUAGES.length - PAGE_SIZE));
  applyTranslations();
  renderTasks();
}

function applyTranslations() {
  const title = document.querySelector('.app-title-text');
  if (title) {
    title.textContent = t('appTitle');
  }

  const btnText = document.querySelector('.btn-add-text');
  if (btnText) {
    btnText.textContent = t('newTask');
  }

  const filterKeys = ['filterActive', 'filterDone', 'filterIgnored', 'filterAll'];
  document.querySelectorAll('.filter-tab').forEach((tab, i) => {
    tab.textContent = t(filterKeys[i]);
  });

  const hint = document.getElementById('swipe-hint');
  if (hint) {
    hint.textContent = t('swipeHint');
  }

  const formLabel = document.querySelector('.form-label');
  if (formLabel) {
    formLabel.textContent = t('modalLabel');
  }

  const input = document.getElementById('task-input');
  if (input) {
    input.placeholder = t('modalPlaceholder');
  }

  const detailLabel = document.getElementById('detail-label');
  if (detailLabel) {
    detailLabel.textContent = t('modalDetailLabel');
  }

  const detailInput = document.getElementById('task-detail-input');
  if (detailInput) {
    detailInput.placeholder = t('modalDetailPlaceholder');
  }

  const cancelBtn = document.querySelector('.btn-secondary');
  if (cancelBtn) {
    cancelBtn.textContent = t('modalCancel');
  }

  const copyright = document.getElementById('footer-copyright');
  if (copyright) {
    copyright.textContent = t('copyright');
  }

  renderLangSwitcher();
  renderDayFilterBar();
}

function initI18n() {
  currentLang = detectLang();
  const idx = SUPPORTED_LANGUAGES.indexOf(currentLang);
  if (idx >= PAGE_SIZE) {
    langOffset = Math.floor(idx / PAGE_SIZE) * PAGE_SIZE;
  }

  document.documentElement.lang = currentLang;
  applyTranslations();
}