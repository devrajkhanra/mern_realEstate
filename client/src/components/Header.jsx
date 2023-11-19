import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-semibold text-sm sm:text-4xl flex flex-wrap">
            <span className="text-blue-900">Real</span>
            <span className="text-blue-400">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-50 p-3 rounded-3xl flex items-center">
          <input
            type="search"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-400" />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>

          <Link to="/signin">
            <li className="hidden sm:inline text-slate-700 hover:underline">SignIn</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
