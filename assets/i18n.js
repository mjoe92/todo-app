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
    modalDays: 'Visible on days',
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
    taskDays: 'Scheduled days',
    exportSaveFile: 'Save file', exportSendEmail: 'Send email',
    exportFileDesc: 'Download your tasks as a <code>.tasks.json</code> file. You can import it later by dragging it onto the app or using the import button.',
    exportDownload: 'Download',
    exportEmailDesc: 'Send your tasks as a JSON attachment via your default email client.',
    exportEmailLabel: 'Recipient email address',
    exportSubjectLabel: 'Subject',
    exportBodyLabel: 'Message',
    exportEmailPlaceholder: 'you@example.com',
    exportSubjectValue: 'My Tasks export',
    exportEmailBody: 'Hi,\n\nPlease find my tasks export attached below as JSON.\n\nYou can import it by opening the Todo App and dragging the file onto the page, or using the import button.\n\nBest regards',
    exportNote: 'Note: your email client will open with the task data in the email body, since browsers cannot attach files to mailto links.',
    exportSend: 'Send',
    exportModalTitle: 'Export Tasks',
    dropOverlayText: 'Drop to import tasks',
    copyright: '© 2026 mJoe. All rights reserved.',
    readOnly: 'Read-only (past day)',
  },
  hu: {
    appTitle: 'Feladataim', newTask: 'Új feladat',
    filterActive: 'Aktív', filterDone: 'Kész', filterIgnored: 'Kihagyott', filterAll: 'Mind',
    swipeHint: '← Balra húzva törlés · Jobbra húzva kihagyás →',
    modalTitleNew: 'Új feladat', modalTitleEdit: 'Feladat szerkesztése',
    modalLabel: 'Feladat neve', modalPlaceholder: 'Mit kell elvégezni?',
    modalDetailLabel: 'Részletek (opcionális)', modalDetailPlaceholder: 'Adj meg további információt…',
    modalCancel: 'Mégsem', modalAdd: 'Hozzáadás', modalSave: 'Mentés',
    modalDays: 'Látható napokon',
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
    taskDays: 'Ütemezett napok',
    exportSaveFile: 'Fájl mentése', exportSendEmail: 'E-mail küldése',
    exportFileDesc: 'Töltsd le a feladataidat <code>.tasks.json</code> fájlként. Később visszaimportálhatod az appba húzva vagy az importáló gombbal.',
    exportDownload: 'Letöltés',
    exportEmailDesc: 'Küldd el a feladataidat JSON mellékletként az alapértelmezett levelezőprogramodon keresztül.',
    exportEmailLabel: 'Címzett e-mail-címe',
    exportSubjectLabel: 'Tárgy',
    exportBodyLabel: 'Üzenet',
    exportEmailPlaceholder: 'te@pelda.hu',
    exportSubjectValue: 'Feladatok exportálása',
    exportEmailBody: 'Szia,\n\nMellékletként küldöm a feladataimat JSON formátumban.\n\nImportáláshoz nyisd meg a Todo Appot, és húzd rá a fájlt az oldalra, vagy használd az importáló gombot.\n\nÜdvözlettel',
    exportNote: 'Megjegyzés: a levelezőprogramod a feladatadatokkal nyílik meg az e-mail törzsében, mivel a böngészők nem tudnak fájlokat csatolni mailto-hivatkozásokhoz.',
    exportSend: 'Küldés',
    exportModalTitle: 'Feladatok exportálása',
    dropOverlayText: 'Húzd ide az importáláshoz',
    copyright: '© 2026 mJoe. Minden jog fenntartva.',
    readOnly: 'Csak olvasható (elmúlt nap)',
  },
  de: {
    appTitle: 'Meine Aufgaben', newTask: 'Neue Aufgabe',
    filterActive: 'Aktiv', filterDone: 'Erledigt', filterIgnored: 'Ignoriert', filterAll: 'Alle',
    swipeHint: '← Links wischen zum Löschen · Rechts wischen zum Ignorieren →',
    modalTitleNew: 'Neue Aufgabe', modalTitleEdit: 'Aufgabe bearbeiten',
    modalLabel: 'Aufgabentitel', modalPlaceholder: 'Was muss erledigt werden?',
    modalDetailLabel: 'Details (optional)', modalDetailPlaceholder: 'Weitere Informationen hinzufügen…',
    modalCancel: 'Abbrechen', modalAdd: 'Hinzufügen', modalSave: 'Speichern',
    modalDays: 'Sichtbar an Tagen',
    badgeDone: 'Erledigt', badgeIgnored: 'Ignoriert', badgeActive: 'Aktiv',
    ignoreTask: 'Aufgabe ignorieren', unignoreTask: 'Ignorieren rückgängig machen', ignore: 'Ignorieren', unignore: 'Wiederherstellen',
    deleteTask: 'Aufgabe löschen', delete: 'Löschen', markDone: 'Aufgabe als erledigt markieren', addedOn: 'Hinzugefügt',
    emptyAllLabel: 'Noch keine Aufgaben', emptyActiveLabel: 'Keine aktiven Aufgaben',
    emptyDoneLabel: 'Keine erledigten Aufgaben', emptyIgnoredLabel: 'Keine ignorierten Aufgaben',
    emptyAllDesc: 'Tippe auf „Neue Aufgabe", um zu beginnen.', emptyActiveDesc: 'Alles erledigt!',
    emptyDoneDesc: 'Markiere Aufgaben als erledigt, indem du den Kreis antippst.',
    emptyIgnoredDesc: 'Wische eine Aufgabe nach rechts, um sie zu ignorieren.',
    resetNote: (h) => `Checkboxen werden täglich zurückgesetzt. Nächste Zurücksetzung in ~${h} Std.`,
    dayToday: 'Heute', dayAll: 'Alle',
    dayMon: 'Mo', dayTue: 'Di', dayWed: 'Mi', dayThu: 'Do', dayFri: 'Fr', daySat: 'Sa', daySun: 'So',
    taskDays: 'Geplante Tage',
    exportSaveFile: 'Datei speichern', exportSendEmail: 'E-Mail senden',
    exportFileDesc: 'Lade deine Aufgaben als <code>.tasks.json</code>-Datei herunter. Du kannst sie später importieren, indem du sie in die App ziehst oder den Import-Button verwendest.',
    exportDownload: 'Herunterladen',
    exportEmailDesc: 'Sende deine Aufgaben als JSON-Anhang über deinen Standard-E-Mail-Client.',
    exportEmailLabel: 'E-Mail-Adresse des Empfängers',
    exportSubjectLabel: 'Betreff',
    exportBodyLabel: 'Nachricht',
    exportEmailPlaceholder: 'du@beispiel.de',
    exportSubjectValue: 'Aufgaben-Export',
    exportEmailBody: 'Hallo,\n\nim Anhang findest du meinen Aufgaben-Export als JSON.\n\nZum Importieren öffne die Todo-App und ziehe die Datei auf die Seite oder nutze den Import-Button.\n\nViele Grüße',
    exportNote: 'Hinweis: Dein E-Mail-Client öffnet sich mit den Aufgabendaten im E-Mail-Text, da Browser keine Dateien an mailto-Links anhängen können.',
    exportSend: 'Senden',
    exportModalTitle: 'Aufgaben exportieren',
    dropOverlayText: 'Zum Importieren hier ablegen',
    copyright: '© 2026 mJoe. Alle Rechte vorbehalten.',
    readOnly: 'Schreibgeschützt (vergangener Tag)',
  },
  ru: {
    appTitle: 'Мои задачи', newTask: 'Новая задача',
    filterActive: 'Активные', filterDone: 'Готово', filterIgnored: 'Игнорируемые', filterAll: 'Все',
    swipeHint: '← Влево — удалить · Вправо — игнорировать →',
    modalTitleNew: 'Новая задача', modalTitleEdit: 'Редактировать задачу',
    modalLabel: 'Название задачи', modalPlaceholder: 'Что нужно сделать?',
    modalDetailLabel: 'Детали (необязательно)', modalDetailPlaceholder: 'Добавить подробности…',
    modalCancel: 'Отмена', modalAdd: 'Добавить', modalSave: 'Сохранить',
    modalDays: 'Показывать в дни',
    badgeDone: 'Готово', badgeIgnored: 'Игнорируется', badgeActive: 'Активно',
    ignoreTask: 'Игнорировать задачу', unignoreTask: 'Отменить игнорирование', ignore: 'Игнорировать', unignore: 'Восстановить',
    deleteTask: 'Удалить задачу', delete: 'Удалить', markDone: 'Отметить задачу как выполненную', addedOn: 'Добавлено',
    emptyAllLabel: 'Задач пока нет', emptyActiveLabel: 'Нет активных задач',
    emptyDoneLabel: 'Нет выполненных задач', emptyIgnoredLabel: 'Нет игнорируемых задач',
    emptyAllDesc: 'Нажмите «Новая задача», чтобы начать.', emptyActiveDesc: 'Все задачи выполнены!',
    emptyDoneDesc: 'Отметьте задачи как выполненные, нажав на круг.',
    emptyIgnoredDesc: 'Проведите по задаче вправо, чтобы игнорировать её.',
    resetNote: (h) => `Чекбоксы сбрасываются ежедневно. Следующий сброс через ~${h} ч.`,
    dayToday: 'Сегодня', dayAll: 'Все',
    dayMon: 'Пн', dayTue: 'Вт', dayWed: 'Ср', dayThu: 'Чт', dayFri: 'Пт', daySat: 'Сб', daySun: 'Вс',
    taskDays: 'Запланированные дни',
    exportSaveFile: 'Сохранить файл', exportSendEmail: 'Отправить письмо',
    exportFileDesc: 'Скачайте задачи в виде файла <code>.tasks.json</code>. Позже можно импортировать, перетащив файл в приложение или нажав кнопку импорта.',
    exportDownload: 'Скачать',
    exportEmailDesc: 'Отправьте задачи как JSON-вложение через почтовый клиент по умолчанию.',
    exportEmailLabel: 'E-mail получателя',
    exportSubjectLabel: 'Тема',
    exportBodyLabel: 'Сообщение',
    exportEmailPlaceholder: 'вы@пример.рф',
    exportSubjectValue: 'Экспорт задач',
    exportEmailBody: 'Здравствуйте,\n\nВо вложении — экспорт задач в формате JSON.\n\nДля импорта откройте Todo App и перетащите файл на страницу или воспользуйтесь кнопкой импорта.\n\nС уважением',
    exportNote: 'Примечание: почтовый клиент откроется с данными задач в теле письма, поскольку браузеры не могут прикреплять файлы к ссылкам mailto.',
    exportSend: 'Отправить',
    exportModalTitle: 'Экспорт задач',
    dropOverlayText: 'Перетащите для импорта',
    copyright: '© 2026 mJoe. Все права защищены.',
    readOnly: 'Только чтение (прошедший день)',
  },
  fr: {
    appTitle: 'Mes tâches', newTask: 'Nouvelle tâche',
    filterActive: 'Actives', filterDone: 'Terminées', filterIgnored: 'Ignorées', filterAll: 'Toutes',
    swipeHint: '← Glisser à gauche pour supprimer · à droite pour ignorer →',
    modalTitleNew: 'Nouvelle tâche', modalTitleEdit: 'Modifier la tâche',
    modalLabel: 'Titre de la tâche', modalPlaceholder: 'Que faut-il faire ?',
    modalDetailLabel: 'Détails (optionnel)', modalDetailPlaceholder: 'Ajouter des informations…',
    modalCancel: 'Annuler', modalAdd: 'Ajouter', modalSave: 'Enregistrer',
    modalDays: 'Visible les jours',
    badgeDone: 'Terminé', badgeIgnored: 'Ignoré', badgeActive: 'Actif',
    ignoreTask: 'Ignorer la tâche', unignoreTask: 'Ne plus ignorer', ignore: 'Ignorer', unignore: 'Restaurer',
    deleteTask: 'Supprimer la tâche', delete: 'Supprimer', markDone: 'Marquer la tâche comme terminée', addedOn: 'Ajouté le',
    emptyAllLabel: 'Aucune tâche pour l\'instant', emptyActiveLabel: 'Aucune tâche active',
    emptyDoneLabel: 'Aucune tâche terminée', emptyIgnoredLabel: 'Aucune tâche ignorée',
    emptyAllDesc: 'Appuyez sur « Nouvelle tâche » pour commencer.', emptyActiveDesc: 'Tout est fait !',
    emptyDoneDesc: 'Marquez des tâches comme terminées en appuyant sur le cercle.',
    emptyIgnoredDesc: 'Glissez une tâche vers la droite pour l\'ignorer.',
    resetNote: (h) => `Les cases sont réinitialisées chaque jour. Prochaine réinitialisation dans ~${h} h.`,
    dayToday: 'Aujourd\'hui', dayAll: 'Tous',
    dayMon: 'Lu', dayTue: 'Ma', dayWed: 'Me', dayThu: 'Je', dayFri: 'Ve', daySat: 'Sa', daySun: 'Di',
    taskDays: 'Jours planifiés',
    exportSaveFile: 'Enregistrer le fichier', exportSendEmail: 'Envoyer par e-mail',
    exportFileDesc: 'Téléchargez vos tâches en tant que fichier <code>.tasks.json</code>. Vous pourrez l\'importer ultérieurement en le faisant glisser dans l\'application ou en utilisant le bouton d\'importation.',
    exportDownload: 'Télécharger',
    exportEmailDesc: 'Envoyez vos tâches en pièce jointe JSON via votre client e-mail par défaut.',
    exportEmailLabel: 'Adresse e-mail du destinataire',
    exportSubjectLabel: 'Objet',
    exportBodyLabel: 'Message',
    exportEmailPlaceholder: 'vous@exemple.fr',
    exportSubjectValue: 'Export de mes tâches',
    exportEmailBody: 'Bonjour,\n\nVeuillez trouver ci-joint l\'export de mes tâches au format JSON.\n\nPour l\'importer, ouvrez l\'application Todo et faites glisser le fichier sur la page, ou utilisez le bouton d\'importation.\n\nCordialement',
    exportNote: 'Remarque : votre client e-mail s\'ouvrira avec les données des tâches dans le corps de l\'e-mail, car les navigateurs ne peuvent pas joindre des fichiers aux liens mailto.',
    exportSend: 'Envoyer',
    exportModalTitle: 'Exporter les tâches',
    dropOverlayText: 'Déposez ici pour importer',
    copyright: '© 2026 mJoe. Tous droits réservés.',
    readOnly: 'Lecture seule (jour passé)',
  },
  es: {
    appTitle: 'Mis tareas', newTask: 'Nueva tarea',
    filterActive: 'Activas', filterDone: 'Hechas', filterIgnored: 'Ignoradas', filterAll: 'Todas',
    swipeHint: '← Deslizar izquierda para eliminar · derecha para ignorar →',
    modalTitleNew: 'Nueva tarea', modalTitleEdit: 'Editar tarea',
    modalLabel: 'Título de la tarea', modalPlaceholder: '¿Qué hay que hacer?',
    modalDetailLabel: 'Detalles (opcional)', modalDetailPlaceholder: 'Añadir más contexto…',
    modalCancel: 'Cancelar', modalAdd: 'Añadir', modalSave: 'Guardar',
    modalDays: 'Visible los días',
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
    taskDays: 'Días programados',
    exportSaveFile: 'Guardar archivo', exportSendEmail: 'Enviar por correo',
    exportFileDesc: 'Descarga tus tareas como archivo <code>.tasks.json</code>. Puedes importarlo más tarde arrastrándolo a la aplicación o usando el botón de importación.',
    exportDownload: 'Descargar',
    exportEmailDesc: 'Envía tus tareas como adjunto JSON a través de tu cliente de correo predeterminado.',
    exportEmailLabel: 'Dirección de correo del destinatario',
    exportSubjectLabel: 'Asunto',
    exportBodyLabel: 'Mensaje',
    exportEmailPlaceholder: 'tú@ejemplo.es',
    exportSubjectValue: 'Exportación de tareas',
    exportEmailBody: 'Hola,\n\nAdjunto encontrarás mi exportación de tareas en formato JSON.\n\nPara importarlo, abre la Todo App y arrastra el archivo a la página o usa el botón de importación.\n\nSaludos',
    exportNote: 'Nota: tu cliente de correo se abrirá con los datos de las tareas en el cuerpo del mensaje, ya que los navegadores no pueden adjuntar archivos a enlaces mailto.',
    exportSend: 'Enviar',
    exportModalTitle: 'Exportar tareas',
    dropOverlayText: 'Suelta aquí para importar',
    copyright: '© 2026 mJoe. Todos los derechos reservados.',
    readOnly: 'Solo lectura (día pasado)',
  },
};

