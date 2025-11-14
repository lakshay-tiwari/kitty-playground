import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "./fetchTodos";

interface InitialStateInterface {
  items: any[];
  loading: boolean;
  error: string | null;  // Error type should be string | null
}

export const newTodoSlice = createSlice({
  name: 'fetch/todo',
  initialState: { items: [], loading: false, error: null } as InitialStateInterface,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true; // Set loading state when fetching starts
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when fetch is complete
        state.items = action.payload; // Set fetched todos
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        // Ensure action.error.message is either a string or null
        state.error = action.error.message ?? null; // Use null if undefined
      });
  },
});

export default newTodoSlice.reducer;
