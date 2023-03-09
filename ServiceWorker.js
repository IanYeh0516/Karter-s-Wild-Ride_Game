const cacheName = "DefaultCompany-Karter-s-Wild-Ride-1.0";
const contentToCache = [
    "Build/Karter-s-Wild-Ride_Game.loader.js",
    "Build/Karter-s-Wild-Ride_Game.framework.js.gz",
    "Build/Karter-s-Wild-Ride_Game.data.gz",
    "Build/Karter-s-Wild-Ride_Game.wasm.gz",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
