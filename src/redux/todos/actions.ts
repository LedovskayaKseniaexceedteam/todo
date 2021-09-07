import { Action, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../";
import { setError } from "../error/actions";
import { setLoading } from "../loading/actions";

import { REMOVE_ALL_DONE, REMOVE_TODO, SET_TODOS, TOGGLE_TODO } from "./types";

const TIMEOUT_IN_SEC = 5;

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

function timeout(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

const apiKey = "788d7b49-586a-4edc-93eb-2de97ab9b41c";
const baseURL = "https://exceed-todo-list.herokuapp.com/api/v1";

export const getAllTodos = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setLoading({ isLoading: true }));
    const response = await Promise.race([
      fetch(`${baseURL}/todos`, {
        method: "GET",
        headers: {
          apiKey,
        },
      }),
      timeout(TIMEOUT_IN_SEC).then(() => {
        throw new Error("Request took too long");
      }),
    ]);
    if (response.ok) {
      const result = await response.json();
      dispatch(set(result));
    } else {
      const result = await response.json();
      throw new Error(result.error);
    }
  } catch (e: any) {
    dispatch(setError(e.message || e));
  } finally {
    dispatch(setLoading({ isLoading: false }));
  }
};
export const removeAllTodos = () => (dispatch: Dispatch) => {
  dispatch(setError(null));
  dispatch(setLoading({ isLoading: true, target: "all" }));
  Promise.race([
    fetch(`${baseURL}/todos/clear-done`, {
      method: "DELETE",
      headers: {
        apiKey,
      },
    }),

    timeout(TIMEOUT_IN_SEC).then(() => {
      throw new Error("Request took too long");
    }),
  ])
    .then(async (response) => {
      if (response.ok) {
        dispatch(removeAllDone());
      } else {
        const result = await response.json();
        throw new Error(result.error);
      }
    })
    .catch((e) => {
      dispatch(setError(e.message || e));
    })
    .finally(() => {
      dispatch(setLoading({ isLoading: false }));
    });
};
export const addTodo =
  (title: Todo["title"]) => async (dispatch: Dispatch<Action<any>>) => {
    try {
      dispatch(setError(null));
      dispatch(setLoading({ isLoading: true }));
      const response = await Promise.race([
        fetch(`${baseURL}/todos`, {
          method: "POST",
          headers: {
            apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }),
        timeout(TIMEOUT_IN_SEC).then(() => {
          throw new Error("Request took too long");
        }),
      ]);
      if (response.ok) {
        (dispatch as ThunkDispatch<AppState, unknown, Action<any>>)(
          getAllTodos()
        );
      } else {
        const result = await response.json();
        throw new Error(result.message);
      }
    } catch (e: any) {
      dispatch(setError(e.message || e));
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  };
export const toggleTodo = (id: Todo["_id"]) => (dispatch: Dispatch) => {
  dispatch(setError(null));
  dispatch(
    setLoading({
      isLoading: true,
      target: id,
    })
  );
  Promise.race([
    fetch(`${baseURL}/todos/${id}/done`, {
      method: "PUT",
      headers: {
        apiKey,
      },
    }),
    timeout(TIMEOUT_IN_SEC).then(() => {
      throw new Error("Request took too long");
    }),
  ])
    .then(async (response) => {
      if (response.ok) {
        dispatch(toggle(id));
      } else {
        const result = await response.json();
        throw new Error(result.error);
      }
    })
    .catch((e) => {
      dispatch(setError(e.message || e));
    })
    .finally(() => {
      dispatch(setLoading({ isLoading: false }));
    });
};
export const removeTodo = (id: Todo["_id"]) => (dispatch: Dispatch) => {
  dispatch(setError(null));
  dispatch(setLoading({ isLoading: true, target: id }));
  Promise.race([
    fetch(`${baseURL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        apiKey,
      },
    }),
    timeout(TIMEOUT_IN_SEC).then(() => {
      throw new Error("Request took too long");
    }),
  ])
    .then(async (response) => {
      if (response.ok) {
        dispatch(remove(id));
      } else {
        const result = await response.json();
        throw new Error(result.error);
      }
    })
    .catch((e) => {
      dispatch(setError(e.message || e));
    })
    .finally(() => {
      dispatch(setLoading({ isLoading: false }));
    });
};
