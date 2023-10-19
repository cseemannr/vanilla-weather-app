let formCityEl = document.querySelector("#form-city");
let inputEl = document.querySelector("#text-input");
let conditionsEl = document.querySelector("#conditions");
let clearButtonEl = document.querySelector("#form-clear");
let headingEl = document.querySelector("h1");
let dateTimeEl = document.querySelector("#date-time");
let fahrenheitEl = document.querySelector("#temperature-fahrenheit-link");
let celciusEl = document.querySelector("#temperature-celcius-link");
let temperatureEl = document.querySelector("#temperature");
let maxTemperatureEl = document.querySelector("#temperature-max");
let minTemperatureEl = document.querySelector("#temperature-min");
let iconEl = document.querySelector("#icon");
let humidityEl = document.querySelector("#humidity");
let windyEl = document.querySelector("#windy");
let sunriseEl = document.querySelector("#sunrise");
let sunsetEl = document.querySelector("#sunset");
let rainEl = document.querySelector("#rain");
let snowEl = document.querySelector("#snow");

let apiKey = "303adf0028cb2b7e4cf7863cb1943e4e";

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentTemperature;
let maxTemperature;
let minTemperature;

axios
  .get(
    `https://api.openweathermap.org/data/2.5/weather?q=Florianopolis&APPID=${apiKey}&units=metric `
  )
  .then(renderTemperature);

function handleSubmit(event) {
  event.preventDefault();
  let city = inputEl.value;

  if (city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric `;
    axios.get(apiUrl).then(renderTemperature);
  }
}

function renderTemperature(res) {
  let date = res.data.dt;
  let sunrise = res.data.sys.sunrise;
  let sunset = res.data.sys.sunset;
  let rain = res.data.rain;
  let snow = res.data.snow;

  if (rain) {
    let key = Object.keys(rain);
    let value = rain[key];
    rainEl.innerHTML = `<p><img class="svg-icon" src="src/icons/rain.svg" alt="rain icon" />${value} mm / ${key}</p>`;
  } else {
    rainEl.innerHTML = null;
  }

  if (snow) {
    let key = Object.keys(snow);
    let value = snow[key];
    snowEl.innerHTML = `<p><img class="svg-icon" src="src/icons/snow.svg" alt="snow icon" />${value} mm / ${key}</p>`;
  } else {
    snowEl.innerHTML = null;
  }

  currentTemperature = res.data.main.temp;
  maxTemperature = res.data.main.temp_max;
  minTemperature = res.data.main.temp_min;

  headingEl.innerHTML = res.data.name;
  dateTimeEl.innerHTML = `${generateDay(date)}, ${generateTime(date)}`;
  sunriseEl.innerHTML = generateTime(sunrise);
  sunsetEl.innerHTML = generateTime(sunset);
  conditionsEl.innerHTML = res.data.weather[0].description;
  humidityEl.innerHTML = res.data.main.humidity;
  windyEl.innerHTML = res.data.wind.speed;
  iconEl.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@4x.png`
  );

  renderCelcius();
}

function generateTime(date) {
  now = new Date(date * 1000);
  currentHours = now.getHours();
  currentMinutes = now.getMinutes();

  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentHours}:${currentMinutes}`;
}

function generateDay(date) {
  now = new Date(date * 1000);
  currentDay = daysOfWeek[now.getDay()];
  return currentDay;
}

function clearForm() {
  inputEl.value = ``;
}

function celciusToFarenheit(celcius) {
  return Math.round((celcius * 9) / 5 + 32);
}

function renderCelcius() {
  celciusEl.classList.add("active");
  fahrenheitEl.classList.remove("active");
  temperatureEl.innerHTML = `
  ${Math.round(currentTemperature)}<span class="display-6 opacity-50">ºC</span>
  `;
  maxTemperatureEl.innerHTML = `${Math.round(maxTemperature)}ºC`;
  minTemperatureEl.innerHTML = `${Math.round(minTemperature)}ºC`;
}

function renderFarenheit() {
  fahrenheitEl.classList.add("active");
  celciusEl.classList.remove("active");
  temperatureEl.innerHTML = `
  ${celciusToFarenheit(
    currentTemperature
  )}<span class="display-6 opacity-50">ºF</span>
    `;
  maxTemperatureEl.innerHTML = `
  ${celciusToFarenheit(maxTemperature)}ºF
  `;
  minTemperatureEl.innerHTML = `
  ${celciusToFarenheit(minTemperature)}ºF
  `;
}

clearButtonEl.addEventListener("click", clearForm);

formCityEl.addEventListener("submit", handleSubmit);

celciusEl.addEventListener("click", renderCelcius);
fahrenheitEl.addEventListener("click", renderFarenheit);
