var apiKey = "ae1dd4475c7b60eeeab3ef88607506d0";
var cities = [""];
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" + cities + apiKey;
var cityStorage = JSON.parse(localStorage.getItem("cities")) || [];
var weatherImg = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
var date = new Date(response.dt*1000);

//Functions

//call current city weather API
function displayCurrentWeather() {
  var cityData = $(this).attr("data-city");
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=${apiKey}";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response.name);
    var wthrDiv = $("#present-city");
    wthrDiv.html(`
        <h2>${response.name}, ${response.sys.country} (${currTime.getMonth()+1}/${currTime.getDate()}/${currTime.getFullYear()})<img src=${weatherIcon} height="70px"></h2>
        <p>Temperature: ${response.main.temp}&#176;F</p>
        <p>Humidity: ${response.main.humidity}%</p>
        <p>Wind Speed: ${response.wind.speed} mph</p>
        `, uvIndex(response.coord))
       searchHistory(response.name);
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
