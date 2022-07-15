import axios from './index';
export const addUserApi = (user)=>axios.post('/users', user);
export const getUserApi =()=>axios.get('/users');
export const updateUserApi=(id, user)=>axios.patch(`/users/${id}`, user);
export const deleteUserApi = (id)=> axios.delete(`/users/${id}`);