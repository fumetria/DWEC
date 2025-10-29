import RButton from "./RButton.jsx";
import { useEffect, useState } from "react";
import FormInput from "./FormInput.jsx";

export default function FormNewFilm({
  url,
  onAddNewFilm,
  onUpdateFilm,
  filmSelected,
}) {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    film_poster: "",
  });

  useEffect(() => setFormData(filmSelected), [filmSelected]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.id) {
      await onUpdateFilm(formData);
    } else {
      await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      onAddNewFilm();
    }

    setFormData({ name: "", year: "", film_poster: "" });
  };

  return (
    <>
      <div className="bg-gray-800 rounded p-3 my-2 border border-gray-400">
        <form onSubmit={handleSubmit}>
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
          <FormInput
            label="film_poster"
            placeHolder="Film Poster"
            value={formData.film_poster}
            onChange={handleChange}
          />
          <div className="flex justify-center items-center">
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
