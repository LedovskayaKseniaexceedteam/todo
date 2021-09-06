export {};
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { todoAPI } from "../services/todoAPI";

// const initialState = {
//   value: [] as Todo[],
//   error: null as unknown,
// };

// const getAllTodos = createAsyncThunk("todo/getAllTodos", async () => {
//   try {
//     const response = await todoAPI.getAllTodos();
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// });
// const addTodo = createAsyncThunk("todo/createTodo", async (task: Todo) => {
//   try {
//     const response = await todoAPI.addTodo(task);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// });
// const toggleTodo = createAsyncThunk(
//   "todo/toggleTodo",
//   async (id: Todo["id"]) => {
//     try {
//       const response = await todoAPI.toggleTodo(id);
//       return response.data;
//     } catch (error) {
//       return error;
//     }
//   }
// );
// const removeTodo = createAsyncThunk(
//   "todo/removeTodo",
//   async (id: Todo["id"]) => {
//     try {
//       const response = await todoAPI.removeTodo(id);
//       return response.data;
//     } catch (error) {
//       return error;
//     }
//   }
// );
// const removeAll = createAsyncThunk("todo/removeAll", async () => {
//   try {
//     const response = await todoAPI.removeAll();
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// });

// const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     // add: (
//     //   state,
//     //   action: PayloadAction<
//     //     typeof initialState["value"] extends { task: infer R }[] ? R : never
//     //   >
//     // ) => {
//     //   state.value.push({
//     //     isDone: false,
//     //     task: action.payload,
//     //     id: Date.now(),
//     //   });
//     // },
//     // toggle: (
//     //   state,
//     //   action: PayloadAction<
//     //     typeof initialState["value"] extends { id: infer R }[] ? R : never
//     //   >
//     // ) => {
//     //   const targetIndex = state.value.findIndex(
//     //     (item) => item.id === action.payload
//     //   );
//     //   if (targetIndex === -1) return;
//     //   state.value[targetIndex].isDone = !state.value[targetIndex].isDone;
//     // },
//     // remove: (
//     //   state,
//     //   action: PayloadAction<
//     //     typeof initialState["value"] extends { id: infer R }[] ? R : never
//     //   >
//     // ) => {
//     //   state.value = state.value.filter((item) => item.id !== action.payload);
//     // },
//     // removeAll: (state) => {
//     //   state.value = [] as Todo[];
//     // },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getAllTodos.fulfilled, (state, action) => {
//       state.error = null;
//       state.value = action.payload;
//     });
//     builder.addCase(getAllTodos.rejected, (state, action) => {
//       state.error = action.payload;
//     });
//     builder.addCase(
//       toggleTodo.fulfilled,
//       (state, action: PayloadAction<Todo>) => {
//         state.error = null;
//         const targetIndex = state.value.findIndex(
//           (todo) => todo._id === action.payload._id
//         );
//         if (targetIndex === -1) {
//           state.error = {
//             message: "Ooopss.... Something went wrong",
//           };
//           return;
//         }
//         state.value[targetIndex].isDone = !state.value[targetIndex].isDone;
//       }
//     );
//     // builder.addCase(toggleTodo.rejected, (state, action) => {
//     //   state.error = action.payload;
//     // });
//     // builder.addCase(addTodo.fulfilled, (state, action) => {
//     //   state.error = null;
//     //   state.value.push(action.payload)
//     // });
//     // builder.addCase(addTodo.rejected, (state, action) => {
//     //   state.error = action.payload;
//     // });
//     // builder.addCase(removeTodo.fulfilled, (state, action) => {
//     //   state.error = null;
//     //   state.value = action.payload;
//     // });
//     // builder.addCase(removeTodo.rejected, (state, action) => {
//     //   state.error = action.payload;
//     // });
//     // builder.addCase(removeAll.fulfilled, (state, action) => {
//     //   state.error = null;
//     //   state.value = action.payload;
//     // });
//     // builder.addCase(removeAll.rejected, (state, action) => {
//     //   state.error = action.payload;
//     // });
//   },
// });

// // export const { add, toggle, remove, removeAll } = todoSlice.actions;
// export default todoSlice.reducer;
