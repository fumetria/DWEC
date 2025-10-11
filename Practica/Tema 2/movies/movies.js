const apiURL = 'https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/movies';

let [title, year, director, poster, genre, rate, id] = document.querySelectorAll('input');
let MOVIES;

const formBtn = document.getElementById('form-btn');
const moviesData = document.getElementById('movies-data');
const refreshBtn = document.getElementById('refresh-btn');
const mockBtn = document.getElementById('mock-btn');
const formUpdateBtn = document.getElementById('form-update-btn');
const loadingMockDataAnimation = document.getElementById('poblar-spin');
const refreshDataAnimation = document.getElementById('update-spin');
const cardListData = document.getElementById('card-list');
const dataTypeStyle = document.getElementById('data-type-switcher');
const dataCardBtn = document.getElementById('card-list-btn');
const dataListBtn = document.getElementById('movie-list-btn');
const listDataSection = document.getElementById('list-data');
const cardDataSection = document.getElementById('card-data');

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

function getStars(movieRate) {
    const fillStar = '<i class="bi bi-star-fill"></i>';
    const halfStar = '<i class="bi bi-star-half"></i>';
    const emptyStar = '<i class="bi bi-star"></i>';
    let fillStars = 0;
    let halfStars = 0;
    let emptyStars = 0;
    if (movieRate % 2 != 0) {
        fillStars = (movieRate - 1) / 2;
        halfStars = 1;
        emptyStars = 5 - (halfStars + (movieRate / 2));
    } else {
        fillStars = (movieRate) / 2;
        emptyStars = 5 - (movieRate / 2);
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

function sectionSwitcher(hidden, show) {
    hidden.classList.add("hidden");
    show.classList.remove("hidden");
}

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
    loadingMockDataAnimation.classList.remove('hidden');
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
    loadingMockDataAnimation.classList.add('hidden');
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
            const movieRow = document.querySelector(`tr[data-movie-id="${movieId}"]`);
            let removedRow = moviesData.removeChild(movieRow);
        }
    }).catch(err => {
        console.log('Algo salió mal al eliminar movie...')
    })
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

async function submitMovie(movie) {
    await fetch(apiURL, {
        method: 'POST',
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
            return;
        }
    }).catch(e => {
        console.log('Algo salió mal');
    })
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

    return movies;
}

function fillData(moviesArr, dataStyle) {

    const movies = moviesArr;
    if (dataStyle == 'list') {
        moviesData.innerHTML = '';
        movies.forEach((movie) => {
            let stars;
            stars = getStars(movie.rate);
            moviesData.innerHTML += `
            <tr class="even:bg-emerald-100 odd:bg-emerald-50" data-movie-id="${movie.id}">
                <td class="px-2 py-1 text-center">${movie.id}</td>
                <td class="px-3 py-2 text-center"><img src="${movie.poster}" class="w-30 h-46 object-cover"></td>
                <td class="px-2 py-1 text-wrap">${movie.title}</td>
                <td class="px-2 py-1 text-center">${movie.year}</td>
                <td class="px-2 py-1 text-center text-wrap">${movie.genre}</td>
                <td class="px-2 py-1 text-center">${movie.director}</td>
                <td class="px-2 py-1 text-center text-yellow-400">${stars}</td>
                <td class="px-2 py-1 text-center">${movie.createdAt}</td>
                <td class="px-2 py-1 text-center">
                <div class="flex gap-3 justify-center text-lg px-2 py-1">
                    <div class="flex items-center justify-center size-8 text-xl bg-amber-400 hover:bg-amber-200 text-white rounded" 
                        onclick="updateForm(${movie.id})" title="Editar película"><i class="bi bi-pencil"></i></div>
                    <div class="flex items-center justify-center size-8 text-xl bg-red-500 hover:bg-red-200 text-white rounded" 
                    onclick="deleteMovie(${movie.id})" title="Eliminar película"><i class="bi bi-trash3-fill"></i></div>
                </div>
                </td>
            </tr>        
            `
        });
    }
    if (dataStyle == 'card') {

        cardDataSection.innerHTML = '';
        movies.forEach(movie => {
            let stars;
            stars = getStars(movie.rate);
            const genres = movie.genre.split(", ")
            let genresCard = '';
            for (let i = 0; i < genres.length; i++) {
                const genre = genres[i];
                let genrePill = `<span class="flex justify-center items-center text-sm rounded-lg px-2 font-semibold text-green-50 bg-orange-600">${genre}</span>`;
                genresCard += genrePill;
            }
            cardDataSection.innerHTML += `
                    <div
            class="flex flex-col justify-center items-center rounded bg-emerald-800 shadow-[10px_15px_30px] shadow-teal-600">
            <div class="w-full bg-emerald-600 rounded ">
                <img src="${movie.poster}"
                    alt=""
                    class="h-70 w-full object-cover rounded hover:mask-b-from-20% hover:mask-b-to-90% hover:transition-all">
            </div>
            <div class="p-3">
                <div>
                    <h3 class="text-xl text-white">${movie.title}</h3>
                </div>
                <ul>
                    <li><span class="text-yellow-400 text-2xl">${stars}</span> </li>
                    <li class="text-white text-xl">${movie.year}</li>
                    <li class="text-white">${movie.director}</li>
                    <li class="flex gap-2 my-2 justify-start">
                       ${genresCard}
                    </li>
                </ul>
            </div>
            <div class="flex gap-2 justify-center pt-2 pb-4">
                <button
                    class="bg-emerald-500 hover:inset-ring-2 hover:inset-ring-orange-500 text-white font-semibold px-2 py-1 rounded">Editar</button>
                <button
                    class="bg-emerald-600 hover:bg-red-400 font-semibold text-white px-2 py-1 rounded">Eliminar</button>
            </div>
        </div>
            `
        })
    }

}

