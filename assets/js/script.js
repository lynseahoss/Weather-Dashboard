
var apiKey = "&ae1dd4475c7b60eeeab3ef88607506d0"
var cities = [""]
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities+ apiKey
var cityStorage = JSON.parse(localStorage.getItem("citySearch")) || [];        




//Functions
// function displayWeather(){
//     var cityData =$(this).attr("data-city")
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityData + "&apikey=ae1dd4475c7b60eeeab3ef88607506d0"
//     $.ajax({
//         url: queryURL,
//         method: "GET",
//     }).then(function(response){
//         console.log(response)
//         console.log(response.name)
// var wthrDiv = $("#present-city")
// wthrDiv.append($("<p>").text("City: " + response.city.name))

// $(".weather-view").prepend(wthrDiv)
//     })

// }

function renderCity(){
    //empties text box
    $("#city-list").empty()

    for (var i = 0; i <cities.length; i++){
       $("#city-list").append($("<li class = 'city-li list-group-item'>")).text(cityStorage[i])
    }
    console.log(cityStorage)
}
$("#find-city").on("click", function(event){
    //prevents from resetting page
    event.preventDefault()
    var cityForm = $("#city-input").val().trim()
    cityStorage.push(cityForm)
    localStorage.setItem("cityStorage", JSON.stringify(cityStorage))
    $("#city-input").val("")

    renderCity()

})

$(document).on("click", ".city-li", function(){
    console.log($(this).text())
})
renderCity()

// $("#find-city").on("click", function (event) {
//     event.preventDefault();
// var cityInput = $("city-input").val()
// cities.push(cityInput)

// })