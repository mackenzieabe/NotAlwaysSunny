

var cityName = document.querySelector('.cityName')
var searchBtn = document.querySelector('.btn')
var temp = document.querySelector('.temp')
var wind = document.querySelector('.wind')
var uvValue = document.querySelector('.uvi')
var uvBadge = document.querySelector('.badge')
var currentContainer = document.querySelector('.current-container')
var fiveDayContainer = document.querySelector('.five-day-container')
var iconContainer = document.querySelector('.icon-container')
var historyEl = document.querySelector('.history')

var getCurrentWeather = function (city) {
  //fetching api from openweathermap for current day weather
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=37c2c3166abd1655f69f9cfd6a5c6b2b&units=imperial')
    .then(res => {
      return res.json()
    }).then(data => {
      console.log(data);
      iconContainer.textContent = ''

      cityName.textContent = data.name
      //using moment.js to set the date for my current weather container.
      var time = document.querySelector('.date')
      time.textContent = moment().add(10, 'days').calendar();
      //grabbing the icon from openweathermap and appending it to my current weather container.
      var icon = document.createElement('img')
      icon.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png')
      iconContainer.append(icon)

      temp.textContent = "Temp:  " + data.main.temp + ' F'

      wind.textContent = "Wind: " + data.wind.speed + " MPH"

      var lat = data.coord.lat
      var lon = data.coord.lon
      getFiveDay(lat, lon)
    })
}
//fetching api from openweathermap for 5 day weather
var getFiveDay = function (lat, lon) {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=37c2c3166abd1655f69f9cfd6a5c6b2b&units=imperial')
    .then(res => {
      return res.json()
    })
    .then(fiveDayData => {
      console.log(fiveDayData);
      fiveDayContainer.textContent = ''
      for (var i = 1; i < 6; i++) {
        var card = document.createElement('div')
        card.classList.add('card')
        fiveDayContainer.append(card)

        var day = document.createElement('h3')
        day.textContent = moment().add(i, 'days').format('dddd');
        card.append(day)

        var fiveDayIcon = document.createElement('img')
        fiveDayIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + fiveDayData.daily[i].weather[0].icon + '@2x.png')
        card.append(fiveDayIcon)

        var fiveTemp = document.createElement('p')
        fiveTemp.textContent = "Temp: " + fiveDayData.daily[i].temp.day + ' F'
        card.append(fiveTemp)

        uvValue.textContent = "UV Index: " + fiveDayData.current.uvi
        currentContainer.append(uvValue)

        if (fiveDayData.current.uvi <= 3) {
          uvValue.classList.add("green");
        }
        else if (fiveDayData.current.uvi > 3 && fiveDayData.current.uvi < 7) {
          uvValue.classList.remove("green");
          uvValue.classList.add("yellow");
        } else {
          uvValue.classList.remove("green");
          uvValue.classList.remove("yellow");
          uvValue.classList.add("red");
        }

        var fiveWind = document.createElement('p')
        fiveWind.textContent = "Wind: " + fiveDayData.daily[i].wind_speed + " MPH"
        card.append(fiveWind)

        var fiveHumidity = document.createElement('p')
        fiveHumidity.textContent = "Humidity: " + fiveDayData.current.humidity + " %"
        card.append(fiveHumidity)
      }
    });

}
//setting searched cities to local storage so that they appear in the search history container.
function saveHistory(value) {
  let storage = JSON.parse(localStorage.getItem('weatherHistory'))
  if (storage === null) {
    storage = []
  }
  storage.push(value)
  localStorage.setItem('weatherHistory', JSON.stringify(storage))
  getHistory()
}

getHistory()

function getHistory() {
  let storage = JSON.parse(localStorage.getItem('weatherHistory'))

  if (storage === null) {
    historyEl.textContent = 'No History'
  } else {
    historyEl.textContent = ''
    for (let i = 0; i < storage.length; i++) {
      let historyBtn = document.createElement('button')
      historyBtn.textContent = storage[i]
      historyEl.append(historyBtn)

      historyBtn.addEventListener('click', function (event) {
        let clicked = event.target.textContent
        getCurrentWeather(clicked)
      })
    }
  }
}

searchBtn.addEventListener('click', function (e) {
  e.preventDefault()
  let city = document.getElementById('city-search').value
  getCurrentWeather(city)
  saveHistory(city)
})

