import React from "react";
import useInput from "../../hooks/useInput";
import useApi from "../../hooks/useApi";

const TodoInput = ({ refreshTodos }: { refreshTodos: () => void }) => {
  const { value, onChange } = useInput({});
  const { createTodoHandler } = useApi();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createTodoHandler({ todo: value });
    refreshTodos();
  };

  return (
    <form onSubmit={onSubmit}>
      <input data-testid="new-todo-input" value={value} onChange={onChange} />
      <button data-testid="new-todo-add-button">추가</button>
    </form>
  );
};

export default TodoInput;
