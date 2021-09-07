import { createStore, applyMiddleware, combineReducers } from "redux";
import { todosReducer as todos } from "./todosReducer";
import { errorReducer as error } from "./errorReducer";
import { isLoadingReducer as isLoading } from "./isLoadingReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos,
  error,
  isLoading,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
// export type AppState = ReturnType<typeof rootReducer>
export type AppState = {
  todos: Todo[];
  error: null | TError["message"];
  isLoading: boolean;
};
// @ts-ignore
window.__store__ = store;
