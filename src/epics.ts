import { TodoAction, TodosState } from "./store";
import { Epic, combineEpics } from "redux-observable";
import { filter, catchError, map } from "rxjs/operators";
import * as actions from "./actions";
import { isOfType } from "typesafe-actions";
import { of } from "rxjs";

export const completeTodoEpic: Epic<TodoAction, TodoAction, TodosState, {}> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType("TODO_COMPLETE_REQ")),
    map(action => actions.completeTodoSuccess(action.payload))
  );

export const addTodosEpic: Epic<TodoAction, TodoAction, TodosState, {}> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType("ADD_TODOS_REQ")),
    map(action => {
      action.payload.forEach(todo => {
        if (state$.value.todos.find(t => t.name === todo.name)) {
          throw new Error(`To do item: "${todo.name}" already in the list`);
        }
      });
      return actions.addTodosSuccess(action.payload);
    }),
    catchError(err => of(actions.addTodosError(err.message)))
  );

export const rootEpic = combineEpics(completeTodoEpic, addTodosEpic);
