var apiKey = "ae1dd4475c7b60eeeab3ef88607506d0";
var cities = [""];
var cityStorage = JSON.parse(localStorage.getItem("cities")) || [];
//////////
//Functions
/////////
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
    var weatherImg = $("<img>").attr("src","https://openweathermap.org/img/wn/"+response.list[e].weather[0].icon+"@2x.png");
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
//function to display cities under form 
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
  }
  displayCurrentWeather(cityStorage[cityStorage.length-1]);
}
//Displays renderCity() when clicked 
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
//function to create five-day forecast
function fiveDayForecast(cityData){
  var queryURL =
  "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" + cityData + "&units=imperial&appid=" + apiKey
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    //used for loop to choose a specific hour of day which will push out five items(days) rather than 40 items (every 3 hrs for next 5 days)
    for (var i = 0; i<= response.list.length; i++){
      if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
    var fiveDiv = $("#wthr-forecast")
    var weatherImg = $("<img>").attr("src","https://openweathermap.org/img/wn/"+ response.list[e].weather[0].icon +"@2x.png")
    var tempF = response.list[i].main.temp
    fiveDiv.append($("<li>").text("Temperature: " + tempF.toFixed(2)));
    fiveDiv.append($("<li>").text("Wind Speed: " + response.list[i].wind.speed));
    fiveDiv.append($("<li>").text("Humidity: " + response.list[i].main.humidity + "%"));
  }
  }
  })
}
//Displays displayWeather() when clicked 
$("#city-list").on("click", ".li-city", function() {
  displayCurrentWeather($(this).attr("data-city"))
});
renderCity();
console.log(fiveDayForecast("charlotte"))
