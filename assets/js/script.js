
var apiKey = "&ae1dd4475c7b60eeeab3ef88607506d0"
var cities = $("#city-input")
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities+ apiKey
var cityStorage = JSON.parse(localStorage.getItem("citySearch")) || [];        
var cities = $("#city-input")



//Functions
function displayWeather(){
    
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response)
        console.log(response.name)
var wthrDiv = $("#present-city")
wthrDiv.append($("<p>").text("City: " + response.city.name))

$(".weather-view").prepend(wthrDiv)
    })

}

// function displayCity(){
//     $("#city-view").empty()
//     for (var i = 0; i <cities.length; i++){
//        $("#city-list").append($("<p class = 'city-li'>")).text(cityStorage[i])
//     }
//     console.log(renderCity)
// }
// $("form").on("submit", function(event){
//     //prevents from resetting page
//     event.preventDefault()
//     var cityForm = $("#city").val()
//     cityStorage.push(cityForm)
//     localStorage.setItem("cityStorage", JSON.stringify(cityStorage))
//     $("#city").val("")

//     displayCity()

// })

// $(document).on("click", ".city", function(){
//     console.log($(this).text())
// })
// displayCity()

// $("#find-city").on("click", function (event) {
//     event.preventDefault();
// var cityInput = $("city-input").val()
// cities.push(cityInput)

// })