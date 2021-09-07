import { InitialState } from "./loadingReducer";
import { SET_IS_LOADING } from "./types";

export const setLoading = ({
  isLoading,
  target = null,
}: {
  isLoading: InitialState["isLoading"];
  target?: InitialState["target"];
}) => ({
  type: SET_IS_LOADING,
  payload: {
    isLoading,
    target,
  },
});
