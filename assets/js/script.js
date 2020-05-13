var apiKey = "ae1dd4475c7b60eeeab3ef88607506d0";
var cities = [""];
var date = new Date(response.dt*1000);
var weatherImg = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
var cityStorage = JSON.parse(localStorage.getItem("cities")) || [];



//Functions

//call current city weather API
function displayCurrentWeather() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=ae1dd4475c7b60eeeab3ef88607506d0";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response.name);
    
    var wthrDiv = $("#present-city");
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    wthrDiv.html("<h1>"+response.name+ "</h1>")
    wthrDiv.html("<p> Temperature: " + tempF.toFixed(2) + "</p>")
    wthrDiv.html("<p> Wind Speed: " + response.wind.speed + "</p>")
    wthrDiv.html("<p> Humidity: " + response.main.humidity + "% </p>")

    // wthrDiv.html(`
    //     <h2>${response.name},(${date.getMonth()+1}/${date.getDate()}/${currTime.getFullYear()})<img src=${weatherImg} height="70px"></h2>
    //    
    //     `, uvIndex(response.coord))
    //    searchHistory(response.name);
  });
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

function renderCity() {
  //empties text box
  $("#city-list").empty();

  for (var i = 0; i < cityStorage.length; i++) {
    $("#city-list").append($("<li class = 'city-li'>")).text(cityStorage[i]);
  }
  console.log(cityStorage);
}
$("#find-city").on("click", function (event) {
  //prevents from resetting page
  event.preventDefault();
  var cityForm = $("#city-input").val().trim();
  cityStorage.push(cityForm);
  localStorage.setItem("cities", JSON.stringify(cityStorage));
  $("#city-input").val("");

  renderCity();
});

$(document).on("click", ".city-li", function () {
  console.log($(this).text());
});
renderCity();

// $("#find-city").on("click", function (event) {
//     event.preventDefault();
// var cityInput = $("city-input").val()
// cities.push(cityInput)

// })
