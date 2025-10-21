import RButton from "./RButton.jsx";

export default function Film({ id, name, year, filmPoster }) {
  return (
    <>
      <div
        className="flex flex-col border border-blue-400 bg-blue-900 py-2 px-1 w-52 h-100 rounded"
        key={id}
      >
        <div className="flex justify-end">
          <RButton label={"X"} bgOn={false} />
        </div>
        <div className="flex items-center justify-center">
          <img
            src={filmPoster}
            alt={name}
            className="h-65 rounded border border-blue-400 object-cover"
          />
        </div>
        <div className="my-2 mx-2">
          <h3 className="font-bold">{name}</h3>
          <p>{year}</p>
        </div>
        <div className="flex justify-center">
          <RButton label={"Update"} bgOn={true} />
        </div>
      </div>
    </>
  );
}
