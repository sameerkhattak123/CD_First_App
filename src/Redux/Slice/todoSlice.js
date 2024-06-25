import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    todos:[]
}

const todoSlice = createSlice({

    name: 'todos',
    initialState ,
    reducers:{
        addTodo:(state,action)=>{
            state.todos.push(action.payload);
        },
        deleteTodo:(state,action)=>{
            state.todos = state.todos.filter(todo=>todo.id !== action.payload);
        },
        updateTodoStatus: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.status = action.payload.status;
            }
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        },

    
    },

})

export const { addTodo, deleteTodo, updateTodo, updateTodoStatus, toggleTodoStatus } = todoSlice.actions;

export default todoSlice.reducer;