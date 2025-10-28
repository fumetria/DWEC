import RButton from "./RButton.jsx";
import { useState } from "react";
import FormInput from "./FormInput.jsx";

export default function FormNewFilm({ url, method, onAddNewFilm }) {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    film_poster: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        onAddNewFilm(formData);
        setFormData({ name: "", year: "", film_poster: "" });
      }
    } catch {
      console.log("Error al crear film");
    }
  };

  return (
    <>
      <div className="bg-gray-800 rounded p-3 my-2 border border-gray-400">
        <form onSubmit={handleSubmit} method={method}>
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
            <RButton type="submit" label="Crear" bgOn={true} />
          </div>
        </form>
      </div>
    </>
  );
}
