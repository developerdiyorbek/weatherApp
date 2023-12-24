const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = "b9e9123c70c14269b6451611232412";
// get input
const input = document.querySelector(".input");
// get button
const btn = document.querySelector("#btn");

const weatherData = async (inputValue) => {
  const responce = await fetch(
    `${BASE_URL}current.json?key=${API_KEY}&q=${inputValue}`
  );
  if (responce.status === 400) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".information").style.display = "none";
  } else {
    const data = await responce.json();
    return data;
  }
};

btn.addEventListener("click", () => {
  // input value
  let inputValue = input.value;

  weatherData(inputValue).then((data) => {
    if (data) {
      // display
      document.querySelector(".information").style.display = "block";
      document.querySelector(".error").style.display = "none";

      // img
      const img = document.querySelector(".weatherImage");
      img.src = `${data.current.condition.icon}`;
      // temperature
      const temp = document.querySelector(".temp");
      temp.textContent = `${data.current.feelslike_c}°C`;
      // weather forecast
      const wForecast = document.querySelector(".data");
      wForecast.textContent = `${data.current.condition.text}`;
      // cityName
      const cityName = document.querySelector(".cityName");
      cityName.textContent = `${data.location.name}`;
      // humidity
      const humid = document.querySelector(".humid");
      humid.textContent = `${data.current.humidity}%`;
      // windSpeed
      const windSpeed = document.querySelector(".windSpeed");
      windSpeed.textContent = `${data.current.wind_kph} km/h`;
    }
  });
});
