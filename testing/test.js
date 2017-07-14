// var apiKey = ;
//HI!

//var for zomato API
var zoAPI = "394d1e7d79d05683913b696732d33f83";

//cuisine search for locations

var search;

//lat & long variables
var latitude;
var longitude;
var testLatLong = {
  lat: 30.2672,
  lng: -97.7421
};

//array for list of restaurants, and list of reviews
var listR = [];
var listP = [];

//variables for name of restaurant, website url, address, currency, rating
// and cuisine type
var name ="";
var website = "";
var address = "";
var rating = 0;
var cuisine = "";
var currency = "";

//variables for reviews

var reviewer = "";
var reviewDate = "";
var reviewRating = 0;
var rdescription="";
var thumbnail = $("<img>");
$(thumbnail).attr("src", "face.png");

//creates blank map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: testLatLong
  });
} //-end of initMap-""


// res_id variable for reviews ajax
var resID = "";


//whenever the search bar is clicked
$(document).on("click","#searchbtn", function(){


  //get the input value and store it as the search variable
  search = "";
  search = $("#mysearch").val().trim();

//getting the response for zomato locations API
var locationURL ="https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&q=" + search;

  console.log("The input: " + search);
  console.log("url: " + locationURL);
  //get ajax for the options of restaurants
  $.ajax({
    url: locationURL,
    method: "GET",
    headers:{
      "user-key": zoAPI
    }
  })
  //after getting the response
  .done(function(response) {
    console.log(response);

    //where it centers
    var map2 = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,//zoom set to 12 so all markers are seen at once
      center: testLatLong
    });

    //for each of the objects returned
    for (var i =0; i < response.restaurants.length; i ++){


      // get the variables for name, website, address, rating, curency, cuisine
      name = response.restaurants[i].restaurant.name;
      website = response.restaurants[i].restaurant.url;
      address = response.restaurants[i].restaurant.location.address;
      rating = parseInt(response.restaurants[i].restaurant.user_rating.aggregate_rating);
      cuisine = response.restaurants[i].restaurant.cuisines;
      currency = response.restaurants[i].restaurant.currency;
      resID = response.restaurants[i].restaurant.id;

      //push the name of restaurant to list of restaurants
      listR.push(resID);

      //make a div which appends to restaurants nearby
      makeDivforNearbyR(resID, name, website, address, rating, cuisine, currency);


      latitude = response.restaurants[i].restaurant.location.latitude;
      latitude = parseFloat(latitude);
      longitude = response.restaurants[i].restaurant.location.longitude;
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
      console.log("made a new marker");
      markerClick(marker);
    }


  });
});


