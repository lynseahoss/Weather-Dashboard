var apiKey = "ae1dd4475c7b60eeeab3ef88607506d0";
var cities = [""];

var cityStorage = JSON.parse(localStorage.getItem("cities")) || [];



//Functions

//

//call current city weather API
function displayCurrentWeather() {
  var cityData = $(this).attr("data-city")
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityData + "&units=imperial&APPID=ae1dd4475c7b60eeeab3ef88607506d0";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response.name);
    //date variable
    var date = new Date(response.dt*1000);
    //icon for weather info
    var weatherImg = "https://openweathermap.org/img/wn/$response.weather[0].icon@2x.png"
    var wthrDiv = $("#present-city");
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    wthrDiv.append($("<h4>").text(response.nameresponse.name+(date.getMonth()+1)+ (date.getFullYear())))        
    wthrDiv.append($("<p>").text("Temperature: " + tempF.toFixed(2)))
    wthrDiv.append($("<p>").text("Wind Speed: " + response.wind.speed))
    wthrDiv.append($("<>").text("Humidity: " + response.main.humidity + "%"))
    $("#present-city").prepend(wthrDiv)
  });
}

function renderCity(){
  $("#city-list").empty();
for (var i= 0; i < movies.length; i++){
  var x = $("<li>")
  x.addClass("li-city")
  x.attr("data-city", cities[i])
  x.text(cities[i])
  $("city-list").append(x)

  //$("#city-list").append($("<li class = 'city-li'>")).text(cityStorage[i])
}
}


  $("#find-city").on("click", function (event) {
    //   //prevents from resetting page
      event.preventDefault();
      var cityForm = $("#city-input").val().trim();
      cityStorage.push(cityForm);
      localStorage.setItem("cities", JSON.stringify(cityStorage));
      $("#city-input").val("");
}


function fiveDayForecast(){
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&APPID=ae1dd4475c7b60eeeab3ef88607506d0"
$.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    
    
  });
}




$("#fuckThis").on("click", ".city-li", function () {
  console.log($(this).text());
});
renderCity();
displayCurrentWeather()



// function renderCity() {
//   //empties text box
//   $("#city-list").empty();

//   for (var i = 0; i < cityStorage.length; i++) {
//     $("#city-list").append($("<li class = 'city-li'>")).text(cityStorage[i]);
//   }
//   console.log(cityStorage);
// }
// $("#find-city").on("click", function (event) {
//   //prevents from resetting page
//   event.preventDefault();
//   var cityForm = $("#city-input").val().trim();
//   cityStorage.push(cityForm);
//   localStorage.setItem("cities", JSON.stringify(cityStorage));
//   $("#city-input").val("");

//   renderCity();
//   displayCurrentWeather()
// });


// $("#find-city").on("click", function (event) {
//     event.preventDefault();
// var cityInput = $("city-input").val()
// cities.push(cityInput)

// })
