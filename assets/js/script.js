var apiKey = "ae1dd4475c7b60eeeab3ef88607506d0";
var cities = [""];

var cityStorage = JSON.parse(localStorage.getItem("cities")) || [];

//Functions

//

//call current city weather API
function displayCurrentWeather(cityData) {
$("#present-city").empty()
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityData +
    "&units=imperial&APPID=" + apiKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
   // console.log(response.name);
    //date variable
    var date = moment().format("l");  
    //icon for weather info
    var weatherImg = $("<img>").attr("src","https://openweathermap.org/img/wn/"+"03d"+"@2x.png");
    var wthrDiv = $("<div>");
    var tempF = response.main.temp;
    console.log(weatherImg)
    
    var newH4 =  $("<h4>").text(response.name+" ("+date+") ")
    newH4.append(weatherImg)

    wthrDiv.append(newH4)
    wthrDiv.append($("<p>").text("Temperature: " + tempF.toFixed(2)));
    wthrDiv.append($("<p>").text("Wind Speed: " + response.wind.speed));
    wthrDiv.append($("<p>").text("Humidity: " + response.main.humidity + "%"));
    $("#present-city").prepend(wthrDiv);
    fiveDayForecast(cityData)
  });
}

function renderCity() {
  $("#city-list").empty();
  console.log(cityStorage)
  if (cityStorage.length === 0) return;
  for (var i = 0; i < cityStorage.length; i++) {
    var newLi= $("<li>");
    newLi.addClass("li-city list-group-item");
    newLi.attr("data-city", cityStorage[i]);
    newLi.text(cityStorage[i]);
    $("#city-list").prepend(newLi);

    //$("#city-list").append($("<li class = 'city-li'>")).text(cityStorage[i])
  }
  displayCurrentWeather(cityStorage[cityStorage.length-1]);
}

$("#find-city").on("click", function(event) {
  //   //prevents from resetting page
  event.preventDefault();
  var cityForm = $("#city-input")
    .val()
    .trim();
  cityStorage.push(cityForm);
  localStorage.setItem("cities", JSON.stringify(cityStorage));
  $("#city-input").val("");
  renderCity()
});


function fiveDayForecast(cityData){
  var queryURL =
  "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" + cityData + "&units=imperial&appid=" + apiKey
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    for (var i = 5; i<= response.list.length; i++){
      if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

      }
     var fiveH4 = $("<h4>").text("Forecast for the Next 5 days")
     

    var fiveDiv = $("#wthr-forecast")
    var weatherImg = $("<img>").attr("src","https://openweathermap.org/img/wn/"+"03d"+"@2x.png")
    var tempF = response.list[i].main.temp
    fiveDiv.append(fiveH4)
    fiveDiv.append(weatherImg)
    fiveDiv.append($("<li>").text("Temperature: " + tempF.toFixed(2)));
    fiveDiv.append($("<li>").text("Wind Speed: " + response.list[i].wind.speed));
    fiveDiv.append($("<li>").text("Humidity: " + response.list[i].main.humidity + "%"));
    }
  })

}



$("#city-list").on("click", ".li-city", function() {
  displayCurrentWeather($(this).attr("data-city"))
});
renderCity();
console.log(fiveDayForecast("charlotte"))



