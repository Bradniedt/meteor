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
const apiKey = '';
const signupBox = document.getElementById('signup-box');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');

function changeDate(date) {

};

function getForecast(city) {
  var api_url = `https://sweaterweatherapi.herokuapp.com/api/v1/forecast?location=${city}`;

  $.getJSON(api_url, function(response) {
    currentWeather.style.display = 'block';
    detailWeather.style.display = 'block';
    dailyWeather.style.display = 'block';
    var city = response["data"]["attributes"]["currently"]["timezone"];
    currentTemp.textContent = `Temperature: ${response["data"]["attributes"]["currently"]["temperature"]}`;
    currentCity.textContent = city;
    currentSummary.textContent = response["data"]["attributes"]["currently"]["summary"];
    detailHumidity.textContent = `Humidity: ${response["data"]["attributes"]["currently"]["humidity"]}`;
    detailSummary.textContent = response["data"]["attributes"]["daily"]["summary"];
    var dailies = response["data"]["attributes"]["daily"]["data"];
    var i;
    for (i = 0; i < dailies.length; i++) {
      var newP1 = document.createElement('p');
      dailyWeather.appendChild(newP1);
      var newP2 = document.createElement('p');
      dailyWeather.appendChild(newP2);
      var newP3 = document.createElement('p');
      dailyWeather.appendChild(newP3);
      var newP4 = document.createElement('p');
      dailyWeather.appendChild(newP4);
      newP1.class = 'daily-date';
      newP2.class = 'daily-high';
      newP3.class = 'daily-low';
      newP4.class = 'daily-precip';
      newP1.textContent = new Date(dailies[i]["time"]);
      newP2.textContent = "High:" + dailies[i]["temperatureHigh"];
      newP3.textContent = "Low: " + dailies[i]["temperatureLow"];
      newP4.textContent = "Precip: " + dailies[i]["precipProbability"];
    };

  });
};

function getLocation() {
  var location = locationInput.value;
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

function getGif(location) {

};

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
