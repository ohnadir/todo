import axios from './index'

export const addCategoryApi = (category)=>axios.post('/categories', category);
export const getCategoryApi = ()=>axios.get('/categories');
export const updateCategoryApi = (id, category)=> axios.patch(`/categories/${id}`, category);
export const deleteCategoryApi = (id)=> axios.delete(`/categories/${id}`)