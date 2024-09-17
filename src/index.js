function updateData(response) {
  let heading = document.querySelector("#city");
  heading.innerHTML = response.data.city;

  let currentTemp = document.querySelector("#temp-values");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);

  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  let newHumidity = response.data.temperature.humidity;

  humidity.innerHTML = `${newHumidity}%`;

  let wind = document.querySelector("#wind");
  let newWind = response.data.wind.speed;

  wind.innerHTML = `${newWind}km/h`;

  let timeElement = document.querySelector("#time");
  let time = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(time);

  let iconElement = document.querySelector("#icon");
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Ottawa");
