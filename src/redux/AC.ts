import { Dispatch } from "redux";
import * as TYPES from "./types";

const apiKey = "788d7b49-586a-4edc-93eb-2de97ab9b41c";
const baseURL = "https://exceed-todo-list.herokuapp.com/api/v1";

export const getTodos = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`${baseURL}/todos`, {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
        Accept: "application/json",
      },
    });
    const result = await response.json();
    dispatch({
      type: TYPES.SET_TODOS,
      payload: result,
    });
  } catch (e) {
    setError(e as Error);
  }
};
export const removeAllTodos = () => (dispatch: Dispatch) => {
  fetch(`${baseURL}/todos/clear-done`, {
    method: "DELETE",
    headers: {
      "X-API-KEY": apiKey,
      Accept: "application/json",
    },
  })
    .then(() => {
      dispatch({
        type: TYPES.REMOVE_ALL,
      });
    })
    .catch((e) => {
      setError(e);
    });
};
export const addTodo = (todo: Todo["title"]) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`${baseURL}/todos`, {
      method: "POST",
      headers: {
        apikey: apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ title: "test" }),
    });
    const result = await response.json();
    dispatch({
      type: TYPES.ADD_TODO,
      payload: result,
    });
  } catch (e) {
    setError(e as Error);
  }
};
export const toggleTodo = (id: Todo["_id"]) => (dispatch: Dispatch) => {
  fetch(`${baseURL}/todos/${id}/done`, {
    method: "PUT",
    headers: {
      "X-API-KEY": apiKey,
      Accept: "application/json",
    },
  })
    .then(() => {
      dispatch({
        type: TYPES.TOGGLE_TODO,
        payload: id,
      });
    })
    .catch((e) => {
      setError(e);
    });
};
export const removeTodo = (id: Todo["_id"]) => (dispatch: Dispatch) => {
  fetch(`${baseURL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "X-API-KEY": apiKey,
      Accept: "application/json",
    },
  })
    .then(() => {
      dispatch({
        type: TYPES.REMOVE_TODO,
        payload: id,
      });
    })
    .catch((e) => {
      setError(e);
    });
};

const setError = (e: Error) => ({
  type: TYPES.SET_ERROR,
  error: e.message,
});
