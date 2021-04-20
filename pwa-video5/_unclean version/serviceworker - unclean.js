var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'css/main.css',
  'images/monsta.png',
  'js/jquery.js',
  'js/main.js'
];

//01.ketika service worker kita install
self.addEventListener('install', function(event) {
  // Perform install steps
  // promises - akan ngejalananin setelah proses dalam kurung kurawal ini dijalankan /
  event.waitUntil(  
    caches.open(CACHE_NAME).then(function(cache) {
        console.log('in install serviceWorker ... cache Opened ');
        return cache.addAll(urlsToCache);
      })
  );
});



//02. activate terTrigger, kalau halaman kita close, lalu dia cek apa ada service worker  baru mau menghapus yg lama
self.addEventListener('activate', function(event) {
//dia bisa punya beberapa cache
  //var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
	  cacheNames.filter(function(cacheName){
		  return cacheName!=CACHE_NAME
		  
	  }).map(function(cacheName) {
			//kalau cache ga ada di whitelist, kita delete
			//if (cacheWhitelist.indexOf(cacheName) === -1) {} 
            return caches.delete(cacheName);
          
        }) 
      );
    })
  );
});