const API_key = "api_key=c1a035cdd9131266b610671b41dddbb5"
const Base_url = "https://api.themoviedb.org/3"
const api_url = Base_url + "/discover/movie?sort_by=popularity.desc&" + API_key
const img_url = "https://image.tmdb.org/t/p/w500"
const search_url = Base_url + "/search/movie?" + API_key

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
]

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")
getmovies(api_url)
function getmovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.results.length !== 0) {
        showmoives(data.results)
      } else {
        main.innerHTML = `<h1 class="no-res">No Results Found</h1>`
      }
      console.log(data.results)
    })
}
const tagsEl = document.getElementById("tags")

var selectedGenre = []
setGenre()
function setGenre() {
  tagsEl.innerHTML = ""
  genres.forEach(genre => {
    const t = document.createElement("div")
    t.classList.add("tag")
    t.id = genre.id
    t.innerText = genre.name
    t.addEventListener("click", () => {
      if (selectedGenre.length === 0) {
        selectedGenre.push(genre.id)
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1)
            }
          })
        } else {
          selectedGenre.push(genre.id)
        }
      }
      console.log(selectedGenre)
      getmovies(api_url + "&with_genres=" + encodeURI(selectedGenre.join(",")))
      highlightselection()
    })
    tagsEl.append(t)
  })
}

function clearbtn() {
  let clearbtn = document.getElementById("clear")
  if (clearbtn) {
    clearbtn.classList.add("highlight")
  } else {
    let clear = document.createElement("div")
    clear.classList.add("tag", "highlight")
    clear.id = "clear"
    clear.innerText = "Clear x"
    clear.addEventListener("click", () => {
      selectedGenre = []
      setGenre()
      getmovies(api_url)
    })
    tagsEl.append(clear)
  }
}

function highlightselection() {
  const tags = document.querySelectorAll(".tag")
  tags.forEach(tag => {
    tag.classList.remove("highlight")
  })
  clearbtn()
  if (selectedGenre.length !== 0) {
    selectedGenre.forEach(id => {
      const highlighitedtag = document.getElementById(id)
      highlighitedtag.classList.add("highlight")
    })
  }
}

function showmoives(data) {
  main.innerHTML = null
  data.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie
    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")
    movieEl.innerHTML = `
    <img
          src="${
            poster_path
              ? img_url + poster_path
              : "https://via.placeholder.com/1080x1580"
          }"
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
  selectedGenre = []
  setGenre()
  if (searchTerm) {
    getmovies(search_url + "&query=" + searchTerm)
  } else {
    getmovies(api_url)
  }
})
