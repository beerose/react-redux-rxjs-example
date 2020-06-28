import { action } from "typesafe-actions";
import { Todo } from "./types";

export const completeTodoReq = (payload: Todo) =>
  action("TODO_COMPLETE_REQ", payload);
export const completeTodoSuccess = (payload: Todo) =>
  action("TODO_COMPLETE_SUCCESS", payload);
export const completeTodoError = (payload: string) =>
  action("TODO_COMPLETE_ERROR", payload);

export const addTodosReq = (payload: Todo[]) =>
  action("ADD_TODOS_REQ", payload);
export const addTodosSuccess = (payload: Todo[]) =>
  action("ADD_TODOS_SUCCESS", payload);
export const addTodosError = (payload: string) =>
  action("ADD_TODOS_ERROR", payload);
