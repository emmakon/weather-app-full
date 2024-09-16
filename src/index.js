function updateCity(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-bar-input");
  userInput = userInput.value;

  let heading = document.querySelector("h1");
  heading.innerHTML = userInput;
}

let searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", updateCity);
