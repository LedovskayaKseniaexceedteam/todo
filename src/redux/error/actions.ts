import { SET_ERROR } from "./types";

export const setError = (e: TError) => ({
  type: SET_ERROR,
  payload: e.message,
});
