function updateData(response) {
  let heading = document.querySelector("#city");
  let currentTemp = document.querySelector("#temp-values");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let newHumidity = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  let newWind = response.data.wind.speed;
  let timeElement = document.querySelector("#time");
  let time = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  heading.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${newHumidity}%`;
  wind.innerHTML = `${newWind}km/h`;
  timeElement.innerHTML = formatDate(time);
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="temp-icon"
    />`;
}

function searchCity(city) {
  let apiKey = "b532784o70betf374c9ae221b35afa9b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-bar-input");

  searchCity(userInput.value);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekDays[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
 <div class="weather-forecast-details">
   <div class="weather-forecast-day">${day}</div>
   <div class="weather-forecast-icon">☀️</div>
   <div class="weather-forecast-temperatures">
     <div class="weather-forecast-temperature">
       <strong>15°</strong>
     </div>
     <div class="weather-forecast-temperature">9°</div>
   </div>
 </div>`;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Ottawa");
displayForecast();
