import { configureStore } from "@reduxjs/toolkit"; 
import todo from './todoSlice'

export const store = configureStore({
  reducer: {
    todo 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
