let now = new Date();
let h4 = document.querySelector("h4");

      let date = now.getDate();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let year = now.getFullYear();

      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let day = days[now.getDay()];

      let months = [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let month = months[now.getMonth()];

      h4.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

//------------------forecast----------------------
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index){
    if (index < 6) {
  forecastHTML = forecastHTML + `
<div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
          alt=""
          width="54" 
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°
            </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°
            </span>
          </div>
          </div>
  `;
    }
})
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;        
}      


//------------Search Function------------------------

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "698f71764fbe057badaa47bba3e429f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = `${temperature}`;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
      );

  

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
iconElement.setAttribute(
  "alt", response.data.weather[0].main);

getForecast(response.data.coord)

}

function searchCity(city) {
  let apiKey = "698f71764fbe057badaa47bba3e429f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "698f71764fbe057badaa47bba3e429f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");


//------------Farenheit Conversion------------------------

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#temperature-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

//------------------Celsius Coversion----------------------

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#temperature-celsius");
celsiusLink.addEventListener("click", showCelsius);


