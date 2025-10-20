import RButton from "./RButton.jsx";

function Input({ label, type, placeHolder }) {
  return (
    <>
      <div className="p-3 my-2 w-full flex flex-col justify-start">
        <label className="uppercase font-bold text-left mb-1" htmlFor={label}>
          {label}
        </label>
        <input
          className="px-3 py-2 rounded border border-gray-300 text-gray-300 bg-gray-600 focus:border-green-300 focus:outline-2 outline-green-300"
          type={type ? type : "text"}
          id={label}
          name={label}
          placeholder={placeHolder}
        />
      </div>
    </>
  );
}

export default function FormNewFilm({ url, method }) {
  return (
    <>
      <div className="bg-gray-800 rounded p-3 my-2 border border-gray-400">
        <form action={url} method={method}>
          <div className="flex w-full">
            <Input label="name" placeHolder="Film Name" />
            <Input label="year" type="number" placeHolder="Year" />
          </div>
          <Input label="film_poster" placeHolder="Film Poster" />
          <RButton type="submit" label="Crear" bgOn={true} />
        </form>
      </div>
    </>
  );
}
