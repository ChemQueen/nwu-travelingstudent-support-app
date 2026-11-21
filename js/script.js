// console.log("Hello World!");

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
    console.log(tripName, destination, departDate, returnDate);
    localStorage.setItem("tripName", tripName);
    localStorage.setItem("destination", destination);
    localStorage.setItem("departDate", departDate);
    localStorage.setItem("returnDate", returnDate);
    document.getElementById("confirmation-message").textContent = "Trip saved!"
  })
};

async function getForecast() {
  const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.2563&longitude=-95.9404&hourly=temperature_2m&timezone=America%2FChicago&temperature_unit=fahrenheit&start_date=2026-11-22&end_date=2026-11-24");
  const data = await response.json();
  const amForecastTemp = data.hourly.temperature_2m[10];
  const midForecastTemp = data.hourly.temperature_2m[14];
  const pmForecastTemp = data.hourly.temperature_2m[18];
  console.log(amForecastTemp, midForecastTemp, pmForecastTemp);

  // Update the DOM with the forecast
  amForecast.textContent = amForecastTemp;
  midForecast.textContent = midForecastTemp;
  pmForecast.textContent = pmForecastTemp;
}

const amForecast = document.getElementById("morning-forecast");
const midForecast = document.getElementById("afternoon-forecast");
const pmForecast = document.getElementById("evening-forecast");

if (amForecast) {
  getForecast();
};

