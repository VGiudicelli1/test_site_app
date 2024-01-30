// sw.js

// install event
self.addEventListener('install', (event) => {
    console.log("installation en cours...");
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
            'imgs/d.jpg',
            'imgs/icone144.png',
            'manifest.json'
         ]);
        })
        .then(() => {
          return self.skipWaiting();
        }).then(r => {
          console.log("installation terminée !");
          return r;
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

// version 1.24.352.35232514