export default function NavLink({ label, active }) {
  const style = active
    ? "border-b-2 border-green-300"
    : "hover:border-b border-green-500";

  return (
    <li className={style}>
      <a href="#" className="capitalize">
        {label}
      </a>
    </li>
  );
}
