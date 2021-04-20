var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'fallback.json',
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

//01.b fetch, dipanggil saat browser mau request disini bs diatur mau pakai cache atau enggak
//disini ngatur manfaatin cache apa nggak, mau dicache kah?
//ini yg strategi basic, yg dicache cuman di list awal
/*self.addEventListener('fetch', function(event) {
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
*/

//coba yg cache then network nih
self.addEventListener('fetch', function(event) {
	var request=event.request;
	var url=new URL(request.url);
	
	//pisahkan request API dan internal
	if(url.origin=== location.origin){
		//kalau sama liat cache dulu,kalau ada di cache kita ambil dari cache
		event.respondWith(
			 caches.match(event.request).then(function(response) {
				 return  response || fetch(request)
			 })
  
		);
		
	}else{
		//kalau bukan url originnya
		event.respondWith(
			//kita taruh dia di cache yg baru 
			caches.open('products-cache').then(function(cache){
				return fetch(request).then(function(liveResponse){
					cache.put(request,liveResponse.clone()) //di clone biar bs direturn nanti
					return liveResponse
				}).catch(function(){
					return caches.match(request).then(function(response){
						//kalau berhasil
						if (response)return response;
						//kalau gagal
						return caches.match('fallback.json'); 
						
					})
					
				});
			})
  
		);
		
	}
	
	
});



//02. activate terTrigger, kalau halaman kita close, lalu dia cek apa ada service worker  baru mau menghapus yg lama
self.addEventListener('activate', function(event) {
	console.log('activate service worker masuk');
 event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
	  cacheNames.filter(function(cacheName){
		  //true atau falsenya disini
		  return cacheName!=CACHE_NAME
		  
	  }).map(function(cacheName) {
			//kalau cache ga sama, kita delete
			return caches.delete(cacheName);
          
        }) 
      );
    })
  );
});