let currentLang = DEFAULT_LANG;
let langOffset = 0;

function detectLang() {
  const saved = localStorage.getItem(STORAGE_KEY_LANG);
  if (saved && SUPPORTED_LANG_LIST.includes(saved)) {
    return saved;
  }

  const browser = (navigator.language || DEFAULT_LANG).slice(0, 2).toLowerCase();
  return SUPPORTED_LANG_LIST.includes(browser) ? browser : DEFAULT_LANG;
}

function t(key, ...args) {
  const val = (TRANSLATIONS[currentLang] || TRANSLATIONS[DEFAULT_LANG])[key];
  return typeof val === 'function' ? val(...args) : (val ?? key);
}

function renderLangSwitcher() {
  const container = document.getElementById('lang-pages');
  const prevBtn = document.getElementById('lang-prev');
  const nextBtn = document.getElementById('lang-next');
  if (!container || !prevBtn || !nextBtn) {
    return;
  }

  const PAGE_SIZE = 3;
  const visible = SUPPORTED_LANG_LIST.slice(langOffset, langOffset + PAGE_SIZE);
  container.innerHTML = visible.map(lang =>
    `<button class="lang-btn ${lang === currentLang ? CSS_ACTIVE : ''}" data-lang="${lang}" type="button" onclick="setLang('${lang}')">${lang.toUpperCase()}</button>`
  ).join('');
  prevBtn.disabled = langOffset === 0;
  nextBtn.disabled = langOffset + PAGE_SIZE >= SUPPORTED_LANG_LIST.length;
}

