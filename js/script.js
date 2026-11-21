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

const chosenDate = localStorage.getItem("eventDate");

const url = "https://api.open-meteo.com/v1/forecast?latitude=41.2563&longitude=-95.9404&hourly=temperature_2m&timezone=America%2FChicago&temperature_unit=fahrenheit&start_date=" + chosenDate + "&end_date=" + chosenDate
console.log(url);

async function getForecast() {
  // Requests hourly temperatures from the Open-Meteo forecast API (no key needed).
  // The URL sets the location (Omaha coordinates, hardcoded for now), Fahrenheit units,
  // and the America/Chicago timezone so the hours match local time instead of GMT.
  // The date comes from localStorage. await pauses until the response arrives.
  const response = await fetch(url);
  const data = await response.json();
  // hourly.temperature_2m holds one value per hour starting at midnight local time,
  // so the index is the hour of the day: 10 = 10 a.m., 14 = 2 p.m., 18 = 6 p.m.
  const amForecastTemp = data.hourly.temperature_2m[10];
  const midForecastTemp = data.hourly.temperature_2m[14];
  const pmForecastTemp = data.hourly.temperature_2m[18];
  console.log(amForecastTemp, midForecastTemp, pmForecastTemp);

  // Update the DOM with the forecast.
  amForecast.textContent = "Temperature: " + amForecastTemp + " degrees Fahrenheit";
  midForecast.textContent = "Temperature: " + midForecastTemp + " degrees Fahrenheit";
  pmForecast.textContent = "Temperature: " + pmForecastTemp + " degrees Fahrenheit";
}

const amForecast = document.getElementById("morning-forecast");
const midForecast = document.getElementById("afternoon-forecast");
const pmForecast = document.getElementById("evening-forecast");

if (amForecast) {
  if (chosenDate) {
    getForecast();
  } else {
    document.getElementById("weather-message").textContent = "Please enter trip info on Home page!"
  }
};

