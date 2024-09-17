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

  getForecast(response.data.city);
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

function getForecast(city) {
  let apiKey = "b532784o70betf374c9ae221b35afa9b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
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

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
 <div class="weather-forecast-details">
   <div class="weather-forecast-day">${formatDay(day.time)}</div>
   <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
   <div class="weather-forecast-temperatures">
     <div class="weather-forecast-temperature">
       <strong>${Math.round(day.temperature.maximum)}°</strong>
     </div>
     <div class="weather-forecast-temperature">${Math.round(
       day.temperature.minimum
     )}°</div>
   </div>
 </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Ottawa");
