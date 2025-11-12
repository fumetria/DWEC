import { GenreContext } from "./GenreContext";
import { useState } from "react";

export function GenreProvider({ children }) {
  const [genresList, setGenresList] = useState([]);
  const [nGenre, setNGenre] = useState("");
  const handleCreateGenre = () => {
    if (!nGenre || genresList.some((genre) => genre === nGenre)) return;
    setGenresList((prevState) => [...prevState, nGenre]);
    setNGenre("");
  };

  const handleDeleteGenre = (genre) => {
    const updateGenreList = genresList.filter((gen) => gen != genre);
    setGenresList(updateGenreList);
  };

  return (
    <GenreContext.Provider
      value={{
        genresList,
        setGenresList,
        nGenre,
        setNGenre,
        handleCreateGenre,
        handleDeleteGenre,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
}
