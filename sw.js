self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('content-store').then(function(cache) {
        return cache.addAll([
          '/PwaPricesList/',
          '/PwaPricesList/index.html',
          '/PwaPricesList/js/index.js',
          '/PwaPricesList/css/*'
        ]);
      })
    );
   });
   
   self.addEventListener('fetch', function(e) {
     console.log(e.request.url);
     e.respondWith(
       caches.match(e.request).then(function(response) {
         return response || fetch(e.request);
       })
     );
   });
   