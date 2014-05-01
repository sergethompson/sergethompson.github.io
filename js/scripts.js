var latitude;
var longitude;
var countDown = false;

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
  	if(-55 < gamma < -35){
  		setTimeout(function(){alert("Hello")
  			countDown = false;
  		}, 3000);
  		countDown = true;
  	};

  }; 


  // Do stuff with the new orientation data
};


