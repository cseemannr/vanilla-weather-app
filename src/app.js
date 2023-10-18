let formCityEl = document.querySelector("#form-city");
let inputEl = document.querySelector("#text-input");
let clearButtonEl = document.querySelector("#form-clear");
let headingEl = document.querySelector("h1");
let dateTimeEl = document.querySelector("#date-time");
let fahrenheitEl = document.querySelector("#temperature-fahrenheit-link");
let celciusEl = document.querySelector("#temperature-celcius-link");
let temperatureEl = document.querySelector("#temperature");
let iconEl = document.querySelector("#icon");
let humidityEl = document.querySelector("#humidity");
let windyEl = document.querySelector("#windy");

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let currentDay = daysOfWeek[now.getDay()];
let currentHours = now.getHours();
let currentMinutes = now.getMinutes();
let currentTemp = 32;

function handleSubmit(event) {
  event.preventDefault();
  let city = inputEl.value;

  if (city) {
    let apiKey = "303adf0028cb2b7e4cf7863cb1943e4e";
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;
    axios.get(apiUrl).then(renderTemperature);
  }
}

function renderTemperature(res) {
  console.log(res.data);
}

function clearForm() {
  inputEl.value = ``;
}

clearButtonEl.addEventListener("click", clearForm);

formCityEl.addEventListener("submit", handleSubmit);
