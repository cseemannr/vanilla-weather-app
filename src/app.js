import { apiKey } from "./key";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${apiKey}`;

function renderTemperature(res) {
  console.log(res.data);
}

axios.get(apiUrl).then(renderTemperature);
