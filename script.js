document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const humidityDisplay = document.getElementById("humidity");
  const windSpeedDisplay = document.getElementById("wind-speed");

  const API_KEY = "4c5078d1942532bf67e2b02201894ff0";

  getWeatherBtn.addEventListener("click", async () => {
    let city = cityInput.value.trim();
    if (!city) return;

    // server might throw some error
    // server/databases are alaways in some other continent
    // fetching the data from the server
    try {
      let weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
    cityInput.value = "";
  });

  async function fetchWeatherData(city) {
    // gets data from the server
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("response:-", response);

    if (!response.ok) {
      throw new Error("City not found!");
    }
    const data = response.json();
    return data;
  }

  function displayWeatherData(data) {
    // display the data
    console.log(data);
    let { name, main, wind, weather } = data; // way of extracting the data fron the response
    cityNameDisplay.textContent = ` City: ${name}`;
    humidityDisplay.textContent = `Humidity: ${main.humidity}`;
    windSpeedDisplay.textContent = `Wind-Speed: ${wind.speed}`;
    temperatureDisplay.textContent = `Temperature: ${main.temp}`;
    descriptionDisplay.textContent = `description: ${weather[0].description}`;

    // unlock the display
    weatherInfo.classList.remove("hidden");
    weatherInfo.classList.add("highlight");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
