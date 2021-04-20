# your First PWA Experience 
oleh-oleh file belajar dari video youtubenya sekolah koding, koding sendiri ngikutin di youtube

moga bs jadi pelajaran bagi teman-teman dan juga saya, lumayan nyain biar ga typo.

myfirstpwa-bysekolahkoding

***************************************************
video 1
belajar pwa dari sekolah koding

bantuan untuk Analisa PWA

1.page speed insights

2.Lighthouse

3. hosting gratis untuk development: 

Firebase untuk deploy di firebase
	
  github

zeit.co


***********************************************************
video 4

pwaapi
github.com/sekolahkoding/pwaaapi


data dari mockaroo.com taruh di typicode
https://my-json-server.typicode.com/sekolahkoding/pwaapi/products
https://my-json-server.typicode.com/sekolahkoding/pwaapi/products?category=Aquamarine

***************************************************




***************************************************


video 6 cache  awal (cache statis di serviceworker)


https://developers.google.com/web/fundamentals/primers/service-workers

a.install (jalan saat install service worker)
b.activate (jalan saat di close,dia  cek apa cachenya masih dipake apa nggak)kalau enggak di ddelete
kalau cuman satu aja yg dipake, cek aja sesuai nama cache_namenya ga,sisanya delete aja
c.fetch
kalau ada di cache kasih, enggak ambil dari network gitu aja


*************************************************************


video 7 jelasin strategi cachingnya aja ga ada praktek sih
==strategi kita dalam cache websitenya
offline cookbook

https://web.dev/offline-cookbook/

macam-macam strategi cache 
1.cache only ? gimana kalau mau delete???
2.network only
3.cache, falling back to network ? gimana kalau mau delete
4.cache& network race ; mana  yg duluan mana yg paling cepet itu yang dipakai
5.network falling back to cache = (-)kalau internet user lemot baru ke cache
6.cache then network
mau konten uptodate, tapi return cachenya dulu
tapi pada saa berhasil akses internet kita mau update halaman sesuai data terbaru

7.kalau ga ada baru kita kasih offline.html, offline.json maupun offline image

***************************************************************


video 8 implementasi  cache then network lanjutan offline cookbook


******************************************************
note=video 9
The Web App Manifest
https://developers.google.com/web/fundamentals/web-app-manifest
https://web.dev/add-manifest/

generatornya disini
saya pakai simicart karena saat tutorial ini dibuat generator firebase lagi error 
https://www.simicart.com/manifest-generator.html/
https://app-manifest.firebaseapp.com/ 

**********************************************
Daftar Pustaka
[1] Belajar Progressive Web App dari Sekolah Koding

https://www.youtube.com/playlist?list=PLCZlgfAG0GXDsbx5eHX0dFzF2C35THONn

[2]Belajar PWA jg di portal mereka

https://sekolahkoding.com/kelas/belajar-progressive-web-app-pwa/video/cache-statis-di-serviceworker#

[3]image gratisan di dapat dari

https://www.freepik.com/free-vector/corporate-logo-designs_4475766.htm#page=1&query=logo&position=3

[4] other source:bitsofco.de



next???
1.convert dari pwa ke apk
pwa2apk 
minimum requirement untuk convert dll 



