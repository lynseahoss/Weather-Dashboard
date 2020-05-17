var apiKey = "ae1dd4475c7b60eeeab3ef88607506d0";
var cities = [""];
var cityStorage = JSON.parse(localStorage.getItem("cities")) || [];
///////////
//Functions
///////////

//Displays City's Current Temp
function displayCurrentWeather(cityData) {
  $("#present-city").empty()
  //console.log(cityData);
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityData +
    "&units=imperial&appid=" +
    apiKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // console.log(response.name);
    //date variable
    var date = moment().format("l");
    //icon for weather info
    var weatherImg = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png"
    );
    var wthrDiv = $("<div id='wthrDiv'>");
    var tempF = response.main.temp;
    //console.log(weatherImg);
    var newH4 = $("<h4>").text(response.name + " (" + date + ") ");
    newH4.append(weatherImg);
    wthrDiv.append(newH4);
    wthrDiv.append($("<p>").text("Temperature: " + tempF.toFixed(2) + " F"));
    wthrDiv.append($("<p>").text("Wind Speed: " + response.wind.speed + " MPH"));
    wthrDiv.append($("<p>").text("Humidity: " + response.main.humidity + "%"));
    $("#present-city").prepend(wthrDiv);
    fiveDayForecast(cityData);
//get city cords for UV Index
var uvCords = [response.coord.lat, response.coord.lon]
uvIndex(uvCords)
  });
}

//UV Index function
function uvIndex (uvCords){
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=c9288340a0d00c00e02bf6e9f809e872&lat=" + uvCords[0] + "&lon=" + uvCords[1]
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    var uvText = response.value
    var uvBadge = $("<span>").addClass("badge").text(uvText)
    var uvCords = response.value 
    //appending UV index to wthrDiv in displayCurrentWeather function
    $("#wthrDiv").append("UV Index: ").append(uvBadge)
   // $("#wthrDiv").append(uvBadge)
    if (uvCords < 3){
      uvBadge.addClass("uv1")
    }
    else if (uvCords<5) {
      uvBadge.addClass("uv2")
    }
    else if (uvCords < 8){
      uvBadge.addClass("uv3")
    }
    else {
      uvBadge.addClass("uv4")
    }
})
}

//Displays City Name under Form/Input
function renderCity() {
  $("#city-list").empty();
  //console.log(cityStorage);
  if (cityStorage.length === 0) return;
  for (var i = 0; i < cityStorage.length; i++) {
    var newLi = $("<li>");
    newLi.addClass("li-city list-group-item");
    newLi.attr("data-city", cityStorage[i]);
    newLi.text(cityStorage[i]);
    $("#city-list").prepend(newLi);
  }
  displayCurrentWeather(cityStorage[cityStorage.length - 1]);
}

//Five Day Forecast Display
function fiveDayForecast(cityData) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" +
    cityData +
    "&units=imperial&appid=" +
    apiKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //console.log(response)
    $('#five-forecast').empty()
    var fiveH4 = $("<h4>").text("Forecast for the Next 5 days");
    $('#five-forecast').append(fiveH4);
    var fiveDiv = $("#wthr-forecast");
    fiveDiv.empty()
    for (var i = 0; i <= response.list.length -1; i++) {
      // console.log(response.list[i].dt_txt)
      var time = response.list[i].dt_txt
      //console.log(moment.unix(response.list[i].dt).format("l"))
      //console.log(time)
      if (time.includes("15:00:00")) {
        //console.log('made it here')
        var colSm = $("<div>").addClass("col-sm-2 bg-forecast text-light mx-1");
        var weatherImg = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/wn/" +
            response.list[i].weather[0].icon +
            "@2x.png"
        );
        var tempF = response.list[i].main.temp;
        var newDate = moment.unix(response.list[i].dt).format("l")
        colSm.append("<h5 class ='mx-5 mt-4'>"+newDate+"</h5>")
        colSm.append(weatherImg);
        colSm.append(
          $("<p>").text("Temperature: " + tempF.toFixed(2)+ " F")
        );
        colSm.append(
          $("<p>").text("Wind Speed: " + response.list[i].wind.speed + " MPH") 
        );
        colSm.append(
          $("<p>").text("Humidity: " + response.list[i].main.humidity + "%")
        );
        fiveDiv.append(colSm)
      }
    }
  });
}
/////////////////
//ON-Click Events
/////////////////

//Displays current weather & five day weather for city
$("#find-city").on("click", function(event) {
  $("city-input").empty();
  event.preventDefault();
  var cityForm = $("#city-input")
    .val()
    .trim();
  if (cityForm === "") return;
  cityStorage.push(cityForm);
  localStorage.setItem("cities", JSON.stringify(cityStorage));
  $("#city-input").val("");
  renderCity();
});
//Makes the City List (Render City) Clickable to show current temperature & five day temp
$("#city-list").on("click", ".li-city", function() {
  displayCurrentWeather($(this).attr("data-city"));
});
renderCity();
//console.log(fiveDayForecast("charlotte"))
