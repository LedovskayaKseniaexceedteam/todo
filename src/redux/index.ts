import { createStore, applyMiddleware, combineReducers } from "redux";
import { todosReducer as todos } from "./todos/todosReducer";
import { errorReducer as error } from "./error/errorReducer";
import { loadingReducer as loading } from "./loading/loadingReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos,
  error,
  loading,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppState = ReturnType<typeof store.getState>;
