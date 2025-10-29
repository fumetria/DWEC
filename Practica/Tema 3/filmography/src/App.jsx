// import "./App.css";
// import { peliculas } from "./utils/films.js";
import FormNewFilm from "./components/FormNewFilm.jsx";
import GridFilms from "./components/GridFilms.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import { useEffect, useState } from "react";

function App() {
  const URL = "https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/films";
  const [filmList, setFilmList] = useState([]);
  const [reloadFilmList, setReloadFilmList] = useState(false);
  const [movieSelected, setMovieSelected] = useState({
    id: "",
    name: "",
    year: "",
    film_poster: "",
  });

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Error al obtener datos");
        const data = await res.json();
        setFilmList(data);
      } catch (err) {
        console.error(err);
        setFilmList([]);
      }
    };

    fetchFilms();
  }, [reloadFilmList]);

  const handleAddNewFilm = () => {
    setReloadFilmList((prevStatus) => !prevStatus);
  };

  const handleDeleteClick = async (movieId) => {
    await fetch(URL + `/${movieId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setReloadFilmList((prevStatus) => !prevStatus);
        }
      })
      .catch((error) => {
        console.log(error, "No se ha actualizado correctamente");
      });
  };

  const handleUpdateFilmForm = async (filmId) => {
    const selectedFilm = await fetch(URL + `/${filmId}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
    setMovieSelected(selectedFilm);
  };

  const handleUpdateFilm = async (filmData) => {
    const res = await fetch(`${URL}/${filmData.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(filmData),
    });

    if (res.ok) {
      setMovieSelected({ id: "", name: "", year: "", film_poster: "" });
      setReloadFilmList((prev) => !prev);
    }
  };

  return (
    <>
      <Header />
      <main className="grid">
        <section className="max-w-5xl mx-auto">
          <FormNewFilm
            url={URL}
            onAddNewFilm={handleAddNewFilm}
            onUpdateFilm={handleUpdateFilm}
            filmSelected={movieSelected}
          />
        </section>
        <section>
          <GridFilms
            url={URL}
            moviesList={filmList}
            handleDeleteClick={handleDeleteClick}
            handleUpdateFilmForm={handleUpdateFilmForm}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
