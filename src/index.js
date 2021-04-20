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

function formatDay(timestamp){
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon","Tue","Wed","Thu","Fri", "Sat"];
  return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily; 
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML=`<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index <6){ 

  forecastHTML= forecastHTML + `

           <div class="col-2"> 
             <div class = "weather-forcast-day">
               ${formatDay(forecastDay.dt)}
              </div>
             <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" class="forcast-img" />
            <div class="weather-forcast-temp">
              <span class="weather-forcast-temp-max"> ${Math.round(forecastDay.temp.max)}°|</span><span class="weather-forcast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
             </div>
             </div>
              `; 
              }
              })         

  forecast = forecastHTML + `</div`;            
  forecastElement.innerHTML = forecastHTML;            
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "a654db2f9bd0b0e600c5ab56e23dc457";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTempreture(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let iconElement = document.querySelector("#icon");
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sunrise").innerHTML = formatHours(
    response.data.sys.sunrise
  );
  document.querySelector("#sunset").innerHTML = formatHours(
    response.data.sys.sunset
  );
  document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function formatHours(timestamp) {
  let time = new Date(timestamp * 1000);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "a654db2f9bd0b0e600c5ab56e23dc457";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempreture);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("London");


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
