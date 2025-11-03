// import { useState } from "react";
import Film from "./Film.jsx";

export default function GridFilms({
  moviesList,
  handleDeleteClick,
  handleUpdateFilmForm,
}) {
  return (
    <>
      <div
        id="movies-data"
        className="flex flex-wrap justify-center gap-4 my-5"
      >
        {moviesList.map((movie) => {
          return (
            <Film
              key={movie.id}
              id={movie.id}
              name={movie.name}
              year={movie.year}
              filmPoster={movie.film_poster}
              genres={movie.genres}
              handleDeleteClick={() => handleDeleteClick(movie.id)}
              handleUpdateFilmForm={() => handleUpdateFilmForm(movie.id)}
            />
          );
        })}
      </div>
    </>
  );
}
