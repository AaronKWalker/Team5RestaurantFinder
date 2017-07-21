var cuisine = "chicken";

var queryURL = "http://api.edamam.com/search?q=" + cuisine + "&app_id=$e4d03329&app_key=$6c158eff2da3face489c535cea9e9665"

var apiEndpoint = 'https://api.edamam.com/search';

var apiData = {
    // the app ID and key work like a library card
    // every time we're borrowing some data from Edamam (the API service provider)
    // we use these to let Edamam know it's us
    _app_id: '602e4c99',
    _app_key: 'badc73a4282fd038b7547e9c5854a2d6',
    // q stands for query, and it's the search term for an ingredient or a recipe
    q: cuisine
  }

$("#button").on("click", function() {
  $.ajax({
    // send the request to the API endpoint
    url: apiEndpoint,
    // the request data we're sending
    data: apiData,
    // we want to receive a JSON object
    dataType: 'jsonp',

    // what to do when the API responds with some data
    success: function(responseJSON)  {
        // at this point we can call the callback function
        console.log(responseJSON);
    }
  })
});







// function getRecipesFromAPI(searchString, callbackFunction) {
//
//     // this is the API endpoint, which means the URL to which our search request is sent
//     var apiEndpoint = 'https://api.edamam.com/search';
//
//     // we're sending some data with our request
//     var apiData = {
//         // the app ID and key work like a library card
//         // every time we're borrowing some data from Edamam (the API service provider)
//         // we use these to let Edamam know it's us
//         _app_id: '602e4c99',
//         _app_key: 'badc73a4282fd038b7547e9c5854a2d6',
//         // q stands for query, and it's the search term for an ingredient or a recipe
//         q: searchString
//     }
//
//     // perform an asynchronous HTTP (Ajax) request using jQuery
//     // learn more about it at https://api.jquery.com/jQuery.ajax
//     // $ is a shortcut for jQuery
//     $.ajax({
//         // send the request to the API endpoint
//         url: apiEndpoint,
//         // the request data we're sending
//         data: apiData,
//         // we want to receive a JSON object
//         dataType: 'jsonp',
//
//         // what to do when the API responds with some data
//         success: function(responseJSON)  {
//             // at this point we can call the callback function
//             callbackFunction(responseJSON);
//         }
//     })
// }








//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).done(function(response) {
//     console.log(response);
//   });
// });
//curl "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free"


// $.ajax({
//   url: 'http://www.example.com/user/' + $('#Id').val() + '?callback=?',
//   type: "GET",
//   data: formData,
//   dataType: "jsonp",
//   jsonpCallback: "localJsonpCallback"
// });

//     // .done(function(response) {
//     //   console.log(response);


// // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// var request = require("request");
//
// // Grab the movieName which will always be the third node argument.
// var movieName = process.argv[2];
//
// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
//
// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);
//
// request(queryUrl, function(error, response, body) {
//
//   // If the request is successful
//   if (!error && response.statusCode === 200) {
//
//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("Release Year: " + JSON.parse(body).Year);
//   }
// });
