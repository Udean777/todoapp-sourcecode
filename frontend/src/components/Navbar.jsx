import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";

export default function Navbar() {
  return (
    <header className="bg-slate-100 p-5 flex justify-center px-64 dark:text-slate-50 dark:bg-slate-700">
      <div className="container">
        <Link to="/">
          <h1 className="font-bold text-2xl ">Your Todo</h1>
        </Link>
      </div>
      <DarkMode />
    </header>
  );
}
