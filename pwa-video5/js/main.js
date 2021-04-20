$(document).ready(function(){

var _url="https://my-json-server.typicode.com/sekolahkoding/pwaapi/products";

var dataResults = ""
var catResults = ""
var categories =[]

$.get(_url, function(data){
	$.each(data,function(key,items){
		
		_cat = items.category
		
		dataResults += "<div>"
						+"<h3>"+items.name+"</h3>"
						+"<p>"+items.category+"</p>"
						+"</div>";
						
		if($.inArray(_cat,categories)==-1){
			categories.push(_cat);
			catResults += "<option value='"+_cat+"' > "+_cat+"</option>"

		}
		
	})//end each
	$('#products').html(dataResults);
	$('#cat_select').html("<option value='all'>semua></option>"+catResults);
	
	
	
})//end get


//fungsi filter 
$('#cat_select').on('change',function(){
	updateProducts($(this).val());
})


function updateProducts(cat){
	var dataResults = ""
	var _newurl=_url;
	
	if(cat != 'all')
		_newurl=_url+"?category="+cat
	
	$.get(_newurl, function(data){
		$.each(data,function(key,items){
		
			_cat = items.category
			
			dataResults += "<div>"
							+"<h3>"+items.name+"</h3>"
							+"<p>"+_cat+"</p>"
							+"</div>";
						
		
		
		})//end each
	$('#products').html(dataResults);
	
	
	
	
	
})//end get
	
}

})//end document ready


//begin service worker
//1. instalasi, aktifasi , registrasi
//cek browser ini sudah support apa belum?
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
	  //meregister nama file service worker, file kudu di root untuk ngatur semua halaman
	  //kalau di sub folder, dia cuman bisa bermain di sub folder halaman itu aja
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

