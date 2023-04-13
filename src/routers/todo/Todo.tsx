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
  }, []);

  useEffect(() => {
    if (window) {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/signin");
      }

      refreshTodos();
    }
  }, []);

  return (
    <>
      <TodoInput refreshTodos={refreshTodos} />
      <ul>
        {todos?.map((todo) => (
          <TodoItem refreshTodos={refreshTodos} key={todo.id} data={todo} />
        ))}
      </ul>
    </>
  );
};

export default TodoPage;
