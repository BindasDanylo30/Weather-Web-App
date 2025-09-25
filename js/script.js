const apiKey = "99156564c14c53925a38fe30f1823068";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const weatherIcon = document.querySelector(".weather_image i");

const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
// Function to fetch weather data
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    weather.style.display = "none";
    error.style.display = "block";
  }
  const data = await response.json();

  // Update DOM elements with fetched data
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  // Change weather icon based on weather condition
  // if (data.weather[0].main == "Clear") {
  //   weatherIcon.className = "fa-solid fa-sun";
  // } else if (data.weather[0].main == "Rain") {
  //   weatherIcon.className = "fa-solid fa-cloud-rain";
  // } else if ((data.weather[0].main = "Mist")) {
  //   weatherIcon.className = "fa-solid fa-cloud-mist";
  // } else if ((data.weather[0].main = "Drizzle")) {
  //   weatherIcon.className = "fa-solid fa-cloud-drizzle";
  // }
  // ...existing code...
  const list = {
    Clear: "fa-sun",
    Rain: "fa-cloud-rain",
    Mist: "fa-smog",
    Drizzle: "fa-cloud-drizzle",
  };
  const fa_icon = list[data.weather[0].main] || "fa-question";
  weatherIcon.className = `fa-solid ${fa_icon}`;

  weather.style.display = "block";
  error.style.display = "none";

  // ...existing code...
}
// Event listener for search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});
