let dateElement = document.querySelector("#date");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesay",
  "Thursay",
  "Friday",
  "Saturday",
];
dateElement.innerHTML = `${days[dayIndex]} ${hours}:${minutes}`;

function showTempreture(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

let iconElement = document.querySelector("#icon");

document.querySelector("#description").innerHTML =
response.data.weather[0].main;
document.querySelector("#humidity").innerHTML = 
response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(
response.data.wind.speed);
document.querySelector("#sunrise").innerHTML =
response.data.sys.sunrise;
document.querySelector("#sunset").innerHTML =
response.data.sys.sunset * 1000;
document.querySelector("#icon");
iconElement.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);

}

function search(city) {
  let apiKey = "a654db2f9bd0b0e600c5ab56e23dc457";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempreture);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("New York");

function searchLocation(position){
  let apiKey = "a654db2f9bd0b0e600c5ab56e23dc457";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTempreture);
}

function getCurrentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation)
}
let currentLocationButton = document.querySelector 
("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


/// function showTempreture(response) {
/// let tempreture = Math.round(response.data.main.temp);
///let city = response.data.name;
/// let temp = `${tempreture}°C`;
/// let h1 = document.querySelector("h1");
/// let h2 = document.querySelector("h2");
/// h1.innerHTML = temp;
///h2.innerHTML = city;
///}
///let apiKey = "a654db2f9bd0b0e600c5ab56e23dc457";
///let cityName = "sydney";
///let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

///axios.get(apiUrl).then(showTempreture);
