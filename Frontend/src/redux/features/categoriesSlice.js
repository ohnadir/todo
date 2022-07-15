import { createSlice } from "@reduxjs/toolkit";

export const category = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        category: {}
    },
    reducers: {
        addCategoryStart : (state)=> state,
    }
})

export const {
    addCategoryStart
} = category.actions;

export default category.reducer;