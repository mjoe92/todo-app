/**
 * Touch and mouse swipe gesture handling for task cards.
 * Left swipe → delete, Right swipe → ignore.
 */
const SWIPE_THRESHOLD_PX = 80;

function setupSwipe(card, id, onDelete, onIgnore) {
    const inner = card.querySelector(`#inner-${id}`);
    const bgDelete = card.querySelector(`#bg-delete-${id}`);
    const bgIgnore = card.querySelector(`#bg-ignore-${id}`);

    let startX = 0, startY = 0, dx = 0;
    let swiping = false, mouseLocked = false, scrollLocked = false;

    /* Helpers */
    function begin(x, y) {
        startX = x;
        startY = y;
        dx = 0;
        swiping = false;
        scrollLocked = false;
        inner.style.transition = 'none';
    }

    function move(x, y) {
        if (scrollLocked) return;
        const diffX = x - startX, diffY = y - startY;
        if (!swiping && Math.abs(diffX) < 5 && Math.abs(diffY) < 5) return;
        if (!swiping) {
            if (Math.abs(diffY) > Math.abs(diffX)) {
                scrollLocked = true;
                return;
            }
            swiping = true;
        }
        dx = diffX;
        inner.style.transform = `translateX(${dx}px)`;
        const progress = Math.min(Math.abs(dx) / SWIPE_THRESHOLD_PX, 1);
        if (dx < 0) {
            bgDelete.style.opacity = progress;
            bgIgnore.style.opacity = 0;
        } else {
            bgIgnore.style.opacity = progress;
            bgDelete.style.opacity = 0;
        }
    }

    function end() {
        if (!swiping) return;
        inner.style.transition = 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
        if (dx < -SWIPE_THRESHOLD_PX) {
            inner.style.transform = 'translateX(-110%)';
            bgDelete.style.opacity = 1;
            setTimeout(() => onDelete(id), 230);
        } else if (dx > SWIPE_THRESHOLD_PX) {
            inner.style.transform = 'translateX(110%)';
            bgIgnore.style.opacity = 1;
            setTimeout(() => onIgnore(id), 230);
        } else {
            inner.style.transform = 'translateX(0)';
            bgDelete.style.opacity = 0;
            bgIgnore.style.opacity = 0;
        }
    }

    /* Touch events */
    inner.addEventListener('touchstart', e => begin(e.touches[0].clientX, e.touches[0].clientY), {passive: true});
    inner.addEventListener('touchmove', e => {
        move(e.touches[0].clientX, e.touches[0].clientY);
        if (swiping && !scrollLocked) e.preventDefault();
    }, {passive: false});
    inner.addEventListener('touchend', end);

    /* Mouse events (desktop fallback) */
    inner.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        mouseLocked = true;
        begin(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', e => {
        if (mouseLocked) move(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', () => {
        if (mouseLocked) {
            mouseLocked = false;
            end();
        }
    });
}