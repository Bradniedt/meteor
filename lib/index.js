// This file is in the entry point in your webpack config.
import './styles.scss';


const body = document.getElementById('the-body');
const forecastBox = document.getElementById('forecast-box');
const locationInput = document.getElementById('location');
const currentTemp = document.getElementById('current-temp');
const currentCity = document.getElementById('current-city');
const currentSummary = document.getElementById('current-summary');
const currentWeather = document.getElementById('current');
const currentHumidity = document.getElementById('detail-humidity');
const currentLongSummary = document.getElementById('detail-description');
const dailyWeather = document.getElementById('daily');
const dailyTable = document.getElementById('daily-table');
const dailyDate = document.getElementById('daily-date');
const dailyHigh = document.getElementById('daily-high');
const dailyLow = document.getElementById('daily-low');
const dailyPrecip = document.getElementById('daily-precip');
const apiKey = 'irXCIrdQUUSKmAzH93mfOw==';
const signupBox = document.getElementById('signup-box');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const gif = document.getElementById('gif');
const gifHeader = document.getElementById('gif-header');

function makePrecip(number) {
  var string = JSON.stringify(number);
  var precip = parseFloat(string);
  var chance = Math.floor(precip * 100);
  return chance;
};


function getGif(location) {
  var gif_url = `https://sweaterweatherapi.herokuapp.com/api/v1/gifs?location=${location}&api_key=${apiKey}`;

  $.getJSON(gif_url, function(response) {
    var gifUrl = response["data"]["attributes"]["images"][0]["url"];
    gif.style.backgroundImage = `url(${gifUrl})`;
    gif.style.backgroundSize = "cover";
    gif.style.backgroundRepeat = "no-repeat";
    gif.style.position = "50% 50%";
  });
  event.preventDefault();
};

function getBackground(place) {
  var photo_url = `https://sweaterweatherapi.herokuapp.com/api/v1/backgrounds?location=${place}`;

  $.getJSON(photo_url, function(response) {
    var photo = response["data"]["attributes"]["url"];
    body.style.backgroundImage = `url(${photo})`;
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.position = "50% 50%";
  });
  event.preventDefault();
};

function getForecast(city) {
  // var gifString = JSON.stringify(gifData["data"]["attributes"]["images"][0]["url"]);
  var api_url = `https://sweaterweatherapi.herokuapp.com/api/v1/forecast?location=${city}`;

  $.getJSON(api_url, function(response) {
    currentWeather.style.display = 'block';
    dailyWeather.style.display = 'block';
    gif.style.display = 'block';
    gifHeader.style.display = 'block';
    currentCity.textContent = response["data"]["attributes"]["timezone"];
    currentTemp.textContent = `Temperature: ${response["data"]["attributes"]["currently"]["temperature"]} degrees`;
    currentSummary.textContent = "Currently: " + response["data"]["attributes"]["currently"]["summary"];
    currentHumidity.textContent = `Humidity: ${response["data"]["attributes"]["currently"]["humidity"]}`;
    currentLongSummary.textContent = "Details: " + response["data"]["attributes"]["daily"]["summary"];
    var dailies = response["data"]["attributes"]["daily"]["data"];
    var i;
    for (i = 0; i < dailies.length; i++) {
      var newTd1 = document.getElementById(`day${i}`);
      var newTd2 = document.getElementById(`high${i}`);
      var newTd3 = document.getElementById(`low${i}`);
      var newTd4 = document.getElementById(`precip${i}`);
      var newDate = new Date(dailies[i]["time"] * 1000);
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var displayDay = days[newDate.getDay()];
      newTd1.textContent = displayDay;
      newTd2.textContent = dailies[i]["temperatureHigh"];
      newTd3.textContent = dailies[i]["temperatureLow"];
      newTd4.textContent = makePrecip(dailies[i]["precipProbability"]) + "%";
    };

  });
};

function getLocation() {
  var location = locationInput.value;
  getGif(location);
  getBackground(location);
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
