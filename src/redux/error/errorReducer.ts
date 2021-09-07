import { setError } from "./actions";
import { SET_ERROR } from "./types";

const initialState = null as null | TError;
export type ErrorInitialState = typeof initialState;

export const errorReducer = (
  state = initialState,
  action: typeof setError extends (e: TError) => infer R ? R : never
) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
