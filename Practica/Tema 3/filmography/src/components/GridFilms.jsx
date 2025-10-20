import Film from "./Film.jsx";

export default function GridFilms({ moviesList }) {
  return (
    <>
      <div id="movies-data" className="flex flex-wrap gap-4 my-5">
        {moviesList.map((movie) => {
          return (
            <Film
              id={movie.id}
              name={movie.name}
              year={movie.year}
              filmPoster={movie.image}
            />
          );
        })}
      </div>
    </>
  );
}
