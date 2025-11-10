import { createContext, useState, useEffect } from "react";

export const FilmContext = createContext();

export function FilmProvider({ children }) {
  const [filmList, setFilmList] = useState([]);
  const [reloadFilmList, setReloadFilmList] = useState(false);
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
  return (
    <FilmContext.Provider
      value={{ filmList, setFilmList, reloadFilmList, setReloadFilmList }}
    >
      {children}
    </FilmContext.Provider>
  );
}
