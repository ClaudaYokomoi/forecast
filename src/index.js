function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");
  
    // Update the city and weather details
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`; // Fixed the template literal
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`; // Fixed the template literal
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`; // Fixed the template literal
  
    // Format and display the time
    let date = new Date(response.data.time * 1000);
    timeElement.innerHTML = formatDate(date);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];
    let day = days[date.getDay()];
  
    if (minutes < 10) {
      minutes = `0${minutes}`; // Fixed template literal for minutes
    }
  
    return `${day} ${hours}:${minutes}`; // Fixed template literal for returning formatted time
  }
  
  function searchCity(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433"; 
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`; // Fixed URL with template literal
  
    axios.get(apiUrl)
      .then((response) => {
        refreshWeather(response);
      })
      .catch((error) => {
        alert("Could not retrieve weather data. Please try another city.");
      });
  }
  
  function handleSearchSubmit(event) {
    event.preventDefault(); 
    let searchInput = document.querySelector("#search-form-input");
  
    // Clear existing data before searching for a new city
    document.querySelector("#city").innerHTML = "";
    document.querySelector("#temperature").innerHTML = "";
    document.querySelector("#description").innerHTML = "";
    document.querySelector("#humidity").innerHTML = "";
    document.querySelector("#wind-speed").innerHTML = "";
    document.querySelector("#time").innerHTML = "";
    document.querySelector("#icon").innerHTML = "";
  
    // Search for the new city entered by the user
    searchCity(searchInput.value);
  }
  
  // Adding event listener to the search form
  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);
  
  // Default city to show weather info initially
  searchCity("Paris");
  