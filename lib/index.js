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
const apiKey = '';
const signupBox = document.getElementById('signup-box');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');



function getForecast(city) {
  var api_url = `https://sweaterweatherapi.herokuapp.com/api/v1/forecast?location=${city}`;

  $.getJSON(api_url, function(response) {
    currentWeather.style.display = 'block';
    detailWeather.style.display = 'block';
    var city = response["data"]["attributes"]["currently"]["timezone"];
    currentTemp.textContent = `Temperature: ${response["data"]["attributes"]["currently"]["temperature"]}`;
    currentCity.textContent = city;
    currentSummary.textContent = response["data"]["attributes"]["currently"]["summary"];
    detailHumidity.textContent = `Humidity: ${response["data"]["attributes"]["currently"]["humidity"]}`;
    detailSummary.textContent = response["data"]["attributes"]["daily"]["summary"];
  });
};

function getLocation() {
  var location = locationInput.value;
  getForecast(location);
  event.preventDefault();
};

function getRegistered(userEmail, pass1, pass2) {
  var login_url = `https://sweaterweatherapi.herokuapp.com/api/v1/users?email=${userEmail}&password=${pass1}&password_confirmation=${pass2}`;
  alert("hi");
  $.getJSON(login_url, function(response) {
    alert("hello");
    console.log(response);
  });
  event.preventDefault();
};

function register() {
  var e = email.value;
  var p1 = password1.value;
  var p2 = password.value;
  getRegistered(e, p1, p2);
  event.preventDefault();
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
$('#submit-signup').click(register);
