import * as TYPES from "./types";

const initialState = [] as Todo[];

export type TodosInitialState = typeof initialState;

export const todosReducer = (
  state = initialState,
  // не получилось вывести типы
  action: {
    type: keyof typeof TYPES;
    payload?: Todo | Todo[] | Todo["_id"];
  }
) => {
  switch (action.type) {
    case TYPES.SET_TODOS:
      return action.payload;
    case TYPES.REMOVE_ALL_DONE:
      return state.filter((todo) => !todo.isDone);
    case TYPES.REMOVE_TODO:
      return state.filter((todo) => todo._id !== action.payload);
    case TYPES.TOGGLE_TODO:
      return state.map((todo) =>
        todo._id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    default:
      return state;
  }
};
