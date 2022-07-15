import { combineReducers } from "redux";
import todoSlice from './todoSlice';
import categoriesSlice from './categoriesSlice';
import userSlice from './userSlice';

export default combineReducers({
    todoSlice: todoSlice,
    categoriesSlice: categoriesSlice
})