//function for making div to append to restaurants nearby
function makeDivforNearbyR( resID, name, website, address, rating, cuisine, currency){

  //make a new div
  var newdiv = $("<div class = 'option'> </div>");

  //append number of stars for rating
  var divforStars = drawStars(rating);
  drawStars(rating);

  //append the name and currency next to it (name is clickable)
  $(newdiv).append(currency);

  $(newdiv).append(divforStars);

  var rname = $("<p id = 'name'></p>");
  //set data-name to name
  $(rname).attr("data-name", resID);
  $(rname).html(name);
  $(newdiv).append(rname);

  //append website url (clickable)
  $(newdiv).append("<a id = 'website'> Website </a>"); 
  $("#website").attr("href", website);
  //append address
  $(newdiv).append("<p> Address: " + address + "</p>");

  //Clickable Directions
  $(newdiv).append("<p id = 'directions'>Directions</p>");

  //Cuisine type
  $(newdiv).append("<p> Cuisines: " + cuisine + "</p><hr>");

    //Append to html
    $(".light1").append(newdiv);
  }

  //whenever the name of place is clicked
  $(document).on("click", "#name", function(){

  //retrieve dataname value from whats clicked (This is the resID)
  var restaurantName = $(this).attr("data-name");

  //get ajax response of reviews for that restaurantName


    //variable for reviewsURL
    var reviewsURL = "https://developers.zomato.com/api/v2.1/reviews?res_id=" + restaurantName + "&count=20";

    $.ajax({
      url: reviewsURL,
      method: "GET",
      headers:{
        "user-key":zoAPI
      }
    })
    //after getting the response
    .done(function(response) {
      console.log(response);

      //if there are no reviews
      if (response.user_reviews.length === 0){

        //append into html that there are no reviews yet
        $(".oops").html("Sorry, there are no reviews for this restaurant yet!");
      }

      else{

          //for each of the reviews
            for (var r = 0; r < response.user_reviews.length ; r ++){

                //get thumbnail, name, rating, data, and description
                reviewer = response.user_reviews[r].review.user.name;
                console.log("Person: " + reviewer);

                //if not undefined, get date
                if (response.user_reviews[r].review.review_time_friendly !== undefined){
                  reviewDate = response.user_reviews[r].review.review_time_friendly;
                  console.log("Date: " + reviewDate);
                }

                //if not undefined, get thumbnail
                if (response.user_reviews[r].review.user.profile_image !== undefined){
                  // $(thumbnail).attr("src", response.user_reviews[r].review.user.profile_image);
                  // console.log("thumbnail src: "+ response.user_reviews[r].review.user.profile_image);
                }

                reviewRating = response.user_reviews[r].review.rating;

                //if not undefined, get rating
                if (response.user_reviews[r].review.review_text !== undefined){
                  console.log("Rating: " + reviewRating);
                  rdescription = response.user_reviews[r].review.review_text;
                  console.log(rdescription);
                }


                //call function for making div for reviews
                makeDivforReviewers(reviewer, thumbnail, reviewDate, reviewRating, rdescription);
    }
  }
  });



});
//function for converting ratings into stars
function drawStars(rating){

    //make a div for stars
    var stars = $("<div>");

    //if rating less than one, append one stars
    if (rating < 1) {
      $(stars).append("<img src = 'stars.png'>");
      return stars;
    }
    //else if less than 2 , append 2 stars
    else if (rating <=2 ){
      $(stars).append("<img src = 'stars.png'>");
      $(stars).append("<img src = 'stars.png'>");
      return stars;
    }
    //else if less than 3, append 3 stars
    else if (rating <= 3  ){
      $(stars).append("<img src = 'stars.png'>");
      $(stars).append("<img src = 'stars.png'>");
      $(stars).append("<img src = 'stars.png'>");
      return stars;
    }
    //else if less than 4, append 4 stars
    else if (rating <= 4  ){
      $(stars).append("<img src = 'stars.png'>");
      $(stars).append("<img src = 'stars.png'>");
      $(stars).append("<img src = 'stars.png'>");
      $(stars).append("<img src = 'stars.png'>");
      return stars;
    }
    //else, append 5 stars
    else{
      $(stars).append("<img src = 'stars.png'>");
      $(stars).append("<img src = 'stars.png'>");
      $(stars).append("<img src = 'stars.png'>");
      $(stars).append("<img src = 'stars.png'>");
      $(stars).append("<img src = 'stars.png'>");
      return stars;
    }
  }

//function to make div for each person's ratings
function makeDivforReviewers(reviewer, thumbnail, reviewDate, reviewRating, rdescription){

  //make a new div
  var div2 = $("<div class = 'ratingdiv'> </div>");

  //make a paragraph element and append the thumbnail and name into it
  var ava = $("<p id = 'avatar'></p>");
  $(ava).append(thumbnail + "  ");
  $(ava).append(reviewer);

  //append paragraph element into the div2
  $(div2).append(ava);

  //make the rating into stars and append it into div2
  var div2forstars = drawStars(reviewRating);
  $(div2).append(div2forstars);

  //append description into div2
  $(div2).append(rdescription);

  //append date into div2
  $(div2).append("<p>" + reviewDate + "</p>");

  //append div2 to document
  $(".oops").append(div2);
}

//listens for markers to be clicked
function markerClick(marker) {
  marker.addListener("click", function() {
    alert("marker!");
  });
}
