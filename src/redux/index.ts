import { createStore, applyMiddleware, combineReducers } from "redux";
import { todosReducer as todos } from "./todosReducer";
import { errorReducer as error } from "./errorReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos,
  error,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppState = {
  todos: Todo[];
  error: null | TError["message"];
};
// @ts-ignore
window.__store__ = store;
