function updateCity(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-bar-input");
  userInput = userInput.value;

  let heading = document.querySelector("h1");
  heading.innerHTML = userInput;
}

function displayDate(date) {
  let todayDate = document.querySelector("#date-details");
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
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

  todayDate.innerHTML = `${day} ${hour}:${minutes}`;
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateCity);

let currentDate = new Date();
displayDate(currentDate);
