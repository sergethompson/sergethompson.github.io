var latitude;
var longitude;
var dataX;
var domState = "OFF";
var herokuAppData;

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
		productOverlay.style.backgroundColor=herokuAppData.backgroundcolor; //"#4bccff";
		productOverlay.style.color=herokuAppData.textcolor; //"white";
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
		"<br><br> You Won a Free Guinness! CODE: "+ Math.floor((Math.random() * 10000) + 1) +
		"<br> herokuAppData: Body:" +  herokuAppData.body;
	});
};


  // Do stuff with the new orientation data
};

getLocation();

///////////////////////bike data json file
var dataJson;

// allows for click to retreive information specific to that category and adds propper highlighting
// $( "#summary" ).click(function() {
// 	fillIn(0);
// 	$( "#summary" ).addClass( "clicked" );
// 	$( "#page" ).removeClass( "clicked" );
// });
// // allows for click to retreive information specific to that category and adds propper highlighting
// $( "#page" ).click(function() {
// 	fillIn(1);
// 	$( "#page" ).addClass( "clicked" );
// 	$( "#summary" ).removeClass( "clicked" );
// });

// gets data from json file then empties and appends information to dom
var fillIn = function(){
	$.getJSON( 'js/bike_ride_json.js', function( data ) {
		dataJson = data;
		console.log("anything");
		$("#bikeRides").empty();
		$.each( dataJson, function( i, l ){
			console.log("anything2");
			$("#bikeRides").append( "<ul>" +
				"<li><strong>"+l.name + "</strong></li>" + 
				"<li>"+l.location_city+ "</li>" +
				"<li>"+l.max_speed + "</li></ul>");
		});
	});
}

fillIn();

var newMessage = function(){
	$.ajax({
		url: "http://bizwebalerts.herokuapp.com/messages/3.json",

    // the name of the callback parameter, as specified by the YQL service
    jsonp: "callback",

    // tell jQuery we're expecting JSONP
    dataType: "jsonp",

    // work with the response
    success: function( response ) {
        console.log( response ); // server response
        herokuAppData = response;
      }
    });

};

window.setInterval(function(){newMessage();}, 5000);


  function send(lat, long) {
        var gpssnip = {
            latitude:lat,
            longitude:long,
            time:"late"
        }

        

        $.ajax({
            url: 'http://bizwebalerts.herokuapp.com/api/gpssnip',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                console.log("success")
            },
            data: gpssnip
        });
    };

    send(latitude, longitude);



