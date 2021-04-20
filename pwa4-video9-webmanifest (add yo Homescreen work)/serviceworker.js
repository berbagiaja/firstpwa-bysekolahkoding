var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = [
  '/', 
  'fallback.json',
  'index.html',
  'css/main.css',
  'images/monsta.png',
  'js/jquery.js',
  'manifest.webmanifest',
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
//coba yg cache then network nih
self.addEventListener('fetch', function(event) {
	var request=event.request;
	var url=new URL(request.url);
	console.log(request);
	console.log(url);
	
	//pisahkan request API dan internal
	if(request=="https://klikfilm.com/tes/pwa4/images/monsta.png"){
		
		event.respondWith(
			//kita taruh dia di cache yg baru 
			caches.open(CACHE_NAME).then(function(cache){
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
		
	}else if(url.origin=== location.origin){
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



