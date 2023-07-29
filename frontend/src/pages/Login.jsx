import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className="py-20" onSubmit={handleSubmit}>
      <div className="m-auto w-96 bg-slate-100 dark:bg-slate-700 shadow-sm rounded-lg">
        <div className="m-auto flex justify-center">
          <h1 className="text-center m-auto p-2 font-bold text-2xl backdrop-blur-sm bg-blue-500/30 w-40 rounded-b-lg shadow-sm">
            Log in
          </h1>
        </div>
        <div className="py-10 grid grid-cols-1 w-72 m-auto">
          <label className="font-bold">Email :</label>
          <input
            className="rounded-md dark:text-black border-2"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label className="font-bold pt-5">Password :</label>
          <input
            className="rounded-md dark:text-black border-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="m-auto text-center py-5">
          <button
            disabled={isLoading}
            className="bg-blue-500 text-white p-2 rounded-lg font-bold hover:scale-105 transition ease-in-out"
          >
            Login
          </button>
          {error && <div>{error}</div>}
        </div>
      </div>
    </form>
  );
};

export default Login;
