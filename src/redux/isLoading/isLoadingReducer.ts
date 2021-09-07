import { SET_IS_LOADING } from "./types";
import { setIsLoading } from "./actions";

const initialState = {
  state: false,
  target: null as "all" | null | Todo["_id"],
};

export type IsLoadingInitialState = typeof initialState;

export const isLoadingReducer = (
  state = initialState,
  action: typeof setIsLoading extends (payload: typeof initialState) => infer R
    ? R
    : never
) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.payload;
    default:
      return state;
  }
};
