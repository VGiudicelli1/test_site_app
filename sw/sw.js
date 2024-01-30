// sw.js

// install event
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('nom_du_cache')
        .then((cache) => {
          return cache.addAll([
            './',
            'index.html',
            'style.css',
            'imgs/a.jpg',
            'imgs/b.jpg',
            'imgs/c.jpg',
            'imgs/icone144.png',
            'manifest.json'
            //'imgs/d.jpg',
         ]);
        })
        .then(() => {
          return self.skipWaiting();
        })
    );
  });
  
  // fetch event
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });