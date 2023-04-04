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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes} ${ampm}`;
}
// function cityText(event) {
//   event.preventDefault();
//   let city = document.querySelector("#city-name");
//   let txt = document.querySelector("#input-text");
//   city.innerHTML = txt.value;
// }

function displayWeatherCondition(response) {
  // document.querySelector("#city").innerHTML = response.data.name;
  // document.querySelector("#temperature").innerHTML = Math.round(
  //   response.data.main.temp
  // );
  // document.querySelector("#temperature").innerHTML = Math.round(
  //   celsiusTemperature
  // ).innerHTML = Math.round(celsiusTemperature);

  // document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  // document.querySelector("#wind").innerHTML = Math.round(
  //   response.data.wind.speed
  // );
  // document.querySelector("#description").innerHTML =
  //   response.data.weather[0].main;
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

// let dateTime = document.querySelector("#time");
// let currentTime = new Date();
// dateTime.innerHTML = formatDate(currentTime);

// let time = document.querySelector("#date");
// let now = new Date();
// time.innerHTML = formatTime(now);

// let formValue = document.querySelector("#input-form");
// formValue.addEventListener("submit", cityText);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheit = document.querySelector("#fahrenheitPoints");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsiusPoints");
celsius.addEventListener("click", convertToCelsius);

searchCity("Islamabad");
