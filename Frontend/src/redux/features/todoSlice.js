import { createSlice } from "@reduxjs/toolkit";

export const todo = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        todo: {}
    },
    reducers: {
        addTodoStart: (state) => state
    }
});
export const { addTodoStart } = todo.actions;
export default todo.reducer;