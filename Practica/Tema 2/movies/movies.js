const apiURL = 'https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/movies';

let [title, genre, director, score] = document.querySelectorAll('input');
const formBtn = document.getElementById('form-btn');
const moviesData = document.getElementById('movies-data');
const refreshBtn = document.getElementById('refresh-btn');

function getDate() {
    const date = Date.now();
    const today = new Date(date);

    let day = today.getDate().toString();
    if (day.length < 2) {
        day = "0" + day;
    }
    let month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
        month = "0" + month;
    }
    let year = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes().toString();
    if (minutes.length < 2) {
        minutes = "0" + minutes;
    }

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function createMovie(title, genre, directorName, score) {

    let date = getDate();
    const newMovie = {
        createdAt: date,
        title: title,
        genre: genre,
        director: directorName,
        score: score
    };

    return newMovie;
}



async function getMovies() {
    const movies = await fetch(apiURL, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).catch(err => {
        return { error: "Error al obtener datos" };
    });
    if (movies.error) {
        moviesData.innerHTML = `
        <tr><td colspan=7 class="px-2 text-center">${movies.error}</td><tr>`;
    }
    movies.forEach((movie) => {
        const tr = document.createElement('tr');
        tr.classList.add('even:bg-emerald-100');
        tr.innerHTML = `
            <td class="px-2 text-center">${movie.id}</td>
            <td class="px-2">${movie.title}</td>
            <td class="px-2 text-center">${movie.genre}</td>
            <td class="px-2 text-center">${movie.director}</td>
            <td class="px-2 text-center">${movie.score}</td>
            <td class="px-2 text-center">${movie.createdAt}</td>
            <td class="px-2 text-center"></td>
            `;
        moviesData.appendChild(tr);
    })
}

function fillTable(moviesArr) {

    const movies = moviesArr;

}
async function submitMovie(movie) {
    fetch(apiURL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(movie)
    }).then(res => {
        if (res.ok) {
            alert('Película añadida correctamente');
        }
    }).catch(e => {
        alert('Algo salió mal');
    })
}

formBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const newMovie = createMovie(title.value, genre.value, director.value, score.value);
    submitMovie(newMovie);
});

refreshBtn.addEventListener('click', () => {
    moviesData.innerHTML = "";
    getMovies();

})



