var apiKey = "ae1dd4475c7b60eeeab3ef88607506d0";
var cities = [""];

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
    var date = new Date(response.dt*1000);
    var weatherImg = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    var wthrDiv = $("#present-city");

    
    // wthrDiv.html(`
    //     <h2>${response.name},(${currTime.getMonth()+1}/${date.getDate()}/${currTime.getFullYear()})<img src=${weatherImg} height="70px"></h2>
    //     <p>Temperature: ${response.main.temp}&#176;F</p>
    //     <p>Humidity: ${response.main.humidity}%</p>
    //     <p>Wind Speed: ${response.wind.speed} mph</p>
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
