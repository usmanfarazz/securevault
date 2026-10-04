/* SecureVault service worker — caches the app shell so it works fully offline.
   No user data is ever cached or transmitted; only the app's own files. */
// Bump this whenever the app files change so old caches are cleared.
const CACHE = 'securevault-v3';
const ASSETS = [
  './',
  './index.html',
  './privacy.html',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Pages: network first, so updates reach users; fall back to the cache offline.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Other app files: cache first for speed and offline use.
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
