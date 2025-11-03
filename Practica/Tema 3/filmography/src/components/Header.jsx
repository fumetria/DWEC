import HeaderLogo from "./HeaderLogo";
import NavLink from "./NavLink";

export default function Header() {
  return (
    <>
      <header className="bg-blue-900 border-b border-blue-400 mb-4">
        <section className="flex flex-row justify-between items-center max-w-5xl mx-auto py-2">
          <div className="flex gap-2">
            <HeaderLogo />
            <h1 className="text-2xl font-semibold">Filmography</h1>
          </div>
          <nav>
            <ul className="flex gap-2">
              <NavLink label={"inicio"} />
              <NavLink label={"Contacto"} />
              <NavLink label={"Películas"} active={true} />
            </ul>
          </nav>
        </section>
      </header>
    </>
  );
}
