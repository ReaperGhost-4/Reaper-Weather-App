function getCurrentDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function getCurrentDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="weather-forecast-date">${getCurrentDay(forecastDay.dt)}</div>
    <img
      src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      width="42"
    />
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}°</span>
      <span class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temp.min
      )}°</span>
    </div>
  </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descElement = document.querySelector("#description");
  let humElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descElement.innerHTML = response.data.weather[0].description;
  humElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = getCurrentDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

search("Pretoria");
