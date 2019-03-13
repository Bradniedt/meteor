// This file is in the entry point in your webpack config.
import './styles.scss';

const locationInput = document.getElementById('location');


function getLocation() {
  var location = locationInput.value;
  getForecast(location);
};


function getForecast(city) {
  var api_url = `https://sweaterweatherapi.herokuapp.com/api/v1/forecast?location=${city}`;

  $.getJSON(api_url, function(response) {
    $('current-temp').textContent = response["data"]["attributes"]["currently"]["temperature"];
    $('current-city').textContent = response["data"]["attributes"]["timezone"];
    $('current-summary').textContent = response["data"]["attributes"]["currently"]["summary"];
  });
});

$('#submit-forecast').click(getLocation);
