import FormNewFilm from "./components/FormNewFilm.jsx";
import GridFilms from "./components/GridFilms.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import { useContext } from "react";
import { FilmContext } from "./components/context/FilmContext.jsx";
import { GenreProvider } from "./components/context/GenreProvider.jsx";

function App() {
  const { filmList, filmSelected } = useContext(FilmContext);

  return (
    <>
      <Header />
      <main className="grid">
        <section className="max-w-5xl mx-auto">
          <GenreProvider>
            <FormNewFilm filmSelected={filmSelected} />
          </GenreProvider>
        </section>
        <section>
          <GridFilms moviesList={filmList} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
