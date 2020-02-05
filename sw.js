var casheName = "V1";
var cacheFiles = [
    '../Lab4_CW2/',
    '../Lab4_CW2/index.html',
    '../Lab4_CW2/sw.js',
    '../Lab4_CW2/manifest.json',
    '../Lab4_CW2/app.js',
    '../Lab4_CW2/images/icon144.png'

]

self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(cacheFiles);
      })
    );
  });

  self.addEventListener('activate', function(e){
    console.log("[serviceworker] Activated")

    e.waitUntil(
        caches.keys().then(function(CachesNames){
            return Promise.all(CachesNames.map(function(thisCacheName){

              if (thisCacheName !== cacheName){
                  console.log("[serviceworker] Removing cached files from", thisCacheName);
                  return caches.delete(thisCacheName);
              }
            }))
        })
    )
})

self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(cacheRes => {
        //console.log('[Service Worker] Fetching resource: '+e.request.url);
        return cacheRes || fetch(e.request);
      })
    );
  });

