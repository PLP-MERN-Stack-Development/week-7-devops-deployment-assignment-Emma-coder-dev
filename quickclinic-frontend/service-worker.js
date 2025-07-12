const CACHE_NAME = 'quickclinic-v2';
const urlsToCache = [
  'index.html',
  'register.html',
  'login.html',
  'login-code.html',
  'dashboard.html',
  'book.html',
  'chat.html',
  'admin.html',
  'record.html',
  'style.css',
  'manifest.json',
  'favicon.png',
  'offline.html'
];

// Cache files during install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Clean up old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

// Fetch logic: try network first, fallback to cache, then offline page
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(res => res)
      .catch(() => caches.match(event.request).then(response =>
        response || caches.match('offline.html')
      ))
  );
});

