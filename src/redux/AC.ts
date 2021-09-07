import { Action, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from ".";
import { setError } from "./error/actions";
import { remove, removeAllDone, set, toggle } from "./todos/actions";
import { setIsLoading } from "./isLoading/actions";

const apiKey = "788d7b49-586a-4edc-93eb-2de97ab9b41c";
const baseURL = "https://exceed-todo-list.herokuapp.com/api/v1";

export const getAllTodos = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setIsLoading({ state: true }));
    const response = await fetch(`${baseURL}/todos`, {
      method: "GET",
      headers: {
        apiKey,
      },
    });
    if (response.ok) {
      const result = await response.json();
      dispatch(set(result));
    }
  } catch (e) {
    setError(e as Error);
  } finally {
    dispatch(setIsLoading({ state: false }));
  }
};
export const removeAllTodos = () => (dispatch: Dispatch) => {
  dispatch(setIsLoading({ state: true, target: "all" }));
  fetch(`${baseURL}/todos/clear-done`, {
    method: "DELETE",
    headers: {
      apiKey,
    },
  })
    .then((response) => {
      if (response.ok) dispatch(removeAllDone());
    })
    .catch((e) => {
      setError(e);
    })
    .finally(() => {
      dispatch(setIsLoading({ state: false }));
    });
};
export const addTodo =
  (title: Todo["title"]) => async (dispatch: Dispatch<Action<any>>) => {
    try {
      dispatch(setIsLoading({ state: true }));
      const response = await fetch(`${baseURL}/todos`, {
        method: "POST",
        headers: {
          apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (response.ok) {
        (dispatch as ThunkDispatch<AppState, unknown, Action<any>>)(
          getAllTodos()
        );
      }
    } catch (e) {
      setError(e as Error);
    }
  };
export const toggleTodo = (id: Todo["_id"]) => (dispatch: Dispatch) => {
  dispatch(setIsLoading({ state: true, target: id }));
  fetch(`${baseURL}/todos/${id}/done`, {
    method: "PUT",
    headers: {
      apiKey,
    },
  })
    .then((response) => {
      if (response.ok) dispatch(toggle(id));
    })
    .catch((e) => {
      setError(e);
    })
    .finally(() => {
      dispatch(setIsLoading({ state: false }));
    });
};
export const removeTodo = (id: Todo["_id"]) => (dispatch: Dispatch) => {
  dispatch(setIsLoading({ state: true, target: id }));
  fetch(`${baseURL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      apiKey,
    },
  })
    .then((response) => {
      if (response.ok) dispatch(remove(id));
    })
    .catch((e) => {
      setError(e);
    })
    .finally(() => {
      dispatch(setIsLoading({ state: false }));
    });
};
