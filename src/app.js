let apiKey = "303adf0028cb2b7e4cf7863cb1943e4e";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${apiKey}`;

function renderTemperature(res) {
  console.log(res.data);
}

axios.get(apiUrl).then(renderTemperature);
