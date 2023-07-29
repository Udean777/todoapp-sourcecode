import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `http://localhost:3000/api/todolist/${todo._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODOS", payload: json });
    }
  };

  return (
    <div className="p-5 w-104 backdrop-blur-sm bg-blue-500/30 m-5 rounded-lg hover:scale-105 transition-all ease-linear">
      <div className="py-2">
        <h1 className="text-xl font-bold shadow-sm text-slate-50">
          {todo.title}
        </h1>
        <p>
          <strong>Minutes : </strong>
          {todo.time}
        </p>
        <p className="border-b-2">
          <strong>Describe it : </strong>
          {todo.describe}
        </p>
      </div>
      <button
        className="bg-red-500 p-1 rounded-lg text-white hover:scale-105 transition ease-in-out"
        onClick={handleClick}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoDetails;
