// ----- CONFIGURATION -----
const API_KEY = "YOUR_GIPHY_API_KEY_HERE";
const BASE_URL = "https://api.giphy.com/v1/gifs/search";

// ----- DOM READY -----
$(document).ready(function () {
  setupHamburger();
});

// ----- HAMBURGER MENU -----
function setupHamburger() {
  $("#hamburger").on("click", function () {
    $(".nav-links").toggleClass("open");
  });
}