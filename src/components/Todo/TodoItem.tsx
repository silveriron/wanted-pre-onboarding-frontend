import { useCallback, useState } from "react";
import { Todo } from "../../types/todo";
import useApi from "../../hooks/useApi";
import useInput from "../../hooks/useInput";

interface TodoItemProps {
  data: Todo;
  refreshTodos: () => void;
}

const TodoItem = ({ data, refreshTodos }: TodoItemProps) => {
  const { isCompleted, todo, id } = data;
  const [isComplete, setIsComplete] = useState(isCompleted);
  const [isModify, setIsModify] = useState(false);
  const { updataTodoHandler } = useApi();
  const { value: newTodo, onChange: onChangeNewTodo } = useInput({
    init: todo,
  });

  const completeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    const res = await updataTodoHandler(id, { isCompleted: checked, todo });
    setIsComplete(checked);
  };

  const toggleModify = () => {
    setIsModify((prev) => !prev);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await updataTodoHandler(id, { isCompleted, todo: newTodo });
    refreshTodos();
    setIsModify((prev) => !prev);
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={isComplete}
          onChange={completeHandler}
        />
        {isModify ? (
          <input
            data-testid="modify-input"
            type="text"
            value={newTodo}
            onChange={onChangeNewTodo}
          />
        ) : (
          <span>{todo}</span>
        )}
      </label>
      {isModify ? (
        <button data-testid="submit-button" onClick={onSubmit}>
          제출
        </button>
      ) : (
        <button data-testid="modify-button" onClick={toggleModify}>
          수정
        </button>
      )}
      <button data-testid="delete-button">삭제</button>
    </li>
  );
};

export default TodoItem;
