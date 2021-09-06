import { RootState } from ".";

export const selectAll = (state: RootState) => state.todo.value;
export const selectCompleted = (state: RootState) => state.todo.value.filter(item => item.done);
export const selectInProgress = (state: RootState) => state.todo.value.filter(item => !item.done);
