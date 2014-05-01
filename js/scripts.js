var latitude;
var longitude;
var countDown = false;
var dataX;

$( window ).scroll(function() {
  var scroll = $(window).scrollTop();
  $(".resume").css({"right": 2*scroll});
  $(".twitter").css({"right": 2*scroll});
  $(".linkedin").css({"right": -2*scroll});
  $(".github").css({"right": -2*scroll});

});

function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{console.log("Geolocation is not supported by this browser.");}
  }
function showPosition(position)
  {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude; 
  };




window.addEventListener("deviceorientation", handleOrientation, true);


function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;
  
  	



  // 

  
  if (!countDown) {
  	if(-55 < gamma && gamma < -35){
  		setTimeout(function(){
  			$.getJSON( "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"", function( data ) {
	 console.log(data)
	 dataX = data;

var overlay = document.createElement("div");
        overlay.setAttribute("id","overlay");
        overlay.setAttribute("class", "overlay");
        overlay.style.position="fixed";
        overlay.style.backgroundColor="black";
        overlay.style.opacity=".7";
        overlay.style.width="100%";
        overlay.style.height="100%";
        overlay.style.zIndex="1000";
        overlay.style.top="0";
        overlay.style.left="0";
        overlay.style.filter="alpha(opacity=70)";
        document.body.appendChild(overlay);


        // var productOverlay = document.createElement("div");
        // productOverlay.setAttribute("id","productOverlay");
        // productOverlay.setAttribute("class", "productOverlay");
        // productOverlay.style.backgroundColor="#4bccff";
        // productOverlay.style.color="white";
        // productOverlay.style.fontFamily="Proxima";
        // productOverlay.style.textAlign="center";
        // productOverlay.style.fontSize="30px";
        // productOverlay.style.position="fixed";
        // productOverlay.style.width="520px";
        // productOverlay.style.height="160px";
        // productOverlay.style.zIndex="1010";
        // productOverlay.style.top="50%";
        // productOverlay.style.left="50%";
        // productOverlay.style.marginLeft="-260px";
        // productOverlay.style.marginTop="-80px";
        // document.body.appendChild(productOverlay);
        // document.getElementById("productOverlay").innerHTML="<br>" +"Items in Cart: " +cartTotal+ "<br>" +"<br>" +"Subtotal Price: "+subtotal;






	 alert("Hello your lat lon " + latitude.toFixed(2) +" : " 
	 	+ longitude.toFixed(2) + " Temp: "+(dataX.main.temp * 1.8 - 459.67).toFixed(2)
	 	 +" Weather: "+dataX.weather[0].description);
	 		var elemento = document.getElementById("overlay");
		elemento.parentNode.removeChild(elemento);
	});

  			
  			countDown = false;
  		}, 3000);
  		countDown = true;
  	};

  }; 


  // Do stuff with the new orientation data
};

getLocation();
// setTimeout(function(){
// 	alert("Hello Serge your lat lon");
//   			countDown = false;
//   		}, 3000);


$.getJSON( "http://api.openweathermap.org/data/2.5/weather?lat=41.04543&lon=-73.57633", function( data ) {
	 console.log(data);
	 dataX = data;
});


