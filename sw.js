self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('content-store').then(function(cache) {
        return cache.addAll([
          '/priceslist/',
          '/priceslist/index.html',
          '/priceslist/js/index.js',
          '/priceslist/css/*',
          '/priceslist/image/*'
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
   