import { createStore, applyMiddleware, combineReducers } from "redux";
import { TodosInitialState, todosReducer as todos } from "./todos/todosReducer";
import { ErrorInitialState, errorReducer as error } from "./error/errorReducer";
import {
  IsLoadingInitialState,
  isLoadingReducer as isLoading,
} from "./isLoading/isLoadingReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos,
  error,
  isLoading,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppState = {
  todos: TodosInitialState;
  error: ErrorInitialState;
  isLoading: IsLoadingInitialState;
};
