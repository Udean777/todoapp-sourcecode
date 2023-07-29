import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-slate-100 p-5 flex justify-center px-64 dark:text-slate-50 dark:bg-slate-700">
      <div className="container">
        <Link to="/">
          <h1 className="font-bold text-2xl ">Your Todo</h1>
        </Link>
      </div>
      <nav className="px-5 flex gap-3">
        {user && (
          <div className="flex gap-2 p-1 font-bold">
            <span className="pt-1">{user.email}</span>
            <button
              className="bg-blue-500 p-1 text-white font-bold rounded-md hover:scale-105 transition ease-in-out"
              onClick={handleClick}
            >
              Logout
            </button>
          </div>
        )}
        {!user && (
          <div className="flex justify-end gap-3">
            <Link
              to="/login"
              className="bg-blue-500 p-1 text-white font-bold rounded-md hover:scale-105 transition ease-in-out"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-500 p-1 text-white font-bold rounded-md hover:scale-105 transition ease-in-out"
            >
              Signup
            </Link>
          </div>
        )}
      </nav>
      <DarkMode />
    </header>
  );
};

export default Navbar;
