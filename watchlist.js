// watchlist.js
const container = document.getElementById("watchlistContainer");
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

console.log('watchlist from localStorage:', watchlist);

// small SVG placeholder (data URI)
const PLACEHOLDER = "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='600'>
       <rect width='100%' height='100%' fill='#161616'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
             fill='#ff4d4d' font-family='Segoe UI, Arial' font-size='20'>No Image</text>
     </svg>`
  );

function renderWatchlist() {
  if (!container) {
    console.error("watchlistContainer element not found in HTML.");
    return;
  }

  container.innerHTML = "";

  if (!watchlist || watchlist.length === 0) {
    container.innerHTML = "<p style='color:#fff; font-size:18px; padding:20px'>No movies in your watchlist.</p>";
    return;
  }

  watchlist.forEach((movie, index) => {
    // Accept several possible property names for backward compatibility
    const imgSrc = movie.img || movie.image || movie.poster || "";
    // If the stored src looks invalid (not http/data), we'll use placeholder
    const safeSrc = (typeof imgSrc === "string" && /^(https?:\/\/|data:)/i.test(imgSrc)) ? imgSrc : PLACEHOLDER;

    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${safeSrc}" alt="${escapeHtml(movie.title || 'Untitled')}"
           onerror="this.onerror=null;this.src='${PLACEHOLDER}';" loading="lazy">
      <p>${escapeHtml(movie.title || 'Untitled')}</p>
      <span class="genre">${escapeHtml(movie.genre || '')}</span>
      <span class="rating">⭐ ${escapeHtml(movie.rating || '')}</span>
      <button class="remove-btn" data-index="${index}">❌ Remove</button>
    `;
    container.appendChild(card);
  });

  // attach remove handlers
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const idx = parseInt(this.getAttribute("data-index"), 10);
      if (!Number.isNaN(idx)) {
        watchlist.splice(idx, 1);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        renderWatchlist();
      }
    });
  });
}

// small helper to avoid injection
function escapeHtml(str){
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

renderWatchlist();
