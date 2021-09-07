import { SET_IS_LOADING } from "./types";

export const setIsLoading = ({
  state,
  target = null,
}: {
  state: boolean;
  target?: "all" | null | Todo["_id"];
}) => ({
  type: SET_IS_LOADING,
  payload: {
    state,
    target,
  },
});
