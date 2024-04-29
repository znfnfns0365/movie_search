const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const editId = document.getElementById("cardSpace");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGM4OGNlYWFlNzM1MTU1ZDM5YzZhZDNjZTFlN2FiYiIsInN1YiI6IjY2MmI0ZWY5NWMwNzFiMDExYzVlOGEwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNpJDRr1L7kWApfidXYuOYPhFYLWnSW_z-oQuq0VEwo"
  }
};

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json())
  .then((response) => displayMovies(response))
  .catch((err) => console.error(err));

function displayMovies(data) {
  this.data = data;
  data.results.forEach((movie) => {
    // alert에서 띄어쓰기 하면 오류나는 이유..?

    let movieCode = `<div onclick="alert('영화 id: ' + '${movie.id}')" id="${movie.id}" class="card">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top">
            <div class="card-body">
                <h2 class="card-title">${movie.title}</h2>
                <p class="card-text">${movie.overview}</p>
            </div>
        </div>`;
    editId.innerHTML += movieCode;
  });
  let search = () => {
    let Arr = Array.from(data.results);
    Arr = Arr.filter(function (obj) {
      const cmp = obj.title.toLowerCase();
      return cmp.includes(searchInput.value.toLowerCase());
    });
    if (Arr.length == 0) {
      alert("검색 결과가 없습니다.");
      return;
    }
    editId.innerHTML = null;
    const elements = document.getElementsByClassName("cards");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.margin = "0px";
    }
    for (let i = 0; i < Arr.length; i++) {
      const movie = Arr[i];
      let movieCode = `<div onclick="alert('영화 id: ' + '${movie.id}')" id="${movie.id}" class="card">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top">
                <div class="card-body">
                    <h2 class="card-title">${movie.title}</h2>
                    <p class="card-text">${movie.overview}</p>
                </div>
            </div>`;
      editId.innerHTML += movieCode;
    }
    return;
  };
  searchButton.addEventListener("click", search);
  searchInput.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
      search();
    }
  });
}

window.onload = function () {
  document.getElementById("searchInput").focus();
};