async function showDataStyle(style) {
    const styleSet = dataTypeStyle.dataset.listType;
    if (styleSet == style) {
        return;
    }
    if (style == 'list') {
        dataTypeStyle.dataset.listType = 'list';
        dataCardBtn.classList.remove('bg-emerald-500');
        dataListBtn.classList.add('bg-emerald-500');
        sectionSwitcher(cardDataSection, listDataSection);
        if (!MOVIES) {
            MOVIES = await getMovies();
        }
        if (MOVIES.error) {
            moviesData.innerHTML = `
        <tr><td colspan=7 class="px-2 text-center">${MOVIES.error}</td><tr>`;
            return;
        }
        if (MOVIES) {
            const dataStyle = dataTypeStyle.dataset.listType;
            fillData(MOVIES, dataStyle);
        }
    }
    if (style == 'card') {
        dataTypeStyle.dataset.listType = 'card';
        dataListBtn.classList.remove('bg-emerald-500');
        dataCardBtn.classList.add('bg-emerald-500');
        sectionSwitcher(listDataSection, cardDataSection);
        if (!MOVIES) {
            MOVIES = await getMovies();
        }
        if (MOVIES.error) {
            cardDataSection.innerHTML = `
        <p>${MOVIES.error}</p>`;
            return;
        }
        if (MOVIES) {
            const dataStyle = dataTypeStyle.dataset.listType;
            fillData(MOVIES, dataStyle);
        }
    }
}

formBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const newMovie = createMovie(title.value, year.value, director.value, poster.value, genre.value, rate.value);
    await submitMovie(newMovie);
    MOVIES = await getMovies();
    const dataStyle = dataTypeStyle.dataset.listType;
    fillData(MOVIES, dataStyle)
});

refreshBtn.addEventListener('click', async () => {
    refreshDataAnimation.classList.remove('hidden');
    moviesData.innerHTML = "";
    MOVIES = await getMovies();
    const dataStyle = dataTypeStyle.dataset.listType;
    fillData(MOVIES, dataStyle)
    refreshDataAnimation.classList.add('hidden');
})

mockBtn.addEventListener('click', async () => {
    await insertMockData().then(async () => {
        moviesData.innerHTML = "";
        MOVIES = await getMovies();
        const dataStyle = dataTypeStyle.dataset.listType;
        fillData(MOVIES, dataStyle)
    })
})

formUpdateBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    await updateMovie(title.value, year.value, director.value, poster.value, genre.value, rate.value, id.value);
})

async function getMoviesCard() {
    const movie = await fetch(apiURL + '/1', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).catch(err => {
        return { error: "Error al obtener datos" };
    });


}


