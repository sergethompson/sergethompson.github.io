var latitude;
var longitude;
var dataX;
var domState = "OFF";

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
	var gammaState = -60 < gamma && gamma < -30;
	var betaState = -15 < beta && beta < 15;
	var gammaStateToo = 30 < gamma && gamma < 60;



// if gammaState is between two values then gammaState is true 
// if domState is On element is appended to dom

if( ( !gammaState  && !gammaStateToo ) && domState === "ON"){
	var elemento = document.getElementById("overlay");
	elemento.parentNode.removeChild(elemento);
	var elementp = document.getElementById("productOverlay");
	elementp.parentNode.removeChild(elementp);
	domState = "OFF";

	};
  
  	if( (gammaStateToo || gammaState) && betaState && domState === "OFF" ){
  			domState = "ON";
  			$.getJSON( "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"", function( data ) {
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




        var productOverlay = document.createElement("div");
        productOverlay.setAttribute("id","productOverlay");
        productOverlay.setAttribute("class", "productOverlay");
        productOverlay.style.backgroundColor="#4bccff";
        productOverlay.style.color="white";
        productOverlay.style.fontFamily='Source Sans Pro';
        productOverlay.style.textAlign="center";
        productOverlay.style.fontSize="30px";
        productOverlay.style.position="fixed";
        productOverlay.style.width="650px";
        productOverlay.style.height="250px";
        productOverlay.style.zIndex="1010";
        productOverlay.style.top="50%";
        productOverlay.style.left="50%";
        productOverlay.style.marginLeft="-325px";
        productOverlay.style.marginTop="-125px";
        document.body.appendChild(productOverlay);
        document.getElementById("productOverlay").innerHTML="Weather: " + data.weather[0].description
          + "<br>" + "Temp: " + (data.main.temp * 1.8 - 459.67).toFixed(2) + " Location: " + data.name +
          "<br> You Won a Free Guinness! CODE: "+ Math.floor((Math.random() * 10000) + 1);

        


	 // alert("Hello your lat lon " + latitude.toFixed(2) +" : " 
	 // 	+ longitude.toFixed(2) + " Temp: "+(dataX.main.temp * 1.8 - 459.67).toFixed(2)
	 // 	 +" Weather: "+dataX.weather[0].description);



// var r=confirm("Hello your lat lon " + latitude.toFixed(2) +" : " 
// 	+ longitude.toFixed(2) + " Temp: "+(dataX.main.temp * 1.8 - 459.67).toFixed(2)
// 	+" Weather: "+dataX.weather[0].description);
// if (r==true)
// {
// 	var elemento = document.getElementById("overlay");
// 	elemento.parentNode.removeChild(elemento);
// }
// else
// {

// };









	 // 		var elemento = document.getElementById("overlay");
		// elemento.parentNode.removeChild(elemento);
	});
};


  // Do stuff with the new orientation data
};

getLocation();
// setTimeout(function(){
// 	alert("Hello Serge your lat lon");
//   			trigger = false;
//   		}, 3000);


// $.getJSON( "http://api.openweathermap.org/data/2.5/weather?lat=41.04543&lon=-73.57633", function( data ) {
// 	console.log(data);
// 	dataX = data;
// });


