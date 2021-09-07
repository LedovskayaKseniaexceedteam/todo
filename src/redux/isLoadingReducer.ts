import { SET_IS_LOADING } from "./types";
import { setIsLoading } from "./actions";

const initialState = false;

export const isLoadingReducer = (
  state = initialState,
  action: typeof setIsLoading extends (
    isLoading: typeof initialState
  ) => infer R
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
