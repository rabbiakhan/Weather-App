function formatDate(date) {
  let year = date.getFullYear();
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
    "Dec",
  ];
  let month = months[date.getMonth()];
  let dte = date.getDate();

  return `${month} ${dte}th, ${year}`;
}
function formatTime(date) {
  let hours = now.getHours();
  hours = hours % 12;
  hours = hours ? hours : 12;
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let ampm = hours >= 12 ? "AM" : "PM";

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes} ${ampm}`;
}
// function cityText(event) {
//   event.preventDefault();
//   let city = document.querySelector("#city-name");
//   let txt = document.querySelector("#input-text");
//   city.innerHTML = txt.value;
// }

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 1) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// function displayFahrenheitTemperature(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");

//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
//   temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
// }

// function displayCelsiusTemperature(event) {
//   event.preventDefault();
//   celsiusLink.classList.add("active");
//   fahrenheitLink.classList.remove("active");
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = Math.round(celsiusTemperature);
// }

// let celsiusTemperature = null;

let dateTime = document.querySelector("#time");
let currentTime = new Date();
dateTime.innerHTML = formatDate(currentTime);

let time = document.querySelector("#date");
let now = new Date();
time.innerHTML = formatTime(now);

// let formValue = document.querySelector("#input-form");
// formValue.addEventListener("submit", cityText);

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Islamabad");
