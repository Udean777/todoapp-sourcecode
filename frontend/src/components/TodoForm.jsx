import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function TodoForm() {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [describe, setDescribe] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const todo = { title, time, describe };

    const response = await fetch("http://localhost:3000/api/todolist", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setTime("");
      setDescribe("");
      setError(null);
      setEmptyFields([]);
      console.log("New todo added", json);
      dispatch({ type: "CREATE_TODOS", payload: json });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-80 bg-slate-100 p-7 rounded-lg dark:bg-slate-800"
    >
      <h1 className="font-bold text-xl">Add Your Todo List</h1>
      <div className="py-5">
        <label className="text-sm">What you gonna do today : </label>
        <input
          className={
            emptyFields.includes("title")
              ? "rounded-md dark:text-black border-2 border-red-500"
              : ""
          }
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <div className="py-4">
          <label className="text-sm">How much time you spend : </label>
          <input
            className={
              emptyFields.includes("time")
                ? "rounded-md dark:text-black border-2 border-red-500"
                : ""
            }
            type="text"
            onChange={(e) => {
              setTime(e.target.value);
            }}
            value={time}
          />
        </div>

        <label className="text-sm">Describe it mate : </label>
        <input
          className={
            emptyFields.includes("describe")
              ? "rounded-md dark:text-black border-2 border-red-500"
              : ""
          }
          type="text"
          onChange={(e) => {
            setDescribe(e.target.value);
          }}
          value={describe}
        />
      </div>

      <div className="pb-5">
        <button className="bg-blue-500 p-1 rounded-lg text-white hover:scale-105 transition ease-in-out">
          Add Todo
        </button>
      </div>
      {error && (
        <div className="bg-red-500 bg-opacity-20 border-2 border-red-500 text-red-500 p-2 rounded-lg">
          {error}
        </div>
      )}
    </form>
  );
}
