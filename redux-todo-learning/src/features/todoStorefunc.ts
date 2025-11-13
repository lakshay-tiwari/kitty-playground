import { createSlice } from '@reduxjs/toolkit'

export type TodoInterface = {
    id: string,
    title: string, 
    description: string,
    isCompleted: boolean 
}

const initialState : TodoInterface[] = []

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state,action) => {
           const todo : TodoInterface = action.payload 
           state.push(todo) 
        },
        removeTodo: (state,action) => {
            const indexToRemove = state.findIndex((todo) => todo.id === action.payload.id)
            state.splice(indexToRemove,1);
        },
        updateTodo: (state,action) => {
            const indexToUpdate = state.findIndex( todo => todo.id === action.payload.id);
            if (indexToUpdate != -1){
                state[indexToUpdate] = action.payload
            }
        },
        changeStatus: (state,action) => { 
            const findTodo = state.find((todo) => todo.id === action.payload.id)
            if (findTodo){
                findTodo.isCompleted = !findTodo.isCompleted 
            }
        }
    }
})


export const { addTodo, removeTodo, updateTodo, changeStatus } = todoSlice.actions;
export default todoSlice.reducer; 