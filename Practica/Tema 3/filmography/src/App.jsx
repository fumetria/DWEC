// import "./App.css";
import { peliculas } from "./utils/films.js";
import FormNewFilm from "./components/FormNewFilm.jsx";
import GridFilms from "./components/GridFilms.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="max-w-5xl mx-auto">
          <FormNewFilm url={"#"} method={"GET"} />
          <GridFilms moviesList={peliculas} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
