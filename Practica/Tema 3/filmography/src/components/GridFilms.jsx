// import { useState } from "react";
import Film from "./Film.jsx";

export default function GridFilms({
  moviesList,
  handleDeleteClick,
  handleUpdateFilmForm,
}) {
  // const [movieSelected, setMovieSelected] = useState({
  //   id: "",
  //   name: "",
  //   year: "",
  //   filmPoster: "",
  // });

  // const handleClick = (movie) => {
  //   setMovieSelected((prevState) => ({
  //     ...prevState,
  //     id: movie.id,
  //     name: movie.name,
  //     year: movie.year,
  //     filmPoster: movie.film_poster,
  //   }));
  // };

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
              handleDeleteClick={() => handleDeleteClick(movie.id)}
              handleUpdateFilmForm={() => handleUpdateFilmForm(movie.id)}
            />
          );
        })}
      </div>
    </>
  );
}
