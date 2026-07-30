/**
 * Manual task sorting via drag-and-drop (desktop) and touch (mobile).
 *
 * After a successful drop/touch-reorder the tasks array is reordered
 * in-memory and persisted via saveTasks(), then renderTasks() is called.
 *
 * Usage: call setupSort(cardElement, taskId) for each rendered card
 * (called from render.js renderTasks).
 */

(function () {
  let dragSrcId = null;      // id of the card being dragged
  let touchDragId = null;    // id of card being touch-dragged
  let touchClone = null;     // floating visual clone
  let touchOffsetY = 0;

  /** Desktop HTML5 Drag & Drop */
  function onDragStart(e, id) {
    dragSrcId = id;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(id));
    // slight delay so the card doesn't look ghost before drag image renders
    setTimeout(() => {
      const card = cardEl(id);
      if (card) {
        card.classList.add(CSS_DRAGGING);
      }
    }, 0);
  }

  function onDragEnd(id) {
    dragSrcId = null;
    const card = cardEl(id);
    if (card) {
      card.classList.remove(CSS_DRAGGING);
    }
    document.querySelectorAll('.task-card').forEach(c => c.classList.remove(CSS_DRAG_OVER));
  }

  function onDragOver(e, id) {
    if (dragSrcId === null || dragSrcId === id) {
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    document.querySelectorAll('.task-card').forEach(c => c.classList.remove(CSS_DRAG_OVER));
    const card = cardEl(id);
    if (card) {
      card.classList.add(CSS_DRAG_OVER);
    }
  }

  function onDrop(e, targetId) {
    e.preventDefault();
    document.querySelectorAll('.task-card').forEach(c => c.classList.remove(CSS_DRAG_OVER));
    if (dragSrcId === null || dragSrcId === targetId) {
      return;
    }
    reorderTasks(dragSrcId, targetId);
  }

  /** Touch drag */
  function onTouchStart(e, id) {
    // Only activate on the drag-handle
    if (!e.target.closest('.drag-handle')) {
      return;
    }
    touchDragId = id;
    const touch = e.touches[0];
    const card = cardEl(id);
    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    touchOffsetY = touch.clientY - rect.top;

    // Build floating clone
    touchClone = card.cloneNode(true);
    touchClone.style.cssText = [
      'position:fixed',
      'left:' + rect.left + 'px',
      'width:' + rect.width + 'px',
      'top:' + (touch.clientY - touchOffsetY) + 'px',
      'opacity:0.85',
      'z-index:999',
      'pointer-events:none',
      'box-shadow:0 8px 24px oklch(0 0 0/.2)',
      'border-radius:var(--radius-lg)'
    ].join(';');
    document.body.appendChild(touchClone);
    card.classList.add(CSS_DRAGGING);
    e.preventDefault();
  }

  function onTouchMove(e) {
    if (touchDragId === null || !touchClone) {
      return;
    }
    e.preventDefault();
    const touch = e.touches[0];
    touchClone.style.top = (touch.clientY - touchOffsetY) + 'px';

    // Find card under finger
    touchClone.style.display = 'none';
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    touchClone.style.display = '';

    document.querySelectorAll('.task-card').forEach(c => c.classList.remove(CSS_DRAG_OVER));
    const targetCard = el && el.closest('.task-card');
    const targetId = targetCard ? Number(targetCard.dataset.taskId) : null;
    if (targetId && targetId !== touchDragId) {
      targetCard.classList.add(CSS_DRAG_OVER);
    }
  }

  function onTouchEnd(e) {
    if (touchDragId === null) {
      return;
    }
    const touch = e.changedTouches[0];

    if (touchClone) {
      touchClone.remove();
      touchClone = null;
    }
    const srcCard = cardEl(touchDragId);
    if (srcCard) {
      srcCard.classList.remove(CSS_DRAGGING);
    }

    // Find drop target
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetCard = el && el.closest('.task-card');
    const targetId = targetCard ? Number(targetCard.dataset.taskId) : null;

    document.querySelectorAll('.task-card').forEach(c => c.classList.remove(CSS_DRAG_OVER));

    if (targetId && targetId !== touchDragId) {
      reorderTasks(touchDragId, targetId);
    }
    touchDragId = null;
  }

  /** Reorder logic */
  function reorderTasks(srcId, targetId) {
    const arr = getTasks();
    const srcIdx = arr.findIndex(t => t.id === srcId);
    const targetIdx = arr.findIndex(t => t.id === targetId);
    if (srcIdx === -1 || targetIdx === -1) {
      return;
    }
    const [moved] = arr.splice(srcIdx, 1);
    arr.splice(targetIdx, 0, moved);
    saveTasks(arr);
    renderTasks();
  }

  /** Public API */
  window.setupSort = function (card, id) {
    const isTouch = 'ontouchstart' in window;

    if (!isTouch) {
      // Desktop: make the whole card draggable but wire touch on handle only
      card.setAttribute('draggable', 'true');
      card.addEventListener('dragstart', e => onDragStart(e, id));
      card.addEventListener('dragend', () => onDragEnd(id));
      card.addEventListener('dragover', e => onDragOver(e, id));
      card.addEventListener('drop', e => onDrop(e, id));
    } else {
      // Mobile: touch events on the handle
      const handle = card.querySelector('.drag-handle');
      if (handle) {
        handle.addEventListener('touchstart', e => onTouchStart(e, id), {passive: false});
      }
    }
  };

  // Global touch move/end listeners (single pair, not per-card)
  document.addEventListener('touchmove', onTouchMove, {passive: false});
  document.addEventListener('touchend', onTouchEnd);

  function cardEl(id) {
    return document.querySelector('[data-task-id="' + id + '"]');
  }
})();