function shiftLang(dir) {
  const PAGE_SIZE = 3;
  const max = Math.max(0, SUPPORTED_LANG_LIST.length - PAGE_SIZE);
  langOffset = Math.min(max, Math.max(0, langOffset + dir));
  renderLangSwitcher();
}

function setLang(lang) {
  if (!SUPPORTED_LANG_LIST.includes(lang)) {
    return;
  }

  currentLang = lang;
  localStorage.setItem(STORAGE_KEY_LANG, lang);
  document.documentElement.lang = lang;
  const PAGE_SIZE = 3;
  const idx = SUPPORTED_LANG_LIST.indexOf(currentLang);
  langOffset = Math.min(Math.max(0, Math.floor(idx / PAGE_SIZE) * PAGE_SIZE), Math.max(0, SUPPORTED_LANG_LIST.length - PAGE_SIZE));
  applyTranslations();
  renderTasks();
}

function applyTranslations() {
  // Header
  const btnText = document.querySelector('.btn-add-text');
  if (btnText) {
    btnText.textContent = t('newTask');
  }

  // Status filter tabs (only the 4 main ones, not day-filter tabs)
  const filterKeys = ['filterActive', 'filterDone', 'filterIgnored', 'filterAll'];
  document.querySelectorAll('.filter-tabs:first-of-type .filter-tab').forEach((tab, i) => {
    if (filterKeys[i]) {
      tab.textContent = t(filterKeys[i]);
    }
  });

  const hint = document.getElementById('swipe-hint');
  if (hint) {
    hint.textContent = t('swipeHint');
  }

  // Drop overlay
  const dropOverlay = document.querySelector('.drop-overlay-inner');
  if (dropOverlay) {
    const textNode = [...dropOverlay.childNodes].find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) {
      textNode.textContent = '\n    ' + t('dropOverlayText') + '\n  ';
    }
  }

  // Task modal
  const modalTitle = document.getElementById('modal-title');
  if (modalTitle && !document.getElementById('modal').classList.contains(CSS_OPEN)) {
    modalTitle.textContent = t('modalTitleNew');
  }

  const modalTaskLabel = document.getElementById('modal-task-label');
  if (modalTaskLabel) {
    modalTaskLabel.textContent = t('modalLabel');
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

  const dayPickerLabel = document.getElementById('day-picker-label');
  if (dayPickerLabel) {
    dayPickerLabel.textContent = t('modalDays');
  }

  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  if (modalCancelBtn) {
    modalCancelBtn.textContent = t('modalCancel');
  }

  const modalSubmit = document.getElementById('modal-submit');
  if (modalSubmit) {
    modalSubmit.textContent = t(document.getElementById('modal').classList.contains(CSS_OPEN) && typeof editingId !== 'undefined' && editingId !== null ? 'modalSave' : 'modalAdd');
  }

  // Export modal
  const exportModalTitle = document.getElementById('export-modal-title');
  if (exportModalTitle) {
    exportModalTitle.textContent = t('exportModalTitle');
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  const exportFileDesc = document.getElementById('export-file-desc');
  if (exportFileDesc) {
    exportFileDesc.innerHTML = t('exportFileDesc');
  }

  const exportEmailDesc = document.getElementById('export-email-desc');
  if (exportEmailDesc) {
    exportEmailDesc.textContent = t('exportEmailDesc');
  }

  const exportEmailLabel = document.getElementById('export-email-label');
  if (exportEmailLabel) {
    exportEmailLabel.textContent = t('exportEmailLabel');
  }

  const exportEmailInput = document.getElementById('export-email-input');
  if (exportEmailInput) {
    exportEmailInput.placeholder = t('exportEmailPlaceholder');
  }

  const exportSubjectLabel = document.getElementById('export-subject-label');
  if (exportSubjectLabel) {
    exportSubjectLabel.textContent = t('exportSubjectLabel');
  }

  const exportSubjectInput = document.getElementById('export-email-subject');
  if (exportSubjectInput) {
    exportSubjectInput.value = t('exportSubjectValue');
  }

  const exportBodyLabel = document.getElementById('export-body-label');
  if (exportBodyLabel) {
    exportBodyLabel.textContent = t('exportBodyLabel');
  }

  const exportEmailBody = document.getElementById('export-email-body');
  if (exportEmailBody) {
    exportEmailBody.value = t('exportEmailBody');
  }

  const exportNote = document.getElementById('export-note');
  if (exportNote) {
    exportNote.textContent = t('exportNote');
  }

  const fileCancelBtn = document.getElementById('export-file-cancel-btn');
  if (fileCancelBtn) {
    fileCancelBtn.textContent = t('modalCancel');
  }

  const emailCancelBtn = document.getElementById('export-email-cancel-btn');
  if (emailCancelBtn) {
    emailCancelBtn.textContent = t('modalCancel');
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
  const PAGE_SIZE = 3;
  const idx = SUPPORTED_LANG_LIST.indexOf(currentLang);
  if (idx >= PAGE_SIZE) {
    langOffset = Math.floor(idx / PAGE_SIZE) * PAGE_SIZE;
  }

  document.documentElement.lang = currentLang;
  applyTranslations();
}
