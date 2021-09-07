import { setError } from "./actions";
import { SET_ERROR } from "./types";

const initialState = null as null | TError;

export const errorReducer = (
  state = initialState,
  // тут норм все вывелось. видимо с union работает по-другому
  action: typeof setError extends (e: TError) => infer R ? R : never
) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
