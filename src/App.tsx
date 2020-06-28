/** @jsx jsx */
import "antd/dist/antd.css";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { jsx } from "@emotion/core";
import { Card, Divider } from "antd";

import "./styles.css";
import { DynamicFieldSet } from "./components/Todos";
import { TodoItem } from "./components/Todo";
import { TodosState, TodoAction } from "./store";
import { Todo } from "./types";

const mapStateToProps = (state: TodosState) => ({
  todos: state.todos,
  error: state.error
});

const mapDispatchToProps = (dispatch: Dispatch<TodoAction>) => {
  return {
    onComplete: (todo: Todo) =>
      dispatch({
        type: "TODO_COMPLETE_REQ",
        payload: todo
      }),
    onAddNewTodos: (todos: Todo[]) =>
      dispatch({
        type: "ADD_TODOS_REQ",
        payload: todos
      })
  };
};

type AppProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const App = (props: AppProps) => {
  const { onComplete, onAddNewTodos, todos, error } = props;
  const handleComplete = (todo: Todo) => {
    console.log({ todo });
    onComplete(todo);
  };

  const handleSubmit = ({ names }: { names: string[] }) => {
    onAddNewTodos(names.map(name => ({ name, status: "todo" })));
  };

  return (
    <div
      css={{
        padding: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#F9C784",
        height: "100%"
      }}
    >
      <Card bordered={false} css={{ width: 400 }}>
        <h3>To do</h3>
        {error && (
          <p
            css={{
              color: "red"
            }}
          >
            {error}
          </p>
        )}
        <Divider />
        {todos.map(todo => (
          <TodoItem key={todo.name} todo={todo} onChange={handleComplete} />
        ))}
        <Divider />
        <DynamicFieldSet onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
