

var dataCacheName = 'sotm-v1.1';
var cacheName = 'sotm';
var filesToCache = [
  '/',
  '/index.php',
  '/js/sotm.js',
  '/js/vendor/leaflet.js',
  '/js/vendor/leaflet-search.min.js',
  '/js/vendor/L.SimpleGraticule-sot.js',
  '/js/vendor/jquery-3.3.1.min.js',
  '/css/styles.css',
  '/css/vendor/leaflet.css',
  '/css/vendor/leaflet.search.css',
  '/images/sotm_logo.png',
  '/images/twitter-round.png',
  '/images/github-round.png'

];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  return self.clients.claim();
});



self.addEventListener('fetch', function(e) {
  //console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'something specific';
  if (e.request.url.indexOf(dataUrl) > -1) {
    //if something specific, request something
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {

/*     if (navigator.onLine) {
      console.log('online');
    } else {
      console.log('offline');
    } */
    
    //Cache first, network second...
    /* e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    ); */

    //network first, cache second...
    e.respondWith(
      fetch(e.request).catch(function() {
        return caches.match(e.request);
      })
    );
  }
});
