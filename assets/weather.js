//  current forecast endpoint - https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 5day endpoint - https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}

const API_KEY = '1061cabb90305abccae90d57ba69481e'
const searchBtn = document.querySelector('.searchButton')

searchBtn.addEventListener('click', function() {
    let city = document.getElementById('city').value
    console.log(city);
    getCurrent(city)
})

function getCurrent(value) {
   fetch('https://api.openweathermap.org/data/2.5/weather?q=' + value + '&appid=' + API_KEY + 'units=imperial')
   .then( function (res) {
    return res.json()
  }).then(function(data) {
      console.log(data);

      

      let lat = data.coord.lat;
      let lon = data.coord.lon;
      getFiveDay(lat, lon)
  })
}

function getFiveDay(lat, lon) {

}