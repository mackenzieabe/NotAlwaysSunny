

var cityName = document.querySelector('.cityName')
var searchBtn = document.querySelector('.btn')
var temp = document.querySelector('.temp')
var fiveDayContainer = document.querySelector('.five-day-container')

var getCurrentWeather= function(city) {

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=37c2c3166abd1655f69f9cfd6a5c6b2b&units=imperial')
  .then(res => {
    return res.json()
  }).then(data => {
    console.log(data);

    cityName.textContent = data.name
    temp.textContent = data.main.temp + ' F'


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
      card.classList.add('card')
      fiveDayContainer.append(card)

      var day = document.createElement('h1')
      day.textContent = moment().add(i, 'days').format('dddd'); 
      card.append(day)

      var fiveTemp = document.createElement('p')
      fiveTemp.textContent = fiveDayData.daily[i].temp.day + ' F'
      card.append(fiveTemp)

    }

  })
}

searchBtn.addEventListener('click', function(e) {
  e.preventDefault()
   let city = document.getElementById('city-search').value
    console.log(city);
    getCurrentWeather(city)
})