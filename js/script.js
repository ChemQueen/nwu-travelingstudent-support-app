// script.js: shared by all four pages. Currently handles the Your Trip form on the Home page;
// code for the weather request and other pages will be added below.
const form = document.getElementById("travel-form");

// The form exists only on the Home page, so the if check skips this block on other pages
// (getElementById returns null there). When the form is submitted with all required
// fields filled, preventDefault stops the page reload so the values can be saved instead.
if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    // Input values identified by id are assigned 
    // and saved in localStorage using names then read by other pages using the key.
    const tripName = document.getElementById("trip-name").value;
    const destination = document.getElementById("destination").value;
    const departDate = document.getElementById("depart-date").value;
    const returnDate = document.getElementById("return-date").value;
    const eventDate = document.getElementById("event-date").value;
    console.log(tripName, destination, departDate, returnDate, eventDate);
    localStorage.setItem("tripName", tripName);
    localStorage.setItem("destination", destination);
    localStorage.setItem("departDate", departDate);
    localStorage.setItem("returnDate", returnDate);
    localStorage.setItem("eventDate", eventDate);
    document.getElementById("confirmation-message").textContent = "Trip saved!"
  })
};

async function getForecast() {
  const urlLocation = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(chosenLocation) + "&count=1&language=en&format=json"
  console.log(urlLocation)

  const response1 = await fetch(urlLocation);
  const data1 = await response1.json();
  const locationLatitude = data1.results[0].latitude;
  const locationLongitude = data1.results[0].longitude;
  const timeZone = data1.results[0].timezone;
  console.log(locationLatitude);
  console.log(locationLongitude);
  console.log(timeZone);
  
  const urlWeather = "https://api.open-meteo.com/v1/forecast?latitude="+ locationLatitude + "&longitude=" + locationLongitude + "&hourly=temperature_2m,precipitation_probability,precipitation,weather_code&timezone=" + timeZone + "&temperature_unit=fahrenheit&start_date=" + chosenDate + "&end_date=" + chosenDate
  console.log(urlWeather);
  // Requests hourly temperatures from the Open-Meteo forecast API (no key needed).
  // The URL sets the location, Fahrenheit units, and the timezone so the hours 
  // match local time instead of GMT.
  // The date comes from localStorage. await pauses until the response arrives.
  const response2 = await fetch(urlWeather);
  const data2 = await response2.json();
  console.log(data2.hourly);
  // hourly.temperature_2m holds one value per hour starting at midnight local time,
  // so the index is the hour of the day: 10 = 10 a.m., 14 = 2 p.m., 18 = 6 p.m.
  const amForecastTemp = data2.hourly.temperature_2m[10];
  const amPrecipProb = data2.hourly.precipitation_probability[10];
  // const amPrecip = data2.hourly.precipitation[10];
  const amWeather = data2.hourly.weather_code[10];
  const midForecastTemp = data2.hourly.temperature_2m[14];
  const midPrecipProb = data2.hourly.precipitation_probability[14];
  // const midPrecip = data2.hourly.precipitation[14];
  const midWeather = data2.hourly.weather_code[14];
  const pmForecastTemp = data2.hourly.temperature_2m[18];
  const pmPrecipProb = data2.hourly.precipitation_probability[18];
  // const pmPrecip = data2.hourly.precipitation[18];
  const pmWeather = data2.hourly.weather_code[18];
  console.log(amForecastTemp, amPrecipProb, amWeather);
  console.log(midForecastTemp, midPrecipProb, midWeather);
  console.log(pmForecastTemp, pmPrecipProb, pmWeather);

  // Update the DOM with the location, date, forecast.
  amTemp.textContent = "Temperature: " + amForecastTemp + " °F";
  amForecast.textContent = "Forecast: " + weather_code[amWeather] + " with " + amPrecipProb + "% chance of precipitation.";
  midTemp.textContent = "Temperature: " + midForecastTemp + " °F" 
  midForecast.textContent = "Forecast: " + weather_code[midWeather] + " with " + midPrecipProb + "% chance of precipitation."; 
  pmTemp.textContent = "Temperature: " + pmForecastTemp + " °F";
  pmForecast.textContent = "Forecast: " + weather_code[pmWeather] + " with " + pmPrecipProb + "% chance of precipitation."; 
}

const chosenDate = localStorage.getItem("eventDate");
const chosenLocation = localStorage.getItem("destination");
const amTemp = document.getElementById("morning-temp");
const amForecast = document.getElementById("morning-forecast");
const midTemp = document.getElementById("afternoon-temp");
const midForecast = document.getElementById("afternoon-forecast");
const pmTemp = document.getElementById("evening-temp");
const pmForecast = document.getElementById("evening-forecast");

weather_code = {
	"0": "Clear sky",
	"1": "Mainly clear",
	"2": "Partly cloudy",
	"3": "Overcast",
	"45": "Fog",
	"48": "Depositing rime fog",
	"51": "Light drizzle",
	"53": "Moderate drizzle",
	"55": "Dense drizzle",
	"56": "Light freezing drizzle",
	"57": "Dense freezing drizzle",
	"61": "Slight rain",
	"63": "Moderate rain",
	"65": "Heavy rain",
	"66": "Light freezing rain",
	"67": "Heavy freezing rain",
	"71": "Slight snowfall",
	"73": "Moderate snowfall",
	"75": "Heavy snowfall",
	"77": "Snow grains",
	"80": "Slight rain showers",
	"81": "Moderate rain showers",
	"82": "Violent rain showers",
	"85": "Slight snow showers",
	"86": "Heavy snow showers",
	"95": "Thunderstorm",
	"96": "Thunderstorm with slight hail",
	"97": "Heavy thunderstorm",
	"99": "Thunderstorm with heavy hail"
}

if (amForecast) {
  if (chosenDate) {
    document.getElementById("event-date-location").textContent = chosenDate + " " + chosenLocation + " Weather";
    getForecast();
  } else {
    document.getElementById("weather-message").textContent = "Please enter trip info on Home page!"
  }
};

