//-------------------[put empty map on page upon load]-------------------//
var testLatLong = {lat: 30.2471972222, lng: -97.750725}; //Austin, TX

//creates blank map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: testLatLong
  });
} //-end of initMap-



//-------------------[test: pull lat & long from zomato]-------------------//
//var for zomato API
var zoAPI = "394d1e7d79d05683913b696732d33f83";

//cuisine search for locations
var searchFood = "tacos";
var searchLocation = "Austin";


//getting the response for zomato locations API
var foodURL ="https://developers.zomato.com/api/v2.1/search?q=" + searchLocation + "&count=15&radius=25%20mi";
var locationURL="https://developers.zomato.com/api/v2.1/locations?query=" + searchLocation + "&count=15&radius=25%20mi";
var testURL = "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&radius=20000&cuisines=55&count=15&radius=25%20mi" //grabed from /search @ zomato
//NOTE: functions for getting the following information everytime user searches still needed; each would be its own ajax call:
//1. location ID [entity_id] (diffent depend on zip or city; making user only use zip would simplify this)
//2. location type [entity_type] (see #1)
//3. cuisines
//NOTE: I feel that due to the limiations of zomato, it might be easier if the user can only put in a zip code and select a cuisine from a dropdown menue.  Then the only ajax call (other then the one like the example below) would have to be the one that returns a location ID based on the zip code searched for.

//lat & long variables
var latitude;
var longitude;

//listens for markers to be clicked
function markerClick(marker) {
  marker.addListener("click", function() {
    alert("marker!");
  });
}

//test button starts test
$("#testBtn").on("click", function () {
  console.log("click!");

  $.ajax({
    url: testURL,
    method: "GET",
    headers:{
      "user-key":zoAPI
    }
  })
  //after getting the response
  .done(function(response) {
    console.log(response);

    var map2 = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,//zoom set to 12 so all markers are seen at once
      center: testLatLong
    });

    //for each of the objects returned

    for (var m =0; m < response.restaurants.length; m ++){

      latitude = response.restaurants[m].restaurant.location.latitude;
      latitude = parseFloat(latitude);
      longitude = response.restaurants[m].restaurant.location.longitude;
      longitude = parseFloat(longitude);
      console.log(latitude);
      console.log(longitude);
      console.log("SEPERATOR");


      //create a marker for each object returned
      var phiLambda = {lat: latitude, lng: longitude};

      var marker = new google.maps.Marker({
        position: phiLambda,
        map: map2
      });
      markerClick(marker);
    }
  });


});




//-------------------[test: get directions]-------------------//
