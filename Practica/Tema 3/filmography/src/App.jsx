import "./App.css";
import { peliculas } from "./utils/films.js";
import FormNewFilm from "./components/FormNewFilm.jsx";
import GridFilms from "./components/GridFilms.jsx";

function App() {
  return (
    <>
      <h1 className="my-4 text-5xl font-semibold">Filmography</h1>
      <FormNewFilm url={"#"} method={"GET"} />
      <GridFilms moviesList={peliculas} />
    </>
  );
}

export default App;
