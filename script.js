const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGM4OGNlYWFlNzM1MTU1ZDM5YzZhZDNjZTFlN2FiYiIsInN1YiI6IjY2MmI0ZWY5NWMwNzFiMDExYzVlOGEwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNpJDRr1L7kWApfidXYuOYPhFYLWnSW_z-oQuq0VEwo'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => displayMovies(response))
    .catch(err => console.error(err));


function displayMovies(data) {
    data.results.forEach(movie => { // alert에서 띄어쓰기 하면 오류나는 이유..?
        let movieCode = `<div onclick="alert('영화 id: ' + '${movie.id}')" id="${movie.id}" class="card">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
            class="card-img-top">
            <div class="card-body">
                <h2 class="card-title">${movie.title}</h2>
                <p class="card-text">${movie.overview}</p>
            </div>
        </div>`
        const editId = document.getElementById("cardSpace");
        editId.innerHTML += movieCode;
    });
}