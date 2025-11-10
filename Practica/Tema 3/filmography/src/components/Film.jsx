import { useEffect, useState, useContext } from "react";
import RButton from "./RButton.jsx";
import { FilmContext } from "./FilmContext.jsx";

export default function Film({ film }) {
  const [genresList, setGenresList] = useState([]);
  const { handleDeleteClick, handleUpdateFilmForm } = useContext(FilmContext);
  useEffect(() => {
    if (film.genres) {
      const gList = film.genres.split(",");
      setGenresList(gList);
    }
  }, [film.genres]);

  return (
    <>
      <div
        className="grid grid-rows-[auto_1fr_auto_auto_auto] border border-blue-400 bg-blue-900 py-2 px-1 w-64 rounded"
        key={film.id}
      >
        <div className="flex justify-end">
          <RButton
            label={"X"}
            bgOn={false}
            onClick={() => handleDeleteClick(film.id)}
            btnTittle={"Eliminar película"}
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src={film.film_poster}
            alt={film.name}
            className="h-65 rounded border border-blue-400 object-cover"
          />
        </div>
        <div className="my-2 mx-2">
          <h3 className="font-bold">{film.name}</h3>
          <p>{film.year}</p>
        </div>
        <div className="flex flex-wrap my-4">
          {genresList.length > 0 &&
            genresList.map((genre) => (
              <div
                className="bg-blue-700 border border-blue-300 px-2 py-1 m-1 rounded capitalize text-white"
                key={genre}
              >
                <p>{genre}</p>
              </div>
            ))}
        </div>
        <div className="flex justify-center">
          <RButton
            label={"Actualizar"}
            bgOn={true}
            onClick={() => handleUpdateFilmForm(film.id)}
          />
        </div>
      </div>
    </>
  );
}
