import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const todoApi = createApi({
    reducerPath: 'fetch/todo',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/'}),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => 'todos',
        })
    })
})

export const { useGetTodosQuery } = todoApi