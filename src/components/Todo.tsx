/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Checkbox } from "antd";
import { Todo } from "./types";

type TodoItemProps = {
  todo: Todo;
  onChange: (todo: Todo) => void;
};
export const TodoItem = ({ todo, onChange }: TodoItemProps) => {
  const disabled = todo.status === "done";
  return (
    <div
      css={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "none" : "pointer",
        paddingBottom: 8
      }}
    >
      <label>
        <Checkbox
          disabled={disabled}
          checked={disabled || undefined}
          onChange={() => onChange(todo)}
        />
        <span css={{ marginLeft: 5 }}>
          {disabled ? <s>{todo.name}</s> : todo.name}
        </span>
      </label>
    </div>
  );
};
