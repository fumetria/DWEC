const apiURL = 'https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/movies';

let [title, year, director, poster, genre, rate, id] = document.querySelectorAll('input');
const formBtn = document.getElementById('form-btn');
const moviesData = document.getElementById('movies-data');
const refreshBtn = document.getElementById('refresh-btn');
const mockBtn = document.getElementById('mock-btn');
const formUpdateBtn = document.getElementById('form-update-btn');


function buttonHidden(hidden, show) {
    hidden.classList.add("hidden");
    show.classList.remove("hidden");
}
/**
 * Mostrar atributos de película seleccionada en el form de editar película
 * @param {*} movieId 
 */
async function updateForm(movieId) {
    const movie = await fetch(apiURL + `/${movieId}`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).catch(err => {
        return { error: "Error al obtener datos" };
    });
    title.value = movie.title;
    year.value = movie.year;
    director.value = movie.director;
    poster.value = movie.poster;
    genre.value = movie.genre;
    rate.value = movie.rate;
    id.value = movie.id;
    buttonHidden(formBtn, formUpdateBtn);

}

async function insertMockData() {
    const mockMovies = await fetch('./movies.json')
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .catch(error => {
            console.log('Error al cargar el JSON');
        });

    for (let i = 0; i < mockMovies.length; i++) {
        const movie = mockMovies[i];
        let movieGenre = movie.genre.join(', ');
        movie.genre = movieGenre;
        const newMovie = createMovie(movie.title, movie.year, movie.director, movie.poster, movie.genre, movie.rate);
        await submitMovie(newMovie);

    }
}

async function updateMovie(movieTitle, movieYear, directorName, moviePoster, movieGenre, movieRate, movieId) {
    const movie = createMovie(movieTitle, movieYear, directorName, moviePoster, movieGenre, movieRate);
    const result = await fetch(apiURL + `/${movieId}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(movie)
    }).then(res => {
        if (res.ok) {
            title.value = "";
            year.value = "";
            director.value = "";
            poster.value = "";
            genre.value = "";
            rate.value = "";
            id.value = "";
            buttonHidden(formUpdateBtn, formBtn);
            return res.json();
        }
    }).then((res) => {
        moviesData.innerHTML = "";
        getMovies();
    }).catch(error => {
        console.log('Algo salió mal');
    })
}

async function deleteMovie(movieId) {
    await fetch(apiURL + `/${movieId}`, {
        method: 'DELETE',
    }).then(async res => {
        if (res.ok) {
            moviesData.innerHTML = "";
            await getMovies();
        }
    }).catch(err => {
        console.log('Algo salió mal al eliminar movie...')
    })
}
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

function createMovie(title, year, directorName, poster, genre, rate) {

    let date = getDate();
    const newMovie = {
        createdAt: date,
        title: title,
        year: year,
        director: directorName,
        poster: poster,
        genre: genre,
        rate: rate
    };

    return newMovie;
}

function getStars(movieScore) {
    const fillStar = '<i class="bi bi-star-fill"></i>';
    const halfStar = '<i class="bi bi-star-half"></i>';
    const emptyStar = '<i class="bi bi-star"></i>';
    let fillStars = 0;
    let halfStars = 0;
    let emptyStars = 0;
    if (movieScore % 2 != 0) {
        fillStars = (movieScore - 1) / 2;
        halfStars = 1;
        emptyStars = 5 - (halfStars + (movieScore / 2));
    } else {
        fillStars = (movieScore) / 2;
        emptyStars = 5 - (movieScore / 2);
    }
    let totalStars = "";
    for (let i = 0; i < fillStars; i++) {
        totalStars += fillStar;
    }
    for (let i = 0; i < halfStars; i++) {
        totalStars += halfStar;
    }
    for (let i = 0; i < emptyStars; i++) {
        totalStars += emptyStar;
    }
    return totalStars;
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
    movies.map(movie => {
        const stars = getStars(movie.rate);
        movie.rate = stars;
    });

    movies.forEach((movie) => {
        moviesData.innerHTML += `
        <tr class="even:bg-emerald-100 odd:bg-emerald-50">
            <td class="px-2 py-1 text-center">${movie.id}</td>
            <td class="px-3 py-2 text-center"><img src="${movie.poster}" class="w-32 h-48 object-cover"></td>
            <td class="px-2 py-1">${movie.title}</td>
            <td class="px-2 py-1 text-center">${movie.year}</td>
            <td class="px-2 py-1 text-center">${movie.genre}</td>
            <td class="px-2 py-1 text-center">${movie.director}</td>
            <td class="px-2 py-1text-center text-yellow-400">${movie.rate}</td>
            <td class="px-2 py-1 text-center">${movie.createdAt}</td>
            <td class="px-2 py-1 text-center">
            <div class="flex gap-3 justify-center text-lg px-2 py-1">
                <div class="flex items-center justify-center size-8 text-xl bg-amber-400 hover:bg-amber-200 text-white rounded" 
                    onclick="updateForm(${movie.id})"><i class="bi bi-pencil"></i></div>
                <div class="flex items-center justify-center size-8 text-xl bg-red-500 hover:bg-red-200 text-white rounded" 
                onclick="deleteMovie(${movie.id})"><i class="bi bi-trash3-fill"></i></div>
            </div>
            </td>
        </tr>        
        `
    });
}

function fillTable(moviesArr) {

    const movies = moviesArr;

}
async function submitMovie(movie) {
    await fetch(apiURL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(movie)
    }).then(res => {
        if (res.ok) {
            return;
        }
    }).catch(e => {
        console.log('Algo salió mal');
    })
}

formBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const newMovie = createMovie(title.value, genre.value, director.value, score.value);
    submitMovie(newMovie);
});

refreshBtn.addEventListener('click', async () => {
    moviesData.innerHTML = "";
    await getMovies();
})

mockBtn.addEventListener('click', async () => {
    await insertMockData().then(async () => {
        moviesData.innerHTML = "";
        await getMovies();
    })
})

formUpdateBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    await updateMovie(title.value, year.value, director.value, poster.value, genre.value, rate.value, id.value);
})



