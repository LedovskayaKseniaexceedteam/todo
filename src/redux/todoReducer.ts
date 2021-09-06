import * as TYPES from "./types";

const initialState = [] as Todo[];

export const todoReducer = (
  state = initialState,
  action: { type: keyof typeof TYPES; payload?: unknown }
) => {
  console.log(state);
  switch (action.type) {
    case TYPES.ADD_TODO:
      return [...state, action.payload];
    case TYPES.SET_TODOS:
      return action.payload;
    case TYPES.REMOVE_ALL:
      return [] as Todo[];
    case TYPES.REMOVE_TODO:
      return state.filter((todo: Todo) => todo._id === action.payload);
    case TYPES.TOGGLE_TODO:
      const targetIndex = state.findIndex(
        (todo) => todo._id === action.payload
      );
      if (targetIndex === -1) return;
      return [
        ...state.slice(0, targetIndex),
        {
          ...state[targetIndex],
          isDone: !state[targetIndex].isDone,
        },
        ...state.slice(targetIndex + 1),
      ];
    default:
      return state;
  }
};
