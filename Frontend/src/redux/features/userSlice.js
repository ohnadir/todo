import { createSlice } from "@reduxjs/toolkit";
import { todo } from "./todoSlice";

export const user = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: {}
    },
    reducers: {
        addUserStart: (state)=> state
    }
})
export const { addUserStart } = user.actions;
export default todo.reducer;