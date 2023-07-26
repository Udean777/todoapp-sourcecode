import { useEffect, useState } from "react";
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/TodoForm";
import { useTodosContext } from "../hooks/useTodosContext";

export default function Home() {
  const { todos, dispatch } = useTodosContext();
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:3000/api/todolist");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="home px-64 py-10 flex gap-4">
      <div className="bg-slate-100 dark:bg-slate-700 shadow-sm rounded-lg">
        <h1 className="text-center m-auto p-2 font-bold text-2xl backdrop-blur-sm bg-blue-500/30 w-40 rounded-b-lg shadow-sm">
          To Do List
        </h1>
        {todos &&
          todos.map((todo) => <TodoDetails key={todo._id} todo={todo} />)}
      </div>
      <TodoForm />
    </div>
  );
}
