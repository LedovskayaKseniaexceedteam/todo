import { SET_IS_LOADING } from "./types";
import { setLoading } from "./actions";

const initialState = {
  isLoading: false,
  target: null as "all" | null | Todo["_id"] | Todo["_id"][],
};

export type InitialState = typeof initialState;

export const loadingReducer = (
  state = initialState,
  action: typeof setLoading extends (payload: typeof initialState) => infer R
    ? R
    : never
): typeof initialState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.payload;
    default:
      return state;
  }
};
