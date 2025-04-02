// Function to fetch weather data for a given city
async function getWeatherData(city) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      updateUI(data); // Update the current weather
      updateForecast(data.forecast); // Update the 5-day forecast
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  // Function to update the forecast section with the next 5 days
  function updateForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear any existing data
  
    const today = new Date(); // Get today's date
    let forecastDays = forecastData.daily.slice(1, 6); // Get the next 5 days (skip today)
  
    forecastDays.forEach((day, index) => {
      const forecastBox = document.createElement('div');
      forecastBox.classList.add('forecast-box');
  
      // Create a date object from the forecast data
      const forecastDate = new Date(day.timestamp * 1000);
      const weekday = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
  
      forecastBox.innerHTML = `
        <h3>${weekday}</h3>
        <div class="temperature">${Math.round(day.temperature)}°C</div>
        <div class="description">${day.weather.description}</div>
      `;
  
      forecastContainer.appendChild(forecastBox);
    });
  }
  
  // Event listener to search for a city
  document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('search-form-input').value;
    getWeatherData(city); // Fetch weather data when the form is submitted
  });
  