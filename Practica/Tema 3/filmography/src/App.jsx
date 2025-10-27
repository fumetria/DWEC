// import "./App.css";
import { peliculas } from "./utils/films.js";
import FormNewFilm from "./components/FormNewFilm.jsx";
import GridFilms from "./components/GridFilms.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  const URL = "https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/films";
  return (
    <>
      <Header />
      <main>
        <section className="max-w-5xl mx-auto">
          <FormNewFilm url={URL} method={"POST"} />
          <GridFilms moviesList={peliculas} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
