import { REMOVE_ALL_DONE, REMOVE_TODO, SET_TODOS, TOGGLE_TODO } from "./types";

export const set = (todos: Todo[]) => ({
  type: SET_TODOS,
  payload: todos,
});
export const removeAllDone = () => ({
  type: REMOVE_ALL_DONE,
});
export const toggle = (id: Todo["_id"]) => ({
  type: TOGGLE_TODO,
  payload: id,
});
export const remove = (id: Todo["_id"]) => ({
  type: REMOVE_TODO,
  payload: id,
});
