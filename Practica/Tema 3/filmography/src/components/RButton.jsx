export default function RButton({ label, onClick, bgOn, btnTittle, type }) {
  const style = bgOn
    ? "flex items-center justify-center py-1 px-2 border-2 text-sm font-semibold border-green-700 bg-linear-to-b from-green-500 to-green-800 capitalize rounded hover:border-green-300 hover:bg-blue-600"
    : "py-1 px-2 text-sm capitalize cursor-pointer hover:text-green-300 hover:font-bold";
  return (
    <button
      className={style}
      onClick={onClick}
      title={btnTittle}
      type={type ? type : "button"}
    >
      {label}
    </button>
  );
}
