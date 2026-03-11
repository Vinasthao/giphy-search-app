// ----- CONFIGURATION -----
const API_KEY = "GIPHY_API_KEY";
const BASE_URL = "https://api.giphy.com/v1/gifs/search";

// ----- DOM READY -----
$(document).ready(function () {
  setupHamburger();
  setupSearchButton();
  setupEnterKey();
});

// ----- HAMBURGER MENU -----
function setupHamburger() {
  $("#hamburger").on("click", function () {
    $(".nav-links").toggleClass("open");
  });
}

// ----- SEARCH BUTTON CLICK -----
function setupSearchButton() {
  $("#search-btn").on("click", function () {
    runSearch();
  });
}

// ----- ENTER KEY SUPPORT -----
function setupEnterKey() {
  $("#search-term").on("keydown", function (e) {
    if (e.key === "Enter") runSearch();
  });
}

// ----- MAIN SEARCH FUNCTION -----
function runSearch() {
  var searchTerm = getSearchTerm();
  var gifCount = getGifCount();

  if (!isValidInput(searchTerm, gifCount)) return;

  clearResults();
  showLoading(true);

  fetchGifs(searchTerm, gifCount);
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

// ----- FETCH GIFS FROM GIPHY -----
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
function handleApiSuccess(response, searchTerm) {
  var gifs = response.data;

  if (gifs.length === 0) {
    showError("No GIFs found for \"" + searchTerm + "\". Try a different keyword.");
    return;
  }

  updateResultsTitle(searchTerm, gifs.length);

  $.each(gifs, function (index, gif) {
    appendGifToPage(gif);
  });
}

// ----- APPEND A SINGLE GIF -----
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
function updateResultsTitle(searchTerm, count) {
  $("#results-title").html(
    "Showing <span>" + count + " GIFs</span> for: <span>" + searchTerm + "</span>"
  );
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