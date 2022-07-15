import axios from './index';
export const addTodoApi = (todo)=>axios.post('/todos', todo);
export const getTodoApi = ()=>axios.get('/todos')
export const updateTodoApi=(id, todo)=> axios.patch(`/todos/${id}`, todo);
export const deleteTodoApi = (id)=> axios.delete(`/todos/${id}`);
