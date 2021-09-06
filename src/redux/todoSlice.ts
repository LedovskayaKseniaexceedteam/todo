import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: [] as Todo[],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (
      state,
      action: PayloadAction<
        typeof initialState["value"] extends { task: infer R }[] ? R : never
      >
    ) => {
      state.value.push({
        done: false,
        task: action.payload,
        id: Date.now(),
      });
    },
    toggle: (
      state,
      action: PayloadAction<
        typeof initialState["value"] extends { id: infer R }[] ? R : never
      >
    ) => {
      const targetIndex = state.value.findIndex(
        (item) => item.id === action.payload
      );
      state.value[targetIndex].done = !state.value[targetIndex].done;
    },
    remove: (
      state,
      action: PayloadAction<
        typeof initialState["value"] extends { id: infer R }[] ? R : never
      >
    ) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
    removeAll: (state) => {
      state.value = [] as Todo[];
    },
  },
});

export const { add, toggle, remove, removeAll } = todoSlice.actions;
export default todoSlice.reducer;
