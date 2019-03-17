// This file is in the entry point in your webpack config.
import './styles.scss';


const forecastBox = document.getElementById('forecast-box');
const locationInput = document.getElementById('location');
const currentTemp = document.getElementById('current-temp');
const currentCity = document.getElementById('current-city');
const currentSummary = document.getElementById('current-summary');
const currentWeather = document.getElementById('current');
const detailWeather = document.getElementById('detail');
const detailHumidity = document.getElementById('detail-humidity');
const detailSummary = document.getElementById('detail-description');
const dailyWeather = document.getElementById('daily');
const dailyDate = document.getElementById('daily-date');
const dailyHigh = document.getElementById('daily-high');
const dailyLow = document.getElementById('daily-low');
const dailyPrecip = document.getElementById('daily-precip');
const apiKey = 'irXCIrdQUUSKmAzH93mfOw==';
const signupBox = document.getElementById('signup-box');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const gifImg = document.getElementById('weather-gif');

function makePrecip(number) {
  var string = JSON.stringify(number);
  var precip = parseFloat(string);
  var chance = Math.floor(precip * 100);
  return chance;
};

function getGif(location) {
  var gif_url = `https://sweaterweatherapi.herokuapp.com/api/v1/gifs?location=${location}&api_key=${apiKey}`;

  $.getJSON(gif_url, function(response) {
    var gif = response["data"]["attributes"]["images"][0]["url"];
    gifImg.src = gif;
  });
  event.preventDefault();
};

function getForecast(city) {
  // var gifString = JSON.stringify(gifData["data"]["attributes"]["images"][0]["url"]);
  var api_url = `https://sweaterweatherapi.herokuapp.com/api/v1/forecast?location=${city}`;

  $.getJSON(api_url, function(response) {
    currentWeather.style.display = 'block';
    detailWeather.style.display = 'block';
    dailyWeather.style.display = 'block';
    var city = response["data"]["attributes"]["currently"]["timezone"];
    currentTemp.textContent = `Temperature: ${response["data"]["attributes"]["currently"]["temperature"]} degrees`;
    currentCity.textContent = city;
    currentSummary.textContent = "Currently: " + response["data"]["attributes"]["currently"]["summary"];
    detailHumidity.textContent = `Humidity: ${response["data"]["attributes"]["currently"]["humidity"]}`;
    detailSummary.textContent = "Details: " + response["data"]["attributes"]["daily"]["summary"];
    var dailies = response["data"]["attributes"]["daily"]["data"];
    var i;
    for (i = 0; i < dailies.length; i++) {
      var newDiv = document.createElement('div');
      dailyWeather.appendChild(newDiv);
      var newP1 = document.createElement('p');
      newDiv.appendChild(newP1);
      var newP2 = document.createElement('p');
      newDiv.appendChild(newP2);
      var newP3 = document.createElement('p');
      newDiv.appendChild(newP3);
      var newP4 = document.createElement('p');
      newDiv.appendChild(newP4);
      newDiv.class = 'dailies';
      newP1.class = 'daily-date';
      newP2.class = 'daily-high';
      newP3.class = 'daily-low';
      newP4.class = 'daily-precip';
      var newDate = new Date(dailies[i]["time"] * 1000);
      var stringDate = JSON.stringify(newDate);
      var shortDate = stringDate.slice(1, 11);
      newP1.textContent = shortDate;
      newP2.textContent = "High:" + dailies[i]["temperatureHigh"];
      newP3.textContent = "Low: " + dailies[i]["temperatureLow"];
      newP4.textContent = "Precip: " + makePrecip(dailies[i]["precipProbability"]) + "%";
    };

  });
};

function getLocation() {
  var location = locationInput.value;
  getGif(location);
  getForecast(location);
  event.preventDefault();
};

// function getRegistered(userEmail, pass1, pass2) {
//   var login_url = `https://sweaterweatherapi.herokuapp.com/api/v1/users?email=${userEmail}&password=${pass1}&password_confirmation=${pass2}`;
//   alert("hi");
//   $.getJSON(login_url, function(response) {
//     alert("hello");
//     console.log(response);
//   });
//   event.preventDefault();
// };

// function register() {
//   var e = email.value;
//   var p1 = password1.value;
//   var p2 = password.value;
//   getRegistered(e, p1, p2);
//   event.preventDefault();
// };

function hideForecast() {
  forecastBox.style.display = 'none';
};

function showSignup() {
  hideForecast();
  signupBox.style.display = 'block';
};


$('#submit-forecast').click(getLocation);
$('#signup').click(showSignup);
// $('#submit-signup').click(register);
