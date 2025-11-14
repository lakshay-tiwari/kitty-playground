import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "./fetchTodos";

export const newTodoSlice = createSlice({
    name: 'fetch/todo',
    initialState: { items: [] , loading: false, error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
    }
})


export default newTodoSlice.reducer