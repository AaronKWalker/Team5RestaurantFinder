var cuisine = "pizza";

var queryURL = "http://api.edamam.com/search?q=" + cuisine + "&app_id=$e4d03329&app_key=$6c158eff2da3face489c535cea9e9665"

$("#button").on("click", function() {
  $.ajax({
      url: queryURL,
      method: "GET",
      data:
      // success: function(response){
      //   console.log(response);
      // }
    })
    // .done(function(response) {
    //   console.log(response);
    // });
});
//curl "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free"


$.ajax({
  url: 'http://www.example.com/user/' + $('#Id').val() + '?callback=?',
  type: "GET",
  data: formData,
  dataType: "jsonp",
  jsonpCallback: "localJsonpCallback"
});
