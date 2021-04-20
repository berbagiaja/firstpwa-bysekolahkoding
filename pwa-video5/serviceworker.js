var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'index.html',
  'css/main.css',
  'images/monsta.png',
  'js/jquery.js',
  'js/main.js'
 
];

//01.ketika service worker kita install
self.addEventListener('install', function(event) {
	console.log('install service worker masuk');
  // Perform install steps
  // promises - akan ngejalananin setelah proses dalam kurung kurawal ini dijalankan /
  event.waitUntil(  
    caches.open(CACHE_NAME).then(function(cache) {
        console.log('in install serviceWorker ... cache Opened ');
        return cache.addAll(urlsToCache);
      })
  );
});

//01.b fetch, pakai cache
self.addEventListener('fetch', function(event) {
	console.log("fetch yang lagi di request=");  
  console.log(event.request);
  event.respondWith(
  
    caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
		//kalau tidak ada di cache, kita manfaatin network /internet
        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});


//02. activate terTrigger, kalau halaman kita close, lalu dia cek apa ada service worker  baru mau menghapus yg lama
self.addEventListener('activate', function(event) {
	console.log('activate service worker masuk');
 event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
	  cacheNames.filter(function(cacheName){
		  return cacheName!=CACHE_NAME
		  
	  }).map(function(cacheName) {
			//kalau cache ga sama, kita delete
			return caches.delete(cacheName);
          
        }) 
      );
    })
  );
});