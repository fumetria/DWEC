export default function Input({ label, type, placeHolder, value, onChange }) {
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
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
