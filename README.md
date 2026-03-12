# GIFSearch 

**A fast, minimal GIF search engine powered by the Giphy API**

---
--- Name
##  Vinasthao


---

##  Project Overview

GIFSearch is a web application that allows users to search for GIFs using the Giphy API. Users can enter a search keyword, choose how many GIFs they want to see, and the app fetches and displays them in a responsive grid layout. The app is fully responsive and works on both desktop and mobile devices.

---

## How to Use the App

1. Open the app in your browser (or visit the GitHub Pages link below)
2. Type a keyword into the **Search Keyword** field (e.g. "cats", "happy", "simpsons")
3. Enter how many GIFs you want (1–50) in the **No. of GIFs** field
4. Click **Search** or press **Enter**
5. GIFs will appear below in a responsive grid!

---

## 🛠 How to Run It Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/Vinasthao/giphy-search.git
   ```
2. Navigate to the project folder:
   ```bash
   cd giphy-search
   ```
3. Open `index.html` in your browser — no server needed!


---

## Getting a Giphy API Key

1. Go to [https://developers.giphy.com](https://developers.giphy.com)
2. Create a free account
3. Click **Create an App**
4. Choose **API** (not SDK)
5. Copy your API key

---

##  User Stories

1. **As a user**, I want to type a keyword into a search box, so that I can find GIFs related to a topic I'm interested in.
2. **As a user**, I want to choose how many GIFs appear, so that I can control the number of results shown on the page.
3. **As a user**, I want to click a search button to trigger the search, so that GIFs are loaded onto the page.
4. **As a user**, I want to see my results displayed as images in a grid, so that I can browse them visually.
5. **As a user**, I want the app to work on my phone, so that I can use it on any device wherever I am.
6. **As a user**, I want a navigation bar with links, so that I can easily jump to different sections of the page.
7. **As a user**, I want to see a clear error message if my search fails or is empty, so that I know what went wrong.

---

##  Project Structure

```
/
├── index.html          ← Main HTML page
├── css/
│   ├── style.css       ← Compiled CSS
│   └── style.scss      ← SCSS source file
├── js/
│   └── main.js         ← jQuery + Ajax logic
└── README.md           ← This file
```



---

## 🔧 Technologies Used

- HTML5
- CSS3 / SCSS
- JavaScript (ES6)
- jQuery (Ajax requests)
- Giphy API
- Google Fonts (Syne, DM Sans)
- GitHub Pages (hosting)

---

##  Ideas for Future Improvement

1. **Infinite scroll** — automatically load more GIFs as the user scrolls down instead of a fixed count
2. **Download button** — add a button to each GIF card so users can download individual GIFs
3. **Trending GIFs page** — add a new section that shows currently trending GIFs from Giphy even before a search is made
4. **Search history** — save recent searches in localStorage so users can quickly re-run past queries
5. **Favourites** — allow users to click a heart icon to save favourite GIFs and view them in a dedicated section

---

## Wireframes

Wireframes for this project are included in the `/wireframes` folder, showing both the desktop and mobile layouts.
