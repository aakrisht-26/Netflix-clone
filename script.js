const movies = [
  { title: "Inception", genre: "Sci-Fi", rating: 8.8, year: 2010, video: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/Videos/inception.mp4", thumb: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/thumbnails/inception.jpg" },
  { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, year: 2014, video: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/Videos/interstellar.mp4", thumb: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/thumbnails/interstellar.jpg" },
  { title: "Pursuit of Happyness", genre: "Drama", rating: 9.0, year: 2006, video: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/Videos/pursuit.mp4", thumb: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/thumbnails/pursuit.jpg" },
  { title: "Avengers: Endgame", genre: "Action", rating: 8.4, year: 2019, video: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/Videos/endgame.mp4", thumb: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/thumbnails/endgame.jpg" },
  { title: "Joker", genre: "Drama", rating: 8.5, year: 2019, video: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/Videos/joker.mp4", thumb: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/thumbnails/joker.jpg" },
  { title: "Dune", genre: "Sci-Fi", rating: 8.2, year: 2021, video: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/Videos/dune.mp4", thumb: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/thumbnails/dune.jpg" },
  { title: "Parasite", genre: "Thriller", rating: 8.6, year: 2019, video: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/Videos/parasite.mp4", thumb: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/thumbnails/parasite.jpg" },
  { title: "Gladiator", genre: "Action", rating: 8.5, year: 2000, video: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/Videos/gladiator.mp4", thumb: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/thumbnails/gladiator.jpg" },
  { title: "Titanic", genre: "Drama", rating: 7.9, year: 1997, video: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/Videos/titanic.mp4", thumb: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/thumbnails/titanic.jpg" },
  { title: "The Shawshank Redemption", genre: "Thriller", rating: 9.5, year: 1994, video: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/Videos/shawshank.mp4", thumb: "https://miniflix-aakrisht.s3.us-east-1.amazonaws.com/thumbnails/shawshank.jpg" }
];

function renderMovies(list, containerId = "movieContainer") {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  list.forEach(movie => {
    container.innerHTML += `
      <div class="movie-card">
        <img src="${movie.thumb}" alt="${movie.title}">
        <video src="${movie.video}" muted loop preload="metadata"></video>
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>${movie.genre} | ⭐ ${movie.rating} | ${movie.year}</p>
        </div>
        <div class="btn-group">
          <button onclick="playMovie('${movie.video}')">Play</button>
          <button onclick="addToWatchlist('${movie.title}')">+ Watchlist</button>
          <button onclick="likeMovie('${movie.title}')">❤ Like</button>
        </div>
      </div>
    `;
  });

  // Hover video preview
  container.querySelectorAll('.movie-card').forEach(card => {
    const video = card.querySelector('video');
    card.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

// Play video in new tab
function playMovie(url) { window.open(url, "_blank"); }

// Watchlist / Liked storage
function addToWatchlist(title) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  if (!watchlist.includes(title)) watchlist.push(title);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  alert(`${title} added to Watchlist!`);
}

function likeMovie(title) {
  let liked = JSON.parse(localStorage.getItem("liked")) || [];
  if (!liked.includes(title)) liked.push(title);
  localStorage.setItem("liked", JSON.stringify(liked));
  alert(`You liked ${title}!`);
}

// Render Watchlist & Liked sections
function renderWatchlist() {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  renderMovies(movies.filter(m => watchlist.includes(m.title)), "watchlistContainer");
}

function renderLiked() {
  let liked = JSON.parse(localStorage.getItem("liked")) || [];
  renderMovies(movies.filter(m => liked.includes(m.title)), "likedContainer");
}

// Sorting & Filtering
function sortMovies() {
  const type = document.getElementById("sortSelect").value;
  const sorted = [...movies].sort((a, b) => type === "rating" ? b.rating - a.rating : b.year - a.year);
  renderMovies(sorted);
}

function filterByGenre() {
  const genre = document.getElementById("genreSelect").value;
  renderMovies(genre === "all" ? movies : movies.filter(m => m.genre === genre));
}

// Login & Redirect
function login() {
  const user = document.getElementById("username")?.value;
  const pass = document.getElementById("password")?.value;

  if (user && pass) {
    localStorage.setItem("user", user);
    window.location.href = "main.html"; // redirect to main page
  } else {
    alert("Enter username and password");
  }
}

function continueAsGuest() {
  localStorage.setItem("user", "Guest");
  window.location.href = "main.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html"; // back to login page
}

// Auto-render on page load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("movieContainer")) renderMovies(movies);
  if (document.getElementById("watchlistContainer")) renderWatchlist();
  if (document.getElementById("likedContainer")) renderLiked();
});
