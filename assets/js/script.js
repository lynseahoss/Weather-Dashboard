
var apiKey = "&ae1dd4475c7b60eeeab3ef88607506d0"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" 
var citySearch = JSON.parse(localStorage.getItem("citySearch")) || [];        




//Functions
function displayWeather(){
    var weatherAttr = $(this).attr("data-name")
   var cityURL = queryURL + weatherAttr + apiKey

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response)
var wthrDiv = $("<section>")
wthrDiv.append($("<p>").text("City: " + response.city.name))

$(".weather-view").prepend(wthrDiv)
    })

}

$("#find-city").on("click", function (event) {
    event.preventDefault();


    
})