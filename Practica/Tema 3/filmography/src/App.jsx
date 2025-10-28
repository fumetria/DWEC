// import "./App.css";
// import { peliculas } from "./utils/films.js";
import FormNewFilm from "./components/FormNewFilm.jsx";
import GridFilms from "./components/GridFilms.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import { useEffect, useState } from "react";

function App() {
  const URL = "https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/films";
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Error al obtener datos");
        const data = await res.json();
        setFilmList(data);
      } catch (err) {
        console.error(err);
        setFilmList([]);
      }
    };
  }, [filmList]);

  const handleAddNewFilm = (newFilm) => {
    setFilmList((prevFilmList) => [...prevFilmList, newFilm]);
  };

  return (
    <>
      <Header />
      <main>
        <section className="max-w-5xl mx-auto">
          <FormNewFilm
            url={URL}
            method={"POST"}
            onAddNewFilm={handleAddNewFilm}
          />
          <GridFilms url={URL} moviesList={filmList} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
