import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkmode", newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };
  return (
    <div className="flex justify-center">
      <button onClick={toggleDarkMode}>
        {darkMode ? <FaSun size={25} /> : <FaMoon size={25} />}
      </button>
    </div>
  );
};

export default DarkMode;
