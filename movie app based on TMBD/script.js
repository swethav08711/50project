const API_key = "api_key=c1a035cdd9131266b610671b41dddbb5"
const Base_url = "https://api.themoviedb.org/3"
const api_url = Base_url + "/discover/movie?sort_by=popularity.desc&" + API_key
const img_url = "https://image.tmdb.org/t/p/w500"
const search_url = Base_url + "/search/movie?" + API_key
const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")
getmovies(api_url)
function getmovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showmoives(data.results)
      console.log(data.results)
    })
}

function showmoives(data) {
  main.innerHTML = null
  data.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie
    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")
    movieEl.innerHTML = `
    <img
          src="${img_url + poster_path}"
          alt="${title}"
        />

        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getcolor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>`
    main.appendChild(movieEl)
  })
}
function getcolor(vote) {
  if (vote >= 8) {
    return "green"
  } else if (vote >= 5) {
    return "orange"
  } else {
    return "red"
  }
}
form.addEventListener("submit", e => {
  e.preventDefault()
  const searchTerm = search.value
  if (searchTerm) {
    getmovies(search_url + "&query=" + searchTerm)
  } else {
    getmovies(api_url)
  }
})
