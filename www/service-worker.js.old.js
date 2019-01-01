

var dataCacheName = 'sotm-v1.15';
var cacheName = 'sotm';


self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      //return cache.addAll(filesToCache);

      return cache.addAll(filesToCache.map(function(urlToPrefetch) {
        return new Request(urlToPrefetch, { mode: 'no-cors' });
      })).then(function() {
        console.log('All resources have been fetched and cached.');
      }).catch(function(err) {
        console.log("error 1");
      });
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
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'something specific';
  if (e.request.url.indexOf(dataUrl) > -1) {
    //if something specific, request something
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request, {'mode': 'no-cors'}).then(function(response){
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
      fetch(e.request, {'mode': 'no-cors'}).catch(function() {
        return caches.match(e.request);
      })
    );
  }
});





var filesToCache = [
'/index.php',
'/css/styles.css',
'/css/images/leaflet-search.jpg',
'/css/images/loader.gif',
'/css/images/search-icon-mobile.png',
'/css/images/back.png',
'/css/images/search-icon.png',
'/css/vendor/leaflet.css',
'/css/vendor/leaflet.search.css',
'/css/vendor/leaflet.label.css',
'/images/twitter-round.png',
'/images/markers/boat_marker.png',
'/images/markers/xmarkthespot_marker.png',
'/images/markers/chicken_marker.png',
'/images/markers/crate_marker.png',
'/images/markers/snake_marker.png',
'/images/markers/beacon_marker.png',
'/images/markers/throne_marker.png',
'/images/markers/compass.png',
'/images/markers/pig_marker.png',
'/images/about_icon.png',
'/images/sotm_logo-192.png',
'/images/toggle_pigs.png',
'/images/fullscreen_icon.png',
'/images/docs/point_at_share.jpg',
'/images/toggle_crates.png',
'/images/info_icon.png',
'/images/downloadicon.png',
'/images/toggle_snakes.png',
'/images/share_link_icon.png',
'/images/sotm_logo.png',
'/images/icon-w.png',
'/images/toggle_beacons.png',
'/images/github-round.png',
'/images/toggle_chickens.png',
'/images/toggle_thrones.png',
'/images/sotm_logo-512.png',
'/js/sotm.js',
'/js/vendor/jquery-3.3.1.min.js',
'/js/vendor/leaflet.js',
'/js/vendor/leaflet-hash.js',
'/js/vendor/leaflet-search.min.js',
'/js/vendor/L.SimpleGraticule-sot.js',
'/includes/gtm.php',
'/includes/globals.php',
'/fonts/sot-icons.ttf',
'/fonts/sot-icons.eot',
'/fonts/sot-icons.svg',
'/fonts/sot-icons.woff',
'/fonts/sot-icons.woff2',
'/about.php'
];