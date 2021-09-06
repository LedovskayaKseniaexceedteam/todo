import { createStore, applyMiddleware, combineReducers } from "redux";
import { todoReducer } from "./todoReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos: todoReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = {
  todos: Todo[];
  error: string;
};
