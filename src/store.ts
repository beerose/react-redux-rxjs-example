import { createStore, applyMiddleware } from "redux";
import { ActionType, Reducer } from "typesafe-actions";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

import { Todo } from "./types";
import { rootEpic } from "./epics";

import * as actions from "./actions";

export type TodosState = Readonly<{
  todos: Todo[];
  error: string | null;
}>;
const initialState: TodosState = {
  todos: [
    { name: "clean houre", status: "done" },
    {
      name: "akjsdhas",
      status: "todo"
    }
  ],
  error: null
};

export type TodoAction = ActionType<typeof actions>;

export const reducer: Reducer<TodosState, TodoAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "ADD_TODOS_SUCCESS":
      console.log({ action });
      return {
        ...state,
        todos: [...state.todos, ...action.payload]
      };

    case "TODO_COMPLETE_ERROR":
    case "ADD_TODOS_ERROR":
      return {
        ...state,
        error: action.payload
      };

    case "TODO_COMPLETE_SUCCESS":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.name === action.payload.name
            ? { name: todo.name, status: "done" }
            : todo
        )
      };

    default:
      return state;
  }
};

const epicMiddleware = createEpicMiddleware<
  TodoAction,
  TodoAction,
  TodosState,
  {}
>();
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);
epicMiddleware.run(rootEpic);
