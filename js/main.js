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
// ----- GET SEARCH TERM -----
function getSearchTerm() {
  return $("#search-term").val().trim();
}

// ----- GET GIF COUNT -----
function getGifCount() {
  return parseInt($("#gif-count").val(), 10);
}

// ----- VALIDATE INPUT -----
function isValidInput(term, count) {
  if (!term) {
    showError("Please enter a search keyword.");
    return false;
  }
  if (!count || count < 1 || count > 50) {
    showError("Please enter a number between 1 and 50.");
    return false;
  }
  clearError();
  return true;
}

// ----- SHOW ERROR -----
function showError(message) {
  $("#error-msg").text(message);
}

// ----- CLEAR ERROR -----
function clearError() {
  $("#error-msg").text("");
}

// ----- SHOW / HIDE LOADING -----
function showLoading(visible) {
  if (visible) {
    $("#loading").removeClass("hidden");
  } else {
    $("#loading").addClass("hidden");
  }
}

// ----- CLEAR RESULTS -----
function clearResults() {
  $("#gif-container").empty();
  $("#results-title").empty();
}