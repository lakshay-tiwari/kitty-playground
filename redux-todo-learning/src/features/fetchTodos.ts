import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const res = await fetch('http://localhost:3000')
        return res.json();
    }
)