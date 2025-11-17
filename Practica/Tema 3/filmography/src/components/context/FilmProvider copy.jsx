import { useState, useEffect } from "react";
import { FilmContext } from "./FilmContext";

export function FilmProvider({ children }) {
  const [filmList, setFilmList] = useState([]);
  const [reloadFilmList, setReloadFilmList] = useState(false);
  const [filmSelected, setFilmSelected] = useState({
    id: "",
    name: "",
    year: "",
    film_poster: "",
    genres: "",
  });
  const URL = "https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/films";
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
    console.log(selectedFilm);
    setFilmSelected(selectedFilm);
    console.log();
  };

  const handleUpdateFilm = async (filmData) => {
    const res = await fetch(`${URL}/${filmData.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(filmData),
    });

    if (res.ok) {
      setFilmSelected({
        id: "",
        name: "",
        year: "",
        film_poster: "",
        genres: "",
      });
      setReloadFilmList((prev) => !prev);
    }
  };
  return (
    <FilmContext.Provider
      value={{
        filmList,
        setFilmList,
        reloadFilmList,
        setReloadFilmList,
        filmSelected,
        setFilmSelected,
        handleDeleteClick,
        handleUpdateFilmForm,
        handleUpdateFilm,
        handleAddNewFilm,
        URL,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}
