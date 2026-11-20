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


