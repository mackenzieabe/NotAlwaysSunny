

var cityName = document.querySelector('.cityName')
var searchBtn = document.querySelector('.btn')
var temp = document.querySelector('.temp')
var wind= document.querySelector('.wind')
var uvValue= document.querySelector('.uvi')
var uvBadge= document.querySelector('.badge')
//var image=document.querySelector('.image')
var currentContainer=document.querySelector('.current-container')
var fiveDayContainer = document.querySelector('.five-day-container')
//var weatherIconZero= document.querySelector('.weather-icon-zero')

var getCurrentWeather= function(city) {

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=37c2c3166abd1655f69f9cfd6a5c6b2b&units=imperial')
  .then(res => {
    return res.json()
  }).then(data => {
    console.log(data);

    var card=document.createElement('div')
    card.classList.add('card')
    currentContainer.append(card)

    cityName.textContent = data.name
   currentContainer.append(cityName)
    
    var time=document.createElement('h3')
    time.textContent=moment().add(10, 'days').calendar();
    currentContainer.append(time);

    temp.textContent = "Temp:  " + data.main.temp + ' F'
    currentContainer.append(temp)

    wind.textContent="Wind: " + data.wind.speed + " MPH"
    currentContainer.append (wind)

  


   var lat = data.coord.lat
    var lon = data.coord.lon
    getFiveDay(lat, lon)
  })
}

var getFiveDay = function (lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon='+ lon + '&appid=37c2c3166abd1655f69f9cfd6a5c6b2b&units=imperial')
  .then(res => {
    return res.json()
  })
  .then(fiveDayData => {
    console.log(fiveDayData);

    for (var i = 1; i < 6; i++) {
      var card = document.createElement('div')
      card.classList.add('five-day-container')
      fiveDayContainer.append(card)

      var day = document.createElement('h1')
      day.textContent = moment().add(i, 'days').format('dddd'); 
      card.append(day)

      var fiveTemp = document.createElement('p')
      fiveTemp.textContent = fiveDayData.daily[i].temp.day + ' F'
      card.append(fiveTemp)

     uvValue.textContent="UV Index: " + fiveDayData.current.uvi 
     currentContainer.append (uvValue)
    // if (uvValue < 2) {
    //    uvBadge.addClass("green");
    //  }
    //  else if (uvValue > 2 && uvIndex < 6) {
    //    uvBadge.addClass("yellow");
    //  }
     
     
     
     }
    });
    //   //Cannot figure out the icon--still working on it.
    // var icon=data.weather[0].icon
    // var iconUrlZero='https://openweathermap.org/img/wn/' + icon + '@2x.png'
    // weatherIconZero.setAttribute('src', iconUrlZero)
    // card.append(icon)
      
   

      
       
      
   

    }

  


searchBtn.addEventListener('click', function(e) {
  e.preventDefault()
   let city = document.getElementById('city-search').value
    getCurrentWeather(city)
localStorage.setItem('searchBtn',city)
    // var divElement=document.getElementById('searched-city')
    
}) 
// function showSavedCity() {
//   var data=localStorage.getItem('searchBtn');
//   var divElement= document.getElementsById('searched-city')
//   }
// showSavedCity();