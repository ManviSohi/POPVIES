const genreSelect = document.getElementById("genreSelect");
const ratingSort = document.getElementById("ratingSort");
const moviesContainer = document.querySelector(".movies-container");
const movies = Array.from(document.querySelectorAll(".movie-card"));

// Filter by genre
genreSelect.addEventListener("change", () => {
  const selected = genreSelect.value;
  movies.forEach(movie => {
    if (selected === "all" || movie.dataset.genre === selected) {
      movie.style.display = "block";
    } else {
      movie.style.display = "none";
    }
  });
});

// Sort by rating
ratingSort.addEventListener("change", () => {
  let sortedMovies = [...movies];
  if (ratingSort.value === "high") {
    sortedMovies.sort((a, b) => b.dataset.rating - a.dataset.rating);
  } else if (ratingSort.value === "low") {
    sortedMovies.sort((a, b) => a.dataset.rating - b.dataset.rating);
  } else {
    sortedMovies = movies; // default order
  }

  moviesContainer.innerHTML = "";
  sortedMovies.forEach(movie => moviesContainer.appendChild(movie));
});
document.querySelectorAll(".watchlist-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    const card = this.closest(".movie-card");
    const movie = {
      title: card.getAttribute("data-title"),
      img: card.getAttribute("data-img"),
      genre: card.getAttribute("data-genre"),
      rating: card.getAttribute("data-rating")
    };

    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Prevent duplicates
    if (!watchlist.some(m => m.title === movie.title)) {
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      this.textContent = "✔ Added";   // change button text
      this.disabled = true;           // disable after adding
    } else {
      this.textContent = "✔ Added";
      this.disabled = true;
    }
  });
});




const watchlistButtons = document.querySelectorAll('.watchlist-btn');

watchlistButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    const movieCard = btn.closest('.movie-card');

    // Correctly fetch the title
    const movieTitle = movieCard.querySelector('p').textContent.trim();
    const movieGenre = movieCard.querySelector('.genre').textContent.trim();
    const movieRating = movieCard.querySelector('.rating').textContent.replace('⭐','').trim();

    const movie = {
      title: movieTitle,
      genre: movieGenre,
      rating: movieRating
    };

    // Check if movie already in watchlist
    if (!watchlist.some(m => m.title === movie.title)) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      alert(`${movie.title} added to Watchlist`);
    } else {
      alert(`${movie.title} is already in Watchlist`);
    }
  });
});


