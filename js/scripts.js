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
	 alert("Hello your lat lon " + latitude.toFixed(2) +" : " + longitude.toFixed(2) + " Temp: "+(dataX.main.temp * 1.8 - 459.67).toFixed(2) +" Weather: "+dataX.weather[0].description);
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


