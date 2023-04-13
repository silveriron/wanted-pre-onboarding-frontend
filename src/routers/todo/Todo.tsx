import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { Todo } from "../../types/todo";
import TodoInput from "../../components/Todo/TodoInput";
import TodoItem from "../../components/Todo/TodoItem";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>();
  const navigate = useNavigate();
  const { getTodosHandler } = useApi();

  const refreshTodos = useCallback(async () => {
    const todos = await getTodosHandler();
    setTodos(todos);
  }, [getTodosHandler]);

  useEffect(() => {
    if (window) {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/signin");
      } else {
        refreshTodos();
      }
    }
  }, [navigate, refreshTodos]);

  return (
    <main className="h-5/6">
      <h1 className="text-center mb-10 text-3xl font-bold">Todos</h1>
      <TodoInput refreshTodos={refreshTodos} />
      <ul className="flex flex-col gap-5">
        {todos?.map((todo) => (
          <TodoItem refreshTodos={refreshTodos} key={todo.id} data={todo} />
        ))}
      </ul>
    </main>
  );
};

export default TodoPage;
