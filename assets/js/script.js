
var apiKey = "&ae1dd4475c7b60eeeab3ef88607506d0"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" 
var cityStorage = JSON.parse(localStorage.getItem("citySearch")) || [];        
var cities = [""]



//Functions
// function displayWeather(){
//     var weatherAttr = $(this).attr("data-name")
//    var cityURL = queryURL + weatherAttr + apiKey

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//     }).then(function(response){
//         console.log(response)
// var wthrDiv = $("<section>")
// wthrDiv.append($("<p>").text("City: " + response.city.name))

// $(".weather-view").prepend(wthrDiv)
//     })

// }

function renderCity(){
    $("#city-view").empty
    for (var i = 0; i <cities.length; i++){
       $("#city-list").append($("<li class = 'city-li'>")).text(citySearch[i])
    }
}
$("form").on("submit", function(event){
    //prevents from resetting page
    event.preventDefault()
    var cityForm = $("#city").val().trim()
    localStorage.setItem("cityStorage", JSON.stringify(cityStorage))
    $("#city").val("")

    renderCity()

})

// $("#find-city").on("click", function (event) {
//     event.preventDefault();
// var cityInput = $("city-input").val()
// cities.push(cityInput)

// })