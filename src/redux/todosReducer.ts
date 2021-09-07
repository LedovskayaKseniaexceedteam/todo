import * as TYPES from "./types";

const initialState = [] as Todo[];
export const todosReducer = (
  state = initialState,
  // не получилось вывести типы
  action: {
    type: keyof typeof TYPES;
    payload?: Todo | Todo[] | Todo["_id"];
  }
) => {
  switch (action.type) {
    case TYPES.ADD_TODO:
      return [...state, action.payload];
    case TYPES.SET_TODOS:
      return action.payload;
    case TYPES.REMOVE_ALL:
      return state.filter((todo) => !todo.isDone);
    case TYPES.REMOVE_TODO:
      return state.filter((todo) => todo._id !== action.payload);
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
