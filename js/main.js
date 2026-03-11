// =============================================
// GIFSearch - main.js
// Uses jQuery + Ajax to fetch GIFs from Giphy API
// =============================================

// ----- CONFIGURATION -----
// Replace with your own Giphy API key from https://developers.giphy.com
const API_KEY = "YOUR_GIPHY_API_KEY_HERE";
const BASE_URL = "https://api.giphy.com/v1/gifs/search";

// ----- DOM READY -----
$(document).ready(function () {
  setupHamburger();
  setupSearchButton();
  setupEnterKey();
});

// ----- HAMBURGER MENU -----
// Toggles mobile nav open/closed
function setupHamburger() {
  $("#hamburger").on("click", function () {
    $(".nav-links").toggleClass("open");
  });
}

// ----- SEARCH BUTTON CLICK -----
// Triggers the GIF search when button is clicked
function setupSearchButton() {
  $("#search-btn").on("click", function () {
    runSearch();
  });
}

// ----- ENTER KEY SUPPORT -----
// Also allows pressing Enter in the search field
function setupEnterKey() {
  $("#search-term").on("keydown", function (e) {
    if (e.key === "Enter") runSearch();
  });
}

// ----- MAIN SEARCH FUNCTION -----
// Validates input, then calls the Giphy API
function runSearch() {
  var searchTerm = getSearchTerm();
  var gifCount = getGifCount();

  if (!isValidInput(searchTerm, gifCount)) return;

  clearResults();
  showLoading(true);

  fetchGifs(searchTerm, gifCount);
}

// ----- GET SEARCH TERM -----
// Reads and trims the search input value
function getSearchTerm() {
  return $("#search-term").val().trim();
}

// ----- GET GIF COUNT -----
// Reads the number of GIFs requested (integer)
function getGifCount() {
  return parseInt($("#gif-count").val(), 10);
}

// ----- VALIDATE INPUT -----
// Returns true if input is valid, false and shows error if not
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

// ----- FETCH GIFS FROM GIPHY -----
// Makes an Ajax GET request to the Giphy API
function fetchGifs(searchTerm, gifCount) {
  $.ajax({
    url: BASE_URL,
    method: "GET",
    data: {
      api_key: API_KEY,
      q: searchTerm,
      limit: gifCount,
      rating: "g"
    },
    success: function (response) {
      showLoading(false);
      handleApiSuccess(response, searchTerm);
    },
    error: function (err) {
      showLoading(false);
      showError("Something went wrong. Please check your API key or try again.");
      console.error("Giphy API error:", err);
    }
  });
}

// ----- HANDLE SUCCESSFUL API RESPONSE -----
// Loops through returned GIFs and appends them to the page
function handleApiSuccess(response, searchTerm) {
  var gifs = response.data;

  if (gifs.length === 0) {
    showError("No GIFs found for \"" + searchTerm + "\". Try a different keyword.");
    return;
  }

  updateResultsTitle(searchTerm, gifs.length);

  // Iterate over each GIF and append an image to the grid
  $.each(gifs, function (index, gif) {
    appendGifToPage(gif);
  });
}

// ----- APPEND A SINGLE GIF -----
// Creates an image card and adds it to the GIF grid
function appendGifToPage(gif) {
  var imageUrl = gif.images.fixed_height.url;
  var title = gif.title || "GIF";

  var $item = $("<div>").addClass("gif-item");
  var $img = $("<img>")
    .attr("src", imageUrl)
    .attr("alt", title)
    .attr("title", title);

  $item.append($img);
  $("#gif-container").append($item);
}

// ----- UPDATE RESULTS TITLE -----
// Shows how many results were found for a search term
function updateResultsTitle(searchTerm, count) {
  $("#results-title").html(
    "Showing <span>" + count + " GIFs</span> for: <span>" + searchTerm + "</span>"
  );
}

// ----- CLEAR RESULTS -----
// Empties the GIF grid and title before a new search
function clearResults() {
  $("#gif-container").empty();
  $("#results-title").empty();
}

// ----- SHOW / HIDE LOADING -----
function showLoading(visible) {
  if (visible) {
    $("#loading").removeClass("hidden");
  } else {
    $("#loading").addClass("hidden");
  }
}

// ----- SHOW ERROR -----
function showError(message) {
  $("#error-msg").text(message);
}

// ----- CLEAR ERROR -----
function clearError() {
  $("#error-msg").text("");
}