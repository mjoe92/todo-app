/**
 * Service Worker (cache-first strategy)
 *
 * HOW UPDATES WORK:
 *   Bump the CACHE_VERSION string whenever you deploy a new version.
 *   The browser will detect the changed sw.js, install the new cache
 *   in the background, and activate it on the next page load.
 */
const CACHE_VERSION = 'v1';
const CACHE_NAME    = `todo-app-${CACHE_VERSION}`;

// All local assets to pre-cache on installation
const PRECACHE_URLS = [
  './',
  './index.html',
  './style.css',
  './assets/i18n.js',
  './assets/storage.js',
  './assets/theme.js',
  './assets/tasks.js',
  './assets/swipe.js',
  './assets/sort.js',
  './assets/render.js',
  './assets/modal.js',
  './assets/app.js',
  './assets/sw-register.js',
];

// Install: pre-cache all local assets individually so one failure doesn't abort the install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        PRECACHE_URLS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url, err))
        )
      )
    ).then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k.startsWith('todo-app-') && k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for local assets, network-first for CDN
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // CDN resources (fonts, Bootstrap) — network first, fallback to cache
  const isCDN = url.hostname !== self.location.hostname;
  if (isCDN) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Local assets — cache first, fallback to network
  event.respondWith(
    caches.match(request)
      .then(cached => cached || fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
      )
  );
});
