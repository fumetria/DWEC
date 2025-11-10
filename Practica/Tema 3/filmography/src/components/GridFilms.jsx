// import { useState } from "react";
import Film from "./Film.jsx";

export default function GridFilms({ moviesList }) {
  return (
    <>
      <div
        id="movies-data"
        className="flex flex-wrap justify-center gap-4 my-5"
      >
        {moviesList.map((movie) => {
          return <Film film={movie} />;
        })}
      </div>
    </>
  );
}
