import RButton from "./RButton.jsx";
import { useEffect, useState, useContext } from "react";
import FormInput from "./FormInput.jsx";
import { FilmContext } from "./FilmContext.jsx";

export default function FormNewFilm() {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    film_poster: "",
    genres: "",
  });
  const { handleAddNewFilm, handleUpdateFilm, URL, filmSelected } =
    useContext(FilmContext);
  const [genresList, setGenresList] = useState([]);
  const [nGenre, setNGenre] = useState("");

  useEffect(() => {
    let gList = [];
    //Amb aquest condicional, ens asegurem que no aparega cap genre buit
    //if (filmSelected.genres != "" || filmSelected.genres != null)
    //Amb la expressió anterior ens generava un genre buit...
    if (filmSelected) {
      if (filmSelected.genres != "" && filmSelected.genres != null) {
        gList = filmSelected.genres.split(",").map((genre) => genre.trim());
      }
      setFormData(filmSelected);
      setGenresList(gList);
    }
  }, [filmSelected]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id == "genre") {
      setNGenre(value);
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // unim els genres en un string per a poder afegir-les a les dades
    // per a enviar a la nostra API
    const genrelist = genresList.join(",");
    const dataSubmit = { ...formData, genres: genrelist };
    if (formData.id) {
      await handleUpdateFilm(dataSubmit);
    } else {
      await fetch(URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(dataSubmit),
      });
      handleAddNewFilm();
    }
    setFormData({ name: "", year: "", film_poster: "", genres: "" });
    setGenresList([]);
  };

  const handleCreateGenre = () => {
    if (!nGenre || genresList.some((genre) => genre === nGenre)) return;
    setGenresList((prevState) => [...prevState, nGenre]);
    setNGenre("");
  };

  const handleDeleteGenre = (genre) => {
    const updateGenreList = genresList.filter((gen) => gen != genre);
    setGenresList(updateGenreList);
  };
  return (
    <>
      <div className="bg-gray-800 rounded p-3 my-2 border border-gray-400">
        <form
          onSubmit={handleSubmit}
          className="grid grid-rows-[auto_auto_1fr_auto]"
        >
          <div className="flex w-full">
            <FormInput
              label="name"
              placeHolder="Film Name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormInput
              label="year"
              type="number"
              placeHolder="Year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <FormInput
              label="film_poster"
              placeHolder="Film Poster"
              value={formData.film_poster}
              onChange={handleChange}
            />
          </div>
          <div className="my-3 ms-3 " id="form-genres-block">
            <label
              htmlFor="genre"
              className="uppercase font-bold text-left mb-1"
            >
              genres
            </label>
            <div className="border rounded border-gray-300 w-fit text-gray-300 bg-gray-600 focus-within:border-green-300 focus-within:outline-2 outline-green-300">
              <input
                type="text"
                placeholder="Film Genre"
                className="bg-none outline-none ms-3"
                name="genre"
                id="genre"
                value={nGenre}
                onChange={handleChange}
              />
              <button
                onClick={() => handleCreateGenre()}
                className="bg-green-600 size-9 rounded-e text-2xl font-semibold hover:bg-green-500 cursor-pointer"
                type="button"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap my-4" id="form-genres-list">
              {genresList.length > 0 &&
                genresList.map((genre) => (
                  <div
                    className="bg-blue-700 border border-blue-300 px-2 py-1 m-1 rounded capitalize text-white"
                    key={genre}
                  >
                    {genre}{" "}
                    <span>
                      <button
                        type="button"
                        className="cursor-pointer hover:font-bold"
                        onClick={() => handleDeleteGenre(genre)}
                      >
                        x
                      </button>
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex my-2 justify-center items-center">
            <RButton
              type="submit"
              label={formData.id ? "Actualizar" : "Crear"}
              bgOn={true}
              btnTittle={formData.id ? "Actualizar Película" : "Nueva Película"}
            />
          </div>
        </form>
      </div>
    </>
  );
}
