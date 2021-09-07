import * as TYPES from "./types";

export const set = (todos: Todo[]) => ({
  type: TYPES.SET_TODOS,
  payload: todos,
});
export const removeAll = () => ({
  type: TYPES.REMOVE_ALL,
});
export const add = (todo: Todo) => ({
  type: TYPES.ADD_TODO,
  payload: todo,
});
export const toggle = (id: Todo["_id"]) => ({
  type: TYPES.TOGGLE_TODO,
  payload: id,
});
export const remove = (id: Todo["_id"]) => ({
  type: TYPES.REMOVE_TODO,
  payload: id,
});
export const setError = (e: TError) => ({
  type: TYPES.SET_ERROR,
  payload: e.message,
});
export const setIsLoading = (isLoading: boolean) => ({
  type: TYPES.SET_IS_LOADING,
  payload: isLoading,
});
